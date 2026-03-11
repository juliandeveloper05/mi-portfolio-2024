import React from "react";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

interface PostProcessingProps {
  enableBloom?: boolean;
  enableChromaticAberration?: boolean;
  enableVignette?: boolean;
  enableNoise?: boolean;
  bloomIntensity?: number;
  bloomThreshold?: number;
}

const PostProcessingEffects: React.FC<PostProcessingProps> = ({
  enableBloom = true,
  enableChromaticAberration = false,
  enableVignette = true,
  enableNoise = false,
  bloomIntensity = 0.5,
  bloomThreshold = 0.8,
}) => {
  const effects: React.ReactElement[] = [];

  if (enableBloom) {
    effects.push(
      <Bloom
        key="bloom"
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
    );
  }

  if (enableChromaticAberration) {
    effects.push(
      <ChromaticAberration
        key="chromatic"
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.002, 0.002)}
        radialModulation={false}
        modulationOffset={0.0}
      />
    );
  }

  if (enableVignette) {
    effects.push(
      <Vignette
        key="vignette"
        darkness={0.4}
        offset={0.3}
        blendFunction={BlendFunction.NORMAL}
      />
    );
  }

  if (enableNoise) {
    effects.push(
      <Noise
        key="noise"
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.02}
      />
    );
  }

  if (effects.length === 0) return null;

  return <EffectComposer>{effects}</EffectComposer>;
};

export default PostProcessingEffects;
