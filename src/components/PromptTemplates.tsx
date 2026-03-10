import { Briefcase, Sparkles } from "lucide-react";

interface Props {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

interface Template {
  text: string;
  category: "professional" | "creative";
}

const TEMPLATES: Template[] = [
  { text: "Operación logística nocturna en centro de distribución moderno", category: "professional" },
  { text: "Entrega corporativa en distrito financiero de la CDMX", category: "professional" },
  { text: "Fleet de vehículos Partrunner en formación al amanecer", category: "professional" },
  { text: "Repartidor urbano en hora dorada entre calles de la Roma", category: "professional" },
  { text: "Centro de operaciones con pantallas de rastreo en tiempo real", category: "professional" },
  { text: "Almacén automatizado con robots y operadores Partrunner", category: "professional" },
  { text: "Entrega de un iceberg al desierto de Sonora", category: "creative" },
  { text: "Logística para dinosaurios en el Zócalo", category: "creative" },
  { text: "Banana gigante en flatbed cruzando el puente de Brooklyn", category: "creative" },
  { text: "Repartidor cruzando un portal interdimensional en Polanco", category: "creative" },
  { text: "Entrega navideña con Reyes Magos y tráiler Partrunner", category: "creative" },
  { text: "Convoy Partrunner escoltando una ballena por la autopista", category: "creative" },
];

export default function PromptTemplates({ onSelect, disabled }: Props) {
  const professional = TEMPLATES.filter((t) => t.category === "professional");
  const creative = TEMPLATES.filter((t) => t.category === "creative");

  return (
    <div className="space-y-3">
      <TemplateGroup
        label="Profesional"
        icon={<Briefcase size={11} />}
        templates={professional}
        onSelect={onSelect}
        disabled={disabled}
      />
      <TemplateGroup
        label="Creativo"
        icon={<Sparkles size={11} />}
        templates={creative}
        onSelect={onSelect}
        disabled={disabled}
      />
    </div>
  );
}

function TemplateGroup({
  label,
  icon,
  templates,
  onSelect,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  templates: Template[];
  onSelect: (text: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-partrunner-yellow-accent">{icon}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-partrunner-gray-dark">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {templates.map((t) => (
          <button
            key={t.text}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(t.text)}
            className={`
              text-[10px] leading-snug px-2.5 py-1.5 rounded-lg border transition-all duration-150
              ${disabled
                ? "opacity-40 pointer-events-none"
                : "cursor-pointer hover:border-partrunner-yellow hover:bg-partrunner-yellow-50 active:scale-[0.97]"}
              border-partrunner-gray-light/60 bg-white text-partrunner-gray-dark
            `}
          >
            {t.text}
          </button>
        ))}
      </div>
    </div>
  );
}
