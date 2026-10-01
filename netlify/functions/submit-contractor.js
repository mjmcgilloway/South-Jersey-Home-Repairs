// netlify/functions/submit-contractor.js
//
// Receives contractor application form JSON and writes a new record
// into the Contractors table in Airtable.
//
// Required environment variables:
//   AIRTABLE_API_KEY                - personal access token
//   AIRTABLE_BASE_ID                - the base ID
//   AIRTABLE_CONTRACTORS_TABLE_NAME - the Contractors table name or ID

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

  const { businessName, contactName, phone, email, trade, zip } = data;

  if (!businessName || !contactName || !phone || !email || !trade) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_CONTRACTORS_TABLE_NAME } = process.env;

  const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_CONTRACTORS_TABLE_NAME)}`;

  try {
    const response = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Company Name': businessName,
          'Contact Name': contactName,
          'Phone': phone,
          'Email': email,
          'Service': trade,
          'Zip': zip || '',
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Airtable error:', errText);
      return { statusCode: 502, body: 'Failed to save application' };
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
