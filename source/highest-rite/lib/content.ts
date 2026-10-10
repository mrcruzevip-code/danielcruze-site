// Brand content data for The Highest Rite / Daniel Cruze
// PRODUCTION BUILD — all copy, images, books, socials, doctrine

// ── CDN Image URLs (optimized for mobile) ──
export const IMAGES = {
  hero: "/images/hiHseYIRZnypehcZ.jpg",
  aboutPortrait: "/images/suited-chair_8e0b5ce6.jpg",
  aboutSecondary: "/images/bathroom-washing_685eecc4.jpg",
  theMan: "/images/mirror-towel_62d9e09d.jpg",
  sacredMasculinity: "/images/outdoor-shirtless_03dde843.jpg",
  forWomen: "/images/torso-dark_598bc865.jpg",
  forMen: "/images/gym-leaning_4306f9b6.jpg",
  forCouples: "/images/poker-bw_1dadcff6.jpg",
  temple: "/images/poker-closeup_7b5b5aa8.jpg",
  workWithDaniel: "/images/gym-side_ecb586b1.jpg",
  contact: "/images/ItZMxLYusmCeOsge.jpg",
  journal: "/images/TTJOyjGRtoruQvHS.jpg",
  gallery: [
    "/images/city-night-whiskey_e831a6a7.jpg",
    "/images/hero-whiskey-dark_34aa3fe1.jpg",
    "/images/suited-chair_8e0b5ce6.jpg",
    "/images/white-shirt-night_e3a07e76.jpg",
    "/images/poker-bw_1dadcff6.jpg",
    "/images/gym-side_ecb586b1.jpg",
    "/images/outdoor-shirtless_03dde843.jpg",
    "/images/gym-leaning_4306f9b6.jpg",
    "/images/mirror-towel_62d9e09d.jpg",
    "/images/poker-drinking_92ef8119.jpg",
    "/images/poker-wide_910659a7.jpg",
    "/images/poker-lean_5ef7bccd.jpg",
    "/images/bathroom-towel_bdb6771c.jpg",
    "/images/bathroom-washing_685eecc4.jpg",
    "/images/torso-dark_598bc865.jpg",
  ],
  services: {
    "private-mentoring": "/images/white-shirt-night_e3a07e76.jpg",
    "intimacy-coaching": "/images/bathroom-towel_bdb6771c.jpg",
    "masculine-embodiment": "/images/poker-wide_910659a7.jpg",
    "couples-polarity": "/images/poker-drinking_92ef8119.jpg",
    "tantric-guidance": "/images/poker-lean_5ef7bccd.jpg",
    "retreat-travel": "/images/city-night-whiskey_e831a6a7.jpg",
    "soul-blueprint": "/images/bathroom-towel_bdb6771c.jpg",
  } as Record<string, string>,
  // 33rd House logos
  the33rdHouse: {
    wordmark: "/images/jTvoneHQxdNrkLmR.jpg",
    crest: "/images/jXhnNoPYqlORBtZJ.jpg",
  },
  // Book covers
  books: {
    pathOfTransformation: "/images/JEAPxcuKIPiAcekA.webp",
    sacredPrinciples: "/images/TFJThplzLeYHMeAW.webp",
  },
};

// ── Social Links ──
export const SOCIALS = {
  instagram: { label: "Instagram", handle: "@danielcruzelife", url: "https://instagram.com/danielcruzelife" },
  facebook: { label: "Facebook", handle: "@danielcruzelife", url: "https://facebook.com/danielcruzelife" },
  x: { label: "X", handle: "@DanielCruzeAU", url: "https://x.com/DanielCruzeAU" },
  telegramChannel: { label: "Sacred Masculinity", handle: "Channel", url: "https://t.me/SacredMasculinity" },
  telegramGroup: { label: "Sacred Masculine", handle: "Community", url: "https://t.me/SacredMasculine" },
  telegramPersonal: { label: "Daniel Cruze", handle: "Telegram", url: "https://t.me/danielcruzelife" },
  the33rdHouse: { label: "The 33rd House", handle: "the33rdhouse.org", url: "https://the33rdhouse.org" },
};

export const BRAND = {
  name: "Daniel Cruze",
  tagline: "Sacred Masculinity. Luxury Intimacy.\nThe Art of Sensual Dominance.",
  email: "daniel@danielcruze.com",
  seal: "Amor Aeternus. Libertas Sacra.",
  shortBio:
    "He is not a service. He is a standard.\n\nItalian-Australian. 2025 Australian Adult Industry Awards — Best Male Escort. Best Male Entrepreneur. Founder of The 33rd House. Published author.",
  fullBio:
    "Daniel Cruze is a practitioner of sacred masculinity, luxury intimacy, and initiated masculine depth. Based in Perth, Australia, he works with women, couples, and men seeking transformation through embodied presence, erotic intelligence, and devotional practice.\n\nHis work sits at the intersection of ancient initiatory traditions and modern relational depth. Every session, every encounter, every teaching is built on the same foundation: that true masculine power is not force — it is presence, it is devotion, it is the capacity to hold space without flinching.\n\nDaniel is the author of \"The Path of Transformation: From Ego to Essence\" and \"12 Sacred Principles for Living with Meaning\" — works that distil the initiatory path into language that can be lived, not merely read.\n\nHe is also the architect of The 33rd House — a 12-Gate, 144-Realm consciousness system that maps the full spectrum of human transformation, from primal awakening to transcendent integration.",
  philosophy:
    "Sacred masculinity is not a performance. It is the lived intersection of erotic intelligence, embodied presence, and initiated masculine depth. It asks a man to be sovereign in his body, truthful in his word, and devoted in his action.",
  awards: [
    "2025 Australian Adult Industry Awards — Best Male Escort",
    "2025 Australian Adult Industry Awards — Best Male Entrepreneur",
  ],
  locations: ["Perth", "Sydney", "Melbourne", "Touring"],
  baseCity: "Perth",
  website: "danielcruze.com.au",
  copyright: `Daniel Cruze © ${new Date().getFullYear()}`,
};

// ── Books ──
export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
}

export const BOOKS: Book[] = [
  {
    id: "path-of-transformation",
    title: "The Path of Transformation",
    subtitle: "From Ego to Essence",
    description:
      "A guide through the initiatory descent — from the constructed self to the essential self. This book maps the stages of masculine transformation: the shedding of ego armour, the confrontation with shadow, and the emergence of a man who leads from depth rather than defence.\n\nDrawing on five millennia of wisdom tradition — from Mesopotamian temple rites to Vedic initiation to the Gnostic bridal chamber — this work offers a practical, embodied path for the modern man who senses there is more beneath the surface.",
    coverImage: IMAGES.books.pathOfTransformation,
  },
  {
    id: "12-sacred-principles",
    title: "12 Sacred Principles",
    subtitle: "For Living with Meaning",
    description:
      "Twelve principles distilled from the initiatory path. Each principle is a gate — a threshold that, once crossed, changes how a man relates to himself, to others, and to the sacred.\n\nThis is not a self-help book. It is a field manual for men who have decided that surface living is no longer enough. Each principle maps directly to the 12-Gate system of The 33rd House, offering a bridge between ancient doctrine and daily practice.",
    coverImage: IMAGES.books.sacredPrinciples,
  },
];

// ── Services ──
export interface Service {
  id: string;
  title: string;
  subtitle: string;
  audience: "women" | "couples" | "men" | "all";
  description: string;
  whatToExpect: string[];
  whoIsItFor: string;
}

export const SERVICES: Service[] = [
  {
    id: "private-mentoring",
    title: "Private Mentoring",
    subtitle: "Sovereign guidance for the initiated path",
    audience: "all",
    description:
      "One-on-one mentoring for men and women seeking to deepen their relationship with masculine presence, personal sovereignty, and embodied leadership. This is not therapy. This is initiation into a higher standard of self.\n\nDaniel brings over a decade of lived practice — not theory borrowed from textbooks, but wisdom forged through direct experience of the initiatory path. Every session is held in complete confidence.",
    whatToExpect: [
      "Confidential, one-on-one sessions",
      "Tailored to your specific path and challenges",
      "Integration of body, mind, and relational intelligence",
      "Ongoing support between sessions",
    ],
    whoIsItFor:
      "Men seeking masculine depth and sovereignty. Women seeking to understand and attract initiated masculine energy. Investment is discussed during the enquiry process.",
  },
  {
    id: "intimacy-coaching",
    title: "Intimacy Coaching",
    subtitle: "The art of erotic depth and presence",
    audience: "women",
    description:
      "A sacred space for women to explore intimacy, erotic intelligence, and the experience of being truly met by masculine presence. Every session is held with complete discretion, safety, and devotion.\n\nThis is not performance. It is presence. The kind of presence that reads the room, the body, the breath — and responds with precision and care. Daniel creates an environment where a woman can fully relax into receiving.",
    whatToExpect: [
      "A safe, luxurious, and private environment",
      "Guided exploration of intimacy and presence",
      "No rush, no agenda — only depth",
      "Complete discretion guaranteed",
    ],
    whoIsItFor:
      "Women seeking to experience genuine masculine presence, erotic depth, and the art of being fully received. Investment is discussed during the enquiry process.",
  },
  {
    id: "masculine-embodiment",
    title: "Masculine Embodiment",
    subtitle: "From concept to lived experience",
    audience: "men",
    description:
      "Embodiment work for men who have read the books, listened to the podcasts, and still feel disconnected from their own masculine power. This is the bridge between knowing and being.\n\nThrough breathwork, somatic practices, and direct transmission, Daniel guides men from intellectual understanding into felt, lived masculine presence. The body remembers what the mind forgets.",
    whatToExpect: [
      "Breathwork and somatic practices",
      "Presence and grounding exercises",
      "Emotional leadership development",
      "Integration of shadow and strength",
    ],
    whoIsItFor:
      "Men who are ready to stop performing masculinity and start embodying it. Investment is discussed during the enquiry process.",
  },
  {
    id: "couples-polarity",
    title: "Couples Polarity Work",
    subtitle: "Restoring the magnetic field between partners",
    audience: "couples",
    description:
      "For couples who have lost the spark, the tension, the pull. This work restores polarity — the energetic dynamic between masculine and feminine that creates desire, depth, and devotion in relationship.\n\nDaniel works with both partners individually and together, identifying where polarity has collapsed and guiding its restoration through practice, not theory.",
    whatToExpect: [
      "Joint and individual sessions",
      "Polarity dynamics assessment",
      "Guided practices for home integration",
      "Clear boundaries and professional facilitation",
    ],
    whoIsItFor:
      "Couples seeking to reignite desire, deepen intimacy, and restore the energetic polarity in their relationship. Investment is discussed during the enquiry process.",
  },
  {
    id: "tantric-guidance",
    title: "Tantric Guidance",
    subtitle: "Beyond technique — into the sacred",
    audience: "all",
    description:
      "Tantric guidance rooted in authentic tradition, not new-age performance. This work integrates breath, energy, presence, and devotion into a lived practice of sacred sexuality.\n\nDaniel draws from genuine tantric lineage — not weekend workshop tantra, but the real current that flows through Vedic, Shaivite, and Gnostic traditions. The body becomes the temple. The breath becomes the prayer.",
    whatToExpect: [
      "Authentic tantric principles and practices",
      "Breath and energy work",
      "Integration of sexuality and spirituality",
      "Respectful, boundaried, and sacred space",
    ],
    whoIsItFor:
      "Individuals and couples seeking to integrate sexuality and spirituality through authentic tantric practice. Investment is discussed during the enquiry process.",
  },
  {
    id: "retreat-travel",
    title: "Retreat / Travel / Touring",
    subtitle: "The experience, wherever you are",
    audience: "all",
    description:
      "Daniel is available for extended engagements, retreats, and travel companionship. Whether in Perth, Sydney, Melbourne, or internationally, the work travels with the man.\n\nMulti-day immersive experiences offer a depth that single sessions cannot. The extended format allows for genuine transformation — not just insight, but integration.",
    whatToExpect: [
      "Multi-day immersive experiences",
      "Travel companionship with depth",
      "Retreat facilitation for groups",
      "Bespoke arrangements by enquiry",
    ],
    whoIsItFor:
      "Those seeking an extended, immersive experience beyond a single session. Investment is discussed during the enquiry process.",
  },
  {
    id: "soul-blueprint",
    title: "Soul Blueprint",
    subtitle: "Your personal map through the 12 Gates",
    audience: "all",
    description:
      "The Soul Blueprint is a personalised Chartography reading that maps your birth data to the 12-Gate consciousness system of The 33rd House. It reveals your primary Gate, your shadow patterns, your integration path, and the specific Realms that hold your deepest potential.\n\nThis is not astrology. It is not personality typing. It is a cosmological map drawn from 5,000 years of initiatory wisdom — Mesopotamian, Egyptian, Vedic, Hermetic — synthesised into a living system.",
    whatToExpect: [
      "Personalised PDF report (7-10 business days)",
      "Your primary Gate and shadow Gate identified",
      "Integration path through the Realm system",
      "Delivered via The 33rd House platform",
    ],
    whoIsItFor:
      "Anyone seeking a deeper understanding of their consciousness architecture. Investment discussed upon booking at the33rdhouse.org.",
  },
];

// ── Testimonials ──
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I have never felt so seen, so held, so completely met. Daniel doesn't perform presence — he is presence. The experience changed how I understand intimacy entirely.",
    author: "Verified Client",
    context: "Intimacy Coaching",
  },
  {
    id: "t2",
    quote:
      "After years of reading about masculinity, Daniel showed me what it actually feels like in the body. The difference between knowing and being is everything.",
    author: "Verified Client",
    context: "Masculine Embodiment",
  },
  {
    id: "t3",
    quote:
      "We came to Daniel as a last resort. Within three sessions, the polarity between us returned. We stopped being roommates and became lovers again.",
    author: "Verified Couple",
    context: "Couples Polarity Work",
  },
  {
    id: "t4",
    quote:
      "What Daniel offers is not a transaction. It is an experience that stays with you long after the encounter ends. He is the real thing.",
    author: "Verified Client",
    context: "Private Experience",
  },
  {
    id: "t5",
    quote:
      "Daniel has a rare ability to make you feel completely safe while simultaneously challenging you to go deeper. That combination is extraordinary.",
    author: "Verified Client",
    context: "Private Mentoring",
  },
];

// ── Journal Articles (including 3 esoteric pillar articles) ──
export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  readTime: string;
  body?: string;
}

export const ARTICLES: Article[] = [
  {
    id: "kundalini",
    title: "The Serpent Current: Kundalini and the Masculine Path",
    subtitle: "It does not rise because you want it to. It rises because you have finally stopped standing in its way.",
    excerpt:
      "Dormant at the base of the spine lies a force older than language. When it rises, it does not ask permission. It demands transformation.",
    category: "Esoteric Doctrine",
    readTime: "12 min",
    body: `There is a force coiled at the base of the human spine that every authentic wisdom tradition has acknowledged, mapped, and revered. The Vedic seers called it Kundalini — the serpent power. The Egyptians encoded it in the uraeus, the risen cobra on the pharaoh's crown. The Gnostics spoke of the pneuma, the divine breath that ascends through the pleroma. Different languages, different centuries, identical recognition: there is a dormant primordial energy within every human being, and its awakening is the central event of the initiatory path.

Kundalini rests in the Muladhara chakra — the root centre at the base of the spine. It is not metaphor. It is felt. When activated, it rises through the sushumna channel, the central energetic column, activating each energy centre in sequence: from survival to sexuality, from will to heart, from voice to vision, from vision to crown. Each activation is a Gate crossed. Each Gate crossed changes what a man can perceive, hold, and transmit.

In the 12-Gate system of The 33rd House, the kundalini current maps directly to the ascending path from Gate 1 through Gate 12. Gate 1 is the root — primal awareness, survival intelligence, the body's first language. Gate 12 is the crown — transcendent integration, the point where individual consciousness recognises itself as universal. Between them lie ten thresholds, each demanding something specific from the man who approaches.

The masculine kundalini path is distinct. It does not rise through surrender alone — it rises through initiated presence, embodied discipline, and sovereign will. A man does not coax the serpent. He earns its ascent by becoming a vessel worthy of the current. This means clearing the body of tension, the mind of noise, the heart of resentment, and the will of cowardice.

The practices are ancient and they are demanding. Breathwork that moves energy deliberately through the spinal column. Somatic holds that teach the nervous system to contain higher voltage without dissociation. Meditation that is not escape but confrontation — sitting with what arises until it transforms. Physical discipline that builds not just strength but capacity: the ability to hold intensity without collapsing or deflecting.

This is the work of Masculine Embodiment and Tantric Guidance — not as concepts, but as lived practice. The serpent does not respond to theory. It responds to readiness.

When kundalini rises fully — when the current completes its journey from root to crown — the result is not bliss in the way popular spirituality imagines it. It is integration. The man who has completed this circuit does not float above life. He stands more fully in it. His presence becomes palpable. His word carries weight. His capacity to hold space — for a woman, for a room, for a crisis — becomes effortless, because it is no longer performed. It is who he is.

The serpent current is not a goal. It is a consequence of doing the work. And the work begins where every authentic path begins: at the base, in the body, with the breath.`,
  },
  {
    id: "milk-and-honey",
    title: "Milk and Honey: The Alchemical Nourishment Within",
    subtitle: "The promised land was never a place. It was a state of the body — and the ancients encoded the instructions in plain sight.",
    excerpt:
      "The ancients spoke of a land flowing with milk and honey. They were not describing geography. They were describing the awakened human body.",
    category: "Esoteric Doctrine",
    readTime: "14 min",
    body: `Every sacred tradition that survived long enough to be written down contains a reference to milk and honey. The Torah promises a land flowing with them. The Vedic hymns describe soma — the lunar nectar — as the food of the gods. The Egyptian Book of the Dead speaks of the fields of Aaru where the blessed drink from rivers of abundance. The Gnostic Gospel of Philip describes the bridal chamber where the initiate receives the chrism — the anointing that nourishes the soul.

These are not agricultural metaphors. They are descriptions of internal alchemical processes that occur within the awakened human body.

Milk is the lunar current. It is cooling, descending, receptive. In the body, it corresponds to the secretion of the pineal gland — the cerebral spinal fluid that the ancients called amrita, the nectar of immortality. This fluid bathes the brain and spinal cord. When the body is in a state of deep stillness — through meditation, through breathwork, through the specific practices of inner alchemy — this fluid is refined. It becomes what the traditions call soma: a substance that nourishes consciousness itself.

Honey is the solar current. It is warming, ascending, active. It is the distilled essence of lived experience — wisdom that has been earned through fire, through failure, through the deliberate confrontation with shadow. Honey is not given. It is produced. Like the bee that visits a thousand flowers to create a single drop, the solar current is the result of sustained, disciplined engagement with life.

In the 12-Gate system of The 33rd House, milk maps to the upper Gates — Gates 10 through 12, the realm of Galactic consciousness, transcendent awareness, and crown completion. These are the Gates where individual identity dissolves into universal recognition. The milk current descends from these heights, nourishing every Gate below it.

Honey maps to the middle Gates — Gates 4 through 6, the realm of Integration, Truth, and embodied understanding. These are the Gates where abstract knowledge becomes lived wisdom. The honey current rises from the foundation of direct experience, sweetening and solidifying everything above it.

When both currents flow simultaneously — when the milk descends and the honey rises — they meet in the heart centre. This meeting is what the alchemists called the coniunctio, the sacred marriage. It is not a union of two people. It is the union of two currents within a single body. The result is wholeness: a man who is both receptive and active, both still and dynamic, both surrendered and sovereign.

This is the foundation of the Soul Blueprint — the personalised Chartography reading offered through The 33rd House. The Blueprint maps where your milk current flows strongest, where your honey current is blocked, and where the sacred marriage is waiting to occur. It is not prediction. It is diagnosis. And from diagnosis comes the specific path of practice that will bring both currents into alignment.

The 12 Sacred Principles are the practical application of this doctrine. Each principle is a practice that either refines the milk current (stillness, receptivity, surrender) or strengthens the honey current (discipline, truth, sovereign action). Together, the twelve principles create the conditions for the internal alchemy that every tradition has pointed toward.

The land flowing with milk and honey is not a place you travel to. It is a state you cultivate within. And the cultivation begins with understanding that you already contain both currents — they are simply waiting to be recognised, refined, and united.`,
  },
  {
    id: "christos-oil",
    title: "The Christos Oil: The Anointed Substance Within",
    subtitle: "The anointing was never meant to come from outside. The sacred oil is produced within — and most men waste it before it can ascend.",
    excerpt:
      "Christ is not a name. It is a title. Christos means 'the anointed one.' The anointing is not external. It is a sacred substance produced within the human body.",
    category: "Esoteric Doctrine",
    readTime: "15 min",
    body: `The word Christ does not mean what most people think it means. It is not a surname. It is not exclusive to one historical figure. Christos is a Greek word meaning "the anointed one" — and anointing, in every ancient tradition, refers to a specific substance applied to a specific location for a specific purpose.

In the esoteric anatomy of the human body, this substance is the sacred cerebral spinal fluid — a refined secretion produced monthly in the solar plexus, the region the ancients called the "manger" or the "cave." This is not metaphor. The solar plexus is a dense cluster of nerve ganglia that produces a measurable biochemical secretion. Every 29.5 days — in rhythm with the lunar cycle — this secretion is produced.

In most human beings, this substance is consumed. It is burned up by stress, by reactive emotion, by unconscious living. The body produces it, and the body wastes it. The ancients understood this. Every tradition that speaks of fasting, of sexual continence, of emotional discipline, of breathwork — these are not moral prescriptions. They are alchemical instructions for preserving the sacred oil so that it can complete its journey.

When preserved — when the body is held in a state of sufficient stillness, discipline, and awareness — the Christos oil rises. It ascends the spinal column along the same pathway as the kundalini current. It passes through each vertebra, each Gate, each energy centre. At each level, it is refined further. By the time it reaches the upper chambers of the brain, it has been transformed from a crude biochemical secretion into something the Gnostics called pneuma — spirit made substance.

The destination is the fourth ventricle of the brain — the region the ancients called the kranion, the "place of the skull," the Holy of Holies. When the Christos oil reaches this chamber and is received there, the result is what every tradition has called illumination, enlightenment, or gnosis. It is not a belief. It is a biochemical, energetic, and consciousness event that transforms the individual permanently.

The Gnostic tradition describes this as the "bridal chamber" — the internal sacred union of masculine and feminine currents. The ascending oil (masculine, solar, active) meets the descending soma (feminine, lunar, receptive) in the cranial vault. Their union produces a third substance — the chrism, the anointing — that floods the entire nervous system with a quality of awareness that cannot be manufactured by thought, by drugs, or by external experience.

In the 12-Gate system of The 33rd House, the Christos oil maps to the apex of Gate 12 — Crown completion. This is the final Gate, the point where the ascending current has nowhere left to rise and must therefore integrate with everything below it. A man who has completed this circuit does not leave the world. He returns to it — but he returns as something different. His presence carries a quality that others can feel but cannot name. His words land differently. His silence holds weight. He has been anointed — not by an external authority, but by his own refined substance.

This is the deepest layer of the work offered through The 33rd House Elder tier and the Retreat and Initiation experiences. It is not taught in a weekend. It is not transmitted through a book. It is cultivated through sustained practice, preserved through discipline, and completed through grace — the moment when the body, having done everything it can, receives what it cannot manufacture.

The path to the Christos oil is the path through all twelve Gates. There are no shortcuts. But for the man who walks it — who does the breathwork, the somatic practice, the shadow confrontation, the emotional leadership, the sexual discipline, the devotional surrender — the anointing is not a myth. It is the natural consequence of a life lived in alignment with the sacred architecture of the human body.

You were built for this. The substance is already within you. The path is already mapped. The only question is whether you will walk it.`,
  },
  {
    id: "a1",
    title: "Sacred Masculinity in the Modern Age",
    subtitle: "The collapse was not sudden. It was a slow forgetting — and the remembering will cost you everything you thought you were.",
    excerpt:
      "What does it mean to be a man of depth in an era that rewards surface? The answer begins not in the mind, but in the body.",
    category: "Sacred Masculinity",
    readTime: "10 min",
    body: `There is a question being asked in every corner of the modern world, though most men lack the language to articulate it. It surfaces as restlessness. As a vague dissatisfaction that no promotion, no relationship, no achievement can resolve. It is the question of what it means to be a man — not in the performative sense that culture rewards, but in the ontological sense that the soul demands.

The modern age did not kill masculinity. It replaced it with a counterfeit. It offered men two options: dominance without depth, or sensitivity without spine. The alpha archetype — loud, territorial, emotionally illiterate — was presented as strength. The alternative — the soft, apologetic, self-effacing man — was presented as evolution. Neither is masculine. Both are reactions. And a man built on reaction is a man built on sand.

Sacred masculinity begins where reaction ends. It is not a philosophy. It is not a movement. It is a lived state — the condition of a man who has descended into his own body, confronted what he found there, and emerged not softer or harder, but more real. The sacred masculine man does not perform presence. He is present. He does not talk about holding space. He holds it — because his nervous system has been trained to contain intensity without collapsing or deflecting.

This distinction matters because the modern world is drowning in men who have ideas about masculinity but no experience of it. They have read the books. They have attended the workshops. They can articulate the concepts of emotional intelligence, of vulnerability, of conscious relating. But when the room gets tense, when the woman in front of them trembles, when the crisis arrives without warning — the concepts evaporate. What remains is either aggression or retreat. The two default settings of the uninitiated man.

The initiated man has a third option: stillness. Not passivity — stillness. The capacity to remain fully present, fully feeling, fully aware, without the compulsion to fix, flee, or perform. This is the foundation of sacred masculinity, and it cannot be learned from a book. It is forged in the body through practice, through confrontation, through the slow and often painful process of meeting every part of yourself you have been trained to avoid.

The body is where the work begins because the body is where the wound lives. Every man carries the imprint of the masculinity he was shown — by his father, by his culture, by the systems that shaped him before he had the capacity to choose. Some of these imprints are useful. Most are not. The man who was taught that anger is strength carries tension in his jaw and shoulders. The man who was taught that vulnerability is weakness carries numbness in his chest and belly. The man who was taught that his worth is measured by his output carries exhaustion in his bones and calls it discipline.

Sacred masculinity does not add another layer on top of these imprints. It strips them away. It asks the man to feel what he has been avoiding — not as a therapeutic exercise, but as an initiatory demand. You cannot lead what you cannot feel. You cannot hold a woman if you cannot hold yourself. You cannot transmit depth if you are running from your own.

The practices are not complicated. They are demanding. Breathwork that moves stagnant energy through the body. Somatic awareness that teaches the nervous system to expand its capacity. Emotional confrontation that refuses the comfortable narratives. Physical discipline that builds not just strength but presence — the kind of presence that enters a room before you do.

This is not self-improvement. Self-improvement assumes the self is a project to be optimised. Sacred masculinity assumes the self is a vessel to be cleared, strengthened, and filled with something worth transmitting. The difference is not semantic. It is the difference between a man who is always becoming and a man who has arrived — not at perfection, but at truth.

The modern age will not hand this to you. It will hand you distractions dressed as purpose, comfort dressed as peace, and performance dressed as power. The man who sees through these counterfeits and chooses the harder path — the path of embodied, initiated, sovereign masculinity — does not do so because it is popular. He does so because the alternative has become intolerable.

The remembering has a cost. It will cost you the version of yourself that was built to be acceptable. It will cost you relationships that were built on that performance. It will cost you the comfort of living at the surface of your own life. But what it returns is something no amount of external success can manufacture: the experience of being fully alive, fully present, and fully yourself — in a world that has forgotten what that means.

The age does not need more men. It needs men who have done the work.`,
  },
  {
    id: "a2",
    title: "What Erotic Intelligence Actually Means",
    subtitle: "It is not what you do. It is what you perceive \u2014 and how precisely you respond to what is unspoken.",
    excerpt:
      "Erotic intelligence is not technique. It is the capacity to read the room, the body, the breath \u2014 and respond with precision and devotion.",
    category: "Intimacy",
    readTime: "10 min",
    body: `The modern world has reduced the erotic to mechanics. It has catalogued positions, optimised techniques, and turned the most intimate exchange between two human beings into a performance metric. The result is a generation that knows more about sex than any generation in history and understands less about eroticism than any civilisation that preceded it.

Erotic intelligence is not technique. It is perception. It is the capacity to read what is happening beneath the surface \u2014 in the breath, in the micro-tensions of the body, in the quality of silence between two people \u2014 and to respond with precision, with timing, and with devotion. A man with erotic intelligence does not follow a script. He follows the woman. Not her words. Her body. Her nervous system. The subtle shifts that tell him everything her language cannot.

This capacity is not innate. It is developed. And it is developed not through sexual experience alone, but through the cultivation of three specific faculties: somatic awareness, emotional attunement, and sovereign presence.

Somatic awareness is the ability to feel your own body with granular precision. Most men live from the neck up. They think about sensation rather than feeling it. They are aware of arousal as a concept \u2014 a pressure, a drive, a goal \u2014 but they are not aware of the thousand subtler signals that precede and surround it. The warmth in the palms. The shift in breathing. The quality of contact between skin and skin. A man who cannot feel his own body cannot feel another\u2019s. And a man who cannot feel another\u2019s body is guessing. He may guess well. But guessing is not intelligence.

Emotional attunement is the ability to perceive emotional states without being told. It is the faculty that registers when a woman\u2019s breath catches \u2014 not from pleasure, but from fear. When her body stiffens \u2014 not from resistance, but from a memory she has not spoken. When her surrender deepens \u2014 not because she has decided to, but because she feels safe enough to stop deciding. These signals are not hidden. They are broadcast constantly. But they are broadcast on a frequency that most men have never learned to receive, because receiving requires stillness, and stillness requires the absence of agenda.

Sovereign presence is the ability to hold space without collapsing into it. The erotically intelligent man is not consumed by the encounter. He is not lost in his own sensation. He is not performing for validation. He is present \u2014 fully, completely, without the need for the moment to be anything other than what it is. This presence is what allows the woman to let go. Not because she has been convinced. Not because the technique is correct. But because the man holding her is not going anywhere. He is not rushing toward a destination. He is not afraid of what she might feel. He is there \u2014 and his thereness is the container that makes everything else possible.

The development of erotic intelligence follows the same path as every other form of initiated masculine depth. It begins in the body. Breathwork that expands sensory capacity. Somatic practices that teach the hands to listen. Meditation that cultivates the ability to perceive without interpreting. Physical discipline that builds the stamina to remain present when every instinct says to accelerate.

It continues through emotional work. The man who has not confronted his own shame around desire will project that shame onto every intimate encounter. The man who has not grieved his own unmet needs will unconsciously demand that every woman meet them. The man who has not examined his relationship to power will confuse dominance with depth. Erotic intelligence requires a clean instrument \u2014 and cleaning the instrument is the work that most men skip.

The erotically intelligent man does not arrive at mastery through accumulation. He arrives through refinement. Each encounter teaches him something \u2014 not about technique, but about attention. About the difference between touching a body and meeting a person. About the vast distance between making someone feel good and making someone feel seen.

This is what erotic intelligence actually means. It is not a skill set. It is a way of being \u2014 a quality of attention so refined, so present, so free of agenda that the woman in its field does not need to perform, protect, or pretend. She simply is. And in that space \u2014 the space created by a man who has done the work to hold it \u2014 the erotic becomes what it was always meant to be: not an act, but a communion.`,
  },
  {
    id: "a3",
    title: "The 33rd House: A Map of Consciousness",
    subtitle: "It was not built to be believed. It was built to be walked.",
    excerpt:
      "Beyond the private session is a larger initiatory world. A system. A doctrine. A map of human consciousness evolution.",
    category: "The 33rd House",
    readTime: "12 min",
    body: `The 33rd House is a system. Not a philosophy. Not a brand. Not a community with a membership tier. It is a structural map of human consciousness \u2014 a framework that charts the territory between primal survival and transcendent integration, and provides the practices, the language, and the initiatory thresholds required to move through it.

The system is built on a single premise: consciousness is not random. It has architecture. It moves through identifiable stages, each with its own challenges, capacities, and demands. Every wisdom tradition that has endured long enough to be studied has recognised this architecture \u2014 the chakra system of the Vedic tradition, the sephiroth of the Kabbalistic Tree of Life, the stages of alchemical transformation, the Gnostic ascent through the aeons. Different maps. Same territory. The 33rd House is a contemporary synthesis \u2014 a map drawn from the convergence of these traditions, translated into language and practice that a modern man can use without requiring decades of monastic training.

The architecture is organised into 12 Gates and a 13th \u2014 the Gate of Return. Each Gate represents a distinct level of consciousness, with its own realm of experience, its own initiatory demand, and its own consequence for the man who crosses it.

The first three Gates \u2014 Primal Awareness, Sacred Desire, and Sovereign Will \u2014 form the Foundation. These are the Gates of the body. They govern survival, sexuality, and personal power. Most men spend their entire lives cycling between these three Gates, mistaking the intensity of primal experience for the fullness of a lived life. The Foundation is essential. But it is not the destination.

Gates 4 through 6 \u2014 Heart Intelligence, Authentic Voice, and Inner Vision \u2014 form the Integration layer. These are the Gates where raw experience becomes wisdom. Where a man learns to feel without being consumed, to speak without performing, to see without projecting. The Integration layer is where most men\u2019s work operates \u2014 and where most men\u2019s work stops. It produces functional, emotionally literate men. It does not produce initiated ones.

Gates 7 through 9 \u2014 Universal Connection, Cosmic Memory, and Galactic Consciousness \u2014 form the Depth layer. These are the Gates that the esoteric traditions guard most carefully, because they involve experiences that the uninitiated mind cannot contextualise. Kundalini activation. Ancestral memory. The dissolution of the boundary between individual and collective consciousness. These Gates are not reached through effort alone. They are reached through the combination of sustained practice and what the traditions call grace \u2014 the moment when the system opens because the vessel has been prepared.

Gates 10 through 12 \u2014 Transcendent Awareness, Divine Integration, and Crown Completion \u2014 form the Transcendence layer. These are the Gates described in the Christos Oil doctrine, in the Milk and Honey teaching, in every tradition that speaks of illumination. They are not theoretical. They are experiential. But they are experienced only by those who have crossed every threshold below them.

The 13th Gate \u2014 the Gate of Return \u2014 is not above the 12th. It is through it and back. The initiated man does not ascend and leave. He ascends, integrates, and returns to the world carrying what he has received. This is the distinction between the mystic and the master. The mystic touches the transcendent and stays there. The master touches it and comes back \u2014 changed, but functional. Present in the world, not above it.

The Four Great Currents run through all 13 Gates: Breath, Thought, Meaning, and Awareness. These are the primary channels through which consciousness moves. Breath is the body\u2019s current \u2014 the most immediate, the most accessible, the foundation of every practice. Thought is the mind\u2019s current \u2014 not the chatter of the untrained mind, but the directed, refined cognition of a consciousness that has learned to think without being thought. Meaning is the soul\u2019s current \u2014 the faculty that perceives purpose, pattern, and significance in experience. Awareness is the spirit\u2019s current \u2014 the witnessing presence that observes all other currents without being captured by any of them.

The Soul Blueprint \u2014 the personalised Chartography offered through The 33rd House \u2014 maps an individual\u2019s position within this architecture. It identifies which Gates have been crossed, which are active, which are blocked, and which currents are flowing or stagnant. From this diagnosis comes a specific path of practice \u2014 not generic self-improvement, but targeted initiatory work calibrated to where you actually are, not where you think you are.

The 33rd House was not built to be admired. It was not built to be debated. It was built to be used \u2014 by men and women who have exhausted the surface-level offerings of the modern world and are ready for a system that treats consciousness as the serious, structured, demanding territory that it is.

The map is drawn. The Gates are real. The only question is which one you are standing at \u2014 and whether you are willing to cross it.`,
  },
  {
    id: "a4",
    title: "Polarity Is Not a Game \u2014 It Is a Force",
    subtitle: "You cannot manufacture attraction. You can only remove what is blocking it.",
    excerpt:
      "The magnetic pull between masculine and feminine is not manufactured. It is restored. And it begins with truth.",
    category: "Polarity",
    readTime: "10 min",
    body: `Polarity is the most misunderstood force in modern relating. It has been reduced to a dating strategy \u2014 a set of behaviours designed to create attraction through performance. Lean back. Be mysterious. Withhold. Pursue. The entire framework treats the magnetic pull between masculine and feminine as a game to be won, rather than a force to be understood.

It is not a game. It is physics. And like all physics, it operates whether you believe in it or not.

The masculine pole is stillness, direction, and presence. The feminine pole is movement, expression, and radiance. When these two poles are clearly differentiated \u2014 when each person is fully inhabiting their own energetic signature \u2014 the result is not attraction. It is magnetism. The distinction matters. Attraction can be manufactured. Magnetism cannot. Magnetism is what happens when two fields are strong enough, and different enough, to pull toward each other without effort.

The collapse of polarity in the modern world is not a cultural accident. It is the predictable consequence of a civilisation that has confused equality with sameness. Men and women are equal in dignity, in worth, in capacity. They are not the same in energetic function. The attempt to flatten this difference \u2014 to make both partners interchangeable, to eliminate the tension between masculine and feminine \u2014 does not create harmony. It creates neutrality. And neutrality is the death of desire.

Every couple that has lost its spark knows this, even if they cannot name it. The relationship is functional. The logistics work. The communication is adequate. But the charge is gone. The room no longer shifts when one of them enters. The touch no longer lands with weight. They have become teammates \u2014 efficient, cooperative, and sexually dead.

This is not a failure of love. It is a failure of polarity. And it cannot be fixed by communication alone, because communication operates in the realm of the mind, and polarity operates in the realm of the body.

Restoring polarity begins with a recognition that most people resist: you have collapsed into the middle. The masculine partner has softened his edges to avoid conflict. The feminine partner has hardened hers to maintain control. Both adaptations are survival strategies, and both are polarity killers. The masculine man who cannot hold a boundary without guilt is not safe \u2014 he is absent. The feminine woman who cannot surrender without anxiety is not strong \u2014 she is armoured.

The work is not about adopting roles. It is about clearing the obstructions that prevent each person from inhabiting their natural pole. For the masculine partner, this means reclaiming stillness, direction, and the willingness to lead \u2014 not as dominance, but as service. It means being the man who can look at chaos and not flinch. Who can hold his partner\u2019s storm without trying to fix it, explain it, or escape it.

For the feminine partner, it means reclaiming expression, surrender, and the willingness to be moved \u2014 not as weakness, but as power. It means trusting that the masculine container is strong enough to hold what she carries. This trust is not given blindly. It is earned \u2014 by the man who has done the work to become trustworthy.

The practices that restore polarity are somatic, not conceptual. Breathwork that opens the body\u2019s energetic channels. Eye contact exercises that rebuild the capacity to be seen without deflecting. Touch practices that teach the nervous system to give and receive without agenda. These are not techniques. They are recalibrations \u2014 moments where the body remembers what the mind has forgotten.

Polarity is not something you create between two people. It is something you stop preventing. The force is already there. It has been there since the first breath. The work is not to manufacture the spark. The work is to remove the insulation \u2014 the fear, the control, the performance, the decades of conditioning that taught you to be anything other than what you are.

When polarity is restored, the effect is immediate and unmistakable. The room changes. The air between two people becomes charged. Touch becomes electric, not because of technique, but because of truth. The masculine holds. The feminine opens. And in that exchange \u2014 that ancient, wordless, full-body exchange \u2014 both partners remember what they came together to experience.

This is not romance. This is force. And force does not negotiate.`,
  },
  {
    id: "a5",
    title: "Why Men's Work Matters Now",
    subtitle: "The cost of uninitiated men is not theoretical. It is visible in every broken home, every numb marriage, every boy who never learned what strength actually is.",
    excerpt:
      "The cost of uninitiated men is not theoretical. It is visible in every broken home, every numb marriage, every boy who never learned what strength actually is.",
    category: "Men's Work",
    readTime: "10 min",
    body: `There is a crisis of masculinity in the modern world, but it is not the crisis that mainstream culture describes. The popular narrative says men have too much power. The deeper truth is that men have forgotten what power is. They have confused it with control. With status. With the ability to dominate a room, a market, a relationship. And in that confusion, they have become the most dangerous thing a man can be: strong enough to cause damage, but not developed enough to know the difference between force and leadership.

Men\u2019s work exists because the old containers are gone. Every civilisation that produced men of depth had structures for it \u2014 rites of passage, elder councils, initiatory ordeals that took a boy and, through deliberate confrontation with his own limits, returned him as a man. These structures were not optional. They were understood as essential. A boy who had not been initiated was not trusted with responsibility, with a family, with a seat at the council. Not because he was incapable, but because he was untested. And an untested man is an unpredictable man.

The modern world eliminated these structures and replaced them with nothing. The assumption was that masculinity would develop naturally \u2014 that education, employment, and social conditioning would produce mature men without the need for deliberate initiation. The assumption was wrong. What it produced instead was a generation of men who are chronologically adult and developmentally adolescent. Men who react instead of respond. Who perform instead of feel. Who accumulate instead of contribute. Who know how to succeed but not how to lead.

The consequences are not abstract. They are measured in divorce rates, in fatherless homes, in the epidemic of male loneliness, in the quiet desperation of men who have achieved everything they were told to achieve and feel nothing. They are measured in the women who cannot find a man they can trust \u2014 not because trustworthy men do not exist, but because trustworthiness requires a depth that has not been cultivated. They are measured in the boys who are watching, learning, and replicating the only model of masculinity they have been shown.

Men\u2019s work interrupts this cycle. It does so not through ideology, but through practice. The work is physical \u2014 because the body is where the uninitiated man stores everything he has not processed. The tension in the jaw that holds back the words he never said. The rigidity in the chest that guards the grief he was taught to suppress. The restlessness in the legs that carries the energy he was never shown how to channel. The body does not lie, and the body does not forget. Until a man meets what his body is holding, he will continue to act it out \u2014 in his relationships, in his parenting, in his leadership, in his silence.

The work is emotional \u2014 because emotional capacity is the single greatest predictor of a man\u2019s ability to lead, to love, and to remain present under pressure. The man who cannot sit with his own sadness will flee from his partner\u2019s. The man who cannot acknowledge his own fear will mask it with aggression. The man who cannot grieve will harden. And a hardened man is not a strong man. He is a brittle man \u2014 one crisis away from shattering.

The work is relational \u2014 because masculinity does not develop in isolation. It develops in the presence of other men who are willing to tell the truth. Not the comfortable truth. The real truth. The truth that says: you are hiding. You are performing. You are running from the thing that would set you free if you had the courage to face it. This kind of truth can only come from men who have faced it themselves. It cannot come from a book, a podcast, or a therapist who has never sat in the fire.

The work is spiritual \u2014 not in the religious sense, but in the sense that a man who has not asked the deepest questions about his own existence will live a shallow life regardless of his achievements. Why am I here? What am I willing to die for? What am I transmitting to the people who depend on me? These are not philosophical luxuries. They are the questions that separate a man who is merely alive from a man who is living with purpose.

Men\u2019s work matters now because the cost of not doing it is no longer contained. It spills into families, into communities, into the collective field. Every woman who has given up on finding a man of depth is carrying the cost. Every child who is being raised without an initiated father is carrying the cost. Every man who lies awake at three in the morning, wondering why none of it feels like enough, is carrying the cost.

The work is available. The path is mapped. The only barrier is the willingness to begin.`,
  },
  {
    id: "a6",
    title: "Ritual, Initiation, and the Threshold",
    subtitle: "The old rites are gone. The need for them is not. And the man who has never been broken open remains, in the deepest sense, unfinished.",
    excerpt:
      "The old rites are gone. The need for them is not. What happens when a man creates his own threshold?",
    category: "Ritual & Initiation",
    readTime: "11 min",
    body: `Every culture that produced men of substance had one thing in common. Not wealth. Not military power. Not technological sophistication. They had a threshold \u2014 a deliberate, structured, often painful moment where the boy was separated from the world he knew, confronted with something larger than himself, and returned as something different. The Lakota had the vision quest. The Spartans had the agoge. The Eleusinian Greeks had the Mysteries. The Aboriginal Australians had walkabout. The forms varied. The function was identical: to break the boy open so the man could emerge.

These were not symbolic gestures. They were ordeals. The boy was taken from his mother. He was placed in conditions of genuine difficulty \u2014 isolation, fasting, physical challenge, exposure to forces he could not control. He was watched by elders who had crossed the same threshold and knew what it demanded. And at the end of the ordeal \u2014 if he endured \u2014 he was welcomed back into the community not as the child who left, but as the man who returned. His status changed. His responsibilities changed. His relationship to himself changed. The initiation was not a ceremony. It was a death and a rebirth.

The modern world has no equivalent. It has graduations, which test memory. It has promotions, which test compliance. It has birthdays, which test nothing. The structures that once held the initiatory function have been dismantled \u2014 some by progress, some by neglect, some by a culture that decided discomfort was something to be eliminated rather than endured. The result is a civilisation full of biological adults who have never been initiated. Who have never been tested by anything they could not control. Who have never been broken open and reassembled by hands that knew what they were doing.

The uninitiated man is not a bad man. He is an incomplete man. He carries within him the unresolved energy of the boy who was never told: this is what it means to cross. This is what it costs. This is what you become on the other side. Without that crossing, he remains in a state of perpetual becoming \u2014 always approaching the threshold, never stepping through it. He may achieve enormously. He may accumulate wealth, status, relationships, knowledge. But beneath the accumulation, there is a hollowness that nothing external can fill. It is the hollowness of the uncrossed threshold.

Ritual is the technology of initiation. Not ritual in the degraded modern sense \u2014 not habit, not routine, not the performative gestures of institutional religion. Ritual in the original sense: a deliberate act performed with intention, within a container, for the purpose of transformation. The ritual does not cause the transformation. It creates the conditions in which transformation can occur. The fire does not forge the steel. But without the fire, the steel remains ore.

The elements of authentic ritual are consistent across traditions. There is separation \u2014 the removal of the individual from the familiar. There is ordeal \u2014 the confrontation with something that exceeds the individual\u2019s current capacity. There is death \u2014 the dissolution of the identity that existed before the threshold. There is rebirth \u2014 the emergence of a new identity, forged in the fire of the ordeal. And there is return \u2014 the reintegration of the initiated individual into the community, carrying what was received.

These elements can be enacted without a tribe, without a wilderness, without the structures that once held them. They can be enacted in a breathwork session where the breath takes you past the edge of what your nervous system thought it could hold. In a somatic practice where the body releases grief it has carried for decades. In a confrontation with another man who will not let you hide behind your performance. In a silent retreat where the noise stops and what remains is everything you have been running from.

The threshold is not a place. It is a moment \u2014 the moment where the old self can no longer sustain itself and the new self has not yet arrived. It is the moment of genuine not-knowing. Of standing in the fire without the guarantee that you will survive it. Every initiated man knows this moment. It is the moment that divided his life into before and after. Not because something was given to him, but because something was taken away \u2014 the illusion that he could remain as he was and still become what he was meant to be.

The modern man who seeks initiation will not find it handed to him. He will have to seek it \u2014 in the practices, in the communities, in the rare spaces where the old function is still honoured. He will have to choose the ordeal, because the culture will not impose it. He will have to find his elders, because the institutions will not provide them. And he will have to walk through the fire knowing that no one can walk it for him.

This is the deepest work. Not the acquisition of knowledge. Not the refinement of technique. Not the accumulation of experience. But the willingness to stand at the threshold \u2014 the place where everything you have built meets everything you have avoided \u2014 and to step through.

The old rites are gone. The threshold remains. And it is waiting for every man who is ready to stop circling and finally cross.`,
  },
];

export const JOURNAL_CATEGORIES = [
  "All",
  "Esoteric Doctrine",
  "Sacred Masculinity",
  "Intimacy",
  "Polarity",
  "Men's Work",
  "Ritual & Initiation",
  "The 33rd House",
];

export const SACRED_MASCULINITY_PRINCIPLES = [
  {
    title: "Embodied Presence",
    description:
      "True masculine power lives in the body, not the mind. Presence is not a concept — it is a felt experience that others can sense the moment you enter a room.",
  },
  {
    title: "Polarity & Devotion",
    description:
      "The masculine-feminine dynamic is not a power struggle. It is a dance of devotion. The masculine leads by holding space. The feminine responds by opening.",
  },
  {
    title: "Emotional Leadership",
    description:
      "A man who cannot feel cannot lead. Emotional leadership is the capacity to hold your own depth while creating safety for another's.",
  },
  {
    title: "Sovereignty & Self-Respect",
    description:
      "Sovereignty is not isolation. It is the quiet confidence of a man who knows his worth, keeps his word, and does not negotiate his standards.",
  },
  {
    title: "Truth & Integrity",
    description:
      "The initiated man speaks truth — not as a weapon, but as an offering. His word is his bond. His silence is deliberate. His presence is his proof.",
  },
  {
    title: "Ritual & Initiation",
    description:
      "Every great tradition understood that a boy does not become a man by accident. Initiation is the deliberate crossing of a threshold — from unconscious to conscious, from reactive to sovereign.",
  },
];

export const THE_33RD_HOUSE = {
  title: "The 33rd House",
  subtitle: "Beyond the private session is a larger initiatory world.",
  description:
    "A system. A doctrine. A map of human consciousness evolution.\n\nThe 33rd House is the temple beyond the threshold. It holds the teachings, the library, the community, and the initiatory path that extends far beyond any single session or encounter with Daniel Cruze.\n\nBuilt on a 12-Gate, 144-Realm consciousness system drawing from 5,000 years of wisdom tradition — Mesopotamian, Egyptian, Vedic, Hermetic — The 33rd House is not a service. It is a world.",
  gateSystem: {
    level1: "Gates 1–3: Foundation (Awareness)",
    level2: "Gates 4–6: Integration (Understanding)",
    level3: "Gates 7–9: Depth (Embodiment)",
    level4: "Gates 10–12: Transcendence (Completion)",
  },
  currents: "Four Great Currents: Breath, Thought, Meaning, Awareness",
  tiers: ["Free", "Seeker", "Initiate", "Elder"],
  sections: [
    "The Temple — Sacred space for practice and teaching",
    "The Library — 60+ volumes across the Gate system",
    "The Teachings — Structured curriculum for masculine and feminine development",
    "The Community — A circle of initiated practitioners",
    "Chartography — Your personal Soul Blueprint",
  ],
};

export const DRAWER_ITEMS = [
  { label: "Home", route: "/(tabs)" as const },
  { label: "About Daniel", route: "/about" as const },
  { label: "Sacred Masculinity", route: "/sacred-masculinity" as const },
  { label: "The Books", route: "/the-books" as const },
  { label: "Work With Daniel", route: "/work-with-daniel" as const },
  { label: "Soul Blueprint", route: "/soul-blueprint" as const },
  { label: "For Men", route: "/for-men" as const },
  { label: "For Women", route: "/for-women" as const },
  { label: "For Couples", route: "/for-couples" as const },
  { label: "Journal", route: "/journal" as const },
  { label: "The 33rd House", route: "/the-33rd-house" as const },
  { label: "Contact", route: "/contact" as const },
  { label: "Policies", route: "/policies" as const },
];
