import { SHOW_TAGS } from "@/lib/constants";
import { ShowHubClient } from "./ShowHubClient";

export function generateStaticParams() {
  return Object.keys(SHOW_TAGS).map((tag) => ({ showTag: tag }));
}

interface ShowHubPageProps {
  params: { showTag: string };
}

export default function ShowHubPage({ params }: ShowHubPageProps) {
  return <ShowHubClient showTag={params.showTag} />;
}
