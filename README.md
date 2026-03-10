# Partrunner Image Generator

Generador de imágenes editoriales con IA para Partrunner. Desde corporativo limpio hasta surrealismo logístico total — controlado por sliders.

## Flujo

1. El usuario describe una idea simple o selecciona un template predefinido
2. Ajusta sliders de **surrealismo**, **cinematografía**, **presencia de marca** y **detalle**
3. Opcionalmente activa **texto en imagen** con posición personalizada
4. **Claude** (Anthropic) transforma todo en un JSON editorial con dirección de arte completa
5. **Gemini 3 Pro Image** genera la imagen con el logo real como referencia
6. El usuario descarga la imagen lista para campaña

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + Vite 6 + Tailwind CSS 4 + Motion |
| Backend | Express (API proxy) |
| IA Transform | Claude Sonnet (Anthropic API) |
| IA Image | Gemini 3 Pro Image Preview (Google AI API) |
| Design System | Partrunner DS — Inter, #FFD840, #14142B |
| Deploy | Railway |

## Controles de generación

4 sliders (0-100%) que ajustan el estilo de la imagen generada:

| Slider | 0-25% | 75-100% |
|---|---|---|
| **Surrealismo** | Corporativo, realista, profesional | Absurdo, onírico, imposible |
| **Cinematografía** | Iluminación plana, estilo documental | Golden hour, volumétrica, épica |
| **Presencia de marca** | Logo sutil y discreto | Branding como protagonista visual |
| **Nivel de detalle** | Minimal, espacio negativo | Escena compleja, muchos elementos |

## Texto en imagen

Gemini 3 Pro Image puede renderizar texto legible. El equipo puede:

1. Activar el toggle "Texto en imagen"
2. Escribir el texto deseado (máx 80 caracteres) — ej: "Entregamos lo imposible"
3. Seleccionar posición: arriba, centro o abajo
4. Claude incluirá instrucciones de renderizado en el `prompt_compiled`

Si el toggle está desactivado, la imagen se genera con espacio negativo limpio para composición posterior.

## Templates de prompts

12 ideas predefinidas organizadas en dos categorías:

**Profesional:** Operación nocturna, entrega corporativa, fleet en formación, repartidor urbano, centro de operaciones, almacén automatizado.

**Creativo:** Iceberg al desierto, dinosaurios en el Zócalo, banana gigante en flatbed, portal interdimensional, entrega navideña, convoy con ballena.

## Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus API keys

# 3. Iniciar el servidor backend (terminal 1)
npm run dev:server

# 4. Iniciar el frontend (terminal 2)
npm run dev

# Abrir http://localhost:3000
```

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `ANTHROPIC_API_KEY` | Sí | API key de Anthropic para Claude |
| `GEMINI_API_KEY` | Sí | API key de Google AI para Gemini |
| `GEMINI_IMAGE_MODEL` | No | Modelo de imagen (default: `gemini-3-pro-image-preview`) |
| `PORT` | No | Puerto del servidor (default: 3001) |

## Modelos de imagen disponibles

| Modelo | Nombre API | Uso |
|---|---|---|
| **Gemini 3 Pro Image** | `gemini-3-pro-image-preview` | Default. Producción profesional, hasta 4K, hasta 6 refs |
| **Gemini 3.1 Flash Image** | `gemini-3.1-flash-image-preview` | Alta eficiencia, hasta 10 refs, más rápido |

Para cambiar el modelo, setear `GEMINI_IMAGE_MODEL` en `.env`.

## Formatos disponibles

| Formato | Aspect Ratio | Resolución |
|---|---|---|
| Instagram Post | 1:1 | 1080×1080 |
| IG / WA Story | 9:16 | 1080×1920 |
| LinkedIn / Facebook | 16:9 | 1200×628 |
| WhatsApp Status | 9:16 | 1080×1920 |
| Billboard / Banner | 16:9 | 1920×1080 |
| Presentación | 16:9 | 1920×1080 |

## Arquitectura

```
[Usuario] → prompt + formato + sliders + texto opcional
    ↓
[Express /api/transform] → Claude Sonnet
    ↓                       Interpreta sliders (surrealismo, cinematografía, etc.)
    ↓                       Genera JSON editorial estructurado
    ↓
[Express /api/generate] → Lee logo PNG de public/images/ (hasta 3 variantes)
    ↓                      Envía logos como referencia + prompt_compiled
    ↓
[Gemini 3 Pro Image]   → Reproduce logo IDÉNTICO en la escena → imagen 2K
    ↓
[Frontend] → muestra imagen + JSON + descarga
```

### Logo como referencia

El logo real (PNG) se envía como imagen de referencia multimodal a Gemini junto con el `prompt_compiled`. Se envían hasta 3 variantes del logo (primaria + full color + ícono) para máxima fidelidad. Pro soporta hasta 6 imágenes de objeto con alta fidelidad.

## Deploy en Railway

1. Crear proyecto en [railway.app](https://railway.app)
2. Conectar el repositorio de GitHub
3. Agregar variables de entorno (`ANTHROPIC_API_KEY`, `GEMINI_API_KEY`)
4. Railway ejecuta automáticamente:
   - Build: `npm run build`
   - Start: `npm start`

## Design System

Basado en el sistema de diseño oficial de Partrunner:

- **Colores**: Yellow `#FFD840`, Black `#14142B`, BG `#F5F7FB`
- **Tipografía**: Inter (única fuente)
- **Componentes**: `.btn-primary`, `.card`, `.input-base`, `.slider`
- **Logos**: 7 variantes en `public/images/`

---

*Partrunner Technologies S.A.P.I. de C.V. — 2026*
