import type { GenerationSettings } from "../types/editorial";
import { Flame, Camera, Tag, Layers } from "lucide-react";

interface Props {
  settings: GenerationSettings;
  onChange: (settings: GenerationSettings) => void;
  disabled?: boolean;
}

const SLIDERS: {
  key: keyof GenerationSettings;
  label: string;
  icon: typeof Flame;
  lowLabel: string;
  highLabel: string;
  color: string;
}[] = [
  {
    key: "surrealism",
    label: "Surrealismo",
    icon: Flame,
    lowLabel: "Corporativo",
    highLabel: "Absurdo",
    color: "#F29F05",
  },
  {
    key: "cinematography",
    label: "Cinematografía",
    icon: Camera,
    lowLabel: "Limpio",
    highLabel: "Dramático",
    color: "#FFD840",
  },
  {
    key: "brandPresence",
    label: "Presencia de marca",
    icon: Tag,
    lowLabel: "Sutil",
    highLabel: "Prominente",
    color: "#26B76E",
  },
  {
    key: "detail",
    label: "Nivel de detalle",
    icon: Layers,
    lowLabel: "Minimal",
    highLabel: "Complejo",
    color: "#10C89B",
  },
];

export default function GenerationSliders({ settings, onChange, disabled }: Props) {
  const update = (key: keyof GenerationSettings, value: number) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-3">
      {SLIDERS.map((s) => {
        const Icon = s.icon;
        const val = settings[s.key];
        return (
          <div key={s.key} className={disabled ? "opacity-40 pointer-events-none" : ""}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Icon size={12} style={{ color: s.color }} />
                <span className="text-[11px] font-semibold text-partrunner-black">{s.label}</span>
              </div>
              <span className="text-[10px] font-mono text-partrunner-gray-dark tabular-nums">{val}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={val}
              onChange={(e) => update(s.key, Number(e.target.value))}
              className="slider w-full"
              style={{ "--slider-color": s.color } as React.CSSProperties}
            />
            <div className="flex justify-between mt-0.5">
              <span className="text-[9px] text-[--color-text-muted]">{s.lowLabel}</span>
              <span className="text-[9px] text-[--color-text-muted]">{s.highLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
