export const BRAND = {
  name: "Partrunner",
  tagline: "Last-mile logistics platform",
  industry: "logistics, last-mile delivery, operations",

  colors: {
    yellow: "#FFD840",
    yellowDark: "#FED330",
    yellowAccent: "#F29F05",
    yellowLight: "#FFF9E5",
    black: "#14142B",
    charcoal: "#2D2D2D",
    grayDark: "#4E4B66",
    grayLight: "#D9DBE9",
    bgMain: "#F5F7FB",
    bgCard: "#FFFFFF",
    green: "#26B76E",
    red: "#FF4757",
    teal: "#10C89B",
  },

  typography: {
    font: "Inter",
    headlines: "Inter — bold, all-caps for hero headlines",
    body: "Inter — regular weight, clean sans-serif",
    rules: [
      "Headlines: máximo 8 palabras, impactantes, con humor inteligente",
      "Idioma default: español mexicano",
      "Tono: entre irreverente y profesional — nunca vulgar, nunca corporativo genérico",
    ],
  },

  logos: {
    fullColor: "/images/logo-full-color.png",
    fullBicolor: "/images/logo-full-bicolor.png",
    fullWhite: "/images/logo-full-white.png",
    fullBlack: "/images/logo-full-black.png",
    iconColor: "/images/icon-color.png",
    iconWhite: "/images/icon-white.png",
    iconBlack: "/images/icon-black.png",
  },

  logoRules: {
    onYellowBg: "fullBlack or iconBlack",
    onDarkBg: "fullWhite or iconWhite",
    onLightBg: "fullBlack or iconBlack",
    onBrandBg: "fullBicolor or iconColor",
  },

  editorial_style: {
    genre: "Hiperrealismo cinematográfico + surrealismo logístico",
    description:
      "Escenas absurdas e imposibles donde la logística de Partrunner resuelve lo irreal. Combina elementos fantásticos con operaciones logísticas reales.",
    mandatory_elements: [
      "Al menos UN vehículo de logística con branding Partrunner (van, tráiler, camioneta, moto)",
      "Al menos UN trabajador con chaleco de seguridad (amarillo o negro con logo PR)",
      "Un objeto o escenario absurdo/surreal que cree tensión visual",
      "Iluminación cinematográfica (golden hour, blue hour, o noche dramática)",
    ],
    visual_references: [
      "Banana gigante en flatbed con mano de gorila King Kong, trabajadores descargando",
      "Desierto con tienda árabe, trabajadores descargando jacuzzi y oso de peluche gigante",
      "Reyes Magos con camello y elefante, tráiler Partrunner descargando de noche",
    ],
    camera: {
      angle: "Wide angle o plano medio — siempre mostrando la escena completa",
      lens: "24-35mm equivalente — perspectiva dramática sin distorsión excesiva",
      depth_of_field: "Profundidad media — sujeto principal sharp, fondo con bokeh suave",
      style: "Fotografía editorial de revista / campaña publicitaria premium",
    },
    lighting: {
      primary: "Golden hour, blue hour, o iluminación nocturna dramática",
      fill: "Luces de trabajo (focos de obra, luces de camión) como fill natural",
      mood: "Épico pero accesible — no oscuro ni ominoso",
    },
    do_not: [
      "NO caricaturas ni ilustraciones flat",
      "NO stock photo genérico",
      "NO escenas aburridas o predecibles",
      "NO texto pequeño ni subtítulos largos",
      "NO personas tristes o en peligro",
      "NO colores de marca fuera de la paleta en elementos de branding",
      "NO logos de otras empresas",
      "NO contenido político, religioso ofensivo o controversial",
    ],
  },

  mood_keywords: [
    "urgencia controlada",
    "surrealismo",
    "humor inteligente",
    "cinematográfico",
    "épico",
    "logística imposible",
    "México urbano",
  ],
} as const;

export type FormatKey =
  | "instagram_post"
  | "instagram_story"
  | "linkedin_facebook"
  | "whatsapp_status"
  | "billboard"
  | "presentation";

export interface Format {
  label: string;
  aspect_ratio: string;
  gemini_aspect_ratio: string;
  resolution: string;
  platform: string;
  notes: string;
}

export const FORMATS: Record<FormatKey, Format> = {
  instagram_post: {
    label: "Instagram Post",
    aspect_ratio: "1:1",
    gemini_aspect_ratio: "1:1",
    resolution: "1080×1080",
    platform: "instagram",
    notes: "Headline centrado. Logo abajo centrado.",
  },
  instagram_story: {
    label: "IG / WA Story",
    aspect_ratio: "9:16",
    gemini_aspect_ratio: "9:16",
    resolution: "1080×1920",
    platform: "instagram_story",
    notes: "Composición vertical. Headline arriba, escena al centro, logo abajo.",
  },
  linkedin_facebook: {
    label: "LinkedIn / Facebook",
    aspect_ratio: "1.91:1",
    gemini_aspect_ratio: "16:9",
    resolution: "1200×628",
    platform: "linkedin",
    notes: "Formato wide. Headline a la izquierda o centrado. Logo esquina inferior derecha.",
  },
  whatsapp_status: {
    label: "WhatsApp Status",
    aspect_ratio: "9:16",
    gemini_aspect_ratio: "9:16",
    resolution: "1080×1920",
    platform: "whatsapp",
    notes: "Texto grande y legible en móvil. Mismo formato que IG Story.",
  },
  billboard: {
    label: "Billboard / Banner",
    aspect_ratio: "16:9",
    gemini_aspect_ratio: "16:9",
    resolution: "1920×1080",
    platform: "web",
    notes: "Formato landscape principal. Máxima calidad cinematográfica.",
  },
  presentation: {
    label: "Presentación",
    aspect_ratio: "16:9",
    gemini_aspect_ratio: "16:9",
    resolution: "1920×1080",
    platform: "presentation",
    notes: "Para slides. Puede ser más limpio. Logo discreto esquina inferior.",
  },
};

export const SYSTEM_PROMPT = `Eres el director creativo de Partrunner, una plataforma de logística last-mile en México.
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

CONTROLES DE GENERACIÓN:
- El usuario puede ajustar 4 parámetros (0-100%): Surrealismo, Cinematografía, Presencia de marca, Detalle.
- RESPETA estos valores fielmente. Si surrealismo es 0-25%, la escena debe ser 100% realista y profesional.
- Si cinematografía es baja, usa iluminación plana y limpia. Si es alta, usa golden hour/blue hour/dramática.
- Si presencia de marca es baja, el logo es pequeño y sutil. Si es alta, el branding es protagonista.
- Si el usuario activó "Texto en imagen", incluye la instrucción de renderizar ese texto exacto en el prompt_compiled.

Cuando recibas un prompt del usuario:
1. Identifica el concepto central
2. Crea una escena acorde al nivel de surrealismo indicado (puede ser 100% profesional si el slider es bajo)
3. Genera un headline memorable en español mexicano (máx 8 palabras)
4. Describe la escena con el nivel de detalle cinematográfico indicado
5. Compila un prompt editorial completo en INGLÉS para el modelo de imagen (mínimo 80 palabras). OBLIGATORIO incluir en el prompt_compiled: "The Partrunner logo shown in the reference image must appear IDENTICALLY reproduced in the scene — exact same shape, proportions, colors, and details. Do NOT redesign, reinterpret, or approximate the logo. Place it [placement]."
6. Devuelve ÚNICAMENTE el JSON válido — sin markdown, sin backticks, sin texto antes ni después`;
