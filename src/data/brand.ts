export const BRAND = {
  name: "Partrunner",
  tagline: "Last-mile logistics platform",
  industry: "logistics, last-mile delivery, operations",

  colors: {
    primary: "#FDD238",
    primary_name: "Partrunner Yellow",
    black: "#000000",
    white: "#FFFFFF",
    rules: [
      "SOLO estos 3 colores en elementos de marca (headlines, logos, overlays)",
      "La escena puede tener colores naturales — la restricción aplica a tipografía, logo y elementos de marca",
      "Headline SIEMPRE en #FDD238 con outline/sombra negra para legibilidad",
    ],
  },

  typography: {
    headlines: "Bebas Neue — bold, condensed, all-caps",
    body: "Barlow — clean, modern sans-serif",
    rules: [
      "Headlines: máximo 8 palabras, impactantes, con humor inteligente",
      "Idioma default: español mexicano",
      "Tono: entre irreverente y profesional — nunca vulgar, nunca corporativo genérico",
    ],
  },

  logos: {
    full_color: {
      url: "https://lrzcturtxtzhdzqacefy.supabase.co/storage/v1/object/public/Imagenes/FULL,%20COLOR@2x.png",
      usage: "Uso general sobre fondos neutros",
    },
    full_bicolor: {
      url: "https://lrzcturtxtzhdzqacefy.supabase.co/storage/v1/object/public/Imagenes/FULL,%20BICOLOR@2x.png",
      usage: "Sobre fondos de color de marca",
    },
    full_negative: {
      url: "https://lrzcturtxtzhdzqacefy.supabase.co/storage/v1/object/public/Imagenes/FULL,%20NEG@2x.png",
      usage: "Sobre fondos oscuros — logo amarillo/blanco",
    },
    full_positive: {
      url: "https://lrzcturtxtzhdzqacefy.supabase.co/storage/v1/object/public/Imagenes/FULL,%20POS@2x.png",
      usage: "Sobre fondos claros — logo negro",
    },
    iso_color: {
      url: "https://lrzcturtxtzhdzqacefy.supabase.co/storage/v1/object/public/Imagenes/ISO,%20COLOR@2x.png",
      usage: "Isotipo a color para iconos y fondos de marca",
    },
    iso_negative: {
      url: "https://lrzcturtxtzhdzqacefy.supabase.co/storage/v1/object/public/Imagenes/ISO,%20NEG@2x.png",
      usage: "Isotipo sobre fondos oscuros",
    },
    iso_positive: {
      url: "https://lrzcturtxtzhdzqacefy.supabase.co/storage/v1/object/public/Imagenes/ISO,%20POS@2x.png",
      usage: "Isotipo sobre fondos claros",
    },
  },

  logo_rules: [
    "Logo SIEMPRE presente en la imagen — preferencia en el vehículo como branding real",
    "Alternativa: esquina inferior derecha con padding",
    "NUNCA blanco sobre amarillo ni amarillo sobre blanco",
    "El isotipo (R-persona corriendo con paquete) puede aparecer en chalecos de los trabajadores",
    "No rotar, distorsionar ni aplicar efectos sobre el logo",
  ],

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
  icon: string;
}

export const FORMATS: Record<FormatKey, Format> = {
  instagram_post: {
    label: "Instagram Post",
    aspect_ratio: "1:1",
    gemini_aspect_ratio: "1:1",
    resolution: "1080×1080",
    platform: "instagram",
    notes: "Headline centrado. Logo abajo centrado.",
    icon: "□",
  },
  instagram_story: {
    label: "IG / WA Story",
    aspect_ratio: "9:16",
    gemini_aspect_ratio: "9:16",
    resolution: "1080×1920",
    platform: "instagram_story",
    notes: "Composición vertical. Headline arriba, escena al centro, logo abajo.",
    icon: "▯",
  },
  linkedin_facebook: {
    label: "LinkedIn / Facebook",
    aspect_ratio: "1.91:1",
    gemini_aspect_ratio: "16:9",
    resolution: "1200×628",
    platform: "linkedin",
    notes: "Formato wide. Headline a la izquierda o centrado. Logo esquina inferior derecha.",
    icon: "▭",
  },
  whatsapp_status: {
    label: "WhatsApp Status",
    aspect_ratio: "9:16",
    gemini_aspect_ratio: "9:16",
    resolution: "1080×1920",
    platform: "whatsapp",
    notes: "Texto grande y legible en móvil. Mismo formato que IG Story.",
    icon: "▯",
  },
  billboard: {
    label: "Billboard / Banner",
    aspect_ratio: "16:9",
    gemini_aspect_ratio: "16:9",
    resolution: "1920×1080",
    platform: "web",
    notes: "Formato landscape principal. Máxima calidad cinematográfica.",
    icon: "▬",
  },
  presentation: {
    label: "Presentación",
    aspect_ratio: "16:9",
    gemini_aspect_ratio: "16:9",
    resolution: "1920×1080",
    platform: "presentation",
    notes: "Para slides. Puede ser más limpio. Logo discreto esquina inferior.",
    icon: "▬",
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
- Amarillo: #FDD238 (chalecos, acentos de vehículos, elementos de marca)
- Negro: #000000 (fondos de logo, texto)
- Blanco: #FFFFFF (contraste)

LOGO PARTRUNNER:
- El logo debe estar presente visualmente — preferentemente en el vehículo como branding real (pintado en lateral, en puertas)
- Alternativa: en el chaleco de los trabajadores
- El isotipo de Partrunner es una "R" estilizada como persona corriendo con un paquete

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

REGLA CRÍTICA SOBRE TEXTO EN LA IMAGEN:
- Los modelos de generación de imágenes NO pueden renderizar texto legible de forma confiable
- NUNCA incluyas instrucciones de renderizar texto, tipografía, headlines o letras en el campo prompt_compiled
- EN VEZ DE ESO, incluye "clean negative space in [posición] for text overlay" para que el equipo de diseño agregue texto después
- El campo headline se genera como METADATA para composición posterior, no como instrucción al modelo de imagen

Cuando recibas un prompt del usuario:
1. Identifica el concepto central
2. Inventa una escena surreal que conecte el concepto con la logística
3. Genera un headline memorable en español mexicano (máx 8 palabras, humor inteligente)
4. Describe la escena con detalle cinematográfico
5. Compila un prompt editorial completo en INGLÉS para el modelo de imagen (mínimo 80 palabras)
6. Devuelve ÚNICAMENTE el JSON válido — sin markdown, sin backticks, sin texto antes ni después`;
