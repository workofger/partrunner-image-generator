# Partrunner Image Generator

Generador de imágenes editoriales con IA para Partrunner. Estilo: **hiperrealismo cinematográfico + surrealismo logístico**.

## Flujo

1. El usuario describe una idea simple (ej: "entrega en la luna")
2. **Claude** (Anthropic) transforma el prompt en un JSON editorial con dirección de arte completa
3. **Gemini 3 Pro Image** genera la imagen a partir del `prompt_compiled`
4. El usuario descarga la imagen lista para uso

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + Vite 6 + Tailwind CSS 4 |
| Backend | Express (API proxy) |
| IA Transform | Claude Sonnet (Anthropic API) |
| IA Image | Gemini 3 Pro Image Preview (Google AI API) |
| Design System | Partrunner DS — Inter, #FFD840, #14142B |
| Deploy | Railway |

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

Según la [documentación oficial de Gemini](https://ai.google.dev/gemini-api/docs/image-generation):

| Modelo | Nombre API | Uso |
|---|---|---|
| **Nano Banana Pro** | `gemini-3-pro-image-preview` | Default. Producción profesional, razonamiento avanzado, hasta 4K |
| **Nano Banana 2** | `gemini-3.1-flash-image-preview` | Alta eficiencia, alto volumen, más rápido |
| **Nano Banana** | `gemini-2.5-flash-image` | Velocidad y eficiencia, baja latencia |

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

## Deploy en Railway

1. Crear proyecto en [railway.app](https://railway.app)
2. Conectar el repositorio de GitHub
3. Agregar variables de entorno (`ANTHROPIC_API_KEY`, `GEMINI_API_KEY`)
4. Railway ejecuta automáticamente:
   - Build: `npm run build`
   - Start: `npm start`

## Arquitectura

```
[Usuario] → prompt simple + formato
    ↓
[Express /api/transform] → Claude Sonnet → JSON editorial estructurado
    ↓                                        (incluye logo.variant)
[Express /api/generate] → Lee logo PNG de public/images/
    ↓                      según logo.variant del JSON
    ↓                      Envía logo como imagen de referencia + prompt_compiled
    ↓
[Gemini 3 Pro Image]   → Reproduce logo IDÉNTICO en la escena → imagen 2K
    ↓
[Frontend] → muestra imagen + JSON + descarga
```

### Logo como referencia

El logo real (PNG) se envía como imagen de referencia multimodal a Gemini junto con el `prompt_compiled`. Esto asegura que el logo en las imágenes generadas sea **idéntico** al logo oficial, no una aproximación o reinterpretación del modelo.

## Design System

Basado en el sistema de diseño oficial de Partrunner:

- **Colores**: Yellow `#FFD840`, Black `#14142B`, BG `#F5F7FB`
- **Tipografía**: Inter (única fuente)
- **Componentes**: `.btn-primary`, `.card`, `.input-base`
- **Logos**: 7 variantes en `public/images/`

---

*Partrunner Technologies S.A.P.I. de C.V. — 2026*
