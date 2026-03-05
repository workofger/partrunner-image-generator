import type { EditorialPrompt } from "../types/editorial";
import type { Format } from "../data/brand";

const API_BASE = "";

export async function transformPrompt(
  prompt: string,
  format: Format,
): Promise<EditorialPrompt> {
  const res = await fetch(`${API_BASE}/api/transform`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, format }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Transform failed (${res.status})`);
  }

  return res.json();
}

export async function generateImage(
  prompt_compiled: string,
  aspect_ratio: string,
  logo_variant?: string,
): Promise<string> {
  const res = await fetch(`${API_BASE}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt_compiled, aspect_ratio, logo_variant }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Generate failed (${res.status})`);
  }

  const data = await res.json();
  return data.image;
}
