import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";
import type { EditorialPrompt } from "../types/editorial";

interface JsonViewerProps {
  data: EditorialPrompt;
}

export default function JsonViewer({ data }: JsonViewerProps) {
  const [expanded, setExpanded] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(data.prompt_compiled);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="card rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm text-partrunner-gray-dark hover:text-partrunner-black transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span className="text-xs font-semibold uppercase tracking-wider">Editorial JSON</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); copyPrompt(); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-partrunner-yellow/10 text-partrunner-yellow-accent hover:bg-partrunner-yellow/20 transition-colors cursor-pointer"
          >
            {copiedPrompt ? <Check size={12} /> : <Copy size={12} />}
            {copiedPrompt ? "Copiado" : "Prompt"}
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); copyJson(); }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-gray-100 text-partrunner-gray-dark hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {copiedJson ? <Check size={12} /> : <Copy size={12} />}
            {copiedJson ? "Copiado" : "JSON"}
          </button>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-partrunner-gray-light/50 px-5 py-4 max-h-[400px] overflow-y-auto bg-partrunner-bg-main">
          <pre className="text-xs font-mono text-partrunner-gray-dark whitespace-pre-wrap break-words leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* Quick tags when collapsed */}
      {!expanded && (
        <div className="px-5 pb-3 flex flex-wrap gap-1.5">
          <Tag label="Headline" value={data.headline.text} highlight />
          <Tag label="Mood" value={data.scene.mood} />
          <Tag label="Camera" value={data.camera.angle} />
        </div>
      )}
    </div>
  );
}

function Tag({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
        highlight
          ? "bg-partrunner-yellow-50 text-partrunner-yellow-accent"
          : "bg-partrunner-bg-main text-partrunner-gray-dark"
      }`}
    >
      <span className="opacity-50">{label}:</span> {value.slice(0, 35)}{value.length > 35 ? "…" : ""}
    </span>
  );
}
