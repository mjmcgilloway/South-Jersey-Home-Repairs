// netlify/functions/submit-lead.js
//
// Receives the lead form JSON from the browser and writes a new record
// directly into Airtable using the Airtable REST API.
//
// Required environment variables (set these in Netlify, not in this file):
//   AIRTABLE_API_KEY   - a personal access token from airtable.com/create/tokens
//   AIRTABLE_BASE_ID   - the base ID, looks like appXXXXXXXXXXXXXX
//   AIRTABLE_TABLE_NAME - the exact table name, e.g. "Leads"

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { service, name, phone, email, location, notes } = data;

  if (!service || !name || !phone || !email) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // Notes are optional. Trim them and cap the length so nobody can
  // paste a novel into the form.
  const cleanNotes = typeof notes === 'string' ? notes.trim().slice(0, 2000) : '';

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

  const fields = {
    'Name': name,
    'Phone': phone,
    'Email': email,
    'Zip': location || '',
    'Service Type': service,
    'Status': 'New',
    'Submitted At': new Date().toISOString(),
    'Source': 'Website Form',
  };

  // Only send Notes when the homeowner actually typed something.
  if (cleanNotes) {
    fields['Notes'] = cleanNotes;
  }

  try {
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Airtable error:', errText);
      return { statusCode: 502, body: 'Failed to save lead' };
    }

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, id: result.id }),
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { statusCode: 500, body: 'Server error' };
  }
};
