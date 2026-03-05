import { FORMATS, type FormatKey } from "../data/brand";

interface FormatSelectorProps {
  selected: FormatKey;
  onChange: (key: FormatKey) => void;
  disabled?: boolean;
}

const ASPECT_STYLES: Record<string, string> = {
  "1:1": "aspect-square",
  "9:16": "aspect-[9/16]",
  "16:9": "aspect-video",
  "1.91:1": "aspect-video",
};

export default function FormatSelector({ selected, onChange, disabled }: FormatSelectorProps) {
  const keys = Object.keys(FORMATS) as FormatKey[];

  return (
    <div className="grid grid-cols-3 gap-2">
      {keys.map((key) => {
        const fmt = FORMATS[key];
        const active = key === selected;
        return (
          <button
            key={key}
            type="button"
            disabled={disabled}
            onClick={() => onChange(key)}
            className={`
              relative flex flex-col items-center gap-1.5 rounded-lg border p-2.5 text-center transition-all
              ${active
                ? "border-[#FDD238] bg-[#FDD238]/10 text-white"
                : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70"}
              ${disabled ? "pointer-events-none opacity-40" : "cursor-pointer"}
            `}
          >
            <div
              className={`w-full max-w-[40px] rounded-[3px] border ${
                active ? "border-[#FDD238]/60 bg-[#FDD238]/20" : "border-white/20 bg-white/5"
              } ${ASPECT_STYLES[fmt.aspect_ratio] || "aspect-video"}`}
            />
            <span className="text-[10px] font-medium leading-tight">{fmt.label}</span>
            <span className="text-[9px] opacity-50">{fmt.resolution}</span>
          </button>
        );
      })}
    </div>
  );
}
