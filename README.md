# South Jersey Home Repairs — Website

A lead-capture landing page for South Jersey Home Repairs, built as a static
site with a serverless function that logs form submissions directly into
Airtable (no Zapier required).

## Structure

```
├── index.html                       # Main landing page
├── css/style.css                    # Styles
├── js/script.js                     # Multi-step form logic + submission
├── netlify/functions/submit-lead.js # Serverless function -> Airtable
├── netlify.toml                     # Netlify build config
└── README.md
```

## Local preview

Just open `index.html` in a browser for a quick look. To test the Airtable
submission locally, install the Netlify CLI and run `netlify dev` (see the
PDF setup guide for full steps).

## Environment variables (set in Netlify, not in code)

| Variable | Description |
|---|---|
| `AIRTABLE_API_KEY` | Personal access token from airtable.com/create/tokens |
| `AIRTABLE_BASE_ID` | Your Airtable base ID (starts with `app`) |
| `AIRTABLE_TABLE_NAME` | Exact name of the table leads should be written to |

See the full setup PDF for step-by-step instructions on GitHub, Netlify, and
Airtable configuration.
