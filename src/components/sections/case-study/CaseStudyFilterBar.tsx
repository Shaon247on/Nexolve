"use client";

import { useMemo, useState } from "react";
import CaseStudyCard from "@/components/sections/case-study/CaseStudyCard";
import { CaseStudySummary, CaseStudyCategory } from "@/types/case-study";

type CaseStudyFilterBarProps = {
  caseStudies: CaseStudySummary[];
};

const FILTERS: Array<"All" | CaseStudyCategory> = [
  "All",
  "Brand Strategy",
  "Web Design",
  "UI/UX",
  "Development",
  "SEO",
  "Product Design",
];

export default function CaseStudyFilterBar({
  caseStudies,
}: CaseStudyFilterBarProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | CaseStudyCategory>("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter((item) => item.category === activeFilter);
  }, [activeFilter, caseStudies]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                isActive
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white text-black hover:border-black/20",
              ].join(" ")}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <CaseStudyCard key={item.id} caseStudy={item} />
        ))}
      </div>
    </div>
  );
}