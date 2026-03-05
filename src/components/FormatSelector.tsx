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
              relative flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all duration-200
              ${active
                ? "border-partrunner-yellow bg-partrunner-yellow-50 text-partrunner-black shadow-partrunner"
                : "border-partrunner-gray-light bg-white text-partrunner-gray-dark hover:border-partrunner-yellow/40 hover:bg-partrunner-yellow-50/50"}
              ${disabled ? "pointer-events-none opacity-40" : "cursor-pointer"}
            `}
          >
            <div
              className={`w-full max-w-[36px] rounded-[3px] border ${
                active
                  ? "border-partrunner-yellow bg-partrunner-yellow/20"
                  : "border-partrunner-gray-light bg-partrunner-bg-main"
              } ${ASPECT_STYLES[fmt.aspect_ratio] || "aspect-video"}`}
            />
            <span className="text-[10px] font-semibold leading-tight">{fmt.label}</span>
            <span className="text-[9px] text-[--color-text-muted]">{fmt.resolution}</span>
          </button>
        );
      })}
    </div>
  );
}
