import {
  animate,
  AnimationOptions,
  DOMKeyframesDefinition,
  stagger,
} from 'motion';

// Single source of truth for every animation in the site.

export const duration = { fast: 0.2, base: 0.4, slow: 0.8 };

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springUi = { type: 'spring', stiffness: 300, damping: 30 } as const;
export const springSoft = { type: 'spring', stiffness: 120, damping: 20 } as const;

export const fadeUp: DOMKeyframesDefinition = { opacity: [0, 1], y: [24, 0] };
export const scaleIn: DOMKeyframesDefinition = { opacity: [0, 1], scale: [0.8, 1] };
export const staggerContainer = (step = 0.08, startDelay = 0) =>
  stagger(step, { startDelay });

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fine pointer with hover: no tilt / magnetic / hover effects on touch screens
export const canHover = (): boolean =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Entrance animation. Falls back to a plain fade with reduced motion.
 * will-change is set only while the animation runs.
 */
export function enter(
  targets: HTMLElement | HTMLElement[],
  keyframes: DOMKeyframesDefinition = fadeUp,
  options: AnimationOptions = {}
) {
  const elements = Array.isArray(targets) ? targets : [targets];
  if (!elements.length) return Promise.resolve();

  const reduced = prefersReducedMotion();
  elements.forEach((el) => (el.style.willChange = reduced ? 'opacity' : 'transform, opacity'));

  const controls = reduced
    ? animate(elements, { opacity: [0, 1] }, { duration: duration.fast, delay: options.delay })
    : animate(elements, keyframes, { duration: duration.base, ease: easeOutExpo, ...options });

  return controls.then(() => elements.forEach((el) => (el.style.willChange = '')));
}
