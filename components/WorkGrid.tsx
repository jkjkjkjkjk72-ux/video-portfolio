import WorkCard from "./WorkCard";
import type { Work } from "@/data/works";

const colsMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

interface WorkGridProps {
  works: Work[];
  columns?: number;
}

export default function WorkGrid({ works, columns = 2 }: WorkGridProps) {
  const colClass = colsMap[columns] ?? "md:grid-cols-2";

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6 md:gap-12`}>
      {works.map((work, i) => (
        <WorkCard key={work.slug} work={work} index={i} />
      ))}
    </div>
  );
}
