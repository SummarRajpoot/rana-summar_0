import type { Metadata } from "next";
import { StoryPageContent } from "./StoryPageContent";

export const metadata: Metadata = {
  title: "My Story | Rana Summar — From Village Fields to AI Engineering",
  description:
    "The journey of Rana Summar: a soldier's son who grew up between classrooms and farm fields, switched from textile to IT, and found his way to UAF through a 600m race.",
  alternates: {
    canonical: "/story",
  },
  openGraph: {
    title: "My Story | Rana Summar",
    description:
      "A soldier's son who grew up between classrooms and farm fields, switched from textile to IT, and found his way to UAF through a 600m race.",
    url: "https://ranasummar.vercel.app/story",
    type: "website",
  },
};

export default function StoryPage() {
  return <StoryPageContent />;
}
