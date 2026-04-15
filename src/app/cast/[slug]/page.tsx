import { CastMemberClient } from "./CastMemberClient";

// All known cast slugs for static generation.
// When new cast members are added, include them here and rebuild.
const KNOWN_CAST_SLUGS = [
  // ---- Batch 2: Real Housewives (53) ----
  // RHOBH
  "kyle-richards",
  "erika-jayne",
  "dorit-kemsley",
  "sutton-stracke",
  "bozoma-saint-john",
  "rachel-zoe",
  "amanda-frances",
  "kathy-hilton",
  // RHOA
  "porsha-williams",
  "phaedra-parks",
  "drew-sidora",
  "shamea-morton-mwangi",
  "angela-oakley",
  "kelli-ferrell",
  "pinky-cole",
  "k-michelle",
  "cynthia-bailey",
  // RHOP
  "karen-huger",
  "gizelle-bryant",
  "robyn-dixon",
  "ashley-darby",
  "wendy-osefo",
  "stacey-rusch",
  "tia-glover",
  // RHONJ
  "teresa-giudice",
  "melissa-gorga",
  "dolores-catania",
  "margaret-josephs",
  "jennifer-aydin",
  // RHOSLC
  "lisa-barlow",
  "meredith-marks",
  "heather-gay",
  "whitney-rose",
  "mary-cosby",
  // RHOM
  "larsa-pippen",
  "alexia-nepola",
  "lisa-hochstein",
  "guerdy-abraira",
  // RHODubai
  "caroline-stanbury",
  "chanel-ayan",
  // RHONY
  "sai-de-silva",
  "ubah-hassan",
  "brynn-whitfield",
  "jenna-lyons",
  "erin-lichy",
  "jessel-taank",
  // RHORI
  "ashley-iaconetti",
  "jo-ellen-tiberi",
  "rosie-dimare",
  "kelsey-swanson",
  "alicia-carmody",
  "rulla-nehme",
  "elizabeth-mcgraw",

  // ---- Batch 3: Bravo Extended Universe (68) ----
  // Summer House
  "kyle-cooke",
  "amanda-batula",
  "west-wilson",
  "carl-radke",
  "ciara-miller",
  "lindsay-hubbard",
  "jesse-solomon",
  "bailey-taylor",
  "levi-sebree",
  "kj-dillard",
  "dara-levitan",
  "mia-calabrese",
  // The Valley
  "brittany-cartwright",
  "jax-taylor",
  "lala-kent",
  "tom-schwartz",
  "kristen-doute",
  "luke-broderick",
  "danny-booko",
  "nia-sanchez",
  "jasmine-goode",
  "zack-wickham",
  "jesse-lally",
  "michelle-saniei",
  "jason-caperna",
  "janet-caperna",
  // VPR S12
  "lisa-vanderpump",
  "venus-binkley",
  "shayne-davis",
  "jason-cohen",
  "chris-hahn",
  "angelica-jensen",
  "marcus-johnson-vpr",
  "audrey-lingle",
  "natalie-maguire",
  "kim-suarez",
  "demy-selem",
  // Southern Charm
  "craig-conover",
  "austen-kroll",
  "shep-rose",
  "madison-lecroy",
  "venita-aspen",
  "whitney-sudler-smith",
  "salley-carson",
  "rodrigo-reyes",
  "charley-manley",
  // Southern Hospitality
  "leva-bonaparte",
  "joe-bradley",
  "maddi-reese",
  "emmy-sharrett",
  "grace-lilly",
  "tj-dinch",
  "mikel-simmons",
  "lucia-pena",
  "mia-alario",
  "will-kulp",
  "bradley-carter",
  "molly-moore-sh",
  "lake-rucker",
  // Below Deck Down Under
  "captain-jason-chambers",
  "ben-robinson",
  "daisy-kelliher",
  "joao-franco",
  "alesia-harris",
  "jenna-woudberg",
  "mike-durrant",
  "eddy-hounsell",
  "betul-yazici",
];

export function generateStaticParams() {
  return KNOWN_CAST_SLUGS.map((slug) => ({ slug }));
}

interface CastMemberPageProps {
  params: { slug: string };
}

export default function CastMemberPage({ params }: CastMemberPageProps) {
  return <CastMemberClient slug={params.slug} />;
}
