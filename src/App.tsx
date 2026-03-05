import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Zap,
  ArrowRight,
} from "lucide-react";
import { BRAND, FORMATS, type FormatKey } from "./data/brand";
import type { EditorialPrompt, Step } from "./types/editorial";
import { transformPrompt, generateImage } from "./services/api";
import FormatSelector from "./components/FormatSelector";
import JsonViewer from "./components/JsonViewer";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("billboard");
  const [step, setStep] = useState<Step>("input");
  const [editorialData, setEditorialData] = useState<EditorialPrompt | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const format = FORMATS[selectedFormat];

  const handleTransform = async () => {
    if (!prompt.trim()) return;
    setStep("transforming");
    setError(null);
    try {
      const data = await transformPrompt(prompt, format);
      setEditorialData(data);
      setStep("transformed");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(`Error al transformar: ${msg}`);
      setStep("input");
    }
  };

  const handleGenerate = async () => {
    if (!editorialData) return;
    setStep("generating");
    setError(null);
    try {
      const image = await generateImage(editorialData.prompt_compiled, format.gemini_aspect_ratio);
      setGeneratedImage(image);
      setStep("complete");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(`Error al generar imagen: ${msg}`);
      setStep("transformed");
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = `partrunner-${selectedFormat}-${Date.now()}.png`;
    a.click();
  };

  const reset = () => {
    setStep("input");
    setEditorialData(null);
    setGeneratedImage(null);
    setPrompt("");
    setError(null);
  };

  const isWorking = step === "transforming" || step === "generating";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#FDD238]/30">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={BRAND.logos.iso_negative.url}
              alt="Partrunner"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-base tracking-tight">
              Partrunner{" "}
              <span className="text-white/40 font-normal">Image Generator</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs text-white/50">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online</span>
            </div>
            <span className="px-2 py-0.5 rounded-full border border-white/10 font-mono">
              v3.0
            </span>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ── Left column: input & controls ─────────────────── */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-3">
                Crea imágenes{" "}
                <span className="italic text-[#FDD238]">editoriales</span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed">
                Describe tu idea y la IA la transformará en una pieza visual de
                nivel campaña publicitaria.
              </p>
            </div>

            {/* Textarea */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDD238] to-[#FDD238]/40 rounded-2xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur" />
              <div className="relative bg-[#111] rounded-xl border border-white/10 p-1">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe tu idea... (ej: 'entrega en el espacio', 'logística para dinosaurios')"
                  className="w-full h-32 bg-transparent text-white p-3 resize-none focus:outline-none placeholder:text-white/20 text-sm leading-relaxed"
                  disabled={isWorking}
                />
              </div>
            </div>

            {/* Format selector */}
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                Formato
              </h3>
              <FormatSelector
                selected={selectedFormat}
                onChange={setSelectedFormat}
                disabled={isWorking || step === "transformed" || step === "complete"}
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-xs leading-relaxed">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <AnimatePresence mode="wait">
              {step === "input" && (
                <motion.button
                  key="transform"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onClick={handleTransform}
                  disabled={!prompt.trim()}
                  className="w-full py-3.5 bg-[#FDD238] text-black font-semibold rounded-xl hover:bg-[#FDD238]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" />
                  Transformar Prompt
                </motion.button>
              )}

              {step === "transforming" && (
                <motion.div
                  key="transforming"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2.5 text-white/70 text-sm"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-[#FDD238]" />
                  Claude está creando el prompt editorial...
                </motion.div>
              )}

              {step === "transformed" && (
                <motion.div
                  key="transformed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex gap-2"
                >
                  <button
                    onClick={handleGenerate}
                    className="flex-1 py-3.5 bg-[#FDD238] text-black font-semibold rounded-xl hover:bg-[#FDD238]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Generar Imagen
                  </button>
                  <button
                    onClick={() => { setEditorialData(null); setStep("input"); }}
                    className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white/60"
                    title="Volver a transformar"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2.5 text-white/70 text-sm"
                >
                  <Loader2 className="w-4 h-4 animate-spin text-[#FDD238]" />
                  Gemini está generando la imagen...
                </motion.div>
              )}

              {step === "complete" && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex gap-2"
                >
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-3.5 bg-[#FDD238] text-black font-semibold rounded-xl hover:bg-[#FDD238]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar Imagen
                  </button>
                  <button
                    onClick={reset}
                    className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-white/60"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Brand indicator */}
            <div className="pt-6 border-t border-white/[0.06]">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">
                Marca activa
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={BRAND.logos.full_negative.url}
                  alt="Partrunner"
                  className="h-6 object-contain opacity-70"
                />
                <div className="text-[10px] text-white/40 font-mono">
                  {BRAND.editorial_style.genre}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: output ──────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Main viewport */}
            <div className="flex-1 min-h-[500px] lg:min-h-[600px] bg-[#111] rounded-2xl border border-white/10 overflow-hidden relative">
              {/* Grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="relative p-6 sm:p-8 h-full flex flex-col">
                {/* Empty state */}
                {step === "input" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-white/15">
                    <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <p className="font-mono text-xs">Describe tu idea para comenzar</p>
                  </div>
                )}

                {/* Transforming state */}
                {step === "transforming" && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      className="w-16 h-16 rounded-full border-2 border-[#FDD238]/20 border-t-[#FDD238] flex items-center justify-center"
                    >
                      <Sparkles className="w-6 h-6 text-[#FDD238]" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-white/70 text-sm mb-1">Transformando prompt...</p>
                      <p className="text-white/30 text-xs font-mono">
                        Claude → prompt editorial + dirección de arte
                      </p>
                    </div>
                  </div>
                )}

                {/* Transformed — show editorial data preview */}
                {step === "transformed" && editorialData && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full gap-6"
                  >
                    <div className="flex items-center gap-2 text-[#FDD238]">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-mono text-xs tracking-wide">PROMPT EDITORIAL LISTO</span>
                    </div>

                    {/* Headline preview */}
                    <div className="bg-black/50 border border-[#FDD238]/20 rounded-xl p-6">
                      <p className="text-[#FDD238] text-2xl font-bold tracking-tight mb-4">
                        {editorialData.headline.text}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed mb-4">
                        {editorialData.scene.description}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <MiniCard label="Surreal" value={editorialData.scene.surreal_element} />
                        <MiniCard label="Iluminación" value={editorialData.camera.lighting} />
                        <MiniCard label="Cámara" value={editorialData.camera.angle} />
                        <MiniCard label="Mood" value={editorialData.scene.mood} />
                        <MiniCard label="Logo" value={`${editorialData.logo.variant} / ${editorialData.logo.placement}`} />
                        <MiniCard label="Formato" value={`${editorialData.metadata.aspect_ratio} ${editorialData.metadata.resolution}`} />
                      </div>
                    </div>

                    <p className="text-white/30 text-xs text-center font-mono">
                      Haz clic en "Generar Imagen" para enviar a Gemini →
                    </p>
                  </motion.div>
                )}

                {/* Generating state */}
                {step === "generating" && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <motion.div
                      className="relative w-24 h-24"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-[#FDD238]/10 animate-ping" />
                      <div className="absolute inset-2 rounded-full bg-[#FDD238]/5 border border-[#FDD238]/20 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-[#FDD238]/60" />
                      </div>
                    </motion.div>
                    <div className="text-center">
                      <p className="text-white/70 text-sm mb-1">Generando imagen...</p>
                      <p className="text-white/30 text-xs font-mono">
                        Gemini → render editorial {format.aspect_ratio}
                      </p>
                    </div>
                  </div>
                )}

                {/* Complete — show image */}
                {step === "complete" && generatedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="font-mono text-xs">IMAGEN LISTA</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/50">
                          {format.resolution}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/50">
                          {format.aspect_ratio}
                        </span>
                      </div>
                    </div>
                    <div className="relative flex-1 rounded-xl overflow-hidden border border-white/10 group">
                      <img
                        src={generatedImage}
                        alt={editorialData?.headline.text || "Generated image"}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <p className="text-[#FDD238] font-bold text-lg">
                          {editorialData?.headline.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* JSON viewer panel (visible after transform) */}
            {editorialData && (step === "transformed" || step === "generating" || step === "complete") && (
              <JsonViewer data={editorialData} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 bg-white/[0.03] rounded-lg border border-white/[0.06]">
      <div className="text-[9px] text-white/30 uppercase tracking-wider mb-0.5 font-mono">{label}</div>
      <div className="text-xs text-white/70 leading-snug line-clamp-2">{value}</div>
    </div>
  );
}
