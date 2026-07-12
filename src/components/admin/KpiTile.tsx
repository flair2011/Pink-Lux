import type { LucideIcon } from "lucide-react";

export default function KpiTile({
  label,
  value,
  sublabel,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-[2rem] editorial-shadow p-4 md:p-6 flex items-center gap-3 md:gap-4">
      <div className="p-2.5 md:p-3 rounded-full bg-primary-container text-on-primary-container shrink-0">
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] md:text-xs font-bold uppercase tracking-wide text-on-surface-variant leading-tight">{label}</p>
        <p className="text-xl md:text-2xl font-headline italic text-on-surface">{value}</p>
        {sublabel && <p className="text-[11px] md:text-xs text-on-surface-variant truncate">{sublabel}</p>}
      </div>
    </div>
  );
}
