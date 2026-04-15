import { CastMemberClient } from "./CastMemberClient";

interface CastMemberPageProps {
  params: { slug: string };
}

export default function CastMemberPage({ params }: CastMemberPageProps) {
  return <CastMemberClient slug={params.slug} />;
}
