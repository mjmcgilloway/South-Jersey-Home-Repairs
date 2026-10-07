// ------------------------------------------------------------------
// EDIT THIS FILE to add, remove, or change trade pages.
//   slug  = web address (southjerseyhomerepairs.com/<slug>)
//   value = MUST match the button text in your home page form and the
//           <option> in your contractor form EXACTLY. This is what
//           gets saved to Airtable.
//   name  = how the trade is written on the page and in the menu
//   pro   = what you call the person who does it ("roofer", "plumber")
//   intro = the sentence under the page heading
//   jobs  = the cards on the page: ["Title", "One line about it"]
//
// Optional:
//   noun  = how the trade reads mid-sentence, if lowercasing the name
//           sounds wrong ("handyman" instead of "handyman services")
//   cred  = replaces "a licensed" on that page ("a registered, insured")
//   scope = an extra "what's included" section with two lists
//
// TO ADD A TRADE: copy one block below, paste it at the end of the list
// (before the closing "];"), and change the text. That's the only file
// you need to edit. The menu, both forms, the footer, the trade's page,
// and sitemap.xml all update themselves on the next deploy.
//
// After editing, commit to GitHub. Netlify runs "node build.js".
// ------------------------------------------------------------------
module.exports = [
  { slug: "roofing", value: "Roofing", name: "Roofing", pro: "roofer",
    intro: "Leaks, storm damage, or a roof that's simply worn out. Tell us what's going on and we'll match you with a licensed South Jersey roofer.",
    jobs: [["Roof replacement","Tear-off and new shingles when a roof has reached the end of its life."],["Leak repair","Finding and sealing the source before it spreads."],["Storm and wind damage","Missing shingles, lifted flashing, and damage after a storm."],["Flat roofs","Rubber and TPO roofs on porches, additions, and garages."],["Flashing and chimney sealing","Re-sealing around chimneys, vents, and skylights."],["Roof inspections","A condition check before buying, selling, or filing a claim."]] },
  { slug: "hvac", value: "HVAC", name: "HVAC", noun: "HVAC", pro: "HVAC contractor",
    intro: "No heat, no AC, or a system that's ready to be replaced. We'll match you with a licensed HVAC pro who services your area.",
    jobs: [["AC repair","Not cooling, frozen lines, or a unit that won't turn on."],["Furnace and boiler repair","No heat, short cycling, or strange noises."],["New system installs","Replacing an aging furnace, AC, or heat pump."],["Ductless mini-splits","Heating and cooling for additions, garages, and attics."],["Seasonal tune-ups","Spring and fall maintenance to prevent breakdowns."],["Ductwork and thermostats","Leaky ducts, smart thermostats, and airflow problems."]] },
  { slug: "plumbing", value: "Plumbing", name: "Plumbing", pro: "plumber",
    intro: "From a dripping faucet to a burst pipe, we'll match you with a licensed local plumber.",
    jobs: [["Leak repair","Leaking pipes, fittings, and under-sink connections."],["Water heaters","Repairs and replacements, tank and tankless."],["Clogged drains and sewer lines","Slow or backed-up drains, snaking, and camera inspection."],["Toilets and fixtures","Running toilets, faucets, sinks, and showers."],["Sump pumps","New installs, repairs, and battery backups."],["Repiping and gas lines","Replacing old pipes and running gas lines for appliances."]] },
  { slug: "fencing", value: "Fencing", name: "Fencing", pro: "fence contractor",
    intro: "A new privacy fence, a pool fence, or repairs to the one you have. We'll match you with a local fence pro.",
    jobs: [["New fence installs","Vinyl, wood, aluminum, and chain link."],["Privacy fences","Full-height fencing for backyards."],["Pool fences","Code-compliant fencing and self-closing gates."],["Fence repair","Leaning posts, broken panels, and storm damage."],["Gates","New gates, gate repair, and hardware."],["Fence staining and sealing","Protecting wood fences from weather."]] },
  { slug: "electrical", value: "Electrical", name: "Electrical", pro: "electrician",
    intro: "Panel upgrades, new circuits, or outlets that stopped working. We'll match you with a licensed South Jersey electrician.",
    jobs: [["Panel upgrades","Upgrading to 200 amps or replacing an outdated panel."],["Outlets and switches","Dead outlets, tripping GFCIs, and adding new ones."],["Lighting and ceiling fans","Recessed lights, fixtures, fans, and outdoor lighting."],["EV chargers","Level 2 home charging for electric vehicles."],["Generators","Standby generators and transfer switches."],["Troubleshooting","Flickering lights, tripping breakers, or burning smells."]] },
  { slug: "restoration", value: "Restoration", name: "Restoration", pro: "restoration company",
    intro: "Water damage, storm damage, or repairs after a flood. We'll match you with a restoration pro who can respond in your area.",
    jobs: [["Water damage cleanup","Drying, extraction, and removing damaged materials."],["Storm damage","Repairs after wind, fallen trees, or heavy rain."],["Flood cleanup","Basements and living spaces after flooding."],["Fire and smoke damage","Cleanup and rebuilding after a fire."],["Insurance claim support","Documenting damage and working with your insurer."],["Rebuild and repairs","Drywall, flooring, and finishes after cleanup."]] },
  { slug: "masonry", value: "Masonry", name: "Masonry", pro: "mason",
    intro: "Steps, patios, chimneys, and walls. We'll match you with a local masonry contractor.",
    jobs: [["Steps and stoops","Repairing or rebuilding front and back steps."],["Paver patios and walkways","Brick and paver hardscaping."],["Chimney repair","Repointing, crowns, and rebuilding."],["Retaining walls","Block and stone walls for grading and gardens."],["Concrete work","Driveways, walkways, and slabs."],["Brick and stone repair","Cracked mortar, loose bricks, and repointing."]] },
  { slug: "lawn-care", value: "Lawncare", name: "Lawn Care", pro: "lawn care company",
    intro: "Weekly mowing, seasonal cleanups, or a lawn that needs some help. We'll match you with a lawn care pro who serves your town.",
    jobs: [["Mowing","Weekly or bi-weekly service."],["Spring and fall cleanups","Leaves, beds, and pruning."],["Mulch and beds","Fresh mulch, edging, and bed maintenance."],["Seeding and sod","New lawns and bare-spot repair."],["Fertilizing and weed control","Seasonal treatments for a healthier lawn."],["Shrub trimming","Shaping and cutting back overgrown shrubs."]] },
  { slug: "tree-removal", value: "Tree Removal", name: "Tree Removal", pro: "tree service",
    intro: "Dead, leaning, or storm-damaged trees. We'll match you with a local tree service.",
    jobs: [["Tree removal","Taking down dead, dying, or unwanted trees."],["Emergency tree removal","Trees down on a house, car, or driveway after a storm."],["Tree trimming","Cutting back limbs over roofs, lines, and driveways."],["Stump grinding","Removing stumps after a tree comes down."],["Hazard assessment","Checking leaning or damaged trees before they fall."],["Lot and brush clearing","Clearing overgrown areas."]] },
  { slug: "gutters", value: "Gutters", name: "Gutters", pro: "gutter contractor",
    intro: "Overflowing, sagging, or missing gutters. We'll match you with a local gutter pro.",
    jobs: [["Seamless gutter installs","New gutters made on-site to fit your home."],["Gutter repair","Sagging sections, leaking seams, and loose hangers."],["Gutter guards","Screens and covers to keep debris out."],["Gutter cleaning","Clearing gutters and downspouts."],["Downspouts and drainage","Moving water away from your foundation."]] },
  { slug: "siding", value: "Siding", name: "Siding", pro: "siding contractor",
    intro: "A few damaged panels or the whole house. We'll match you with a siding contractor near you.",
    jobs: [["Siding replacement","Vinyl, fiber cement, or engineered wood."],["Siding repair","Cracked, loose, or storm-damaged panels."],["Trim wrap","Aluminum or PVC wrap on windows, doors, and fascia."],["Soffit and fascia","Replacing rotted or damaged roofline trim."],["Stone veneer","Accent walls and foundation facing."]] },
  { slug: "painting", value: "Painting", name: "Painting", pro: "painter",
    intro: "One room or the whole exterior. We'll match you with a painter who works in your part of South Jersey.",
    jobs: [["Interior painting","Walls, ceilings, and trim."],["Exterior painting","Siding, trim, shutters, and doors."],["Cabinet painting","Refinishing kitchen and bathroom cabinets."],["Deck and fence staining","Cleaning, sealing, and staining wood."],["Drywall patch and paint","Repairing holes and cracks before painting."]] },
  { slug: "cleaning-services", value: "Cleaning Services", name: "Cleaning Services", pro: "cleaning service",
    intro: "Regular cleanings, deep cleans, or getting a home ready to sell. We'll match you with a local cleaning service.",
    jobs: [["Recurring house cleaning","Weekly, bi-weekly, or monthly service."],["Deep cleaning","A top-to-bottom clean."],["Move-in and move-out cleaning","Getting a home ready for new owners or tenants."],["Post-construction cleanup","Dust and debris after a renovation."],["Power washing","Siding, driveways, decks, and patios."],["Window cleaning","Inside and out."]] },
  { slug: "solar", value: "Solar", name: "Solar", pro: "solar installer",
    intro: "Thinking about solar or need service on a system you have. We'll match you with a South Jersey solar installer.",
    jobs: [["Solar panel installation","New rooftop or ground-mounted systems."],["Solar consultation","Finding out if your roof and usage are a good fit."],["Battery storage","Backup power paired with solar."],["Panel removal and reinstall","When your roof needs to be replaced."],["Solar repair and maintenance","Systems that stopped producing or need service."]] },
  { slug: "basement-waterproofing", value: "Basement Waterproofing", name: "Basement Waterproofing", pro: "waterproofing contractor",
    intro: "Water in the basement, damp walls, or a musty smell. We'll match you with a local waterproofing contractor.",
    jobs: [["Interior drainage systems","French drains and channels that move water to a sump."],["Sump pump systems","New pumps, replacements, and battery backups."],["Wall sealing","Sealing damp or seeping basement walls."],["Exterior waterproofing","Excavation and membranes outside the foundation."],["Crawl space encapsulation","Vapor barriers and moisture control."],["Dehumidifiers","Keeping basements dry year-round."]] },
  { slug: "foundation-repair", value: "Foundation Issues", name: "Foundation Repair", pro: "foundation contractor",
    intro: "Cracks, sinking, or doors that suddenly stick. We'll match you with a foundation contractor who can take a look.",
    jobs: [["Foundation crack repair","Sealing and stabilizing cracks in walls and floors."],["Settling and sinking","Piers and underpinning for a foundation that's moved."],["Bowing walls","Bracing or anchoring basement walls."],["Foundation inspections","Finding out how serious a problem is."],["Slab repair","Cracked or uneven concrete slabs."]] },
  { slug: "mold-remediation", value: "Mold", name: "Mold Remediation", pro: "mold remediation company",
    intro: "Visible mold, a musty smell, or moisture problems. We'll match you with a mold remediation pro near you.",
    jobs: [["Mold inspection and testing","Finding out what's there and how far it's spread."],["Mold removal","Containment and safe removal."],["Attic mold","Treating mold on roof sheathing and rafters."],["Basement and crawl space mold","Removal plus moisture control."],["Post-flood mold prevention","Treating areas after water damage."]] },
  { slug: "windows-doors", value: "Windows / Doors", name: "Windows & Doors", pro: "window and door installer",
    intro: "Drafty windows, a sticking front door, or a new slider for the back. We'll match you with an installer who does that work.",
    jobs: [["Window replacement","Single rooms or the whole house."],["Entry doors","Front and side doors, including frames."],["Sliding and patio doors","New sliders and French doors."],["Storm doors and windows","Added protection and efficiency."],["Window and door repair","Broken glass, failed seals, and hardware."]] },
  { slug: "handyman", value: "Handyman Services", name: "Handyman Services", noun: "handyman", pro: "handyman", cred: "a registered, insured",
    intro: "A list of small repairs and no time to get to them. We'll match you with a registered, insured South Jersey handyman for the jobs that are too small for a full crew.",
    jobs: [["Small repairs and punch lists","The list of little fixes around the house, knocked out in one visit."],["Doors, trim, and hardware","Sticking doors, loose trim, cabinet hardware, and weatherstripping."],["Drywall patches","Small holes, cracks, and nail pops, patched and ready for paint."],["Mounting and assembly","TVs, shelves, blinds, grab bars, and furniture."],["Caulking and sealing","Tubs, showers, windows, and trim."],["Minor exterior fixes","A loose fence board, a soft deck board, or a gate that won't latch."]],
    scope: {
      heading: "What a handyman does, and what needs a different pro",
      intro: "A handyman handles small repairs and odd jobs, usually finished in a few hours to a day or two. New Jersey has no separate handyman license. A handyman works under a state Home Improvement Contractor registration, and that registration does not cover electrical, plumbing, or heating and cooling work.",
      columns: [
        { title: "A good fit for a handyman", items: ["Small repairs and a list of odd jobs", "Drywall patches, trim, doors, and hardware", "Caulking, weatherstripping, and touch-up painting", "Mounting TVs, shelves, blinds, and grab bars", "Minor fence, gate, and deck board repairs", "Jobs that take a few hours to a day or two"] },
        { title: "Needs a different pro", items: ["Wiring, panels, and new circuits: an electrician", "Water lines, drains, and gas piping: a plumber", "Furnaces, AC, and ductwork: an HVAC contractor", "Remodels, additions, and structural changes: a general contractor", "Work that needs a permit and inspections", "Projects that take several trades to finish"] }
      ],
      noteHtml: "Not sure which one you need? Describe the job in the form above and we'll route it to the right pro. For bigger projects, see <a href=\"/general-contractor\">General Contractor</a>. For licensed trade work, see <a href=\"/electrical\">Electrical</a>, <a href=\"/plumbing\">Plumbing</a>, and <a href=\"/hvac\">HVAC</a>."
    } },
  { slug: "general-contractor", value: "General Contractor", name: "General Contractor", noun: "general contracting", pro: "general contractor",
    intro: "Remodels, additions, and projects that take more than one trade. We'll match you with a licensed South Jersey general contractor who runs the whole job from start to finish.",
    jobs: [["Kitchen remodels","New layouts, cabinets, counters, and everything behind the walls."],["Bathroom remodels","Full gut-and-rebuild jobs, including tile, fixtures, and ventilation."],["Additions and bump-outs","Adding square footage, from a sunroom to a second story."],["Basement finishing","Framing, wiring, flooring, and finishes that turn unused space into living space."],["Whole-home renovations","Multi-room projects and updating an older house."],["Structural and permit work","Removing walls, reframing, and jobs that need permits and inspections."]],
    scope: {
      heading: "General contractor or handyman?",
      intro: "The difference is the size of the job. A handyman does small repairs personally. A general contractor manages a whole project: the crew, the licensed trades, the permits, and the schedule. In New Jersey both work under the same state Home Improvement Contractor registration, so what separates them is the work they take on.",
      columns: [
        { title: "Call a handyman for", items: ["Small repairs and odd jobs", "Work finished in a few hours to a day or two", "One person doing the work themselves", "Jobs that usually don't need a permit", "Nothing involving wiring, piping, or HVAC equipment"] },
        { title: "Call a general contractor for", items: ["Remodels, additions, and full renovations", "Projects that run for weeks, not hours", "A crew and a schedule managed for you", "Licensed electricians, plumbers, and HVAC pros brought in as part of the job", "Permits pulled and inspections scheduled", "One point of contact for the whole project"] }
      ],
      noteHtml: "Have a short list of small fixes instead? See <a href=\"/handyman\">Handyman Services</a>. If you're not sure, describe the job in the form above and we'll route it to the right pro."
    } },
  { slug: "pressure-washing", value: "Pressure Washing", name: "Pressure Washing", pro: "pressure washing company", cred: "an insured",
    intro: "Green siding, a stained driveway, or a deck that's gone gray. We'll match you with a local pressure washing pro.",
    jobs: [["House washing","Soft washing for siding, trim, and gutters."],["Driveways and walkways","Concrete, pavers, and asphalt."],["Decks and patios","Cleaning wood, composite, and stone before sealing or staining."],["Fences","Vinyl and wood fences that have turned green or gray."],["Roof soft washing","Low-pressure cleaning for black streaks and moss."],["Pre-sale cleanup","Getting a home's exterior ready to list."]] },
  { slug: "flooring", value: "Flooring", name: "Flooring", pro: "flooring contractor",
    intro: "Worn carpet, scratched hardwood, or a floor you're ready to replace. We'll match you with a local flooring contractor.",
    jobs: [["Hardwood installation","Solid and engineered hardwood."],["Hardwood refinishing","Sanding, staining, and sealing the floors you have."],["Luxury vinyl and laminate","Durable, water-resistant floors for kitchens, basements, and busy rooms."],["Tile floors","Kitchens, bathrooms, and entryways."],["Carpet","New carpet, stairs, and runners."],["Floor repair","Squeaks, damaged boards, and subfloor problems."]] },
  { slug: "drywall", value: "Drywall", name: "Drywall", pro: "drywall contractor",
    intro: "Holes, cracks, water damage, or new walls to hang. We'll match you with a local drywall contractor.",
    jobs: [["Drywall repair","Holes, dents, cracks, and nail pops."],["Water-damaged drywall","Cutting out and replacing stained or sagging sections."],["New drywall installation","Hanging and finishing for remodels, basements, and additions."],["Taping and finishing","Smooth, paint-ready seams and corners."],["Ceiling repair","Cracks, sagging, and damage after a leak."],["Texture matching","Blending a repair into the wall or ceiling around it."]] },
  { slug: "carpentry", value: "Carpentry", name: "Carpentry", pro: "carpenter",
    intro: "Trim, built-ins, framing, or wood that's seen better days. We'll match you with a local carpenter.",
    jobs: [["Trim and molding","Baseboards, crown molding, casings, and wainscoting."],["Custom built-ins","Shelving, mudroom benches, and closet systems."],["Interior doors","Hanging, trimming, and adjusting doors."],["Framing","New walls, openings, and framing repairs."],["Decks and porches","Building, repairing, and replacing boards and railings."],["Wood rot repair","Replacing rotted sills, trim, and exterior wood."]] }
];
