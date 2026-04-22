"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const career = [
  { period: "2022 — Present", role: "Independent Director", company: "Seoul, KR" },
  { period: "2020 — 2022",   role: "Director of Photography", company: "Blank Film Studio" },
  { period: "2018 — 2020",   role: "Camera Operator / Editor", company: "OOO Creative Agency" },
  { period: "2016 — 2018",   role: "Assistant Camera",         company: "Feature & Commercial" },
];

const equipment = [
  { category: "Camera",  items: ["ARRI Alexa Mini LF", "Sony FX6", "DJI Ronin 4D"] },
  { category: "Lens",    items: ["Zeiss Supreme Prime", "Canon K35 Vintage", "Sigma Cine FF"] },
  { category: "Aerial",  items: ["DJI Mavic 3 Pro", "DJI Mini 4 Pro"] },
  { category: "Audio",   items: ["Sound Devices MixPre-10 II", "Sennheiser MKH 416"] },
];

const brands = [
  "Nike", "Samsung", "Hyundai", "Amorepacific",
  "CJ ENM", "Kakao", "Naver", "LG Electronics",
  "Lotte", "Innisfree", "Musinsa", "Krafton",
];

export default function AboutContent() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-28">

      {/* ── Profile ─────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

        {/* Image */}
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <Image
              src="https://placehold.co/800x800/111111/333333?text=Photo"
              alt="Profile photo"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Bio + Career */}
        <motion.div
          className="md:col-span-2 flex flex-col justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              YOUR NAME
            </h1>
            <p className="text-gray-600 dark:text-gray-400 leading-[1.85] mb-4">
              영상 감독 겸 촬영감독으로, 광고·다큐멘터리·뮤직비디오·단편영화 등
              다양한 장르에 걸쳐 작업합니다. 미니멀한 시각 언어와 자연광을
              중심으로 인물과 공간 사이의 긴장감을 포착하는 데 관심이 있습니다.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-[1.85]">
              서울을 기반으로 국내외 브랜드 및 제작사와 협업하며,
              현재는 독립 프로젝트와 상업 영상을 병행하고 있습니다.
            </p>
          </div>

          {/* Career */}
          <div>
            <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-5">Experience</p>
            <div className="flex flex-col gap-4">
              {career.map(({ period, role, company }) => (
                <div key={period} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-6">
                  <span className="font-mono text-xs text-gray-400 dark:text-gray-600 pt-0.5 shrink-0">
                    {period}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{role}</p>
                    <p className="font-mono text-xs text-gray-400 dark:text-gray-600 mt-0.5">{company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Equipment ───────────────────────────────────────── */}
      <Reveal className="mt-20 pt-14 border-t border-gray-100 dark:border-gray-900">
        <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-8">Equipment</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {equipment.map(({ category, items }) => (
            <div key={category}>
              <p className="font-mono-meta text-gray-500 dark:text-gray-500 mb-3">{category}</p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── Clients ─────────────────────────────────────────── */}
      <Reveal className="mt-20 pt-14 border-t border-gray-100 dark:border-gray-900" delay={0.05}>
        <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-8">Clients &amp; Collaborations</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {brands.map((brand) => (
            <span key={brand} className="font-mono text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
              {brand}
            </span>
          ))}
        </div>
      </Reveal>

    </div>
  );
}
