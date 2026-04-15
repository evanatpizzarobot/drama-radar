import { CastIndexClient } from "./CastIndexClient";

export const metadata = {
  title: "Cast Members | DramaRadar",
  description:
    "Browse every reality TV cast member tracked by DramaRadar. Full profiles, show history, storylines, and social media links for Real Housewives, Vanderpump Rules, Below Deck, and more.",
};

export default function CastPage() {
  return <CastIndexClient />;
}
