export type Passage = {
  id: string;
  title: string;
  subtitle: string;
  text: string;
};

export const passages: Passage[] = [
  {
    id: "city-breathe",
    title: "The City That Learned to Breathe",
    subtitle:
      "How a heat-weary neighborhood redesigned itself around shade, memory, and trust",
    text: `In the hottest week of the year, the East District felt like a sealed room. Residents blamed the concrete, the traffic, and the thin strips of asphalt that used to be gardens. Years ago, a small community group counted the street trees and discovered the number had dropped by almost half. The city replaced a few trees each winter, but it felt cosmetic, like painting a cracked wall. When a local nurse compared the emergency room log to temperature data, the pattern was obvious: the hottest blocks sent the most patients, especially older adults.

The group pushed the city for a pilot project. The first proposal looked simple: plant more trees. But a landscape architect on the team urged them to look at why trees failed. They examined old maps, talked to residents, and learned that storm drains carried away soil so quickly that roots never had time to settle. They also learned that many families worked long shifts and could not water new saplings. The project shifted from a tree count to a system: shade structures at bus stops, water-harvesting planters, and a volunteer network to water the most fragile blocks.

To make the plan real, they needed trust. The city offered grants, but residents had been promised things before. The group created a street-by-street map that showed where heat was most severe and invited neighbors to rank the places that felt unsafe or exhausting to walk. They staged small demonstrations: a single shaded corner, a bench, and a misting pole on the worst intersection. When people felt the temperature drop, they started to believe the larger plan could work. The pilot area was not random; it was designed around how people actually moved through their day.

Two summers later, the East District was still warm, but it was no longer the hottest part of the city. Emergency visits fell, and school attendance improved on high-heat days. The volunteer watering network was still active, but now it was supported by city crews who used the community map to decide where to focus. The project did not eliminate heat, yet it changed how people thought about it. Instead of a problem that arrived each summer like a storm, heat became something the neighborhood could design against. The most important lesson was not the trees. It was the system of shared responsibility that made the trees survive.`
  },
  {
    id: "quiet-river",
    title: "The Quiet River Agreement",
    subtitle: "How a town rebuilt its relationship with a river it once ignored",
    text: `For decades the Graybend River was treated like a boundary line, not a living system. Factories used the water for cooling and discharged warm runoff downstream. Residents grew used to the river looking dull, and they stopped fishing there. The city reported that pollution levels were within legal limits, but those limits were based on short samples taken in winter, when the flow was highest and the water looked cleanest.

The change began with a local science teacher who asked her students to measure the river every week. They recorded temperature, clarity, and insect life. Their data showed a pattern the official reports missed: in late summer, when water was low, the river heated quickly and oxygen dropped. Fish counts fell right after those peaks. The students presented their findings to the city council, not as accusations, but as a story of what they had learned.

At first the factories rejected any changes, arguing they already met the law. The students and their teacher proposed a different goal: a shared seasonal plan that reduced warm discharge during the hottest weeks. The city suggested a pilot agreement, and one factory agreed to test a new cooling loop. In return, the town helped the factory apply for an energy grant to offset costs.

By the second year, insect life returned earlier in the season, and residents began using the riverbank trails again. The agreement did not shut down industry; it aligned the factory schedule with the river's natural limits. The most important result was not a single metric but the shared habit of weekly measurement. The river became a common responsibility instead of a forgotten edge of town.`
  },
  {
    id: "memory-market",
    title: "The Market of Memory",
    subtitle: "A neighborhood finds a way to keep its stories alive without freezing them",
    text: `When the Old Bridge market reopened after renovations, longtime vendors worried it would become a museum. The stalls looked cleaner, but the prices were climbing and younger residents were shopping elsewhere. The city promised the redesign would protect local history, yet many people felt that history was being packaged, not lived.

Rather than resist the new rules outright, a group of vendors and librarians formed a working group. They interviewed elders about recipes, migration routes, and songs that had shaped the market. Instead of placing the stories behind glass, they printed short story cards and attached them to everyday items: a spice jar, a woven basket, a wooden spoon. Visitors could take a card, cook a recipe, and return with their own notes.

The group also created a rotating stall called the Living Shelf. Each week a different family brought objects that told a story of arrival or change. Some objects were ordinary, but the stories were not. A jar of soil from a home village sat next to a map drawn by a teenager who had never seen that village. The stall was not a tribute to the past; it was a bridge between the past and the present.

After six months, foot traffic increased and more local residents returned. The market felt less like a display and more like a conversation. The working group did not stop the city from modernizing the space, but it changed how people used it. Memory, they realized, survives when it is shared in daily life, not when it is locked away.`
  },
  {
    id: "night-bus-ledger",
    title: "The Night Bus Ledger",
    subtitle: "A late route becomes safer when riders and drivers track the details",
    text: `The last bus of the night used to feel like a rumor in Westbridge. Riders waited in empty stops, headlights flashed by without stopping, and the route was always the first to be cut when budgets tightened. The transit agency assumed demand was low, but many people working late shifts relied on it. They just did not always show up in the official counts.

One driver began a simple ledger. She noted how many people boarded after 10 p.m., which stops they used, and why they said they waited so long. The notes showed patterns: riders clustered around two hospitals, a warehouse district, and a small line of late-night restaurants. The ledger also recorded where people felt unsafe, especially at stops without lights or benches.

Instead of asking for a bigger budget, the driver and a local advocacy group brought the ledger to a community meeting. They proposed small changes: improve lighting at four stops, shift the route by two blocks to serve the hospital entrance, and add a visible "last bus" sign so people knew it was coming. Volunteers agreed to host a staffed kiosk at the busiest stop twice a week.

Ridership climbed within a month, and the agency used the new data to justify keeping the route. The changes did not make the night bus luxurious, but they made it reliable. The ledger taught a simple lesson: the right information, gathered with care, can reveal a system that already exists but is being ignored.`
  },
  {
    id: "tool-library",
    title: "The Library of Tools",
    subtitle: "A neighborhood learns that shared equipment can be safer than private clutter",
    text: `In Pineward, almost every garage held the same tools: ladders, power drills, and a lawn mower that ran twice a summer. People spent money on equipment they rarely used, and broken tools piled up because no one wanted to pay for repairs. When a local carpenter suggested a shared tool library, the idea sounded risky. Who would be responsible if a tool broke or someone got hurt?

The carpenter partnered with the public library to test a small system. They started with a shelf of hand tools and a simple rule: every borrower attended a 15-minute safety lesson. The library created a sign-out log and assigned volunteers to check the tools after each return. Instead of charging fees, they asked borrowers to contribute a small amount of time, such as labeling or cleaning tools.

At first, the shelf emptied quickly and came back slowly. The volunteers adjusted by sending reminder texts and posting a public calendar of returned items. They also added repair nights, where people learned how to fix tools together. Within three months, the breakage rate dropped, and more people requested specialized tools they could not afford on their own.

The tool library did not eliminate personal ownership, but it reduced waste and raised safety standards. People stopped hoarding damaged equipment and began trusting a shared system. The important shift was not the inventory. It was the habit of maintaining resources together.`
  },
  {
    id: "rooftop-treaty",
    title: "The Rooftop Treaty",
    subtitle: "Tenants turn unused roofs into cooler, calmer spaces",
    text: `The Sunrise Towers complex had three large rooftops that were mostly empty. In summer the top floors overheated, and residents avoided the roof because it felt windy and barren. A group of tenants proposed building shade structures and planting low-maintenance planters. The building manager worried about water access, liability, and who would care for the plants.

The tenants created a simple plan: one roof would become a shared seating area with shade cloth, one would host planters with drought-tolerant herbs, and one would remain clear for maintenance access. They asked a local architect to review the design and helped the manager apply for a small energy rebate based on reduced cooling costs.

To keep the plan from becoming a burden, the tenants wrote a schedule for weekly checks and paired each task with a small reward, like a free community meal. The manager agreed to a three-month pilot if the group tracked temperatures and documented how many residents used the space. They posted a logbook by the stairwell so anyone could leave a note about the roof.

By the end of the pilot, the roof level was cooler, and the logbook showed steady use. The manager approved permanent shade structures, and the tenants kept the plant care rotation. The treaty did not solve every building problem, but it showed that shared space works best when responsibility is shared too.`
  },
  {
    id: "repair-festival",
    title: "The Repair Festival",
    subtitle: "A weekend event becomes a year-round habit of fixing, not tossing",
    text: `When the town landfill expanded, the council asked residents to reduce waste. The request sounded vague, and most people did not know where to begin. A community organizer proposed a repair festival: a weekend where volunteers would help fix broken items for free. The idea seemed small compared to the landfill problem, but it offered a clear starting point.

The first festival brought in toasters, bicycles, lamps, and torn jackets. Volunteers repaired what they could and wrote down what they could not. The notes showed a pattern: many items failed in the same way, often because of a small missing part or a simple wiring issue. The organizer turned those notes into a list of mini-workshops for the next month.

Local shops joined in by donating spare parts and space. High school students earned service hours by learning basic repairs and teaching neighbors. The event shifted from a single weekend to a repeating cycle: fix what you can, record what you cannot, then teach the missing skills.

Trash volume dropped slightly, but the bigger change was cultural. People began asking "Can this be fixed?" before buying new. The festival did not end waste, but it built a shared habit of repair and learning.`
  },
  {
    id: "clinic-map",
    title: "The Clinic Access Map",
    subtitle: "A health clinic learns why patients miss appointments",
    text: `The Southside clinic noticed a pattern: appointment no-shows were highest on Tuesdays and Thursdays. Staff assumed patients were simply forgetting, so they added reminder calls. The problem barely improved. A nurse suggested that the clinic map the journey instead of the schedule.

Volunteers asked patients how they traveled to the clinic and what made the trip hard. Many relied on a bus that ran late, and some had to cross a busy street without a safe crossing. The map showed clusters of missed appointments around two specific routes. The clinic shared the map with the transit agency and city traffic team.

The clinic also adjusted its own process. It added a short window of walk-in slots on the busiest days and opened a small mobile table in a community center once a week. These changes were modest, but they met patients where they already were.

Missed appointments fell, and patients reported less stress. The clinic learned that the problem was not reminders alone. It was the gap between the schedule and the real journey.`
  },
  {
    id: "neighborhood-kitchen",
    title: "The Neighborhood Kitchen Shift",
    subtitle: "Shared cooking space works when the schedule does",
    text: `A group of home-based cooks rented a shared kitchen to expand their small food businesses. The kitchen was affordable, but it quickly became chaotic. People arrived early to claim appliances, recipes overlapped in the same oven, and clean-up time stretched into the next shift. Tension grew, and several cooks considered leaving.

The group held a meeting and listed the biggest pain points: unclear prep time, uneven access to key equipment, and inconsistent cleaning. They created a new schedule that separated prep, cooking, and cleaning into shorter blocks. They also built a shared inventory list and a simple rule for reserving high-demand tools.

To make the system fair, each cook earned points by helping with end-of-day cleaning or mentoring a new member. Those points could be traded for preferred time slots. The system did not require strict enforcement; it relied on visibility. The schedule and inventory were posted where everyone could see them.

Within a month, conflict dropped and output increased. The kitchen became more than a rented room. It became a small cooperative where structure supported creativity.`
  },
  {
    id: "sound-plan",
    title: "The Sidewalk Sound Plan",
    subtitle: "A noisy street quiets down without shutting down business",
    text: `On Harbor Street, deliveries arrived all day. Metal carts rattled across pavement, engines idled, and residents above the shops slept poorly. Shop owners argued that strict noise rules would hurt business, while residents felt ignored. The city asked both sides to propose a solution together.

A small team measured sound levels at different hours and locations. The data showed that most noise spikes happened during a two-hour window in the morning and around one loading zone that was too narrow. Instead of banning deliveries, the team proposed a quiet window: deliveries could happen, but drivers would use soft-wheeled carts and avoid idling during those hours. The city repainted the loading zone to make it easier to park without blocking traffic.

Shop owners agreed to test the plan for four weeks. Residents agreed to report noise levels using a simple phone form. The results showed fewer spikes, and delivery times barely changed. The city then installed a small sign reminding drivers about the quiet window.

The plan did not eliminate noise, but it reduced the most disruptive moments. By focusing on the real causes instead of blanket rules, the street found a balance between commerce and rest.`
  }
];

export const defaultPassage = passages[0];
