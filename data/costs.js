// ------------------------------------------------------------------
// "What does it cost?" ranges shown on each trade page.
//
// EDIT THIS FILE to update prices. Update once a year, and change
// COST_YEAR below so the pages say how current the numbers are.
//
// Each trade (matched by its slug in data/trades.js) has:
//   items   = rows in the table: ["Job", "Typical range"]
//   factors = one sentence on what moves the price up or down
//   topic   = optional; fills in "What does ___ cost in South Jersey?"
//             when the trade name alone reads awkwardly
//
// A trade with no entry here simply shows no cost section.
//
// Sources for the starting numbers (2026): New Jersey cost data from
// Fixr (roofing), HVACProjectCost (HVAC), HomeServe (water heaters),
// SolarReviews (solar), and 2026 national cost guides (HomeGuide,
// Fixr, Inch Calculator) adjusted up for South Jersey labor costs.
// Check them against what the contractors in your network charge.
// ------------------------------------------------------------------
const COST_YEAR = 2026;

const COSTS = {
  roofing: {
    items: [
      ["Full roof replacement (asphalt shingles, average home)", "$9,000 – $18,000"],
      ["Roof leak repair", "$350 – $1,500"],
      ["Storm or wind damage repair", "$500 – $3,000"],
      ["Flat roof replacement (porch, garage, or addition)", "$3,000 – $9,000"],
      ["Flashing and chimney resealing", "$300 – $1,200"],
      ["Roof inspection", "$250 – $600"]
    ],
    factors: "Roof size and pitch, the material you choose, how many old layers have to come off, and whether any decking needs replacing."
  },
  hvac: {
    topic: "HVAC work",
    items: [
      ["Central AC replacement", "$4,500 – $10,000"],
      ["Gas furnace replacement", "$3,500 – $8,500"],
      ["Full system (AC and furnace)", "$8,500 – $17,000"],
      ["Heat pump installation", "$6,500 – $15,000"],
      ["Ductless mini-split (single zone)", "$3,000 – $9,000"],
      ["AC or furnace repair", "$200 – $1,200"],
      ["Seasonal tune-up", "$100 – $250"]
    ],
    factors: "System size and efficiency rating, the brand, and whether ductwork needs repair or replacement. Utility rebates can lower the cost of heat pumps and high-efficiency systems."
  },
  plumbing: {
    items: [
      ["Water heater replacement (tank)", "$1,500 – $3,000"],
      ["Tankless water heater installation", "$3,000 – $6,000"],
      ["Leak repair", "$200 – $800"],
      ["Drain cleaning", "$150 – $500"],
      ["Toilet replacement", "$400 – $900"],
      ["Sump pump installation", "$600 – $2,500"],
      ["Whole-house repiping", "$6,000 – $16,000"]
    ],
    factors: "How easy the pipes are to reach, the fixtures or equipment you choose, permit requirements, and whether it's an after-hours emergency call."
  },
  fencing: {
    topic: "a new fence",
    items: [
      ["Vinyl privacy fence (6 ft)", "$35 – $60 per linear foot"],
      ["Wood privacy fence (6 ft)", "$20 – $45 per linear foot"],
      ["Aluminum fence", "$30 – $60 per linear foot"],
      ["Chain link fence", "$12 – $30 per linear foot"],
      ["Gate (walk-through)", "$400 – $2,000"],
      ["Fence repair", "$250 – $1,000"]
    ],
    factors: "Total length (a typical backyard is 120 to 200 feet), height, material, the number of gates, rocky or sloped ground, and pool fence code requirements."
  },
  electrical: {
    topic: "electrical work",
    items: [
      ["Panel upgrade to 200 amps", "$2,500 – $5,000"],
      ["Add or replace an outlet or switch", "$150 – $400 each"],
      ["Light fixture or ceiling fan installation", "$150 – $600"],
      ["Recessed lighting", "$200 – $400 per light"],
      ["Level 2 EV charger installation", "$1,200 – $2,800"],
      ["Whole-home standby generator", "$10,000 – $20,000"],
      ["Troubleshooting service call", "$150 – $350"]
    ],
    factors: "The age of your home's wiring, how far new wire has to run, the panel's location, and permit and inspection requirements."
  },
  restoration: {
    topic: "restoration work",
    items: [
      ["Water damage cleanup (one room or small area)", "$1,500 – $5,000"],
      ["Basement flood cleanup", "$3,000 – $12,000"],
      ["Storm damage repairs", "$1,000 – $10,000+"],
      ["Fire and smoke damage cleanup", "$3,000 – $25,000+"],
      ["Rebuild after cleanup (drywall, flooring, finishes)", "$2,000 – $20,000+"]
    ],
    factors: "How much area is affected, how long the water sat, whether the water was clean or contaminated, and how much has to be rebuilt. Homeowners insurance often covers sudden damage, so call your insurer early."
  },
  masonry: {
    topic: "masonry work",
    items: [
      ["Front step repair", "$500 – $2,500"],
      ["Front step rebuild", "$2,500 – $8,000"],
      ["Paver patio", "$15 – $35 per sq ft"],
      ["Chimney repair (repointing or new crown)", "$800 – $4,000"],
      ["Retaining wall", "$3,000 – $15,000"],
      ["Concrete driveway", "$8 – $18 per sq ft"],
      ["Brick and stone repair", "$400 – $2,500"]
    ],
    factors: "Size, the material (concrete, pavers, brick, or stone), how much old material has to be removed, access for equipment, and drainage needs."
  },
  "lawn-care": {
    items: [
      ["Mowing (average lot)", "$45 – $90 per visit"],
      ["Spring or fall cleanup", "$300 – $800"],
      ["Mulch, installed", "$400 – $1,200"],
      ["Seeding or overseeding", "$500 – $1,800"],
      ["Fertilizing and weed control program", "$300 – $700 per year"],
      ["Shrub trimming", "$150 – $600"]
    ],
    factors: "Lot size, how overgrown things are, how often you want service, and whether you sign up for a full-season plan."
  },
  "tree-removal": {
    items: [
      ["Small tree removal (under 30 ft)", "$300 – $700"],
      ["Medium tree removal (30 to 60 ft)", "$700 – $1,800"],
      ["Large tree removal (over 60 ft)", "$1,500 – $3,500+"],
      ["Emergency removal after a storm", "Often 2 to 3 times the normal rate"],
      ["Tree trimming", "$400 – $1,200 per tree"],
      ["Stump grinding", "$150 – $500 per stump"]
    ],
    factors: "Tree height and trunk width, how close it is to the house or power lines, whether a crane is needed, and whether you want the wood hauled away."
  },
  gutters: {
    topic: "gutter work",
    items: [
      ["Seamless aluminum gutters (average home)", "$1,800 – $4,500"],
      ["Gutter repair", "$150 – $600"],
      ["Gutter guards (whole house)", "$1,000 – $3,500"],
      ["Gutter cleaning", "$150 – $350"],
      ["Downspout extensions and drainage", "$100 – $1,500"]
    ],
    factors: "The length of gutter, how many stories, the number of corners and downspouts, and the material."
  },
  siding: {
    topic: "new siding",
    items: [
      ["Vinyl siding replacement (average home)", "$12,000 – $25,000"],
      ["Fiber cement siding replacement (average home)", "$18,000 – $35,000"],
      ["Siding repair", "$300 – $1,500"],
      ["Soffit and fascia replacement", "$1,500 – $6,000"],
      ["Stone veneer", "$25 – $50 per sq ft"]
    ],
    factors: "The size and height of the house, the material, removing the old siding, and repairs to the sheathing underneath."
  },
  painting: {
    items: [
      ["One interior room (walls)", "$400 – $1,000"],
      ["Whole-home interior", "$5,000 – $12,000"],
      ["Exterior house painting", "$4,500 – $12,000"],
      ["Kitchen cabinet painting", "$3,500 – $8,000"],
      ["Deck staining", "$600 – $1,800"],
      ["Drywall patch and paint", "$200 – $600"]
    ],
    factors: "Square footage, ceiling height, how much prep and repair the surfaces need, the number of colors, and the paint quality."
  },
  "cleaning-services": {
    topic: "house cleaning",
    items: [
      ["Standard house cleaning", "$140 – $250 per visit"],
      ["Deep cleaning", "$300 – $600"],
      ["Move-in or move-out cleaning", "$350 – $700"],
      ["Post-construction cleanup", "$500 – $1,500"],
      ["Window cleaning", "$200 – $500"]
    ],
    factors: "Home size, how often you book (recurring service usually costs less per visit), pets, and how much cleaning is needed."
  },
  solar: {
    topic: "solar",
    items: [
      ["Typical home system (7 to 8 kW)", "$22,000 – $28,000 before incentives"],
      ["Cost per watt installed", "$2.90 – $3.50"],
      ["Battery storage", "$10,000 – $20,000"],
      ["Panel removal and reinstall (for a roof replacement)", "$2,500 – $6,000"],
      ["Solar system repair", "$300 – $1,500"]
    ],
    factors: "System size, your roof's shape and direction, panel and inverter brands, and the incentives available when you buy. Ask your installer which tax credits and programs currently apply."
  },
  "basement-waterproofing": {
    items: [
      ["Interior drainage system (French drain)", "$40 – $120 per linear foot"],
      ["Sump pump installation", "$600 – $2,500"],
      ["Wall sealing", "$500 – $3,000"],
      ["Exterior waterproofing (excavation)", "$10,000 – $30,000+"],
      ["Crawl space encapsulation", "$5,000 – $15,000"],
      ["Dehumidifier installation", "$1,000 – $2,800"]
    ],
    factors: "The size of the basement, where the water is coming in, the method (interior drainage costs much less than digging outside), and whether there's existing damage."
  },
  "foundation-repair": {
    items: [
      ["Foundation crack repair", "$250 – $1,000 per crack"],
      ["Settling or sinking repair (piers)", "$8,000 – $25,000"],
      ["Bowing wall bracing or anchors", "$4,000 – $15,000"],
      ["Structural engineer inspection", "$400 – $1,000"],
      ["Concrete slab repair or leveling", "$800 – $3,000"]
    ],
    factors: "How serious the movement is, the number of piers or anchors needed, soil conditions, and access around the house."
  },
  "mold-remediation": {
    items: [
      ["Mold inspection and testing", "$300 – $800"],
      ["Small area removal", "$500 – $2,500"],
      ["Attic mold remediation", "$2,000 – $6,000"],
      ["Basement or crawl space remediation", "$2,000 – $7,000"],
      ["Large or whole-home remediation", "$10,000 – $30,000"]
    ],
    factors: "The size of the affected area, the materials involved, containment needs, and fixing the moisture problem that caused it."
  },
  "windows-doors": {
    topic: "window and door replacement",
    items: [
      ["Window replacement", "$500 – $1,500 per window"],
      ["Whole-house windows (10 to 15)", "$6,000 – $22,000"],
      ["Entry door replacement", "$1,500 – $5,000"],
      ["Sliding patio door", "$2,000 – $5,500"],
      ["Storm door", "$350 – $900"],
      ["Window or door repair", "$150 – $600"]
    ],
    factors: "Size, style, frame material, glass options, and whether the frame or the opening needs repair."
  },
  handyman: {
    topic: "a handyman",
    items: [
      ["Hourly rate", "$65 – $125 per hour"],
      ["Half-day punch list", "$250 – $600"],
      ["TV mounting", "$150 – $350"],
      ["Small drywall patch", "$150 – $400"],
      ["Re-caulking a tub or shower", "$150 – $350"],
      ["Door adjustment or repair", "$100 – $350"]
    ],
    factors: "How many tasks you have, the materials needed, and the minimum charge. Grouping several small jobs into one visit usually saves money."
  },
  "general-contractor": {
    topic: "a general contractor",
    items: [
      ["Kitchen remodel (mid-range)", "$35,000 – $80,000"],
      ["Full bathroom remodel", "$15,000 – $35,000"],
      ["Home addition", "$200 – $450 per sq ft"],
      ["Basement finishing", "$30,000 – $75,000"],
      ["Removing a non-load-bearing wall", "$1,000 – $3,500"],
      ["Removing a load-bearing wall", "$5,000 – $15,000"]
    ],
    factors: "Project size, finish level, layout changes, permits, and how many trades are involved."
  },
  "pressure-washing": {
    items: [
      ["House washing", "$350 – $800"],
      ["Driveway cleaning", "$150 – $400"],
      ["Deck or patio cleaning", "$250 – $600"],
      ["Fence cleaning", "$200 – $600"],
      ["Roof soft washing", "$400 – $1,000"]
    ],
    factors: "Square footage, how dirty or stained the surface is, the height of the house, and whether you bundle several surfaces."
  },
  flooring: {
    items: [
      ["Hardwood installation", "$10 – $20 per sq ft"],
      ["Hardwood refinishing", "$4 – $8 per sq ft"],
      ["Luxury vinyl or laminate installation", "$5 – $11 per sq ft"],
      ["Tile installation", "$12 – $25 per sq ft"],
      ["Carpet installation", "$4 – $9 per sq ft"],
      ["Floor repair", "$250 – $1,000"]
    ],
    factors: "Square footage, the material, removing the old floor, subfloor repairs, and the layout (stairs and small rooms cost more per foot)."
  },
  drywall: {
    topic: "drywall work",
    items: [
      ["Small hole or crack repair", "$150 – $400"],
      ["Water-damaged section replacement", "$400 – $1,500"],
      ["New drywall, hung and finished", "$3 – $5 per sq ft"],
      ["Ceiling repair", "$300 – $1,200"],
      ["Texture matching", "$200 – $600"]
    ],
    factors: "The size of the damage, ceiling versus wall, texture matching, and whether painting is included."
  },
  carpentry: {
    items: [
      ["Baseboard or trim installation", "$6 – $15 per linear foot"],
      ["Crown molding", "$10 – $25 per linear foot"],
      ["Custom built-ins", "$2,500 – $10,000"],
      ["Interior door installation", "$300 – $700 per door"],
      ["Deck building", "$30 – $70 per sq ft"],
      ["Wood rot repair", "$300 – $2,000"]
    ],
    factors: "The wood and materials, how detailed the work is, the size of the project, and the condition of what's already there."
  }
};

module.exports = { COST_YEAR, COSTS };
