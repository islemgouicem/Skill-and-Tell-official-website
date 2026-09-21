/**
 * The gold compass stars scattered over the night sky, placed by hand to
 * match the Figma frames. Each mark is [left%, top%, size in px, opacity].
 * The dust behind them comes from stars.png; these are the bright ones.
 *
 * Placement rule: every mark sits in a gap. None of them lands on the
 * wordmark, the display titles, the register button, the sun, a column of
 * text, the closing rule — or within reach of another compass star, so two
 * of them never clump together.
 */

/* the night block: hero + about */
export const HERO_SPARKS = [
  [33, 9, 34, 0.85],
  [58, 6.5, 26, 0.7],
  [80, 10, 38, 0.95],
  [95, 15, 30, 0.8],
  [45, 33, 28, 0.7],
  [92, 31, 34, 0.85],
  [63, 36, 24, 0.6],
  [30, 38, 22, 0.55],
  [10, 50, 26, 0.6],
  [50, 50, 30, 0.7],
  [88, 49, 24, 0.55],
  [97, 56, 28, 0.65],
  [60, 61, 22, 0.5],
  [60, 79, 24, 0.55],
];

/* the footer: clear of both heading stars and the closing rule star */
export const FOOTER_SPARKS = [
  [2.5, 22, 26, 0.6],
  [31, 30, 24, 0.55],
  [57, 26, 22, 0.5],
  [91, 10, 32, 0.8],
  [96, 30, 26, 0.7],
  [88, 55, 28, 0.7],
  [31, 52, 20, 0.5],
  [57, 45, 22, 0.55],
  [8, 66, 26, 0.6],
  [46, 66, 22, 0.5],
  [76, 68, 24, 0.55],
  [20, 96, 20, 0.45],
  [80, 96, 22, 0.5],
  [97, 88, 20, 0.45],
];
