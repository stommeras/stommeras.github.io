/**
 * Preset configurations for DecryptedText animations
 */
export const DECRYPT_PRESETS = {
  /** Subtle animation for body text - fast with single iteration */
  subtle: {
    speed: 15,
    maxIterations: 1,
    sequential: true,
    animateOn: 'view' as const,
  },
  /** Dramatic animation for headings - slower with multiple iterations */
  dramatic: {
    speed: 20,
    maxIterations: 4,
    sequential: true,
  },
} as const;
