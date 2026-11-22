import { StageMeta, CandidatePoolItem, GameCase, StageId } from './types';

export const STAGES: StageMeta[] = [
  {
    id: 0,
    key: 'lead',
    title: 'LEADS',
    name: { en: 'Leads', te: 'లీడ్స్' },
    color: '#1E3A6B',
    glow: 'rgba(30, 58, 107, 0.25)',
    desc: {
      en: 'Inflow of interested buyer prospects into your sales pipeline.',
      te: 'మీ సేల్స్ పైప్‌లైన్‌లోకి వచ్చే ఆసక్తిగల కొనుగోలుదారులు.'
    }
  },
  {
    id: 1,
    key: 'follow',
    title: 'FOLLOWUP',
    name: { en: 'Followup', te: 'ఫాలోఅప్' },
    color: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.25)',
    desc: {
      en: 'Speed to lead and nurturing prospects before interest cools.',
      te: 'లీడ్ వచ్చిన వెంటనే వేగంగా సంప్రదించడం, ఆసక్తి కాపాడటం.'
    }
  },
  {
    id: 2,
    key: 'visit',
    title: 'SITE VISITS',
    name: { en: 'Site Visits', te: 'సైట్ విజిట్లు' },
    color: '#0F766E',
    glow: 'rgba(15, 118, 110, 0.25)',
    desc: {
      en: 'Physical site experience where trust and project conviction are built.',
      te: 'ప్రాజెక్ట్ చూసినప్పుడే కొనుగోలుదారునికి నమ్మకం మరియు స్పష్టత వస్తుంది.'
    }
  },
  {
    id: 3,
    key: 'close',
    title: 'CLOSING',
    name: { en: 'Closing', te: 'క్లోజింగ్' },
    color: '#C99A2E',
    glow: 'rgba(201, 154, 46, 0.25)',
    desc: {
      en: 'Objection handling, payment structure, and securing the plot booking.',
      te: 'అనుమానాలు నివృత్తి చేసి, పేమెంట్ ప్లాన్ ఇచ్చి బుకింగ్ పూర్తి చేయడం.'
    }
  },
  {
    id: 4,
    key: 'ref',
    title: 'REFERRALS',
    name: { en: 'Referrals', te: 'రిఫరల్స్' },
    color: '#4F46E5',
    glow: 'rgba(79, 70, 229, 0.25)',
    desc: {
      en: 'Delighted buyers bringing family and colleagues to invest in the venture.',
      te: 'సంతోషకరమైన కస్టమర్లు తమ బంధువులు, మిత్రులను ఇన్వెస్ట్ చేయించడం.'
    }
  }
];

export const CANDIDATE_POOL: CandidatePoolItem[] = [
  {
    "g": "field",
    "e": "🤝",
    "n": "Existing plot agent",
    "who": "ఇప్పటికే వేరే projects లో plots అమ్ముతున్న agent",
    "plus": "Plot buyers network, site visit & closing experience",
    "minus": "ఒకేసారి చాలా projects అమ్ముతారు, loyalty తక్కువ, commission ఎక్కువ అడుగుతారు",
    "model": "Commission",
    "fit": [
      6,
      4,
      6,
      10,
      4
    ]
  },
  {
    "g": "field",
    "e": "🏢",
    "n": "Residential CP / agent",
    "who": "Apartments, villas అమ్మిన experience ఉన్న CP లేదా CP firm",
    "plus": "Ready buyer network, closing experience",
    "minus": "Plots కంటే apartments కి priority ఇవ్వొచ్చు, commission ఎక్కువ అడుగుతారు",
    "model": "Commission",
    "fit": [
      6,
      4,
      4,
      6,
      4
    ]
  },
  {
    "g": "field",
    "e": "🛡️",
    "n": "LIC / insurance agent",
    "who": "Telugu states లో చాలా common. Families తో long relationships",
    "plus": "Follow-up discipline, trust, family network",
    "minus": "Real estate product knowledge తక్కువ, part-time గా ఉంటారు",
    "model": "Commission",
    "fit": [
      6,
      6,
      1,
      4,
      6
    ]
  },
  {
    "g": "field",
    "e": "📈",
    "n": "Mutual fund distributor / financial advisor",
    "who": "Investment, returns, goals గురించి మాట్లాడే advisor",
    "plus": "Value selling, investor clients",
    "minus": "Site, layout knowledge తక్కువ",
    "model": "Commission",
    "fit": [
      4,
      4,
      1,
      6,
      6
    ]
  },
  {
    "g": "field",
    "e": "💰",
    "n": "Chit fund / finance agent",
    "who": "Towns, mandals లో monthly collections చేసే agent",
    "plus": "Local trust, regular-saver network",
    "minus": "Big-ticket selling experience తక్కువ",
    "model": "Commission",
    "fit": [
      6,
      4,
      1,
      4,
      4
    ]
  },
  {
    "g": "field",
    "e": "🧓",
    "n": "Retired govt employee",
    "who": "Retired, time ఉంది, community లో respect",
    "plus": "Trust, patience, senior buyers తో బాగా connect",
    "minus": "Volume, speed తక్కువ, digital tools కష్టం",
    "model": "Part-time / commission",
    "fit": [
      4,
      1,
      1,
      4,
      4
    ]
  },
  {
    "g": "field",
    "e": "🏪",
    "n": "Small business owner",
    "who": "Shop, contractor, local business నడిపేవాళ్లు",
    "plus": "Local customers network",
    "minus": "Part-time, business busy అయితే drop",
    "model": "Commission",
    "fit": [
      4,
      1,
      1,
      1,
      4
    ]
  },
  {
    "g": "field",
    "e": "🏠",
    "n": "Homemaker network (kitty / SHG groups)",
    "who": "Women groups, apartment associations లో active",
    "plus": "Warm referrals, family decision-makers కి reach",
    "minus": "Site visits, negotiation కి support కావాలి",
    "model": "Part-time / commission",
    "fit": [
      4,
      1,
      1,
      1,
      6
    ]
  },
  {
    "g": "field",
    "e": "🔁",
    "n": "Network marketing (MLM) background",
    "who": "Downline building experience ఉన్నవాళ్లు",
    "plus": "Recruitment energy, presentation skills",
    "minus": "Selling కంటే downline కి focus. Over-promising risk",
    "model": "Commission",
    "fit": [
      4,
      1,
      1,
      0,
      1
    ]
  },
  {
    "g": "field",
    "e": "🎓",
    "n": "Fresher / graduate",
    "who": "College అయిపోయిన youth, digital-savvy",
    "plus": "Trainable, తక్కువ salary, social media తెలుసు",
    "minus": "Credibility, pitch skills లేవు. Training must",
    "model": "Salary + incentive",
    "fit": [
      1,
      4,
      1,
      0,
      1
    ]
  },
  {
    "g": "digital",
    "e": "📣",
    "n": "Digital ads expert (Meta / Google)",
    "who": "Paid campaigns, lead forms, landing pages",
    "plus": "వారాల్లోనే fresh leads, measurable",
    "minus": "Ad budget కావాలి. Leads తర్వాత follow-up team లేకపోతే waste",
    "model": "Salary / agency fee",
    "fit": [
      10,
      1,
      1,
      1,
      1
    ]
  },
  {
    "g": "digital",
    "e": "🎬",
    "n": "Content creator / real estate YouTuber",
    "who": "Site videos, reels, location explainers, testimonials",
    "plus": "Trust, organic leads long run లో",
    "minus": "Results slow, direct selling చేయరు",
    "model": "Salary / per-video",
    "fit": [
      6,
      4,
      4,
      1,
      6
    ]
  },
  {
    "g": "digital",
    "e": "📞",
    "n": "Tele-caller (2–5 yrs exp)",
    "who": "BPO లేదా real estate calling experience",
    "plus": "Fast follow-up, visits book చేస్తారు",
    "minus": "Leads లేకపోతే idle. Closing చేయరు",
    "model": "Salary + incentive",
    "fit": [
      1,
      10,
      10,
      1,
      4
    ]
  },
  {
    "g": "digital",
    "e": "🖥️",
    "n": "Online ad expert",
    "who": "Property portals (99acres, MagicBricks, Housing.com) లో listings, paid leads manage చేస్తారు",
    "plus": "High-intent buyers, త్వరగా leads",
    "minus": "Portal cost ఎక్కువ, అదే lead చాలా agents కి వెళ్తుంది, fast follow-up కావాలి",
    "model": "Salary / per-lead",
    "fit": [
      10,
      1,
      1,
      1,
      1
    ]
  },
  {
    "g": "field",
    "e": "🕵️",
    "n": "Competitor agent",
    "who": "పక్క plotted project (competitor) కి పని చేస్తున్న agent",
    "plus": "Plotted buyers, competitor pricing & objections తెలుసు",
    "minus": "Loyalty తక్కువ, మళ్లీ వెళ్లిపోవచ్చు; competitor తో conflict రావచ్చు",
    "model": "Commission / salary + incentive",
    "fit": [
      6,
      4,
      6,
      6,
      1
    ]
  },
  {
    "g": "digital",
    "e": "⚙️",
    "n": "Lead automation expert",
    "who": "WhatsApp automation, CRM, lead assignment, reminders, post-sale updates setup",
    "plus": "Instant response, ఏ lead miss అవ్వదు. Buyers తో regular touch వల్ల relationships, referrals",
    "minus": "Calls, meetings చేయరు; setup కి time, team use చేయాలి",
    "model": "Salary / agency fee",
    "fit": [
      4,
      10,
      4,
      1,
      10
    ]
  },
  {
    "g": "site",
    "e": "🏦",
    "n": "Bank loan DSA / ex-banker",
    "who": "Home / plot loans, eligibility, EMI planning తెలుసు",
    "plus": "Loan, investment doubts clear, credibility",
    "minus": "Lead generation, site experience తక్కువ",
    "model": "Salary / per-loan",
    "fit": [
      1,
      4,
      1,
      10,
      4
    ]
  },
  {
    "g": "lead",
    "e": "🧑‍✈️",
    "n": "Experienced team lead / sales manager",
    "who": "Team ని targets, reviews తో నడిపించిన experience",
    "plus": "Discipline, consistency, coaching",
    "minus": "Salary ఎక్కువ, సరైన team కావాలి",
    "model": "Salary + override",
    "fit": [
      4,
      6,
      10,
      6,
      4
    ]
  }
];

export const HELP_TEXT: Record<string, string> = {
  "Existing plot agent": "ఇప్పటికే plots అమ్ముతున్నారు, buyers ని close చేస్తారు",
  "Residential CP / agent": "Apartments అమ్మిన agent, ready buyers ఉంటారు",
  "LIC / insurance agent": "Families తో trust, regular follow-up అలవాటు",
  "Mutual fund distributor / financial advisor": "Investment, returns గురించి explain చేస్తారు",
  "Chit fund / finance agent": "Local savers network ఉన్న collection agent",
  "Retired govt employee": "Community లో respect, part-time గా పని",
  "Small business owner": "Shop / business ఉంది, local contacts",
  "Homemaker network (kitty / SHG groups)": "Women groups లో warm contacts",
  "Network marketing (MLM) background": "Downline build చేసిన experience",
  "Fresher / graduate": "College అయిపోయిన youth, experience లేదు",
  "Digital ads expert (Meta / Google)": "Facebook / Google ads తో కొత్త leads తెస్తారు",
  "Content creator / real estate YouTuber": "Site videos, reels తో trust పెంచుతారు",
  "Tele-caller (2–5 yrs exp)": "Calls చేసి customers ని site కి తీసుకొస్తారు",
  "Online ad expert": "99acres, MagicBricks లో leads తెస్తారు",
  "Competitor agent": "పక్క project లో plots అమ్ముతున్న agent",
  "Lead automation expert": "WhatsApp, CRM తో auto reminders & updates",
  "Bank loan DSA / ex-banker": "Plot loans, EMI doubts clear చేస్తారు",
  "Experienced team lead / sales manager": "Targets, reviews తో team ని నడిపిస్తారు"
};

export const SHORT_TRAITS: Record<string, [string, string]> = {
  "Existing plot agent": [
    "Plot buyers network, closing experience",
    "వేరే projects కూడా అమ్ముతారు, loyalty తక్కువ"
  ],
  "Residential CP / agent": [
    "Ready buyer network, closing experience",
    "Apartments కి priority, plots కి focus తక్కువ"
  ],
  "LIC / insurance agent": [
    "Follow-up discipline, family trust",
    "Part-time, plots knowledge తక్కువ"
  ],
  "Mutual fund distributor / financial advisor": [
    "Investment language, investor clients",
    "Site, layout knowledge తక్కువ"
  ],
  "Chit fund / finance agent": [
    "Local trust, regular savers network",
    "Big-ticket selling experience తక్కువ"
  ],
  "Retired govt employee": [
    "Community లో trust, patience",
    "Speed, volume తక్కువ"
  ],
  "Small business owner": [
    "Local customers network",
    "Part-time, business busy అయితే drop"
  ],
  "Homemaker network (kitty / SHG groups)": [
    "Women groups లో warm referrals",
    "Site visits, negotiation కి support కావాలి"
  ],
  "Network marketing (MLM) background": [
    "Presentation energy",
    "Selling కంటే downline కి focus"
  ],
  "Fresher / graduate": [
    "Trainable, social media తెలుసు",
    "Credibility, pitch skills లేవు"
  ],
  "Digital ads expert (Meta / Google)": [
    "వారాల్లోనే fresh leads",
    "Leads తెస్తారు, ఈ problem fix చేయరు"
  ],
  "Content creator / real estate YouTuber": [
    "Trust పెంచే videos, organic leads",
    "Results slow, direct selling చేయరు"
  ],
  "Tele-caller (2–5 yrs exp)": [
    "Fast follow-up, visits book చేస్తారు",
    "Calls చేస్తారు, closing / relationships కాదు"
  ],
  "Online ad expert": [
    "Portals నుంచి high-intent leads",
    "Leads తెస్తారు, ఈ problem fix చేయరు"
  ],
  "Competitor agent": [
    "Plotted buyers, competitor objections తెలుసు",
    "Loyalty తక్కువ, మళ్లీ వెళ్లిపోవచ్చు"
  ],
  "Lead automation expert": [
    "Auto reminders, ఏ lead miss అవ్వదు",
    "System ఇస్తారు, calls / meetings చేయరు"
  ],
  "Bank loan DSA / ex-banker": [
    "Loans, EMI doubts clear, credibility",
    "Leads, site experience తక్కువ"
  ],
  "Experienced team lead / sales manager": [
    "Targets, reviews, coaching",
    "Salary ఎక్కువ, సొంతంగా ఈ పని చేయరు"
  ]
};

export const EN_TRANSLATIONS: Record<string, string> = {
  "Agents కి కొత్త leads రావడం లేదు. అందరూ relatives కే మళ్లీ మళ్లీ call చేస్తున్నారు.": "Agents aren't getting fresh leads. Everyone keeps calling the same relatives repeatedly.",
  "Leads వస్తున్నాయి, కానీ సరైన follow-up లేక interest పోతోంది.": "Leads are coming in, but delayed follow-up is causing buyers to lose interest.",
  "300 leads వచ్చాయి, కానీ 6 మందే site visit కి వచ్చారు.": "300 leads came in, but only 6 prospects actually showed up for a site visit.",
  "Team కి mood ఉన్న Sundays లోనే site visits జరుగుతున్నాయి.": "Site visits only happen on Sundays when the team feels like working.",
  "20 మంది site చూశారు, కానీ 1 booking మాత్రమే.": "20 prospects visited the site, resulting in just 1 booking.",
  "Customers 'ఇది మంచి investment ఎందుకు?' అంటే team answer చెప్పలేకపోతోంది.": "When buyers ask 'Why is this a strong investment?', the team can't explain the value.",
  "Plot కొన్నవాళ్లు తర్వాత కనిపించరు, referrals రావడం లేదు.": "Past buyers disappear after registration, generating almost zero referrals.",
  "ఇప్పటికే plots అమ్ముతున్నారు, buyers ని close చేస్తారు": "Already selling open plots and experienced in closing plot buyers",
  "Apartments అమ్మిన agent, ready buyers ఉంటారు": "Experienced residential CP with an existing buyer network",
  "Families తో trust, regular follow-up అలవాటు": "Strong family trust and disciplined follow-up habit",
  "Investment, returns గురించి explain చేస్తారు": "Explains ROI, appreciation, and financial goals clearly",
  "Local savers network ఉన్న collection agent": "Collection agent with local trust and regular savers network",
  "Community లో respect, part-time గా పని": "Respected in the community, works part-time",
  "Shop / business ఉంది, local contacts": "Local business owner with neighborhood contacts",
  "Women groups లో warm contacts": "Warm network across women's and community groups",
  "Downline build చేసిన experience": "Experienced in MLM downline recruitment",
  "College అయిపోయిన youth, experience లేదు": "Recent college graduate, digital-savvy but no sales experience",
  "Facebook / Google ads తో కొత్త leads తెస్తారు": "Generates fresh inbound leads via Meta & Google campaigns",
  "Site videos, reels తో trust పెంచుతారు": "Builds organic trust with site reels and location videos",
  "Calls చేసి customers ని site కి తీసుకొస్తారు": "Qualifies leads rapidly and books weekend site visits",
  "99acres, MagicBricks లో leads తెస్తారు": "Manages property portal listings for high-intent buyer leads",
  "పక్క project లో plots అమ్ముతున్న agent": "Currently selling plots in a neighboring competitor venture",
  "WhatsApp, CRM తో auto reminders & updates": "Sets up WhatsApp automation, CRM tracking & buyer reminders",
  "Plot loans, EMI doubts clear చేస్తారు": "Clears plot loan, eligibility, and ROI doubts with authority",
  "Targets, reviews తో team ని నడిపిస్తారు": "Drives weekly targets, reviews, and sales team discipline",
  "Existing agents కి lead generation training": "Train existing agents on self-lead generation",
  "Personal branding, social media తో ప్రతి agent సొంత leads తెస్తారు": "Personal branding & social media help every agent generate own leads",
  "Lead-gen experience ఉన్న agents ని onboard చేయండి": "Onboard agents with proven lead-gen skills",
  "Day 1 నుంచే సొంత leads, team కి example": "Brings self-generated leads from Day 1 and sets a benchmark",
  "Meta / Google ads: clear target, daily tracking": "Meta / Google ads with clear targeting & daily tracking",
  "వారాల్లోనే fresh leads, cost per lead తెలుస్తుంది": "Delivers fresh leads within weeks with measurable cost-per-lead",
  "కొత్త lead agency ని onboard చేయండి": "Onboard an external lead generation agency",
  "Leads వస్తాయి, కానీ quality, cost control మీ చేతిలో ఉండవు": "Leads arrive, but quality and cost control aren't in your hands",
  "Lead generation మీద ఎక్కువ spend": "Increase raw ad spend on lead generation",
  "Leads పెరుగుతాయి, కానీ tracking లేకపోతే budget waste": "Volume rises, but without tracking much of the budget is wasted",
  "Weekly site reels & content": "Publish weekly site reels & video content",
  "Trust పెరుగుతుంది, కానీ results slow": "Builds brand trust over time, but lead flow is slow",
  "Property exhibitions / local events": "Sponsor property exhibitions & local events",
  "Walk-in leads, కానీ ఒక్కసారికే": "Generates walk-in leads, but only as a one-off spike",
  "కొత్త agents ని hire చేయండి (lead skills లేకుండా)": "Hire more agents without lead-generation skills",
  "Leads లేని agents పెరుగుతారు, అదే problem": "Adds more agents waiting for leads—the core bottleneck remains",
  "Relatives & friends కి మళ్లీ call చేయమనండి": "Push agents to call friends & relatives again",
  "Network అయిపోయింది, ఇంకా ఒత్తిడి": "Warm circle is already exhausted; creates frustration",
  "Team size (downline) పెంచండి": "Expand downline headcount rapidly",
  "ఉన్న company leads ఇంకా ఎక్కువ మంది మధ్య divide అవుతాయి": "Splits limited company leads across even more people",
  "WhatsApp automation + CRM reminders": "Deploy WhatsApp automation + CRM reminders",
  "ప్రతి lead కి instant reply, ఏ follow-up miss అవ్వదు": "Instant response to every inquiry; zero missed follow-ups",
  "5-minute first call rule + daily follow-up review": "5-minute first-call SLA + daily follow-up review",
  "Lead hot గా ఉన్నప్పుడే call, discipline పెరుగుతుంది": "Connects while buyer intent is hot and enforces daily discipline",
  "Telecalling & sales pitch training": "Telecalling & qualification pitch training",
  "Qualify చేసి, interest create చేసే pitch": "Equips callers to qualify leads and spark curiosity",
  "Excel sheet లో leads track చేయండి": "Track leads manually in an Excel sheet",
  "ఏమీ లేకపోవడం కంటే better, కానీ update చేయరు": "Better than nothing, but agents rarely update it on time",
  "Weekly project updates అన్ని leads కి పంపండి": "Send weekly project broadcasts to all leads",
  "Leads ని warm గా ఉంచుతుంది, కానీ personal touch లేదు": "Keeps leads mildly warm, but lacks personal discovery",
  "Phone లోనే discount offer": "Offer a price discount on the very first call",
  "Interest కాదు, price bargaining మొదలవుతుంది": "Triggers price bargaining instead of genuine project interest",
  "ఇంకా ఎక్కువ leads కొనండి": "Buy even more raw leads",
  "Cold leads ఇంకా పెరుగుతాయి": "Piles up more uncalled cold leads",
  "Bulk SMS blast": "Send bulk promotional SMS blasts",
  "ఎవరూ చదవరు, brand cheap గా కనిపిస్తుంది": "Rarely read and dilutes brand perception",
  "Interest ఉంటే వాళ్లే call చేస్తారు": "Wait for interested buyers to call back themselves",
  "Competitor ముందే call చేస్తారు": "Competitors will call and book them first",
  "రోజూ అదే script తో pressure calls": "Make daily high-pressure calls with the same script",
  "Spam అని block చేస్తారు, lead పోతుంది": "Buyers block the number as spam and the lead is lost",
  "Telecalling & pitch training: visit book చేయడం": "Telecalling pitch training focused on booking site visits",
  "Call ని visit గా మార్చే pitch": " sharpens the pitch that converts phone inquiries into site visits",
  "Weekly visit targets + Monday review": "Weekly site-visit targets + Monday review rhythm",
  "ప్రతి Sunday visits plan అవుతాయి": "Ensures every weekend's visits are planned and tracked",
  "Fixed Sunday slots + free pickup": "Fixed Sunday visit slots + organized cab pickup",
  "Customer కి easy, no-shows తగ్గుతాయి": "Makes visiting effortless for families and cuts no-shows",
  "Visit ముందు రోజు & ఆ రోజు reminders": "Day-before & morning-of visit confirmation reminders",
  "Booked visits నిజంగా జరుగుతాయి": "Converts scheduled visits into actual site turnouts",
  "Site video reels leads కి పంపండి": "Send site walkthrough reels to prospects",
  "Interest పెరుగుతుంది, కానీ visit guarantee కాదు": "Builds interest, but doesn't lock in a confirmed visit slot",
  "Site visit కి gift": "Offer free gifts for attending a site visit",
  "కొంత మంది వస్తారు, కానీ serious buyers కాకపోవచ్చు": "Attracts freebie seekers rather than serious plot buyers",
  "Monthly visit contest": "Run a monthly site-visit contest for agents",
  "Short-term energy, system కాదు": "Creates a brief spike, not a repeatable weekly system",
  "ఎక్కువ leads, అదే visit leak": "More leads entering the same broken visit conversion stage",
  "ఇంకా agents ని add చేయండి": "Add more uncoached agents to the team",
  "Pitch, planning లేకపోతే visits పెరగవు": "Without pitch quality and planning, site visits won't rise",
  "Visit ముందే phone లో best price చెప్పండి": "Quote your lowest bottom price over the phone before the visit",
  "Price తెలిసిపోయింది, site కి రావాల్సిన అవసరం లేదు": "Buyer shops your price around without ever visiting the layout",
  "Objection handling training (role plays)": "Objection-handling role-play training",
  "'ఇంట్లో discuss చేస్తాం' కి సరైన answer": "Equips team to handle 'We will discuss at home' effectively",
  "Value selling: location growth, investment case": "Value selling: corridor growth & investment case",
  "Price కాదు, future value చూపిస్తారు": "Shifts conversation from per-sq-yd price to long-term appreciation",
  "Product & investment knowledge sessions": "Deep product, approval & investment knowledge sessions",
  "Approvals, location, loans: ప్రతి doubt clear": "Clears every buyer doubt on LP/RERA approvals, connectivity & loans",
  "Bank tie-up: site లోనే loan eligibility": "On-site bank loan desk for instant eligibility checks",
  "Money doubt అక్కడే solve, booking వెంటనే": "Resolves financing doubts on the spot to lock in bookings",
  "Brochure & FAQ sheet": "Hand out printed brochures & FAQ sheets",
  "Help అవుతుంది, కానీ conversation replace చేయదు": "Helpful reference, but cannot replace persuasive closing dialogue",
  "Limited-time offer": "Announce a limited-time booking offer",
  "కొంత urgency, ఎక్కువ వాడితే trust పోతుంది": "Creates mild urgency, but overuse erodes credibility",
  "Final meeting లో senior join అవ్వడం": "Have a senior closer join every final meeting",
  "Trust పెరుగుతుంది, కానీ team skill పెరగదు": "Helps close a few deals, but team members never learn to close",
  "ఇంకా ఎక్కువ site visits తేండి": "Push for more site visits without fixing closing",
  "అదే conversion, ఎక్కువ effort waste": "Same low conversion rate with higher transport & time cost",
  "'Today only' hard pressure closing": "'Book today or lose it' high-pressure tactics",
  "Customer దూరం అవుతారు": "Pushes serious family buyers away",
  "పెద్ద discounts ఇవ్వండి": "Offer heavy blanket price discounts",
  "Margin పోతుంది, project value తగ్గినట్టు కనిపిస్తుంది": "Destroys margin and signals desperation to buyers",
  "Post-sale relationship plan": "Structured post-sale buyer relationship plan",
  "Registration, development updates: buyer తో regular touch": "Keeps buyers engaged through registration & layout development milestones",
  "Automated updates + festival wishes": "Automated layout progress updates & milestone greetings",
  "ప్రతి buyer కి personal touch, effort లేకుండా": "Maintains warm touch with every plot owner effortlessly",
  "Buyers కి referral reward program": "Launch a structured buyer referral reward program",
  "Happy buyers కొత్త buyers ని తెస్తారు": "Incentivizes delighted plot owners to introduce friends & colleagues",
  "Plot owners meet / site day": "Host an annual Plot Owners Meet / Site Progress Day",
  "Community feeling, referrals natural గా వస్తాయి": "Builds pride of ownership so referrals flow naturally",
  "Buyers WhatsApp group": "Create a common WhatsApp group for all buyers",
  "Connect అవుతుంది, కానీ manage చేయకపోతే complaints board": "Connects buyers, but can turn into an unmanaged complaint forum",
  "Registration రోజు మాత్రమే referral అడగండి": "Ask for referrals only once on registration day",
  "కొంత help, relationship లేకుండా ఒక్కసారికే": "Works occasionally, but misses long-term repeat referrals",
  "Referrals బదులు ఇంకా ads": "Ignore referrals and spend more on paid ads",
  "Leads వస్తాయి, కానీ cheapest source ని వదిలేశారు": "Brings paid leads while abandoning your highest-trust, lowest-cost channel",
  "Referrals కోసం ఇంకా agents": "Hire more agents to ask for referrals",
  "Relationship system లేకపోతే అదే result": "Without post-sale trust, extra agents still get zero referrals",
  "Registration తర్వాత follow-up అవసరం లేదు": "Stop contacting buyers once registration is done",
  "Buyer మర్చిపోతారు, referral రాదు": "Buyers feel forgotten and never recommend you",
  "Buyers కి కొత్త project offers spam": "Spam existing buyers with aggressive new-project blasts",
  "Irritation, negative word of mouth": "Triggers irritation and negative word of mouth",
  "Team కి regular leads రావడం లేదు": "Team is not getting regular leads",
  "Agents మళ్లీ మళ్లీ relatives కే call చేస్తున్నారు.": "Agents keep calling the same relatives over and over.",
  "Leads ఉన్నాయి, కానీ ఎక్కువ leads interest చూపించడం లేదు": "Leads are coming in, but most prospects lose interest",
  "Friday lead. Tuesday call. అప్పటికే late.": "Friday lead. Tuesday call. Already too late.",
  "300 leads, కేవలం 6 site visits": "300 leads, only 6 site visits",
  "Enquiries బాగానే వస్తున్నాయి. Sunday ఎవరూ రావడం లేదు.": "Enquiries are coming in well, but nobody turns up on Sunday.",
  "కొన్ని Sundays లోనే site visits": "Site visits happen only on a few Sundays",
  "ఎవరికి mood ఉంటే అప్పుడే పని.": "Everyone works only when they feel like it.",
  "అందరూ 'ఇంట్లో discuss చేసి చెప్తాం' అంటున్నారు.": "Everyone says, 'We'll discuss at home and let you know.'",
  "Investment value ని team explain చేయలేకపోతోంది": "Team cannot explain the long-term investment value",
  "'Rates పెరుగుతాయి sir.' అంతే.": "'Rates will go up, sir.' That's all they say.",
  "కొన్న తర్వాత customers కనిపించరు": "Buyers disappear right after purchase",
  "సంవత్సరానికి ఒక referral, అదీ కష్టమే.": "Barely one referral a year, and even that is a struggle.",
  "ఇప్పటికే వేరే projects లో plots అమ్ముతున్న agent": "An agent already selling plots in other ventures",
  "ఒకేసారి చాలా projects అమ్ముతారు, loyalty తక్కువ, commission ఎక్కువ అడుగుతారు": "Sells many ventures at once, low loyalty, demands higher commission",
  "Apartments, villas అమ్మిన experience ఉన్న CP లేదా CP firm": "Channel partner experienced in selling apartments and villas",
  "Plots కంటే apartments కి priority ఇవ్వొచ్చు, commission ఎక్కువ అడుగుతారు": "May prioritize apartments over plots and demand higher commission",
  "Telugu states లో చాలా common. Families తో long relationships": "Very common across Telugu states with long-standing family relationships",
  "Real estate product knowledge తక్కువ, part-time గా ఉంటారు": "Low real estate product knowledge and works only part-time",
  "Investment, returns, goals గురించి మాట్లాడే advisor": "Advisor who speaks fluently about investments, returns, and financial goals",
  "Site, layout knowledge తక్కువ": "Limited on-site layout and approval knowledge",
  "Towns, mandals లో monthly collections చేసే agent": "Collection agent operating regularly across towns and mandals",
  "Big-ticket selling experience తక్కువ": "Limited experience closing high-ticket property deals",
  "Retired, time ఉంది, community లో respect": "Retired professional with free time and strong community respect",
  "Trust, patience, senior buyers తో బాగా connect": "High trust and patience; connects naturally with senior buyers",
  "Volume, speed తక్కువ, digital tools కష్టం": "Lower speed and volume; struggles with modern digital tools",
  "Shop, contractor, local business నడిపేవాళ్లు": "Local shop owner, contractor, or small business operator",
  "Part-time, business busy అయితే drop": "Works part-time and drops off whenever their main business gets busy",
  "Women groups, apartment associations లో active": "Active in women's circles and apartment associations",
  "Warm referrals, family decision-makers కి reach": "Strong warm referrals and access to family decision-makers",
  "Site visits, negotiation కి support కావాలి": "Needs support handling site visits and price negotiation",
  "Downline building experience ఉన్నవాళ్లు": "Experienced in building multi-level downline networks",
  "Selling కంటే downline కి focus. Over-promising risk": "Focuses more on recruiting downlines than selling; risk of over-promising",
  "College అయిపోయిన youth, digital-savvy": "Recent college graduate who is tech- and digital-savvy",
  "Trainable, తక్కువ salary, social media తెలుసు": "Easy to train, affordable salary, fluent with social media",
  "Credibility, pitch skills లేవు. Training must": "Lacks buyer credibility and pitch skills; requires thorough training",
  "వారాల్లోనే fresh leads, measurable": "Delivers measurable fresh leads within weeks",
  "Ad budget కావాలి. Leads తర్వాత follow-up team లేకపోతే waste": "Requires ad spend; wasted if there is no follow-up team",
  "Trust, organic leads long run లో": "Builds lasting trust and steady organic leads over time",
  "Results slow, direct selling చేయరు": "Takes time to show results and does not handle direct sales",
  "BPO లేదా real estate calling experience": "Experienced in BPO or real estate telecalling",
  "Fast follow-up, visits book చేస్తారు": "Fast follow-ups and skilled at booking site visits",
  "Leads లేకపోతే idle. Closing చేయరు": "Sits idle without fresh leads and does not close deals",
  "Property portals (99acres, MagicBricks, Housing.com) లో listings, paid leads manage చేస్తారు": "Manages listings and paid leads on 99acres, MagicBricks, and Housing.com",
  "High-intent buyers, త్వరగా leads": "Delivers high-intent buyer leads quickly",
  "Portal cost ఎక్కువ, అదే lead చాలా agents కి వెళ్తుంది, fast follow-up కావాలి": "High portal cost; shared leads require rapid follow-up",
  "పక్క plotted project (competitor) కి పని చేస్తున్న agent": "Agent currently working for a competing plotted venture nearby",
  "Plotted buyers, competitor pricing & objections తెలుసు": "Knows plot buyers, competitor pricing, and common objections",
  "Loyalty తక్కువ, మళ్లీ వెళ్లిపోవచ్చు; competitor తో conflict రావచ్చు": "Low loyalty and may leave again; potential competitor conflict",
  "Instant response, ఏ lead miss అవ్వదు. Buyers తో regular touch వల్ల relationships, referrals": "Instant lead response with zero missed inquiries and automated buyer touchpoints",
  "Calls, meetings చేయరు; setup కి time, team use చేయాలి": "Does not make calls or attend meetings; needs setup time and team adoption",
  "Home / plot loans, eligibility, EMI planning తెలుసు": "Expert in plot/home loans, eligibility checks, and EMI planning",
  "Lead generation, site experience తక్కువ": "Limited lead generation and on-site sales experience",
  "Team ని targets, reviews తో నడిపించిన experience": "Proven experience leading sales teams with clear targets and reviews",
  "Salary ఎక్కువ, సరైన team కావాలి": "Higher salary cost and requires an active team to manage",
  "వారాల్లోనే fresh leads": "Delivers fresh leads within weeks",
  "నిరంతరం వచ్చే organic leads, long run లో": "Builds steady organic leads over the long run",
  "Community లో warm leads, కానీ త్వరగా అయిపోతాయి": "Warm community leads, though the network saturates quickly",
  "Followup, Site visits లో 🎯. ఇక్కడ call చేయడానికి leads లేవు": "Great for Followup and Site Visits, but there are no leads here to call yet",
  "Network లేదు, contacts లేవు": "No existing buyer network or contacts",
  "Portals నుంచి high-intent leads": "Brings high-intent leads directly from property portals",
  "Auto reminders, కానీ System ఇస్తారు, calls / meetings చేయరు": "Provides automated reminders, but won't make calls or bring leads on its own",
  "Targets, కానీ Salary ఎక్కువ, సొంతంగా ఈ పని చేయరు": "Great at managing targets, but high cost and won't generate leads solo",
  "Closing లో 🎯. ఇక్కడ కాదు": "Strong in Closing, not the right bottleneck here",
  "Daily follow-up reviews, కానీ calls చేసేది team": "Drives daily follow-up reviews, though the calling team executes them",
  "Leads ని warm గా ఉంచుతారు, system కావాలి": "Keeps leads warm, though still needs a structured system",
  "Leads stage లో 🎯. ఇక్కడ ఇంకా ఎక్కువ leads cold": "Ideal for Lead Gen, but here more leads will just go cold",
  "Part-time, follow-up కి time లేదు": "Works part-time with no bandwidth for consistent follow-ups",
  "Plot buyers network, కానీ వేరే projects కూడా అమ్ముతారు, loyalty తక్కువ": "Has a plot buyer network, but sells rival ventures with low loyalty",
  "Ready buyer network, కానీ Apartments కి priority, plots కి focus తక్కువ": "Ready buyer network, but prioritizes apartments over plots",
  "Leads లో 🎯. ఇక్కడ కాదు": "Best suited for Leads, not this stage",
  "Speed, volume తక్కువ": "Too slow and low-volume for rapid follow-ups",
  "Selling కంటే downline కి focus": "Focuses on downline recruiting instead of property sales",
  "బాగా pitch చేసి, visits book చేస్తారు": "Pitches persuasively and books site visits reliably",
  "Site visits చేయించిన experience, కానీ సొంత clients కే priority": "Experienced with site visits, but prioritizes their own clients",
  "Site reels తో interest, కానీ slow": "Generates interest via site reels, but converts too slowly",
  "Leads stage లో 🎯. ఎక్కువ leads, అదే leak": "Great for Lead Gen, but more leads won't fix this visit leak",
  "ఇంకా pitch skills లేవు": "Still lacks the pitch skills needed to convert visits",
  "Plotted buyers, competitor objections తెలుసు": "Understands plot buyers and competing venture objections",
  "Weekly visit routine తెలుసు, buyers తీసుకొస్తారు": "Drives weekly site-visit routines and brings buyers along",
  "Reminders తో no-shows తగ్గుతాయి, discipline కాదు": "Reminders reduce no-shows, though not full team discipline",
  "Closing, Referrals లో 👍. Site visits నడపరు": "Good for Closing and Referrals, but doesn't drive site visits",
  "Downline కి focus, visits కి కాదు": "Focused on downlines rather than organizing site visits",
  "Trust పెంచే videos, కానీ Results slow, direct selling చేయరు": "Videos build trust slowly and don't directly close visits",
  "Credibility, pitch skills లేవు": "Lacks credibility and strong sales pitch skills",
  "Plot buyers objections handle చేసి close చేస్తారు": "Handles plot buyer objections confidently and closes deals",
  "Closing experience ఉంది, plots కి కొంచెం adjust కావాలి": "Has closing experience; needs minor adjustment for plot buyers",
  "Trust ఉంది, కానీ product knowledge తక్కువ": "Has buyer trust, but lacks deep project knowledge",
  "Leads లో 🎯. ఎక్కువ visits, అదే result": "Best for Leads; bringing more visits won't fix closing",
  "Negotiation లో discount ఇచ్చేసి deal పాడు చేస్తారు": "Gives away heavy discounts in negotiation and hurts margins",
  "Followup లో 🎯, Referrals లో 🎯. ఇక్కడ కాదు": "Great in Followup and Referrals, not this stage",
  "Value selling, investment language తెలుసు": "Fluent in value selling and investment return conversations",
  "Savings mindset తెలుసు, big-ticket experience తక్కువ": "Understands savings mindset, though light on big-ticket deals",
  "Followup లో 🎯. Investment questions కి answer కాదు": "Great at Followup, but cannot answer investment return questions",
  "'Double అవుతుంది sir' లాంటి over-promises, trust పోతుంది": "Makes risky over-promises like 'it will double, sir' that destroy trust",
  "Regular updates తో buyers తో relationship, referrals అడుగుతారు": "Maintains buyer relationships with regular updates and asks for referrals",
  "Families తో long relationships": "Maintains long-term relationships with families",
  "Team ని referrals అడగమని push, కానీ system కాదు": "Pushes the team to ask for referrals, though without a repeatable system",
  "Leads, Closing లో 👍. Old buyers తో connect ఉండదు": "Good at Leads and Closing, but rarely stays connected with past buyers",
  "Leads లో 🎯. Happy customers ని ignore చేస్తారు": "Strong at Leads, but ignores happy past customers",
  "Women groups లో warm referrals": "Brings warm referrals through women's circles",
  "Trust పెంచే videos, organic leads": "Creates trust-building videos and steady organic leads"
};

export const PROCESS_SOLUTIONS: Array<Array<[string, string, number, string]>> = [
  [
    [
      "🎓",
      "Existing agents కి lead generation training",
      10,
      "Personal branding, social media తో ప్రతి agent సొంత leads తెస్తారు"
    ],
    [
      "🧲",
      "Lead-gen experience ఉన్న agents ని onboard చేయండి",
      10,
      "Day 1 నుంచే సొంత leads, team కి example"
    ],
    [
      "📣",
      "Meta / Google ads: clear target, daily tracking",
      10,
      "వారాల్లోనే fresh leads, cost per lead తెలుస్తుంది"
    ],
    [
      "🏢",
      "కొత్త lead agency ని onboard చేయండి",
      4,
      "Leads వస్తాయి, కానీ quality, cost control మీ చేతిలో ఉండవు"
    ],
    [
      "💸",
      "Lead generation మీద ఎక్కువ spend",
      4,
      "Leads పెరుగుతాయి, కానీ tracking లేకపోతే budget waste"
    ],
    [
      "🎥",
      "Weekly site reels & content",
      4,
      "Trust పెరుగుతుంది, కానీ results slow"
    ],
    [
      "🎪",
      "Property exhibitions / local events",
      4,
      "Walk-in leads, కానీ ఒక్కసారికే"
    ],
    [
      "👥",
      "కొత్త agents ని hire చేయండి (lead skills లేకుండా)",
      1,
      "Leads లేని agents పెరుగుతారు, అదే problem"
    ],
    [
      "📞",
      "Relatives & friends కి మళ్లీ call చేయమనండి",
      1,
      "Network అయిపోయింది, ఇంకా ఒత్తిడి"
    ],
    [
      "📈",
      "Team size (downline) పెంచండి",
      0,
      "ఉన్న company leads ఇంకా ఎక్కువ మంది మధ్య divide అవుతాయి"
    ]
  ],
  [
    [
      "⚙️",
      "WhatsApp automation + CRM reminders",
      10,
      "ప్రతి lead కి instant reply, ఏ follow-up miss అవ్వదు"
    ],
    [
      "⏱️",
      "5-minute first call rule + daily follow-up review",
      10,
      "Lead hot గా ఉన్నప్పుడే call, discipline పెరుగుతుంది"
    ],
    [
      "🗣️",
      "Telecalling & sales pitch training",
      10,
      "Qualify చేసి, interest create చేసే pitch"
    ],
    [
      "📋",
      "Excel sheet లో leads track చేయండి",
      4,
      "ఏమీ లేకపోవడం కంటే better, కానీ update చేయరు"
    ],
    [
      "📲",
      "Weekly project updates అన్ని leads కి పంపండి",
      4,
      "Leads ని warm గా ఉంచుతుంది, కానీ personal touch లేదు"
    ],
    [
      "🎁",
      "Phone లోనే discount offer",
      1,
      "Interest కాదు, price bargaining మొదలవుతుంది"
    ],
    [
      "💸",
      "ఇంకా ఎక్కువ leads కొనండి",
      1,
      "Cold leads ఇంకా పెరుగుతాయి"
    ],
    [
      "📢",
      "Bulk SMS blast",
      1,
      "ఎవరూ చదవరు, brand cheap గా కనిపిస్తుంది"
    ],
    [
      "🤞",
      "Interest ఉంటే వాళ్లే call చేస్తారు",
      1,
      "Competitor ముందే call చేస్తారు"
    ],
    [
      "😤",
      "రోజూ అదే script తో pressure calls",
      0,
      "Spam అని block చేస్తారు, lead పోతుంది"
    ]
  ],
  [
    [
      "🗣️",
      "Telecalling & pitch training: visit book చేయడం",
      10,
      "Call ని visit గా మార్చే pitch"
    ],
    [
      "📅",
      "Weekly visit targets + Monday review",
      10,
      "ప్రతి Sunday visits plan అవుతాయి"
    ],
    [
      "🚐",
      "Fixed Sunday slots + free pickup",
      10,
      "Customer కి easy, no-shows తగ్గుతాయి"
    ],
    [
      "🔔",
      "Visit ముందు రోజు & ఆ రోజు reminders",
      10,
      "Booked visits నిజంగా జరుగుతాయి"
    ],
    [
      "🎬",
      "Site video reels leads కి పంపండి",
      4,
      "Interest పెరుగుతుంది, కానీ visit guarantee కాదు"
    ],
    [
      "🎁",
      "Site visit కి gift",
      4,
      "కొంత మంది వస్తారు, కానీ serious buyers కాకపోవచ్చు"
    ],
    [
      "🏆",
      "Monthly visit contest",
      4,
      "Short-term energy, system కాదు"
    ],
    [
      "💸",
      "ఇంకా ఎక్కువ leads కొనండి",
      1,
      "ఎక్కువ leads, అదే visit leak"
    ],
    [
      "👥",
      "ఇంకా agents ని add చేయండి",
      1,
      "Pitch, planning లేకపోతే visits పెరగవు"
    ],
    [
      "🏷️",
      "Visit ముందే phone లో best price చెప్పండి",
      0,
      "Price తెలిసిపోయింది, site కి రావాల్సిన అవసరం లేదు"
    ]
  ],
  [
    [
      "🛡️",
      "Objection handling training (role plays)",
      10,
      "'ఇంట్లో discuss చేస్తాం' కి సరైన answer"
    ],
    [
      "💎",
      "Value selling: location growth, investment case",
      10,
      "Price కాదు, future value చూపిస్తారు"
    ],
    [
      "📚",
      "Product & investment knowledge sessions",
      10,
      "Approvals, location, loans: ప్రతి doubt clear"
    ],
    [
      "🏦",
      "Bank tie-up: site లోనే loan eligibility",
      10,
      "Money doubt అక్కడే solve, booking వెంటనే"
    ],
    [
      "🧾",
      "Brochure & FAQ sheet",
      4,
      "Help అవుతుంది, కానీ conversation replace చేయదు"
    ],
    [
      "⏳",
      "Limited-time offer",
      4,
      "కొంత urgency, ఎక్కువ వాడితే trust పోతుంది"
    ],
    [
      "🧑‍✈️",
      "Final meeting లో senior join అవ్వడం",
      4,
      "Trust పెరుగుతుంది, కానీ team skill పెరగదు"
    ],
    [
      "👥",
      "ఇంకా ఎక్కువ site visits తేండి",
      1,
      "అదే conversion, ఎక్కువ effort waste"
    ],
    [
      "😤",
      "'Today only' hard pressure closing",
      1,
      "Customer దూరం అవుతారు"
    ],
    [
      "💸",
      "పెద్ద discounts ఇవ్వండి",
      0,
      "Margin పోతుంది, project value తగ్గినట్టు కనిపిస్తుంది"
    ]
  ],
  [
    [
      "🤝",
      "Post-sale relationship plan",
      10,
      "Registration, development updates: buyer తో regular touch"
    ],
    [
      "⚙️",
      "Automated updates + festival wishes",
      10,
      "ప్రతి buyer కి personal touch, effort లేకుండా"
    ],
    [
      "🎁",
      "Buyers కి referral reward program",
      10,
      "Happy buyers కొత్త buyers ని తెస్తారు"
    ],
    [
      "🏡",
      "Plot owners meet / site day",
      10,
      "Community feeling, referrals natural గా వస్తాయి"
    ],
    [
      "📱",
      "Buyers WhatsApp group",
      4,
      "Connect అవుతుంది, కానీ manage చేయకపోతే complaints board"
    ],
    [
      "🙏",
      "Registration రోజు మాత్రమే referral అడగండి",
      4,
      "కొంత help, relationship లేకుండా ఒక్కసారికే"
    ],
    [
      "💸",
      "Referrals బదులు ఇంకా ads",
      1,
      "Leads వస్తాయి, కానీ cheapest source ని వదిలేశారు"
    ],
    [
      "👥",
      "Referrals కోసం ఇంకా agents",
      1,
      "Relationship system లేకపోతే అదే result"
    ],
    [
      "🚪",
      "Registration తర్వాత follow-up అవసరం లేదు",
      1,
      "Buyer మర్చిపోతారు, referral రాదు"
    ],
    [
      "📢",
      "Buyers కి కొత్త project offers spam",
      0,
      "Irritation, negative word of mouth"
    ]
  ]
];

export const FARE_LINKS = {
  "talent": "https://www.fare.training",
  "course": "https://www.fare.training",
  "session": "https://wa.me/917674993040?text=Hi%20FARE%2C%20I%20would%20like%20a%20FREE%20session%20to%20discuss%20my%20team%20training%20needs",
  "share": "https://onemanwithoneserver.github.io/FARE_GAME/",
  "leads": "",
  "whatsapp": "https://wa.me/917674993040?text=Hi%20FARE%2C%20please%20add%20me%20to%20the%20team%20building%20tips%20WhatsApp%20community"
};

export const RX_Y_MAP = {
  "te": {
    "0": [
      "Drop-off ఇంకా పెరిగింది!",
      "crack",
      -0.25,
      -8
    ],
    "1": [
      "Wrong hire! Temporary solution, problem అలాగే ఉంది",
      "fall",
      -0.1,
      -5
    ],
    "2": [
      "ఈ stage కి కాదు, result లేదు",
      "fall",
      0,
      -3
    ],
    "4": [
      "Temporary solution మాత్రమే, కొంచెం help",
      "tape",
      0.15,
      3
    ],
    "6": [
      "మంచి hire, conversion కొంత పెరిగింది",
      "band",
      0.32,
      6
    ],
    "10": [
      "Perfect hire! Permanent solution, conversion పెరిగింది",
      "clamp",
      0.55,
      10
    ]
  },
  "en": {
    "0": [
      "Drop-off worsened! That hurt buyer trust.",
      "crack",
      -0.25,
      -8
    ],
    "1": [
      "Wrong hire! Temporary patch—the leak continues.",
      "fall",
      -0.1,
      -5
    ],
    "2": [
      "Right skill, wrong funnel stage—no impact here.",
      "fall",
      0,
      -3
    ],
    "4": [
      "Moderate fit—only a partial, temporary boost.",
      "tape",
      0.15,
      3
    ],
    "6": [
      "Strong hire! Conversion improved noticeably.",
      "band",
      0.32,
      6
    ],
    "10": [
      "Perfect hire! Permanent solution—conversion jumped!",
      "clamp",
      0.55,
      10
    ]
  }
};
export const RX_N_MAP = {
  "te": {
    "0": [
      "Risk తప్పించారు!",
      5
    ],
    "1": [
      "సరైన reject!",
      5
    ],
    "2": [
      "సరైన reject: వేరే stage person",
      3
    ],
    "4": [
      "OK, పర్వాలేదు",
      1
    ],
    "6": [
      "మంచి option miss అయింది",
      0
    ],
    "10": [
      "Best person ని వదిలేశారు!",
      -5
    ]
  },
  "en": {
    "0": [
      "Dodged a major risk!",
      5
    ],
    "1": [
      "Good reject! Saved time & budget.",
      5
    ],
    "2": [
      "Smart reject: suited for a different stage!",
      3
    ],
    "4": [
      "Fair pass—only a moderate fit.",
      1
    ],
    "6": [
      "Passed on a strong option.",
      0
    ],
    "10": [
      "Missed the best candidate for this stage!",
      -5
    ]
  }
};
export const PY_MAP = {
  "te": {
    "0": [
      "Drop-off ఇంకా పెరిగింది!",
      "crack",
      -0.25,
      -8
    ],
    "1": [
      "Bad Idea, problem అలాగే ఉంది",
      "fall",
      -0.1,
      -5
    ],
    "4": [
      "Temporary solution, కొంచెం help",
      "tape",
      0.12,
      3
    ],
    "10": [
      "Great Idea! Permanent solution, conversion పెరిగింది",
      "clamp",
      0.4,
      10
    ]
  },
  "en": {
    "0": [
      "Counterproductive! Funnel drop-off got worse.",
      "crack",
      -0.25,
      -8
    ],
    "1": [
      "Ineffective step—the core problem remains.",
      "fall",
      -0.1,
      -5
    ],
    "4": [
      "Partial fix—helps slightly, but not a full system.",
      "tape",
      0.12,
      3
    ],
    "10": [
      "High-Impact Fix! Conversion permanently improved.",
      "clamp",
      0.4,
      10
    ]
  }
};
export const PN_MAP = {
  "te": {
    "0": [
      "Risk తప్పించారు!",
      5
    ],
    "1": [
      "సరైన reject!",
      5
    ],
    "4": [
      "OK, పర్వాలేదు",
      1
    ],
    "10": [
      "మంచి Idea ని reject చేశారు!",
      -5
    ]
  },
  "en": {
    "0": [
      "Great call—avoided hurting the funnel!",
      5
    ],
    "1": [
      "Smart reject! Avoided wasted effort.",
      5
    ],
    "4": [
      "Fair pass—only a partial fix.",
      1
    ],
    "10": [
      "You skipped a high-impact solution!",
      -5
    ]
  }
};

export const RAW_CASES = [
  {
    "st": "lead",
    "t": "Team కి regular leads రావడం లేదు",
    "q": "Agents మళ్లీ మళ్లీ relatives కే call చేస్తున్నారు.",
    "leak": 0,
    "p": [
      [
        "📣",
        "Digital ads expert (Meta / Google)",
        10,
        "వారాల్లోనే fresh leads"
      ],
      [
        "🎬",
        "Content creator / real estate YouTuber",
        6,
        "నిరంతరం వచ్చే organic leads, long run లో"
      ],
      [
        "🧓",
        "Retired govt employee",
        4,
        "Community లో warm leads, కానీ త్వరగా అయిపోతాయి"
      ],
      [
        "📞",
        "Tele-caller (2–5 yrs exp)",
        2,
        "Followup, Site visits లో 🎯. ఇక్కడ call చేయడానికి leads లేవు"
      ],
      [
        "🎓",
        "Fresher / graduate",
        1,
        "Network లేదు, contacts లేవు"
      ],
      [
        "🖥️",
        "Online ad expert",
        10,
        "Portals నుంచి high-intent leads"
      ],
      [
        "🤝",
        "Existing plot agent",
        6,
        "Plot buyers network, closing experience"
      ],
      [
        "🏢",
        "Residential CP / agent",
        6,
        "Ready buyer network, closing experience"
      ],
      [
        "🛡️",
        "LIC / insurance agent",
        6,
        "Follow-up discipline, family trust"
      ],
      [
        "⚙️",
        "Lead automation expert",
        4,
        "Auto reminders, కానీ System ఇస్తారు, calls / meetings చేయరు"
      ],
      [
        "🧑‍✈️",
        "Experienced team lead / sales manager",
        4,
        "Targets, కానీ Salary ఎక్కువ, సొంతంగా ఈ పని చేయరు"
      ],
      [
        "🏦",
        "Bank loan DSA / ex-banker",
        2,
        "Closing లో 🎯. ఇక్కడ కాదు"
      ]
    ]
  },
  {
    "st": "follow",
    "t": "Leads ఉన్నాయి, కానీ ఎక్కువ leads interest చూపించడం లేదు",
    "q": "Friday lead. Tuesday call. అప్పటికే late.",
    "leak": 1,
    "p": [
      [
        "⚙️",
        "Lead automation expert",
        10,
        "Instant replies, auto reminders"
      ],
      [
        "🧑‍✈️",
        "Experienced team lead / sales manager",
        6,
        "Daily follow-up reviews, కానీ calls చేసేది team"
      ],
      [
        "🎬",
        "Content creator / real estate YouTuber",
        4,
        "Leads ని warm గా ఉంచుతారు, system కావాలి"
      ],
      [
        "📣",
        "Digital ads expert (Meta / Google)",
        2,
        "Leads stage లో 🎯. ఇక్కడ ఇంకా ఎక్కువ leads cold"
      ],
      [
        "🏪",
        "Small business owner",
        1,
        "Part-time, follow-up కి time లేదు"
      ],
      [
        "📞",
        "Tele-caller (2–5 yrs exp)",
        10,
        "Fast follow-up, visits book చేస్తారు"
      ],
      [
        "🛡️",
        "LIC / insurance agent",
        6,
        "Follow-up discipline, family trust"
      ],
      [
        "🤝",
        "Existing plot agent",
        4,
        "Plot buyers network, కానీ వేరే projects కూడా అమ్ముతారు, loyalty తక్కువ"
      ],
      [
        "🏢",
        "Residential CP / agent",
        4,
        "Ready buyer network, కానీ Apartments కి priority, plots కి focus తక్కువ"
      ],
      [
        "🖥️",
        "Online ad expert",
        2,
        "Leads లో 🎯. ఇక్కడ కాదు"
      ],
      [
        "🧓",
        "Retired govt employee",
        1,
        "Speed, volume తక్కువ"
      ],
      [
        "🔁",
        "Network marketing (MLM) background",
        1,
        "Selling కంటే downline కి focus"
      ]
    ]
  },
  {
    "st": "visit",
    "t": "300 leads, కేవలం 6 site visits",
    "q": "Enquiries బాగానే వస్తున్నాయి. Sunday ఎవరూ రావడం లేదు.",
    "leak": 2,
    "p": [
      [
        "📞",
        "Tele-caller (2–5 yrs exp)",
        10,
        "బాగా pitch చేసి, visits book చేస్తారు"
      ],
      [
        "🤝",
        "Existing plot agent",
        6,
        "Site visits చేయించిన experience, కానీ సొంత clients కే priority"
      ],
      [
        "🎬",
        "Content creator / real estate YouTuber",
        4,
        "Site reels తో interest, కానీ slow"
      ],
      [
        "🖥️",
        "Online ad expert",
        2,
        "Leads stage లో 🎯. ఎక్కువ leads, అదే leak"
      ],
      [
        "🎓",
        "Fresher / graduate",
        1,
        "ఇంకా pitch skills లేవు"
      ],
      [
        "🧑‍✈️",
        "Experienced team lead / sales manager",
        10,
        "Targets, reviews, coaching"
      ],
      [
        "🕵️",
        "Competitor agent",
        6,
        "Plotted buyers, competitor objections తెలుసు"
      ],
      [
        "🏢",
        "Residential CP / agent",
        4,
        "Ready buyer network, కానీ Apartments కి priority, plots కి focus తక్కువ"
      ],
      [
        "⚙️",
        "Lead automation expert",
        4,
        "Auto reminders, కానీ System ఇస్తారు, calls / meetings చేయరు"
      ],
      [
        "🧓",
        "Retired govt employee",
        1,
        "Speed, volume తక్కువ"
      ],
      [
        "🏪",
        "Small business owner",
        1,
        "Part-time, business busy అయితే drop"
      ],
      [
        "🔁",
        "Network marketing (MLM) background",
        1,
        "Selling కంటే downline కి focus"
      ]
    ]
  },
  {
    "st": "visit",
    "t": "కొన్ని Sundays లోనే site visits",
    "q": "ఎవరికి mood ఉంటే అప్పుడే పని.",
    "leak": 2,
    "p": [
      [
        "🧑‍✈️",
        "Experienced team lead / sales manager",
        10,
        "Weekly targets, Monday reviews"
      ],
      [
        "🕵️",
        "Competitor agent",
        6,
        "Weekly visit routine తెలుసు, buyers తీసుకొస్తారు"
      ],
      [
        "⚙️",
        "Lead automation expert",
        4,
        "Reminders తో no-shows తగ్గుతాయి, discipline కాదు"
      ],
      [
        "📈",
        "Mutual fund distributor / financial advisor",
        2,
        "Closing, Referrals లో 👍. Site visits నడపరు"
      ],
      [
        "🔁",
        "Network marketing (MLM) background",
        1,
        "Downline కి focus, visits కి కాదు"
      ],
      [
        "📞",
        "Tele-caller (2–5 yrs exp)",
        10,
        "Fast follow-up, visits book చేస్తారు"
      ],
      [
        "🤝",
        "Existing plot agent",
        6,
        "Plot buyers network, closing experience"
      ],
      [
        "🏢",
        "Residential CP / agent",
        4,
        "Ready buyer network, కానీ Apartments కి priority, plots కి focus తక్కువ"
      ],
      [
        "🎬",
        "Content creator / real estate YouTuber",
        4,
        "Trust పెంచే videos, కానీ Results slow, direct selling చేయరు"
      ],
      [
        "🧓",
        "Retired govt employee",
        1,
        "Speed, volume తక్కువ"
      ],
      [
        "🏪",
        "Small business owner",
        1,
        "Part-time, business busy అయితే drop"
      ],
      [
        "🎓",
        "Fresher / graduate",
        1,
        "Credibility, pitch skills లేవు"
      ]
    ]
  },
  {
    "st": "close",
    "t": "20 visits, 1 booking",
    "q": "అందరూ 'ఇంట్లో discuss చేసి చెప్తాం' అంటున్నారు.",
    "leak": 3,
    "p": [
      [
        "🤝",
        "Existing plot agent",
        10,
        "Plot buyers objections handle చేసి close చేస్తారు"
      ],
      [
        "🏢",
        "Residential CP / agent",
        6,
        "Closing experience ఉంది, plots కి కొంచెం adjust కావాలి"
      ],
      [
        "🛡️",
        "LIC / insurance agent",
        4,
        "Trust ఉంది, కానీ product knowledge తక్కువ"
      ],
      [
        "📣",
        "Digital ads expert (Meta / Google)",
        2,
        "Leads లో 🎯. ఎక్కువ visits, అదే result"
      ],
      [
        "🎓",
        "Fresher / graduate",
        0,
        "Negotiation లో discount ఇచ్చేసి deal పాడు చేస్తారు"
      ],
      [
        "🏦",
        "Bank loan DSA / ex-banker",
        10,
        "Loans, EMI doubts clear, credibility"
      ],
      [
        "📈",
        "Mutual fund distributor / financial advisor",
        6,
        "Investment language, investor clients"
      ],
      [
        "🕵️",
        "Competitor agent",
        6,
        "Plotted buyers, competitor objections తెలుసు"
      ],
      [
        "🧑‍✈️",
        "Experienced team lead / sales manager",
        6,
        "Targets, reviews, coaching"
      ],
      [
        "⚙️",
        "Lead automation expert",
        2,
        "Followup లో 🎯, Referrals లో 🎯. ఇక్కడ కాదు"
      ],
      [
        "🏪",
        "Small business owner",
        1,
        "Part-time, business busy అయితే drop"
      ],
      [
        "🔁",
        "Network marketing (MLM) background",
        0,
        "Selling కంటే downline కి focus"
      ]
    ]
  },
  {
    "st": "close",
    "t": "Investment value ని team explain చేయలేకపోతోంది",
    "q": "'Rates పెరుగుతాయి sir.' అంతే.",
    "leak": 3,
    "p": [
      [
        "🏦",
        "Bank loan DSA / ex-banker",
        10,
        "Loans, returns, credibility"
      ],
      [
        "📈",
        "Mutual fund distributor / financial advisor",
        6,
        "Value selling, investment language తెలుసు"
      ],
      [
        "💰",
        "Chit fund / finance agent",
        4,
        "Savings mindset తెలుసు, big-ticket experience తక్కువ"
      ],
      [
        "📞",
        "Tele-caller (2–5 yrs exp)",
        2,
        "Followup లో 🎯. Investment questions కి answer కాదు"
      ],
      [
        "🔁",
        "Network marketing (MLM) background",
        0,
        "'Double అవుతుంది sir' లాంటి over-promises, trust పోతుంది"
      ],
      [
        "🤝",
        "Existing plot agent",
        6,
        "Plot buyers network, closing experience"
      ],
      [
        "🏢",
        "Residential CP / agent",
        6,
        "Ready buyer network, closing experience"
      ],
      [
        "🕵️",
        "Competitor agent",
        6,
        "Plotted buyers, competitor objections తెలుసు"
      ],
      [
        "🧑‍✈️",
        "Experienced team lead / sales manager",
        6,
        "Targets, reviews, coaching"
      ],
      [
        "⚙️",
        "Lead automation expert",
        2,
        "Followup లో 🎯, Referrals లో 🎯. ఇక్కడ కాదు"
      ],
      [
        "🏪",
        "Small business owner",
        1,
        "Part-time, business busy అయితే drop"
      ],
      [
        "🎓",
        "Fresher / graduate",
        0,
        "Credibility, pitch skills లేవు"
      ]
    ]
  },
  {
    "st": "ref",
    "t": "కొన్న తర్వాత customers కనిపించరు",
    "q": "సంవత్సరానికి ఒక referral, అదీ కష్టమే.",
    "leak": 4,
    "p": [
      [
        "⚙️",
        "Lead automation expert",
        10,
        "Regular updates తో buyers తో relationship, referrals అడుగుతారు"
      ],
      [
        "🛡️",
        "LIC / insurance agent",
        6,
        "Families తో long relationships"
      ],
      [
        "🧑‍✈️",
        "Experienced team lead / sales manager",
        4,
        "Team ని referrals అడగమని push, కానీ system కాదు"
      ],
      [
        "🕵️",
        "Competitor agent",
        2,
        "Leads, Closing లో 👍. Old buyers తో connect ఉండదు"
      ],
      [
        "📣",
        "Digital ads expert (Meta / Google)",
        2,
        "Leads లో 🎯. Happy customers ని ignore చేస్తారు"
      ],
      [
        "📈",
        "Mutual fund distributor / financial advisor",
        6,
        "Investment language, investor clients"
      ],
      [
        "🏠",
        "Homemaker network (kitty / SHG groups)",
        6,
        "Women groups లో warm referrals"
      ],
      [
        "🎬",
        "Content creator / real estate YouTuber",
        6,
        "Trust పెంచే videos, organic leads"
      ],
      [
        "🤝",
        "Existing plot agent",
        4,
        "Plot buyers network, కానీ వేరే projects కూడా అమ్ముతారు, loyalty తక్కువ"
      ],
      [
        "🖥️",
        "Online ad expert",
        2,
        "Leads లో 🎯. ఇక్కడ కాదు"
      ],
      [
        "🔁",
        "Network marketing (MLM) background",
        1,
        "Selling కంటే downline కి focus"
      ],
      [
        "🎓",
        "Fresher / graduate",
        1,
        "Credibility, pitch skills లేవు"
      ]
    ]
  }
];

export const UI_TEXT = {
  "te": {
    "badge": "TL HIRING DESK",
    "heroBadge": "అకాడమీ హైరింగ్ సిమ్యులేటర్",
    "resBadge": "అకాడమీ బెంచ్‌మార్క్ పూర్తయింది",
    "eyebrow": "PLOTTED DEVELOPMENT TEAM LEADS",
    "title": "Fix Your <em>Sales Funnel</em>",
    "stages": [
      "Leads",
      "Followup",
      "Site visits",
      "Closing",
      "Referrals"
    ],
    "pipeNote": "ప్రతి stage లో leads చేజారిపోతున్నారు",
    "story1": "<strong>మీరు TL.</strong> Candidates లేదా Ideas ఒక్కొక్కటిగా మీ ముందుకు వస్తాయి",
    "story2": "సరైనది <span class='hl-emerald'>Hire / Implement</span> చేస్తే conversion పెరుగుతుంది",
    "story3": "సరిపోనిది <span class='hl-rose'>Reject</span> చేయండి. Wrong choice = temporary solution, మళ్లీ అదే problem!",
    "mode1Title": "Hire the Right Person",
    "mode1Sub": "Candidates ని interview చేయండి",
    "mode2Title": "Fix the Process",
    "mode2Sub": "సరైన Ideas ని implement చేయండి",
    "duration": "ఒక్కో game: 3 problems · ~3 నిమిషాలు",
    "shareBtn": "Share this game",
    "scoreLbl": "SCORE",
    "puddleLbl": "Lost leads",
    "tlName": "మీరు (TL)",
    "candName": "Candidate",
    "ideaName": "Idea",
    "teamLbl": "YOUR TEAM",
    "rejectBtn": "Reject",
    "hireBtn": "Hire",
    "implBtn": "Implement",
    "probPrefix": "మీ PROBLEM",
    "candTag": "నేను · CANDIDATE",
    "ideaTag": "IDEA · PROCESS STEP",
    "dropping": "DROP-OFF",
    "converting": "CONVERTING",
    "briefTitlePrefix": "PROBLEM",
    "briefRuleN": "Reject: సరిపోకపోతే",
    "startBtn": "Start",
    "roundFixed": "Drop-off fix అయింది! Sales flowing",
    "roundMid": "చాలావరకు fix అయింది",
    "roundLeak": "Drop-off ఇంకా ఉంది",
    "roundBestPeople": "ఈ problem కి best people",
    "roundBestIdeas": "ఈ problem కి best Ideas",
    "continueBtn": "Continue",
    "seeResultBtn": "Result చూడండి",
    "nextProbBtn": "Next problem",
    "homeBtn": "Home",
    "backBtn": "Back",
    "againBtn": "మళ్లీ ఆడండి",
    "resTitleHigh": "Funnel Expert TL!",
    "resTitleMid": "మంచి TL!",
    "resTitleLow": "ఇంకా నేర్చుకోవచ్చు",
    "lv2SwitchProcTitle": "Now: Fix the Process",
    "lv2SwitchProcSub": "సరైన Ideas ని implement చేయండి",
    "lv2SwitchHireTitle": "Now: Hire the Right Person",
    "lv2SwitchHireSub": "Candidates ని interview చేయండి",
    "wantTeamBtn": "Want to build your team?",
    "joinTitle": "ముందు మీ details ఇవ్వండి",
    "joinSub": "Game ఆడటానికి ఒక్కసారి మాత్రమే",
    "lblName": "మీ పేరు",
    "lblMob": "Mobile number",
    "phName": "ఉదా: Ramesh Kumar",
    "phMob": "10-digit mobile",
    "btnJoinStart": "Start game",
    "skipJoin": "Skip for now (testing) →",
    "joinNote": "మీ details FARE దగ్గర మాత్రమే ఉంటాయి. Team building tips & updates కోసం contact చేస్తాం.",
    "errName": "దయచేసి మీ పేరు ఇవ్వండి",
    "errMob": "సరైన 10-digit mobile number ఇవ్వండి",
    "ctaHeading": "Want to <em>build your team?</em>",
    "ctaSub": "సరైన profiles, సరైన skills, సరైన support",
    "cta1Title": "Hire trained profiles",
    "cta1Sub": "FARE Talent Pool · Zero commission",
    "cta1Go": "Hire now",
    "cta2Title": "Learn Team Building skills",
    "cta2Sub": "Open Plot Team Building course",
    "cta2Go": "Start free",
    "cta3Title": "Talk your training need with FARE",
    "cta3Sub": "1:1 session with a FARE expert",
    "cta3Go": "Book session",
    "cta4Title": "Join WhatsApp community",
    "cta4Sub": "Weekly team building tips",
    "cta4Go": "Join"
  },
  "en": {
    "badge": "TL HIRING DESK",
    "eyebrow": "PLOTTED DEVELOPMENT TEAM LEADS",
    "title": "Fix Your <em>Sales Funnel</em>",
    "stages": [
      "Leads",
      "Followup",
      "Site Visits",
      "Closing",
      "Referrals"
    ],
    "pipeNote": "Leads are leaking out at every stage of the funnel",
    "story1": "<strong>You are the TL.</strong> Candidates or Process Ideas will arrive one by one.",
    "story2": "<span class='hl-emerald'>Hire / Implement</span> the right fit to boost funnel conversion.",
    "story3": "<span class='hl-rose'>Reject</span> mismatches. A wrong choice is a temporary patch—the leak returns!",
    "mode1Title": "Hire the Right Person",
    "mode1Sub": "Interview candidates for each stage",
    "mode2Title": "Fix the Process",
    "mode2Sub": "Implement high-impact process ideas",
    "duration": "Each game: 3 problems · ~3 minutes",
    "shareBtn": "Share this game",
    "scoreLbl": "SCORE",
    "puddleLbl": "Lost leads",
    "tlName": "You (TL)",
    "candName": "Candidate",
    "ideaName": "Idea",
    "teamLbl": "YOUR TEAM",
    "rejectBtn": "Reject",
    "hireBtn": "Hire",
    "implBtn": "Implement",
    "probPrefix": "YOUR PROBLEM",
    "candTag": "CANDIDATE PROFILE",
    "ideaTag": "PROCESS IDEA",
    "dropping": "DROP-OFF",
    "converting": "CONVERTING",
    "briefTitlePrefix": "PROBLEM",
    "briefRuleN": "Reject: if unsuitable for this stage",
    "startBtn": "Start Round",
    "roundFixed": "Drop-off Fixed! Sales Flowing",
    "roundMid": "Mostly Fixed — Good Progress",
    "roundLeak": "Drop-off Still Persists",
    "roundBestPeople": "Best profiles for this problem",
    "roundBestIdeas": "Best process ideas for this problem",
    "continueBtn": "Continue",
    "seeResultBtn": "View Final Results",
    "nextProbBtn": "Next Problem",
    "homeBtn": "Home",
    "backBtn": "Back",
    "againBtn": "Play Again",
    "resTitleHigh": "Funnel Expert TL!",
    "resTitleMid": "Strong Team Lead!",
    "resTitleLow": "Room to Grow as TL",
    "lv2SwitchProcTitle": "Now: Fix the Process",
    "lv2SwitchProcSub": "Implement the right operational steps",
    "lv2SwitchHireTitle": "Now: Hire the Right Person",
    "lv2SwitchHireSub": "Interview & select the right candidates",
    "wantTeamBtn": "Want to build your team?",
    "joinTitle": "Enter Your Details to Start",
    "joinSub": "One-time quick registration before playing",
    "lblName": "Your Name",
    "lblMob": "Mobile Number",
    "phName": "e.g. Ramesh Kumar",
    "phMob": "10-digit mobile",
    "btnJoinStart": "Start Game",
    "skipJoin": "Skip for now (testing) →",
    "joinNote": "Your details stay strictly confidential with FARE for team-building tips & updates.",
    "errName": "Please enter your name",
    "errMob": "Please enter a valid 10-digit mobile number",
    "ctaHeading": "Want to <em>build your team?</em>",
    "ctaSub": "Right profiles, right skills, and dedicated FARE support",
    "cta1Title": "Hire trained profiles",
    "cta1Sub": "FARE Talent Pool · Zero commission",
    "cta1Go": "Hire now",
    "cta2Title": "Learn Team Building skills",
    "cta2Sub": "Open Plot Team Building course",
    "cta2Go": "Start free",
    "cta3Title": "Discuss your training need with FARE",
    "cta3Sub": "1:1 session with a FARE expert",
    "cta3Go": "Book session",
    "cta4Title": "Join WhatsApp community",
    "cta4Sub": "Weekly team building tips",
    "cta4Go": "Join"
  }
};

export const TE_TRANSLATIONS: Record<string, string> = {
  // Candidate Names
  "Existing plot agent": "అనుభవజ్ఞుడైన ప్లాట్ ఏజెంట్",
  "Residential CP / agent": "రెసిడెన్షియల్ CP / ఏజెంట్",
  "LIC / insurance agent": "LIC / ఇన్సూరెన్స్ ఏజెంట్",
  "Mutual fund distributor / financial advisor": "మ్యూచువల్ ఫండ్ / ఫైనాన్షియల్ అడ్వైజర్",
  "Chit fund / finance agent": "చిట్ ఫండ్ / ఫైనాన్స్ ఏజెంట్",
  "Retired govt employee": "రిటైర్డ్ ప్రభుత్వ ఉద్యోగి",
  "Small business owner": "చిన్న వ్యాపారవేత్త",
  "Homemaker network (kitty / SHG groups)": "హోమ్‌మేకర్ నెట్‌వర్క్ (కిట్టీ / SHG గ్రూప్స్)",
  "Network marketing (MLM) background": "నెట్‌వర్క్ మార్కెటింగ్ (MLM) బ్యాక్‌గ్రౌండ్",
  "Fresher / graduate": "ఫ్రెషర్ / గ్రాడ్యుయేట్",
  "Digital ads expert (Meta / Google)": "డిజిటల్ యాడ్స్ నిపుణుడు (Meta / Google)",
  "Content creator / real estate YouTuber": "కంటెంట్ క్రియేటర్ / రియల్ ఎస్టేట్ యూట్యూబర్",
  "Tele-caller (2–5 yrs exp)": "టెలీ-కాలర్ (2–5 ఏళ్ల అనుభవం)",
  "Online ad expert": "ఆన్‌లైన్ యాడ్స్ నిపుణుడు",
  "Competitor agent": "పోటీదారు ఏజెంట్",
  "Lead automation expert": "లీడ్ ఆటోమేషన్ నిపుణుడు",
  "Bank loan DSA / ex-banker": "బ్యాంక్ లోన్ DSA / మాజీ బ్యాంకర్",
  "Experienced team lead / sales manager": "అనుభవజ్ఞుడైన టీమ్ లీడ్ / సేల్స్ మేనేజర్",
  // Compensation Models
  "Commission": "కమిషన్",
  "Part-time / commission": "పార్ట్-టైమ్ / కమిషన్",
  "Salary + incentive": "జీతం + ఇన్సెంటివ్",
  "Salary / agency fee": "జీతం / ఏజెన్సీ ఫీజు",
  "Salary / per-video": "జీతం / వీడియోకు చెల్లింపు",
  "Salary / per-lead": "జీతం / లీడ్‌కు చెల్లింపు",
  "Commission / salary + incentive": "కమిషన్ / జీతం + ఇన్సెంటివ్",
  "Salary / per-loan": "జీతం / లోన్‌కు చెల్లింపు",
  "Salary + override": "జీతం + ఓవర్‌రైడ్",
  // Candidate Strengths & Role Descriptions
  "Plot buyers network, site visit & closing experience": "ప్లాట్ కొనుగోలుదారుల నెట్‌వర్క్, సైట్ విజిట్ & క్లోజింగ్ అనుభవం",
  "Ready buyer network, closing experience": "రెడీ కొనుగోలుదారుల నెట్‌వర్క్, క్లోజింగ్ అనుభవం",
  "Follow-up discipline, trust, family network": "ఫాలోఅప్ క్రమశిక్షణ, నమ్మకం, కుటుంబ నెట్‌వర్క్",
  "Value selling, investor clients": "విలువ ఆధారిత అమ్మకాలు, ఇన్వెస్టర్ క్లయింట్లు",
  "Local trust, regular-saver network": "స్థానిక నమ్మకం, పొదుపు చేసే వారి నెట్‌వర్క్",
  "Local customers network": "స్థానిక కస్టమర్ల నెట్‌వర్క్",
  "Recruitment energy, presentation skills": "రిక్రూట్‌మెంట్ ఉత్సాహం, ప్రెజెంటేషన్ నైపుణ్యం",
  "Loan, investment doubts clear, credibility": "లోన్ & పెట్టుబడి సందేహాల నివృత్తి, నమ్మకం",
  "Discipline, consistency, coaching": "క్రమశిక్షణ, నిలకడ, టీమ్ కోచింగ్",
  "Paid campaigns, lead forms, landing pages": "పెయిడ్ క్యాంపెయిన్స్, లీడ్ ఫారమ్స్, ల్యాండింగ్ పేజీలు నిర్వహిస్తారు",
  "Site videos, reels, location explainers, testimonials": "సైట్ వీడియోలు, రీల్స్, లొకేషన్ వివరణలు, టెస్టిమోనియల్స్ చేస్తారు",
  "WhatsApp automation, CRM, lead assignment, reminders, post-sale updates setup": "వాట్సాప్ ఆటోమేషన్, CRM, లీడ్ కేటాయింపు, రిమైండర్లు సెటప్ చేస్తారు",
  // Process Solutions & Case Titles
  "Meta / Google ads: clear target, daily tracking": "Meta / Google యాడ్స్: స్పష్టమైన లక్ష్యం, రోజువారీ ట్రాకింగ్",
  "Weekly site reels & content": "వారానికొకసారి సైట్ రీల్స్ & కంటెంట్",
  "Property exhibitions / local events": "ప్రాపర్టీ ఎగ్జిబిషన్స్ / స్థానిక ఈవెంట్లు",
  "WhatsApp automation + CRM reminders": "వాట్సాప్ ఆటోమేషన్ + CRM రిమైండర్లు",
  "5-minute first call rule + daily follow-up review": "5 నిమిషాల్లో తొలి కాల్ నియమం + రోజువారీ ఫాలోఅప్ సమీక్ష",
  "Telecalling & sales pitch training": "టెలీకాలింగ్ & సేల్స్ పిచ్ శిక్షణ",
  "Bulk SMS blast": "బల్క్ SMS ప్రచారం",
  "Weekly visit targets + Monday review": "వారాంతపు విజిట్ లక్ష్యాలు + సోమవారం సమీక్ష",
  "Fixed Sunday slots + free pickup": "ప్రతి ఆదివారం ఫిక్స్‌డ్ స్లాట్లు + ఉచిత పికప్",
  "Monthly visit contest": "నెలవారీ సైట్ విజిట్ పోటీ",
  "Objection handling training (role plays)": "అభ్యంతరాల పరిష్కార శిక్షణ (రోల్ ప్లేస్)",
  "Value selling: location growth, investment case": "విలువ ఆధారిత అమ్మకం: ప్రాంత అభివృద్ధి & పెట్టుబడి లాభం",
  "Product & investment knowledge sessions": "ప్రాజెక్ట్ & పెట్టుబడి అవగాహన సెషన్లు",
  "Brochure & FAQ sheet": "బ్రోచర్ & తరచుగా అడిగే ప్రశ్నల షీట్",
  "Limited-time offer": "పరిమిత కాలపు ఆఫర్",
  "'Today only' hard pressure closing": "'ఈరోజు మాత్రమే' అనే ఒత్తిడి క్లోజింగ్",
  "Post-sale relationship plan": "అమ్మకం తర్వాత కస్టమర్ అనుబంధ ప్రణాళిక",
  "Automated updates + festival wishes": "ఆటోమేటెడ్ అప్‌డేట్లు + పండుగ శుభాకాంక్షలు",
  "Plot owners meet / site day": "ప్లాట్ ఓనర్స్ మీట్ / సైట్ డే",
  "Buyers WhatsApp group": "కొనుగోలుదారుల వాట్సాప్ గ్రూప్",
  "Irritation, negative word of mouth": "విసుగు కలిగిస్తుంది, చెడు ప్రచారం వస్తుంది",
  "20 visits, 1 booking": "20 సైట్ విజిట్లు, కేవలం 1 బుకింగ్",
};

export function translateText(text: string, lang: 'en' | 'te'): string {
  if (lang === 'en') {
    return EN_TRANSLATIONS[text] || text;
  }
  return TE_TRANSLATIONS[text] || text;
}
