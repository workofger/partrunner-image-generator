import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "50mb" }));

// ---------------------------------------------------------------------------
// API clients
// ---------------------------------------------------------------------------

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ---------------------------------------------------------------------------
// System prompt — imported inline so the server file is self-contained
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `Eres el director creativo de Partrunner, una plataforma de logística last-mile en México.
Tu trabajo es transformar ideas simples en prompts editoriales de nivel agencia publicitaria premium.

ESTILO OBLIGATORIO:
- Hiperrealismo cinematográfico + surrealismo logístico
- Escenas absurdas e imposibles donde la logística de Partrunner resuelve lo irreal
- Humor inteligente mexicano — irreverente pero nunca vulgar
- Calidad visual de campaña publicitaria premium / editorial de revista

ELEMENTOS OBLIGATORIOS EN CADA IMAGEN:
1. Al menos UN vehículo de logística con branding Partrunner visible (van, tráiler, camioneta, moto de reparto)
2. Al menos UN trabajador con chaleco de seguridad amarillo o negro con logo Partrunner
3. Un elemento surreal o absurdo que cree tensión visual y narrativa
4. Iluminación cinematográfica (golden hour, blue hour, o iluminación nocturna dramática)

PALETA DE MARCA (aplica solo a elementos de branding — la escena puede tener colores naturales):
- Amarillo Partrunner: #FFD840 (chalecos, acentos de vehículos, elementos de marca)
- Negro Partrunner: #14142B (fondos de logo, texto)
- Blanco: #FFFFFF (contraste)
- Acento: #F29F05 (detalles dorados/cálidos)

LOGO PARTRUNNER — REGLA DE IDENTIDAD EXACTA:
- Se enviará la imagen del logo REAL de Partrunner como referencia junto al prompt de generación.
- El modelo de imagen DEBE reproducir el logo IDÉNTICAMENTE — sin modificar, sin reinterpretar, sin estilizar.
- NUNCA inventar, rediseñar ni "inspirarse" en el logo. Debe ser una copia EXACTA de la referencia.
- El isotipo de Partrunner es una "R" estilizada como persona corriendo con un paquete — pero NO describas esto textualmente, el logo se inyecta como imagen de referencia.
- En el prompt_compiled, incluye la instrucción: "The Partrunner logo shown in the reference image must appear IDENTICALLY reproduced — exact same shape, proportions, colors, and details. Do NOT redesign, reinterpret, or approximate the logo."
- Placement preferente: pintado/adherido en el vehículo (lateral, puertas) como branding real, o en el chaleco de los trabajadores.
- Logo negro sobre fondos amarillos/claros, logo blanco/amarillo sobre fondos oscuros.

DIRECCIÓN DE CÁMARA:
- Wide angle (24-35mm) para capturar la escena completa
- Perspectiva heroica (ligeramente desde abajo)
- Profundidad de campo media (sujeto sharp, fondo con bokeh suave)
- Estilo de fotografía editorial profesional, NUNCA ilustración ni cartoon

PROHIBIDO:
- Caricaturas, ilustraciones flat, render 3D de baja calidad
- Imágenes de stock genéricas con personas sonriendo forzadamente
- Escenas aburridas, predecibles o sin elemento narrativo
- Personas tristes, en peligro o en situaciones negativas
- Contenido político, religioso ofensivo o controversial
- Colores fuera de la paleta en elementos de marca

REGLA SOBRE TEXTO EN LA IMAGEN:
- Gemini 3 Pro Image SÍ puede renderizar texto legible y estilizado.
- SIN EMBARGO, para máximo control editorial, preferimos NO renderizar el headline directamente en la imagen.
- En el prompt_compiled, incluye "leave clean negative space in [posición] for headline text overlay in post-production" para que el equipo de diseño componga el texto después.
- El campo headline se genera como METADATA para composición posterior.
- Si el usuario pide explícitamente texto en la imagen, entonces SÍ puedes incluirlo en el prompt_compiled con la instrucción de renderizarlo.

Cuando recibas un prompt del usuario:
1. Identifica el concepto central
2. Inventa una escena surreal que conecte el concepto con la logística
3. Genera un headline memorable en español mexicano (máx 8 palabras, humor inteligente)
4. Describe la escena con detalle cinematográfico
5. Compila un prompt editorial completo en INGLÉS para el modelo de imagen (mínimo 80 palabras). OBLIGATORIO incluir en el prompt_compiled: "The Partrunner logo shown in the reference image must appear IDENTICALLY reproduced in the scene — exact same shape, proportions, colors, and details. Do NOT redesign, reinterpret, or approximate the logo. Place it [placement]."
6. Devuelve ÚNICAMENTE el JSON válido — sin markdown, sin backticks, sin texto antes ni después`;

// ---------------------------------------------------------------------------
// POST /api/transform — Claude transforms a simple prompt into editorial JSON
// ---------------------------------------------------------------------------

app.post("/api/transform", async (req, res) => {
  try {
    const { prompt, format } = req.body;

    if (!prompt || !format) {
      res.status(400).json({ error: "prompt and format are required" });
      return;
    }

    const userMessage = `Transforma esta idea simple en un JSON editorial para generación de imágenes.

Idea del usuario: "${prompt}"

Formato seleccionado: ${format.label} (${format.aspect_ratio}, ${format.resolution})
Plataforma: ${format.platform}
Notas de composición: ${format.notes}

Devuelve el JSON con esta estructura EXACTA (todos los campos son obligatorios):
{
  "metadata": {
    "format": "${format.label}",
    "aspect_ratio": "${format.aspect_ratio}",
    "resolution": "${format.resolution}",
    "platform": "${format.platform}",
    "language": "es-MX"
  },
  "headline": {
    "text": "HEADLINE EN ESPAÑOL MEXICANO (máx 8 palabras, humor inteligente)",
    "position": "top_center | top_left | bottom_center"
  },
  "logo": {
    "variant": "full_color | full_negative | full_positive | iso_color | iso_negative | iso_positive",
    "placement": "vehicle | vest | corner_bottom_right"
  },
  "scene": {
    "description": "Descripción cinematográfica detallada de la escena completa. Mínimo 3 oraciones.",
    "setting": "Ubicación específica de la escena",
    "time_of_day": "golden_hour | blue_hour | night | midday | dawn",
    "mood": "Atmósfera emocional de la escena",
    "surreal_element": "El elemento absurdo/imposible específico",
    "logistics_elements": "Vehículos y operaciones logísticas presentes",
    "characters": "Descripción de personas: vestimenta, actitud, acción",
    "props": ["lista", "de", "props", "adicionales"]
  },
  "camera": {
    "angle": "Ángulo y perspectiva de la cámara",
    "focal_length": "Distancia focal (ej: 28mm)",
    "depth_of_field": "Apertura y profundidad (ej: f/4)",
    "lighting": "Descripción completa de la iluminación"
  },
    "color_palette": "Colores dominantes de la escena con hexadecimales incluyendo #FFD840",
  "texture_mood": "Textura ambiental y atmósfera emocional",
  "do_not": ["lista de cosas que NO deben aparecer"],
  "prompt_compiled": "The full editorial prompt in ENGLISH, minimum 80 words. Rich photographic and cinematic terminology. Include instruction to leave clean negative space for text overlay. Do NOT include any text/typography rendering instructions."
}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text in Claude response");
    }

    let jsonText = textBlock.text.trim();
    // Strip markdown fences if Claude wraps the response despite instructions
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const editorial = JSON.parse(jsonText);
    res.json(editorial);
  } catch (error: unknown) {
    console.error("Transform error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: `Failed to transform prompt: ${msg}` });
  }
});

// ---------------------------------------------------------------------------
// POST /api/generate — Gemini generates an image from the compiled prompt
// ---------------------------------------------------------------------------

const LOGO_VARIANT_MAP: Record<string, string> = {
  full_color: "logo-full-color.png",
  full_bicolor: "logo-full-bicolor.png",
  full_negative: "logo-full-white.png",
  full_positive: "logo-full-black.png",
  iso_color: "icon-color.png",
  iso_negative: "icon-white.png",
  iso_positive: "icon-black.png",
};

function readLogoPng(filename: string): { data: string; mimeType: string } | null {
  const logoPath = path.join(__dirname, "public", "images", filename);
  try {
    const buffer = fs.readFileSync(logoPath);
    return { data: buffer.toString("base64"), mimeType: "image/png" };
  } catch {
    return null;
  }
}

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt_compiled, aspect_ratio, logo_variant } = req.body;

    if (!prompt_compiled) {
      res.status(400).json({ error: "prompt_compiled is required" });
      return;
    }

    const model = process.env.GEMINI_IMAGE_MODEL || "gemini-3-pro-image-preview";

    const primaryFile = LOGO_VARIANT_MAP[logo_variant] || "logo-full-color.png";
    const primaryLogo = readLogoPng(primaryFile);
    const fullColorLogo = primaryFile !== "logo-full-color.png" ? readLogoPng("logo-full-color.png") : null;
    const iconLogo = readLogoPng("icon-color.png");

    const contents: Array<Record<string, unknown>> = [];

    const logoPrefix = primaryLogo
      ? `The reference images provided are the EXACT Partrunner brand logos. You MUST reproduce the primary logo (first reference image) IDENTICALLY in the generated scene — same exact shape, proportions, colors, and every detail. Do NOT redesign, reinterpret, simplify, or approximate the logo in any way. It should look like the real logo was physically painted, printed, or adhered onto the scene elements (vehicle sides, doors, safety vests).\n\n`
      : "";

    contents.push({ text: `${logoPrefix}${prompt_compiled}` });

    if (primaryLogo) {
      contents.push({ inlineData: { mimeType: primaryLogo.mimeType, data: primaryLogo.data } });
    }
    if (fullColorLogo) {
      contents.push({ inlineData: { mimeType: fullColorLogo.mimeType, data: fullColorLogo.data } });
    }
    if (iconLogo && primaryFile !== "icon-color.png") {
      contents.push({ inlineData: { mimeType: iconLogo.mimeType, data: iconLogo.data } });
    }

    console.log(`Generating with ${model} | logo: ${primaryFile} | refs: ${contents.length - 1} images`);

    const response = await genai.models.generateContent({
      model,
      contents,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: {
          aspectRatio: aspect_ratio || "16:9",
          imageSize: "2K",
        },
      } as Record<string, unknown>,
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const mimeType = part.inlineData.mimeType || "image/png";
        res.json({ image: `data:${mimeType};base64,${part.inlineData.data}` });
        return;
      }
    }

    throw new Error("No image in Gemini response");
  } catch (error: unknown) {
    console.error("Generate error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: `Failed to generate image: ${msg}` });
  }
});

// ---------------------------------------------------------------------------
// Static files & SPA fallback (production)
// ---------------------------------------------------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

const PORT = parseInt(process.env.PORT || "3001", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
