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
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { BRAND, FORMATS, type FormatKey } from "./data/brand";
import type {
  EditorialPrompt,
  Step,
  GenerationSettings,
  TextOverlay,
} from "./types/editorial";
import { DEFAULT_SETTINGS, DEFAULT_TEXT_OVERLAY } from "./types/editorial";
import { transformPrompt, generateImage } from "./services/api";
import FormatSelector from "./components/FormatSelector";
import JsonViewer from "./components/JsonViewer";
import GenerationSliders from "./components/GenerationSliders";
import PromptTemplates from "./components/PromptTemplates";
import TextOverlayControls from "./components/TextOverlayControls";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("billboard");
  const [step, setStep] = useState<Step>("input");
  const [editorialData, setEditorialData] = useState<EditorialPrompt | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<GenerationSettings>(DEFAULT_SETTINGS);
  const [textOverlay, setTextOverlay] = useState<TextOverlay>(DEFAULT_TEXT_OVERLAY);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSliders, setShowSliders] = useState(true);

  const format = FORMATS[selectedFormat];
  const isWorking = step === "transforming" || step === "generating";
  const isLocked = isWorking || step === "transformed" || step === "complete";

  const handleTransform = async () => {
    if (!prompt.trim()) return;
    setStep("transforming");
    setError(null);
    try {
      const data = await transformPrompt(prompt, format, settings, textOverlay);
      setEditorialData(data);
      setStep("transformed");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
      setStep("input");
    }
  };

  const handleGenerate = async () => {
    if (!editorialData) return;
    setStep("generating");
    setError(null);
    try {
      const image = await generateImage(
        editorialData.prompt_compiled,
        format.gemini_aspect_ratio,
        editorialData.logo.variant,
      );
      setGeneratedImage(image);
      setStep("complete");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(msg);
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

  return (
    <div className="min-h-screen bg-partrunner-bg-main">
      {/* ── Yellow Header ──────────────────────────────────── */}
      <header className="relative bg-partrunner-yellow overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 pb-16">
          <div className="flex items-center justify-between mb-6">
            <img src={BRAND.logos.fullBlack} alt="Partrunner" className="h-9 w-auto" />
            <div className="flex items-center gap-2 text-partrunner-black/60 text-xs font-medium">
              <div className="w-2 h-2 rounded-full bg-partrunner-green animate-pulse" />
              <span>Sistema activo</span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-partrunner-black">
              Generador de Imágenes Editorial
            </h1>
            <p className="text-partrunner-black/70 mt-1.5 text-sm">
              {BRAND.editorial_style.genre}
            </p>
          </div>
        </div>
      </header>

      {/* ── Main Content ──────────────────────────────────── */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ── Left Panel ─────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-4 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto lg:pr-1">

            {/* Prompt input card */}
            <div className="card p-5 rounded-2xl">
              <h2 className="font-bold text-partrunner-black text-base mb-3">Describe tu idea</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: 'entrega en el espacio', 'operación nocturna en centro de distribución'..."
                className="input-base h-24 resize-none mb-3 text-sm"
                disabled={isWorking}
              />

              {/* Template toggle */}
              <button
                type="button"
                onClick={() => setShowTemplates(!showTemplates)}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-partrunner-yellow-accent hover:text-partrunner-black transition-colors mb-2 cursor-pointer"
              >
                <Sparkles size={11} />
                Ideas de ejemplo
                <ChevronDown size={11} className={`transition-transform ${showTemplates ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showTemplates && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-2">
                      <PromptTemplates
                        onSelect={(t) => { setPrompt(t); setShowTemplates(false); }}
                        disabled={isWorking}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Format selector card */}
            <div className="card p-5 rounded-2xl">
              <label className="text-xs font-semibold text-partrunner-gray-dark uppercase tracking-wider mb-2.5 block">
                Formato de salida
              </label>
              <FormatSelector
                selected={selectedFormat}
                onChange={setSelectedFormat}
                disabled={isLocked}
              />
            </div>

            {/* Generation sliders card */}
            <div className="card p-5 rounded-2xl">
              <button
                type="button"
                onClick={() => setShowSliders(!showSliders)}
                className="flex items-center justify-between w-full cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-partrunner-yellow-accent" />
                  <span className="text-xs font-semibold text-partrunner-black uppercase tracking-wider">
                    Controles de generación
                  </span>
                </div>
                <ChevronDown size={14} className={`text-partrunner-gray-dark transition-transform ${showSliders ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showSliders && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <GenerationSliders
                        settings={settings}
                        onChange={setSettings}
                        disabled={isLocked}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Text overlay card */}
            <div className="card p-5 rounded-2xl">
              <TextOverlayControls
                value={textOverlay}
                onChange={setTextOverlay}
                disabled={isLocked}
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="p-3 rounded-xl bg-partrunner-red/10 border border-partrunner-red/20 text-partrunner-red flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-xs leading-relaxed">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="sticky bottom-0 bg-partrunner-bg-main pt-2 pb-4">
              <AnimatePresence mode="wait">
                {step === "input" && (
                  <motion.button
                    key="transform"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    onClick={handleTransform}
                    disabled={!prompt.trim()}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} />
                    Transformar Prompt
                  </motion.button>
                )}

                {step === "transforming" && (
                  <motion.div
                    key="transforming"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full py-3 bg-partrunner-yellow-light border border-partrunner-yellow/30 rounded-xl flex items-center justify-center gap-2 text-partrunner-black text-sm"
                  >
                    <Loader2 size={16} className="animate-spin text-partrunner-yellow-accent" />
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
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <Zap size={16} />
                      Generar Imagen
                    </button>
                    <button
                      onClick={() => { setEditorialData(null); setStep("input"); }}
                      className="btn-secondary px-3"
                      title="Volver a transformar"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </motion.div>
                )}

                {step === "generating" && (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full py-3 bg-partrunner-yellow-light border border-partrunner-yellow/30 rounded-xl flex items-center justify-center gap-2 text-partrunner-black text-sm"
                  >
                    <Loader2 size={16} className="animate-spin text-partrunner-yellow-accent" />
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
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Descargar
                    </button>
                    <button
                      onClick={reset}
                      className="btn-secondary px-4 flex items-center gap-2"
                    >
                      <ArrowRight size={16} />
                      Nueva
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right Panel: Output ────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Image viewport */}
            <div className="card rounded-3xl overflow-hidden min-h-[480px] lg:min-h-[540px] relative">
              <div className="p-6 sm:p-8 h-full flex flex-col">
                {step === "input" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-partrunner-gray-light">
                    <div className="w-20 h-20 rounded-full bg-partrunner-bg-main flex items-center justify-center mb-4">
                      <ImageIcon size={32} className="text-partrunner-gray-light" />
                    </div>
                    <p className="text-sm text-partrunner-gray-dark">Describe tu idea para comenzar</p>
                  </div>
                )}

                {step === "transforming" && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-partrunner-yellow-light border-2 border-partrunner-yellow/30 flex items-center justify-center">
                      <Sparkles size={24} className="text-partrunner-yellow-accent animate-pulse" />
                    </div>
                    <div className="text-center">
                      <p className="text-partrunner-black font-medium text-sm">Transformando prompt...</p>
                      <p className="text-partrunner-gray-dark text-xs mt-1">Claude → dirección de arte editorial</p>
                    </div>
                  </div>
                )}

                {step === "transformed" && editorialData && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full gap-5"
                  >
                    <div className="flex items-center gap-2 text-partrunner-green">
                      <CheckCircle2 size={16} />
                      <span className="text-xs font-semibold uppercase tracking-wider">Prompt editorial listo</span>
                    </div>
                    <div className="bg-partrunner-yellow-light border border-partrunner-yellow/20 rounded-2xl p-6">
                      <p className="text-partrunner-black font-bold text-xl mb-3">
                        {editorialData.headline.text}
                      </p>
                      <p className="text-partrunner-gray-dark text-sm leading-relaxed mb-4">
                        {editorialData.scene.description}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <MiniCard label="Surreal" value={editorialData.scene.surreal_element} />
                        <MiniCard label="Iluminación" value={editorialData.camera.lighting} />
                        <MiniCard label="Cámara" value={editorialData.camera.angle} />
                        <MiniCard label="Mood" value={editorialData.scene.mood} />
                        <MiniCard label="Logo" value={`${editorialData.logo.variant} / ${editorialData.logo.placement}`} />
                        <MiniCard label="Formato" value={`${editorialData.metadata.aspect_ratio}`} />
                      </div>
                    </div>
                    <p className="text-partrunner-gray-dark text-xs text-center">
                      Haz clic en <strong>"Generar Imagen"</strong> para enviar a Gemini
                    </p>
                  </motion.div>
                )}

                {step === "generating" && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-5">
                    <motion.div
                      className="relative w-20 h-20"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-partrunner-yellow/20 animate-ping" />
                      <div className="absolute inset-2 rounded-full bg-partrunner-yellow-light border-2 border-partrunner-yellow/30 flex items-center justify-center">
                        <ImageIcon size={28} className="text-partrunner-yellow-accent" />
                      </div>
                    </motion.div>
                    <div className="text-center">
                      <p className="text-partrunner-black font-medium text-sm">Generando imagen...</p>
                      <p className="text-partrunner-gray-dark text-xs mt-1">
                        Gemini → render editorial {format.aspect_ratio}
                      </p>
                    </div>
                  </div>
                )}

                {step === "complete" && generatedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-partrunner-green">
                        <CheckCircle2 size={16} />
                        <span className="text-xs font-semibold uppercase tracking-wider">Imagen lista</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-partrunner-yellow-50 text-partrunner-yellow-accent text-[10px] font-semibold">
                          {format.resolution}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-partrunner-yellow-50 text-partrunner-yellow-accent text-[10px] font-semibold">
                          {format.aspect_ratio}
                        </span>
                      </div>
                    </div>
                    <div className="relative flex-1 rounded-2xl overflow-hidden border border-partrunner-gray-light group">
                      <img
                        src={generatedImage}
                        alt={editorialData?.headline.text || "Generated image"}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <p className="text-white font-bold text-lg drop-shadow-lg">
                          {editorialData?.headline.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* JSON viewer */}
            {editorialData && (step === "transformed" || step === "generating" || step === "complete") && (
              <JsonViewer data={editorialData} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-8 flex items-center justify-center gap-2 text-partrunner-gray-dark text-xs">
        <img src={BRAND.logos.iconColor} alt="" className="h-4 w-4" />
        <span>Partrunner Technologies — 2026</span>
      </footer>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2 bg-white rounded-xl border border-partrunner-gray-light/50">
      <div className="text-[9px] text-[--color-text-muted] uppercase tracking-wider mb-0.5 font-semibold">{label}</div>
      <div className="text-xs text-partrunner-gray-dark leading-snug line-clamp-2">{value}</div>
    </div>
  );
}
