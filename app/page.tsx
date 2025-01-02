import { sections } from "@/data/sections.data";
import { cn } from "@/utils/cn";

export default function Home() {
  const activeIndex = Math.floor(sections.length / 2);
  return (
    <main>
      <section className="fixed top-[81.3%] left-[18.75%] p-2 flex items-start justify-start gap-4">
        <div className="relative">
          {sections.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <div key={i} className="absolute top-0 left-0 overflow-hidden">
                <p
                  className={cn(
                    "font-light text-xs text-neutral-600",
                    !isActive && "translate-y-full"
                  )}
                >
                  0{i + 1}
                </p>
              </div>
            );
          })}
        </div>
        <div className="relative">
          {sections.map((section, i) => {
            const isActive = i === activeIndex;
            return (
              <div key={i} className="absolute top-0 left-0 overflow-hidden">
                <h2
                  className={cn("text-nowrap", !isActive && "translate-y-full")}
                >
                  {section.name}
                </h2>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
