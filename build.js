// ------------------------------------------------------------------
// South Jersey Home Repairs: page builder
// Run:  node build.js   (Netlify runs this automatically on deploy)
// Creates /about, /contractors, and one page per trade in data/trades.js
// Uses your existing css/style.css and js/script.js, so the forms
// work and save to Airtable exactly like the home page forms.
// ------------------------------------------------------------------
const fs = require("fs");
const path = require("path");
const trades = require("./data/trades.js");

const DOMAIN = "https://southjerseyhomerepairs.com";
const PHONE = "(609) 605-8851";
const TEL = "6096058851";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The service list from your home page form, in the same order.
// Keep this in sync with index.html.
const SERVICES = ["Roofing", "HVAC", "Plumbing", "Fencing", "Electrical", "Restoration", "Masonry", "Lawncare",
  "Tree Removal", "Gutters", "Siding", "Painting", "Cleaning Services", "Solar", "Basement Waterproofing",
  "Foundation Issues", "Mold", "Windows / Doors", "Other"];

// ---------- shared ----------
function head({ title, description, canonical }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${DOMAIN}${canonical}">
<meta property="og:type" content="website">
<meta property="og:url" content="${DOMAIN}${canonical}">
<meta property="og:site_name" content="South Jersey Home Repairs">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${DOMAIN}/assets/share.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="/assets/logo.png">
<link rel="apple-touch-icon" href="/assets/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/nav.css">
<style>
  /* Line new content up with the site's centered section headings */
  .sjn-prose { margin-left: auto; margin-right: auto; }
  .sjc-lead, .sjc-note, .sjc-contact { max-width: 760px; margin-left: auto; margin-right: auto; text-align: center; }
  .sjc-sub { text-align: center; margin-top: 2.25rem; }
  .sjc-center { margin-left: auto !important; margin-right: auto !important; }
</style>
</head>
<body>
`;
}

function header(active = "") {
  const cur = (k) => (active === k ? ' aria-current="page"' : "");
  const items = trades.map((t) => `<li><a href="/${t.slug}"${cur(t.slug)}>${esc(t.name)}</a></li>`).join("\n          ");
  return `<header class="site-header">
  <div class="container header-inner">
    <a href="/" class="logo-link">
      <img src="/assets/logo.png" alt="South Jersey Home Repairs" class="logo-icon">
      <span class="logo">South Jersey <span class="logo-accent">Home Repairs</span></span>
    </a>
    <button class="sjn-toggle" type="button" aria-expanded="false" aria-controls="sjn">Menu</button>
    <nav class="sjn" id="sjn" aria-label="Main">
      <ul class="sjn-list">
        <li><a href="/about"${cur("about")}>About us</a></li>
        <li class="sjn-dd">
          <button class="sjn-dd-toggle" type="button" aria-expanded="false" aria-controls="sjn-services">Services</button>
          <ul class="sjn-dd-menu" id="sjn-services">
          ${items}
          </ul>
        </li>
        <li><a href="/service-areas"${cur("service-areas")}>Service areas</a></li>
        <li><a class="sjn-cta" href="/contractors"${cur("contractors")}>Contractors</a></li>
      </ul>
    </nav>
    <a href="tel:${TEL}" class="header-phone">📞 ${PHONE}</a>
  </div>
</header>
`;
}

function footer() {
  const links = trades.map((t) => `<a href="/${t.slug}">${esc(t.name)}</a>`).join("\n      ");
  return `<footer class="site-footer">
  <div class="container">
    <nav class="sjn-footer-links" aria-label="Services">
      ${links}
    </nav>
    <p><a href="/service-areas">Service areas: Camden &amp; Gloucester counties</a></p>
    <p>© <span id="year"></span> South Jersey Home Repairs, LLC. All rights reserved. LLC #0451530369</p>
    <p>Phone: <a href="tel:${TEL}">${PHONE.replace(/[()]/g, "").replace(" ", "-")}</a></p>
  </div>
</footer>

<script src="/js/script.js"></script>
<script src="/js/nav.js"></script>
</body>
</html>
`;
}

// ---------- your forms (copied from index.html) ----------
function leadForm(preselect = "") {
  const buttons = SERVICES.map((s) => `            <button type="button" class="option-btn">${esc(s)}</button>`).join("\n");
  return `<div class="hero-form-card">
      <form id="lead-form" novalidate${preselect ? ` data-preselect="${esc(preselect)}"` : ""}>

        <div class="form-step active" data-step="1">
          <h3>What do you need help with?</h3>
          <div class="option-grid" data-field="service">
${buttons}
          </div>
        </div>

        <div class="form-step" data-step="2">
          <h3>Tell us a little bit more about what you need</h3>
          <textarea name="notes" class="notes-input" rows="4" maxlength="2000" aria-label="Tell us a little bit more about what you need" placeholder="Example: Water stain on the bedroom ceiling after last week's storm."></textarea>
          <p class="step-hint">Optional. A sentence or two is plenty.</p>
          <button type="button" class="submit-btn next-btn">Continue</button>
        </div>

        <div class="form-step" data-step="4">
          <h3>Almost done — where should we send your match?</h3>
          <label>Full Name
            <input type="text" name="name" required>
          </label>
          <label>Phone
            <input type="tel" name="phone" required>
          </label>
          <label>Email
            <input type="email" name="email" required>
          </label>
          <label>Zip
  <input type="text" name="location" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" required>
</label>
          <button type="submit" class="submit-btn">Get Connected Today</button>
        </div>

        <div class="form-step" data-step="success">
          <h3>Thank you!</h3>
          <p>Please allow up to 24 hours to be contacted. We're matching you with a local, licensed, trusted contractor now.</p>
        </div>

        <p class="form-error" id="form-error" hidden></p>
      </form>
    </div>`;
}

function contractorForm(trade = null) {
  const opts = SERVICES.map((s) => `        <option${trade && s === trade.value ? " selected" : ""}>${esc(s)}</option>`).join("\n");
  const placeholder = trade
    ? `        <option value="" disabled>Select a trade</option>`
    : `        <option value="" disabled selected>Select a trade</option>`;
  return `<div class="contractor-form-card">
      <form id="contractor-form" novalidate>
  <div class="form-grid">
    <label>Company Name
      <input type="text" name="businessName" required>
    </label>
    <label>Contact Name
      <input type="text" name="contactName" required>
    </label>
    <label>Phone
      <input type="tel" name="phone" required>
    </label>
    <label>Email
      <input type="email" name="email" required>
    </label>
    <label${trade ? " hidden" : ""}>Primary Trade / Specialty
      <select name="trade" required>
${placeholder}
${opts}
      </select>
    </label>
    <label>Zip
      <input type="text" name="zip" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" required>
    </label>
  </div>
  <button type="submit" class="submit-btn">Submit Application</button>
  <p class="form-error" id="contractor-form-error" hidden></p>
  <p class="form-success" id="contractor-form-success" hidden>Thanks! We'll be in touch after reviewing your application.</p>
</form>
    </div>`;
}

// ---------- pages ----------
function tradePage(t) {
  const cards = t.jobs.map(([n, d]) => `      <div class="card">
        <h3>${esc(n)}</h3>
        <p>${esc(d)}</p>
      </div>`).join("\n");
  return head({
    title: `${t.name} in South Jersey | South Jersey Home Repairs`,
    description: `Need ${t.name.toLowerCase()} help in South Jersey? Get matched with a licensed local ${t.pro}. Free for homeowners, no obligation.`,
    canonical: `/${t.slug}`
  }) + header(t.slug) + `
<section class="hero" id="home">
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="hero-eyebrow"><a href="/">Home</a> / ${esc(t.name)}</p>
      <h1>${esc(t.name)} in South Jersey</h1>
      <p class="hero-sub">${esc(t.intro)}</p>
      <a href="#contractors" class="hero-contractor-link">Are you a ${esc(t.pro)}? Join our network →</a>
    </div>

    ${leadForm(t.value)}
  </div>
</section>

<section class="section repairs">
  <div class="container">
    <h2>Common ${esc(t.name.toLowerCase())} jobs we match homeowners on</h2>
    <div class="card-grid">
${cards}
      <div class="card">
        <h3>Not listed?</h3>
        <p>Describe it in the form above. Chances are we know someone.</p>
      </div>
    </div>
    <p class="sjc-lead" style="margin-top:1.5rem">We match homeowners with ${esc(t.name.toLowerCase())} pros throughout Camden and Gloucester counties. <a href="/service-areas">See all the towns we serve</a>.</p>
  </div>
</section>

<section class="section matchmaker">
  <div class="container">
    <h2>How it works</h2>
    <div class="card-grid sjn-steps">
      <div class="card"><h3>1. Tell us about the job</h3><p>It takes about a minute, and it's free.</p></div>
      <div class="card"><h3>2. We match you</h3><p>We connect you with a licensed ${esc(t.pro)} established in South Jersey.</p></div>
      <div class="card"><h3>3. They reach out</h3><p>Expect to hear back within 24 hours. You work out the details and pricing directly.</p></div>
    </div>
  </div>
</section>

<section class="section contractors" id="contractors">
  <div class="container">
    <h2>Do you do ${esc(t.name.toLowerCase())} work?</h2>
    <p class="section-sub">Join our network and get matched with South Jersey homeowners who need a ${esc(t.pro)}. <a href="/contractors">See how it works</a>.</p>

    ${contractorForm(t)}
  </div>
</section>

` + footer();
}

function aboutPage() {
  return head({
    title: "About Us | South Jersey Home Repairs",
    description: "Why South Jersey Home Repairs exists and how we match homeowners with licensed local contractors.",
    canonical: "/about"
  }) + header("about") + `
<section class="hero sjn-page-hero">
  <div class="container">
    <div class="hero-copy">
      <h1>About South Jersey Home Repairs</h1>
      <p class="hero-sub">We're the matchmaker, not the crew. Our job is connecting South Jersey homeowners with licensed local contractors we'd call for our own homes.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container sjn-prose">
    <h2>Why I started this</h2>
    <p>I've spent my whole life living and networking in South Jersey, more than 30 years, and over 15 of those years working in the trade industry. A lot of my friends and family work in the trades too, so I've seen up close how much skill and hard work goes into doing a job right.</p>
    <p>I've also spent more than 8 years working professionally in real estate. Along the way, I met homeowner after homeowner with the same worry: they needed work done and didn't know who to trust. They'd call around, wait on callbacks, and still feel unsure about who would actually show up.</p>
    <p>That's why I started South Jersey Home Repairs. I want to be the right matchmaker for both sides. From my time in the trades, I know how hard it can be for good contractors to find steady, reliable work. And from working with homeowners, I know trust is one of the hardest parts of hiring someone to work on your home.</p>
    <p>Every match I make has to work for the homeowner and the contractor. I wouldn't make it far in this business if I couldn't help both sides, and I wouldn't want to.</p>

    <h2>What we do</h2>
    <p>You tell us what needs fixing. We match you with a licensed contractor who does that kind of work in your area, and they reach out to you directly, usually within 24 hours. You work out the details and pricing with them.</p>

    <h2>How we choose contractors</h2>
    <p>Every contractor in our network is someone I either know personally or have connected with personally. Through my years in the trades and in real estate, I've built relationships with contractors I've used, and would use again, for my own home and for the homes of friends and family. I only work with contractors who are licensed and insured, and who are reliable: ready, willing, and able to do the work.</p>

    <h2>Why it's free for homeowners</h2>
    <p>Contractors pay us for the referral, not you. There's no added fee baked into your quote, and no obligation to hire anyone.</p>

    <h2>If something feels off</h2>
    <p>Come back to us. If you're not happy with a match, we'll find you a better fit. We'd rather fix it than have you stuck.</p>

  </div>
</section>

<section class="hero" id="get-matched">
  <div class="container hero-inner">
    <div class="hero-copy">
      <h2>Ready to get matched?</h2>
      <p class="hero-sub">Tell us what needs fixing and we'll match you with a licensed, local contractor we'd call for our own home.</p>
      <a href="/contractors" class="hero-contractor-link">Are you a contractor? See how it works →</a>
    </div>

    ${leadForm()}
  </div>
</section>

<section class="section contractors" id="contractors">
  <div class="container">
    <h2>Are You a Contractor?</h2>
    <p class="section-sub">Join our network and get matched with homeowners in South Jersey looking for licensed, reliable pros.</p>

    ${contractorForm()}
  </div>
</section>

` + footer();
}

function contractorsPage() {
  return head({
    title: "For Contractors | South Jersey Home Repairs",
    description: "Exclusive, personally vetted homeowner leads for South Jersey contractors. No membership, no shared leads, no paying for leads that never respond.",
    canonical: "/contractors"
  }) + header("contractors") + `
<style>
  .sjc-lead { max-width: 760px; }
  .sjc-table-wrap { overflow-x: auto; margin: 1rem 0; border-radius: 8px; }
  .sjc-table { width: 100%; border-collapse: collapse; background: #fff; color: #1f2937; font-size: .95rem; }
  .sjc-table th, .sjc-table td { padding: .75rem .9rem; border: 1px solid #dde3e8; text-align: left; vertical-align: top; color: #1f2937; }
  .sjc-table thead th { background: #1e2f4d; color: #fff; }
  .sjc-table tbody tr:nth-child(even) { background: #f6f8f9; }
  .sjc-table .us { font-weight: 600; }
  .sjc-yes { color: #3b6b2a !important; font-weight: 700; }
  .sjc-no { color: #a3342b !important; font-weight: 700; }
  .sjc-fees { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .sjc-fees .card { text-align: center; }
  .sjc-fees ul { margin: .5rem 0 0; padding-left: 1.2rem; columns: 2; column-gap: 1.25rem; }
  .sjc-fees li { margin-bottom: .3rem; break-inside: avoid; }
  .card .sjc-checks li, .sjc-fees li { color: #374151; }
  .sjc-example { background: #f3f6ef; color: #1f2937; border-left: 4px solid #6b8e3a; padding: .9rem 1rem; border-radius: 4px; max-width: 760px; }
  .sjc-example strong { color: #1f2937; }
  .sjc-note { font-size: .85rem; opacity: .8; max-width: 900px; }
  .sjc-checks { margin: .5rem 0 0; padding-left: 1.2rem; }
  .sjc-checks li { margin-bottom: .35rem; }
  .sjc-contact { margin-top: 1rem; }
  @media (max-width: 760px) { .sjc-fees { grid-template-columns: 1fr; } .sjc-fees .card { text-align: center; }
  .sjc-fees ul { columns: 1; } }
</style>

<section class="hero sjn-page-hero">
  <div class="container">
    <div class="hero-copy">
      <h1>Exclusive, pre-vetted leads for South Jersey contractors</h1>
      <p class="hero-sub">No membership. No shared leads. No paying for homeowners who never respond. Every lead is personally verified by a real person before it ever reaches you.</p>
      <a href="#apply" class="hero-contractor-link">Apply to join our network →</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2>Built for quality, not quantity</h2>
    <p class="sjc-lead">This isn't a high-volume model designed to flood your schedule and hope a few leads stick. That approach overwhelms contractors financially and leaves you paying for dead ends. Instead, it's a personal, lower-volume service. Every lead you receive has already been vetted by a real person, so you get fewer leads that are far more likely to turn into real, paying work.</p>
  </div>
</section>

<section class="section matchmaker">
  <div class="container">
    <h2>How it works</h2>
    <div class="card-grid">
      <div class="card">
        <h3>1. The lead comes in</h3>
        <p>A homeowner fills out a request on our website or reaches out by phone or email. We capture the type of work, the property location, and the best way to reach them.</p>
      </div>
      <div class="card">
        <h3>2. We vet every lead</h3>
        <p>Before anything is sent to you, we personally:</p>
        <ul class="sjc-checks">
          <li>Confirm the homeowner's phone and email are real and reachable</li>
          <li>Talk with the homeowner to understand the actual scope of the project</li>
          <li>Confirm the property is in your service area and the job fits your trade and capacity</li>
          <li>Filter out duplicates, spam, and unqualified inquiries</li>
        </ul>
      </div>
      <div class="card">
        <h3>3. You follow up and win the job</h3>
        <p>You get the lead directly, with enough context to call the homeowner prepared, not cold. Before you're ever invoiced, we contact you personally to confirm you'd like the referral. If the job closes, the referral percentage applies with your lead fee credited toward it.</p>
      </div>
      <div class="card">
        <h3>4. Billing is simple</h3>
        <p>Invoices are sent electronically and can be paid by credit/debit card or bank transfer (ACH). No card processing fees or surcharges, ever. You'll always have a clear, itemized record of what was charged and why.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="pricing">
  <div class="container">
    <h2>Pricing</h2>
    <h3 class="sjc-sub" style="margin-top:0">Qualified lead fee</h3>
    <p class="sjc-lead">A flat fee per qualified, verified lead delivered, whether or not the job closes.</p>
    <div class="sjc-fees sjc-center" style="max-width:760px">
      <div class="card">
        <h3 class="sjn-price">$50</h3>
        <p>per qualified lead for lower-ticket trades</p>
      </div>
      <div class="card">
        <h3 class="sjn-price">$75</h3>
        <p>per qualified lead for higher-ticket and technical trades</p>
      </div>
    </div>
    <p class="sjc-lead" style="margin-top:1rem">We'll confirm which fee applies to your trade when you join.</p>

    <h3 class="sjc-sub">Referral percentage on closed jobs</h3>
    <p class="sjc-lead">Applies to every trade once a referred job closes. The lead fee you already paid is credited against what's owed, so you never pay twice for the same job.</p>
    <div class="sjc-table-wrap" style="max-width:520px;margin:1rem auto">
      <table class="sjc-table">
        <thead><tr><th>Closed job value</th><th>Referral percentage</th></tr></thead>
        <tbody>
          <tr><td>$500 – $1,999</td><td>5%</td></tr>
          <tr><td>$2,000 – $4,999</td><td>4%</td></tr>
          <tr><td>$5,000 – $14,999</td><td>3%</td></tr>
          <tr><td>$15,000 – $29,999</td><td>2%</td></tr>
          <tr><td>$30,000+</td><td>1%</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sjc-example sjc-center"><strong>Example:</strong> A $6,000 job closes at the 3% tier, so $180 is owed. The $75 lead fee you already paid is credited, leaving a balance of $105.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2>How we compare to national platforms</h2>
    <p class="sjc-lead">It's not just the sticker price per lead. It's what you actually get for it.</p>
    <div class="sjc-table-wrap">
      <table class="sjc-table">
        <thead><tr><th></th><th>South Jersey Home Repairs</th><th>Angi / HomeAdvisor</th><th>Thumbtack</th></tr></thead>
        <tbody>
          <tr><th scope="row">Membership fee</th><td class="us"><span class="sjc-yes">✓</span> $0, never a membership</td><td><span class="sjc-no">✗</span> About $300 per year to participate</td><td><span class="sjc-no">✗</span> $0, but pricing is unpredictable</td></tr>
          <tr><th scope="row">Lead exclusivity</th><td class="us"><span class="sjc-yes">✓</span> 100% yours, never shared</td><td><span class="sjc-no">✗</span> Shared with 3–5 competing pros</td><td><span class="sjc-no">✗</span> Often shared with multiple pros</td></tr>
          <tr><th scope="row">Vetting before you pay</th><td class="us"><span class="sjc-yes">✓</span> Personally verified by a real person, every time</td><td><span class="sjc-no">✗</span> Automated intake, minimal vetting</td><td><span class="sjc-no">✗</span> Automated intake, minimal vetting</td></tr>
          <tr><th scope="row">Charged for leads that ghost you</th><td class="us"><span class="sjc-yes">✓</span> Never. Unresponsive leads are filtered out first</td><td><span class="sjc-no">✗</span> Yes, full price even if they never reply</td><td><span class="sjc-no">✗</span> Yes, commonly reported by contractors</td></tr>
          <tr><th scope="row">Est. cost per closed job*</th><td class="us"><span class="sjc-yes">✓</span> About $230 with one exclusive, pre-qualified lead</td><td><span class="sjc-no">✗</span> About $1,300+ with odds split across shared pros</td><td><span class="sjc-no">✗</span> About $1,000+, often 3–4 leads per job won</td></tr>
          <tr><th scope="row">Contracts / commitment</th><td class="us"><span class="sjc-yes">✓</span> None. Pay only as leads are delivered</td><td><span class="sjc-no">✗</span> Annual membership commitment</td><td><span class="sjc-no">✗</span> No contract, but volatile per-lead pricing</td></tr>
          <tr><th scope="row">Who you're working with</th><td class="us"><span class="sjc-yes">✓</span> A local, hands-on operator who knows the trades</td><td><span class="sjc-no">✗</span> National call center</td><td><span class="sjc-no">✗</span> National marketplace app</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sjc-note">Angi (HomeAdvisor) and Thumbtack figures reflect publicly reported 2026 industry pricing and contractor-reported experiences. *Estimated cost per closed job accounts for lead sharing and reported close rates: national platforms typically split each lead across 3–5 competing contractors and report that only 10–30% of leads convert, so several paid leads are often needed to win one job. Because our leads are exclusive and pre-qualified before you pay, fewer leads are needed for the same result.</p>
  </div>
</section>

<section class="section faq">
  <div class="container">
    <h2>Questions Contractors Ask Us</h2>
    <div class="accordion">
      <details><summary>What counts as a qualified lead?</summary><p>A homeowner whose contact information we've confirmed is real and reachable, who we've spoken with directly about the scope of the job, whose property is in your service area, and whose project matches your trade and capacity.</p></details>
      <details><summary>Are leads shared with other contractors?</summary><p>No. Every lead is 100% yours and never shared with competing contractors.</p></details>
      <details><summary>Do I pay for leads that never respond?</summary><p>No. We confirm every homeowner is reachable and talk with them before a lead is sent, so unresponsive leads are filtered out before you ever pay.</p></details>
      <details><summary>How do I receive leads?</summary><p>Qualified leads are sent directly to you, with enough detail about the homeowner and the project to call them prepared.</p></details>
      <details><summary>Is there a membership, sign-up fee, or contract?</summary><p>No membership, no sign-up fee, and no contract. You pay only as leads are delivered, plus the referral percentage on jobs that close.</p></details>
      <details><summary>Do I have to report closed jobs?</summary><p>Please let us know when a referred job closes. We also follow up with homeowners ourselves and invoice accordingly.</p></details>
      <details><summary>How do I pay?</summary><p>Invoices are sent electronically. Pay by credit/debit card or bank transfer (ACH), with no processing fees or surcharges.</p></details>
    </div>
  </div>
</section>

<section class="section contractors" id="apply">
  <div class="container">
    <h2>Apply to join our network</h2>
    <p class="section-sub">Tell us your trade and where you're based. Once you're in our network, you're eligible to start receiving qualified leads right away.</p>

    ${contractorForm()}

    <p class="sjc-contact">Prefer to talk first? Call or text <a href="tel:${TEL}">609-605-8851</a> or email <a href="mailto:southjerseyhomerepairsllc@gmail.com">southjerseyhomerepairsllc@gmail.com</a>.</p>
  </div>
</section>

<!-- Hidden copy of the homeowner form. Your js/script.js expects both forms
     on every page; this keeps it from erroring here. Safe to leave as is. -->
<div hidden aria-hidden="true">
  ${leadForm()}
</div>

` + footer();
}

// ---------- service areas ----------
const AREAS = [
  {
    county: "Camden County",
    towns: ["Audubon", "Audubon Park", "Barrington", "Bellmawr", "Berlin", "Berlin Township", "Brooklawn", "Camden",
      "Cherry Hill", "Chesilhurst", "Clementon", "Collingswood", "Gibbsboro", "Gloucester City", "Gloucester Township",
      "Haddon Heights", "Haddon Township", "Haddonfield", "Hi-Nella", "Laurel Springs", "Lawnside", "Lindenwold",
      "Magnolia", "Merchantville", "Mount Ephraim", "Oaklyn", "Pennsauken", "Pine Hill", "Runnemede", "Somerdale",
      "Stratford", "Tavistock", "Voorhees", "Waterford", "Winslow", "Woodlynne",
      // communities and neighborhoods people search by name
      "Ashland", "Atco", "Blackwood", "Blenheim", "Blue Anchor", "Braddock", "Cedar Brook", "Chews Landing", "Echelon",
      "Erial", "Glendora", "Kirkwood", "Sicklerville", "Tansboro", "West Berlin", "Westmont"]
  },
  {
    county: "Gloucester County",
    towns: ["Clayton", "Deptford", "East Greenwich", "Elk", "Franklin", "Glassboro", "Greenwich", "Harrison", "Logan",
      "Mantua", "Monroe", "National Park", "Newfield", "Paulsboro", "Pitman", "South Harrison", "Swedesboro",
      "Washington Township", "Wenonah", "West Deptford", "Westville", "Woodbury", "Woodbury Heights", "Woolwich",
      // communities and neighborhoods people search by name
      "Almonesson", "Beckett", "Bridgeport", "Cecil", "Clarksboro", "Ewan", "Franklinville", "Gibbstown", "Grenloch",
      "Harrisonville", "Hurffville", "Malaga", "Mickleton", "Mount Royal", "Mullica Hill", "Oak Valley", "Richwood",
      "Sewell", "Thorofare", "Turnersville", "Williamstown"]
  }
];

function serviceAreasPage() {
  const counties = AREAS.map((a) => `    <div class="sja-county">
      <h2>${esc(a.county)}</h2>
      <ul class="sja-towns">${[...a.towns].sort((x, y) => x.localeCompare(y)).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </div>`).join("\n");
  const services = trades.map((t) => `<li><a href="/${t.slug}">${esc(t.name)}</a></li>`).join("");
  return head({
    title: "Service Areas: Camden & Gloucester County, NJ | South Jersey Home Repairs",
    description: "We match homeowners with licensed local contractors across Camden and Gloucester counties, NJ, including Cherry Hill, Voorhees, Glassboro, Washington Township, Deptford, and more.",
    canonical: "/service-areas"
  }) + header("service-areas") + `
<style>
  .sja-grid { display: grid; gap: 1.5rem; }
  .sja-county { background: #fff; color: #1f2937; border-radius: 12px; padding: 1.75rem; text-align: left; }
  .sja-county h2 { color: #1e2f4d; text-align: left; margin: 0 0 .5rem; }
  .sja-county h2::after { display: none; }
  .sja-towns { list-style: none; padding: 0; margin: .75rem 0 0; columns: 4; column-gap: 1.5rem; }
  .sja-towns li { color: #1f2937; padding: .35rem 0; border-bottom: 1px solid #e6eaee; break-inside: avoid; }
  .sja-services { list-style: none; padding: 0; margin: 1rem 0 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: .6rem; }
  .sja-services a { display: block; padding: .8rem 1rem; border-radius: 8px; background: #fff; color: #1e2f4d; text-decoration: none; font-weight: 600; border: 2px solid transparent; }
  .sja-services a:hover { border-color: #6b8e3a; }
  @media (max-width: 900px) { .sja-towns { columns: 3; } }
  @media (max-width: 600px) { .sja-towns { columns: 2; } }
</style>

<section class="hero sjn-page-hero">
  <div class="container">
    <div class="hero-copy">
      <h1>Service areas in South Jersey</h1>
      <p class="hero-sub">We're focused on Camden and Gloucester counties, where we've lived, worked, and built our contractor network. Many of the contractors we work with also take jobs in the surrounding areas, so if you're nearby, reach out anyway.</p>
      <a href="#get-matched" class="hero-contractor-link">Get matched with a local pro →</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sja-grid">
${counties}
    </div>
  </div>
</section>

<section class="section matchmaker">
  <div class="container">
    <h2>Outside Camden or Gloucester County?</h2>
    <p class="sjc-lead">If you're in a neighboring county, like Burlington, Salem, Atlantic, or Cumberland, tell us about your project. We'll let you know if one of our contractors covers your town.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2>Find a pro for your project</h2>
    <p class="sjc-lead">Choose a service to see common jobs and get matched with a licensed local contractor.</p>
    <ul class="sja-services">${services}</ul>
  </div>
</section>

<section class="hero" id="get-matched">
  <div class="container hero-inner">
    <div class="hero-copy">
      <h2>Ready to get matched?</h2>
      <p class="hero-sub">Tell us what needs fixing and we'll match you with a licensed, local contractor we'd call for our own home.</p>
      <a href="#contractors" class="hero-contractor-link">Are you a contractor? Join our network →</a>
    </div>

    ${leadForm()}
  </div>
</section>

<section class="section contractors" id="contractors">
  <div class="container">
    <h2>Are You a Contractor?</h2>
    <p class="section-sub">Join our network and get matched with homeowners in Camden and Gloucester counties looking for licensed, reliable pros.</p>

    ${contractorForm()}
  </div>
</section>

` + footer();
}

// ---------- write ----------
function write(rel, html) {
  const file = path.join(__dirname, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log("  wrote", rel);
}

console.log("Building pages...");
trades.forEach((t) => write(`${t.slug}/index.html`, tradePage(t)));
write("about/index.html", aboutPage());
write("contractors/index.html", contractorsPage());
write("service-areas/index.html", serviceAreasPage());

// Header for your home page (paste into index.html)
write("snippets/home-header.html", `<!-- STEP 1: In <head>, right after your css/style.css line, add: -->
<link rel="stylesheet" href="/css/nav.css">

<!-- STEP 2: Replace your whole <header class="site-header"> ... </header> with: -->
${header()}
<!-- STEP 3: Right after <script src="js/script.js"></script> at the bottom, add: -->
<script src="/js/nav.js"></script>
`);

const urls = ["/", "/about", "/contractors", "/service-areas", ...trades.map((t) => "/" + t.slug)];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${DOMAIN}${u}</loc></url>`).join("\n")}
</urlset>
`);
console.log(`Done: ${trades.length} trade pages + about + contractors + service areas.`);
