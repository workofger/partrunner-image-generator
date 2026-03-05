# Partrunner Image Generator

Generador de imágenes editoriales con IA para Partrunner.

**Flujo:**
1. El usuario describe una idea simple (ej: "entrega en la luna")
2. **Claude** transforma el prompt en un JSON editorial con dirección de arte completa
3. **Gemini** genera la imagen a partir del prompt compilado
4. El usuario descarga la imagen lista para uso

## Stack

- **Frontend:** React 19 + Vite + Tailwind CSS 4
- **Backend:** Express (API proxy para proteger API keys)
- **IA Transform:** Claude Sonnet (Anthropic API)
- **IA Image:** Gemini (Google AI API)
- **Deploy:** Railway

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
| `GEMINI_IMAGE_MODEL` | No | Modelo de imagen (default: `gemini-2.0-flash-preview-image-generation`) |
| `PORT` | No | Puerto del servidor (default: 3001, Railway lo asigna automáticamente) |

## Deploy en Railway

1. Crear proyecto en [railway.app](https://railway.app)
2. Conectar el repositorio de GitHub
3. Agregar las variables de entorno (`ANTHROPIC_API_KEY`, `GEMINI_API_KEY`)
4. Railway detecta automáticamente Node.js y ejecuta:
   - Build: `npm run build`
   - Start: `npm start`

## Arquitectura

```
[Usuario] → prompt simple + formato
    ↓
[Express /api/transform] → Claude → JSON editorial estructurado
    ↓
[Express /api/generate] → Gemini → imagen base64
    ↓
[Frontend] → muestra imagen + JSON + descarga
```
