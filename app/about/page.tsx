import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "영상 감독 겸 촬영감독. 광고·다큐멘터리·뮤직비디오·단편영화 등 다양한 장르에 걸쳐 작업합니다.",
};

export default function AboutPage() {
  return <AboutContent />;
}
