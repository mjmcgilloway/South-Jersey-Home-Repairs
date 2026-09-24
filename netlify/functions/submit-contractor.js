// netlify/functions/submit-contractor.js
//
// Receives contractor application form JSON and writes a new record
// into a separate Airtable table for contractor applications.
//
// Required environment variables:
//   AIRTABLE_API_KEY                - same token used for the lead form
//   AIRTABLE_BASE_ID                - same base ID used for the lead form
//   AIRTABLE_CONTRACTORS_TABLE_NAME - exact name of the contractors table, e.g. "Contractors"

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

  const { businessName, contactName, phone, email, trade, license, yearsInBusiness, serviceArea } = data;

  if (!businessName || !contactName || !phone || !email || !trade || !license) {
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
          'Business Name': businessName,
          'Contact Name': contactName,
          'Phone': phone,
          'Email': email,
          'Trade': trade,
          'License Number': license,
          'Years in Business': yearsInBusiness || '',
          'Service Area': serviceArea || '',
          'Submitted At': new Date().toISOString(),
          'Status': 'New',
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
