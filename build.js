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
    description: "Get matched with South Jersey homeowners looking for licensed, reliable pros in your trade. Pay for qualified leads.",
    canonical: "/contractors"
  }) + header("contractors") + `
<section class="hero sjn-page-hero">
  <div class="container">
    <div class="hero-copy">
      <h1>Get matched with homeowners who need your trade</h1>
      <p class="hero-sub">South Jersey homeowners come to us when something needs fixing. We send each request to a licensed contractor in our network who does that kind of work in that area.</p>
      <a href="#apply" class="hero-contractor-link">Apply to join our network →</a>
    </div>
  </div>
</section>

<section class="section matchmaker">
  <div class="container">
    <h2>How it works</h2>
    <div class="card-grid sjn-steps">
      <div class="card"><h3>1. Apply</h3><p>Tell us your company, your trade, and where you're based.</p></div>
      <div class="card"><h3>2. We review and connect</h3><p>We'll reach out to talk through the jobs you want and the areas you cover.</p></div>
      <div class="card"><h3>3. Get matched</h3><p>When a homeowner needs your trade in your area, we send you their info and job details.</p></div>
      <div class="card"><h3>4. Win the job</h3><p>You contact the homeowner, quote the work, and do it as your own customer.</p></div>
      <div class="card"><h3>5. Pay for qualified leads</h3><p>We invoice you, and you can pay by card or bank transfer.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2>Pricing</h2>
    <div class="card-grid">
      <div class="card"><h3 class="sjn-price">$50</h3><p>per qualified lead for lower-ticket trades</p></div>
      <div class="card"><h3 class="sjn-price">$75</h3><p>per qualified lead for higher-ticket and technical trades</p></div>
      <div class="card"><h3 class="sjn-price">5% to 1%</h3><p>of the job value when you close the job, tiered so bigger jobs pay a lower percentage</p></div>
    </div>
    <p class="sjn-prose">The lead fee you already paid is credited against the closing percentage.</p>
  </div>
</section>

<section class="section faq">
  <div class="container">
    <h2>Questions Contractors Ask Us</h2>
    <div class="accordion">
      <details><summary>What counts as a qualified lead?</summary><p><mark>[EDIT: e.g. A real homeowner in your service area, asking for work in your trade, with a working phone number or email.]</mark></p></details>
      <details><summary>Are leads shared with other contractors?</summary><p><mark>[EDIT: Exclusive, or shared with up to X contractors?]</mark></p></details>
      <details><summary>How do I receive leads?</summary><p><mark>[EDIT: Text, email, or both, and how fast.]</mark></p></details>
      <details><summary>What if a lead is bad?</summary><p><mark>[EDIT: e.g. If it's a duplicate, out of your area, or can't be reached, tell us and you won't be charged.]</mark></p></details>
      <details><summary>Can I limit how many leads I get?</summary><p><mark>[EDIT]</mark></p></details>
      <details><summary>Is there a contract or sign-up fee?</summary><p><mark>[EDIT]</mark></p></details>
    </div>
  </div>
</section>

<section class="section contractors" id="apply">
  <div class="container">
    <h2>Apply to join our network</h2>
    <p class="section-sub">We'll be in touch after reviewing your application.</p>

    ${contractorForm()}
  </div>
</section>

<!-- Hidden copy of the homeowner form. Your js/script.js expects both forms
     on every page; this keeps it from erroring here. Safe to leave as is. -->
<div hidden aria-hidden="true">
  ${leadForm()}
</div>

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

// Header for your home page (paste into index.html)
write("snippets/home-header.html", `<!-- STEP 1: In <head>, right after your css/style.css line, add: -->
<link rel="stylesheet" href="/css/nav.css">

<!-- STEP 2: Replace your whole <header class="site-header"> ... </header> with: -->
${header()}
<!-- STEP 3: Right after <script src="js/script.js"></script> at the bottom, add: -->
<script src="/js/nav.js"></script>
`);

const urls = ["/", "/about", "/contractors", ...trades.map((t) => "/" + t.slug)];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${DOMAIN}${u}</loc></url>`).join("\n")}
</urlset>
`);
console.log(`Done: ${trades.length} trade pages + about + contractors.`);
