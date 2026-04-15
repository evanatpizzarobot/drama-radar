import { CastMemberClient } from "./CastMemberClient";

// All known cast slugs for static generation.
// When new cast members are added, include them here and rebuild.
const KNOWN_CAST_SLUGS = [
  "kyle-richards",
  "erika-jayne",
  "dorit-kemsley",
  "sutton-stracke",
  "bozoma-saint-john",
  "rachel-zoe",
  "amanda-frances",
  "kathy-hilton",
  "porsha-williams",
  "phaedra-parks",
  "drew-sidora",
  "shamea-morton-mwangi",
  "angela-oakley",
  "kelli-ferrell",
  "pinky-cole",
  "k-michelle",
  "cynthia-bailey",
  "karen-huger",
  "gizelle-bryant",
  "robyn-dixon",
  "ashley-darby",
  "wendy-osefo",
  "stacey-rusch",
  "tia-glover",
  "teresa-giudice",
  "melissa-gorga",
  "dolores-catania",
  "margaret-josephs",
  "jennifer-aydin",
  "lisa-barlow",
  "meredith-marks",
  "heather-gay",
  "whitney-rose",
  "mary-cosby",
  "larsa-pippen",
  "alexia-nepola",
  "lisa-hochstein",
  "guerdy-abraira",
  "caroline-stanbury",
  "chanel-ayan",
  "sai-de-silva",
  "ubah-hassan",
  "brynn-whitfield",
  "jenna-lyons",
  "erin-lichy",
  "jessel-taank",
  "ashley-iaconetti",
  "jo-ellen-tiberi",
  "rosie-dimare",
  "kelsey-swanson",
  "alicia-carmody",
  "rulla-nehme",
  "elizabeth-mcgraw",
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
