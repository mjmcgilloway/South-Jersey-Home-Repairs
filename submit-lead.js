// netlify/functions/submit-lead.js
//
// Receives the lead form JSON from the browser and writes a new record
// directly into Airtable using the Airtable REST API.
// This replaces the "Zapier: catch webhook -> create Airtable record" step.
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

  const { service, budget, urgency, name, phone, email, location } = data;

  if (!service || !budget || !urgency || !name || !phone || !email) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

  try {
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Service': service,
          'Budget': budget,
          'Urgency': urgency,
          'Name': name,
          'Phone': phone,
          'Email': email,
          'Location': location || '',
          'Submitted At': new Date().toISOString(),
          'Source': 'Website Form',
        },
      }),
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
