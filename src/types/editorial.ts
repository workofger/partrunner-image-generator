export interface EditorialPrompt {
  metadata: {
    format: string;
    aspect_ratio: string;
    resolution: string;
    platform: string;
    language: string;
  };
  headline: {
    text: string;
    position: string;
  };
  logo: {
    variant: string;
    placement: string;
  };
  scene: {
    description: string;
    setting: string;
    time_of_day: string;
    mood: string;
    surreal_element: string;
    logistics_elements: string;
    characters: string;
    props: string[];
  };
  camera: {
    angle: string;
    focal_length: string;
    depth_of_field: string;
    lighting: string;
  };
  color_palette: string;
  texture_mood: string;
  do_not: string[];
  prompt_compiled: string;
}

export type Step = "input" | "transforming" | "transformed" | "generating" | "complete";
