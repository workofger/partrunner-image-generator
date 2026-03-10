import type { TextOverlay } from "../types/editorial";
import { Type, AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd } from "lucide-react";

interface Props {
  value: TextOverlay;
  onChange: (value: TextOverlay) => void;
  disabled?: boolean;
}

const POSITIONS: { key: TextOverlay["position"]; label: string; icon: typeof AlignVerticalJustifyStart }[] = [
  { key: "top", label: "Arriba", icon: AlignVerticalJustifyStart },
  { key: "center", label: "Centro", icon: AlignVerticalJustifyCenter },
  { key: "bottom", label: "Abajo", icon: AlignVerticalJustifyEnd },
];

export default function TextOverlayControls({ value, onChange, disabled }: Props) {
  const update = (patch: Partial<TextOverlay>) => onChange({ ...value, ...patch });

  return (
    <div className={disabled ? "opacity-40 pointer-events-none" : ""}>
      {/* Toggle */}
      <button
        type="button"
        onClick={() => update({ enabled: !value.enabled })}
        className="flex items-center gap-2 w-full mb-2"
      >
        <div
          className={`
            relative w-8 h-[18px] rounded-full transition-colors duration-200
            ${value.enabled ? "bg-partrunner-yellow" : "bg-partrunner-gray-light"}
          `}
        >
          <div
            className={`
              absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200
              ${value.enabled ? "translate-x-[16px]" : "translate-x-[2px]"}
            `}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Type size={12} className="text-partrunner-yellow-accent" />
          <span className="text-[11px] font-semibold text-partrunner-black">Texto en imagen</span>
        </div>
      </button>

      {value.enabled && (
        <div className="space-y-2 pl-10">
          <textarea
            value={value.text}
            onChange={(e) => update({ text: e.target.value })}
            placeholder="Ej: 'Entregamos lo imposible', 'Partrunner 2026'..."
            className="input-base h-16 resize-none text-xs"
            maxLength={80}
          />
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[--color-text-muted] uppercase tracking-wider font-semibold">
              Posición
            </span>
            <span className="text-[9px] text-[--color-text-muted]">{value.text.length}/80</span>
          </div>
          <div className="flex gap-1.5">
            {POSITIONS.map((p) => {
              const Icon = p.icon;
              const active = value.position === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => update({ position: p.key })}
                  className={`
                    flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border text-[10px] font-medium transition-all duration-150
                    ${active
                      ? "border-partrunner-yellow bg-partrunner-yellow-50 text-partrunner-black"
                      : "border-partrunner-gray-light/60 bg-white text-partrunner-gray-dark hover:border-partrunner-yellow/40"}
                  `}
                >
                  <Icon size={11} />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
