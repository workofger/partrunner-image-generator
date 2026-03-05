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
    <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm text-white/70 hover:text-white transition-colors"
      >
        <div className="flex items-center gap-2">
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span className="font-mono text-xs tracking-wide">EDITORIAL JSON</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); copyPrompt(); }}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono bg-[#FDD238]/10 text-[#FDD238] hover:bg-[#FDD238]/20 transition-colors"
          >
            {copiedPrompt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copiedPrompt ? "Copiado" : "Prompt"}
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); copyJson(); }}
            className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
          >
            {copiedJson ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copiedJson ? "Copiado" : "JSON"}
          </button>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/5 px-4 py-3 max-h-[400px] overflow-y-auto">
          <pre className="text-xs font-mono text-white/70 whitespace-pre-wrap break-words leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* Quick metadata strip (always visible) */}
      {!expanded && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
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
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-mono ${
        highlight
          ? "bg-[#FDD238]/10 text-[#FDD238]"
          : "bg-white/5 text-white/50"
      }`}
    >
      <span className="opacity-60">{label}:</span> {value.slice(0, 40)}{value.length > 40 ? "…" : ""}
    </span>
  );
}
