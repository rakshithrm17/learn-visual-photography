// ================================================
// LEARN VISUAL PHOTOGRAPHY
// scene-renderer.js — Shared canvas scene drawing
//
// All simulators use these scene drawing functions.
// The scene shows: sky, mountains, trees, ground,
// and a person in the foreground.
//
// Each simulator applies its own effect on top:
// - Aperture sim: blurs the background layer
// - Shutter sim: adds motion blur streaks
// - ISO sim: adds grain noise overlay
// ================================================

// ---- Scene Color Palettes per scene type ----
const SCENE_PALETTES = {
  portrait: {
    skyTop:      '#87CEEB',
    skyBottom:   '#B0D4E8',
    ground:      '#7CB87A',
    mountain:    '#8FA8C8',
    treeTrunk:   '#6B4226',
    treeLeaf:    '#4A7C59',
    subjectShirt:'#E8A87C',
    subjectSkin: '#D4956A',
    subjectHair: '#4A2C17'
  },
  landscape: {
    skyTop:      '#5B9BD5',
    skyBottom:   '#A8CBE8',
    ground:      '#5A8A52',
    mountain:    '#6B8CAE',
    treeTrunk:   '#5A3820',
    treeLeaf:    '#3D6B4A',
    subjectShirt:'#CC8844',
    subjectSkin: '#C4845A',
    subjectHair: '#3A1F10'
  },
  sports: {
    skyTop:      '#7EC8E3',
    skyBottom:   '#C0D8E8',
    ground:      '#8BC34A',
    mountain:    '#90A4AE',
    treeTrunk:   '#795548',
    treeLeaf:    '#558B2F',
    subjectShirt:'#E53935',
    subjectSkin: '#D4956A',
    subjectHair: '#212121'
  },
  lowlight: {
    skyTop:      '#1A237E',
    skyBottom:   '#283593',
    ground:      '#2E4A2E',
    mountain:    '#37474F',
    treeTrunk:   '#3E2723',
    treeLeaf:    '#2E7D32',
    subjectShirt:'#37474F',
    subjectSkin: '#8D6E63',
    subjectHair: '#212121'
  }
};

// ---- Draw the background layer (sky + mountains + trees) ----
// This layer gets blurred based on aperture.
function drawBackground(ctx, width, height, palette) {
  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
  skyGrad.addColorStop(0, palette.skyTop);
  skyGrad.addColorStop(1, palette.skyBottom);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height * 0.65);

  // Ground
  ctx.fillStyle = palette.ground;
  ctx.fillRect(0, height * 0.65, width, height * 0.35);

  // Distant mountains
  drawMountain(ctx, width * 0.1, height * 0.55, width * 0.35, height * 0.3, palette.mountain);
  drawMountain(ctx, width * 0.45, height * 0.50, width * 0.30, height * 0.28, palette.mountain);
  drawMountain(ctx, width * 0.7, height * 0.58, width * 0.40, height * 0.25, palette.mountain);

  // Background trees (left and right — far from subject)
  drawTree(ctx, width * 0.08, height * 0.65, 14, 36, palette);
  drawTree(ctx, width * 0.15, height * 0.65, 12, 32, palette);
  drawTree(ctx, width * 0.82, height * 0.65, 13, 34, palette);
  drawTree(ctx, width * 0.90, height * 0.65, 11, 30, palette);
}

// Draw a simple triangle mountain
function drawMountain(ctx, centerX, baseY, width, height, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX - width / 2, baseY);
  ctx.lineTo(centerX, baseY - height);
  ctx.lineTo(centerX + width / 2, baseY);
  ctx.closePath();
  ctx.fill();
}

// Draw a simple tree (trunk + circle of leaves)
function drawTree(ctx, x, y, trunkWidth, trunkHeight, palette) {
  // Trunk
  ctx.fillStyle = palette.treeTrunk;
  ctx.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);

  // Leaves
  ctx.fillStyle = palette.treeLeaf;
  ctx.beginPath();
  ctx.arc(x, y - trunkHeight - trunkWidth * 1.5, trunkWidth * 2.2, 0, Math.PI * 2);
  ctx.fill();
}

// ---- Draw the foreground subject (a person) ----
// This layer stays sharp (no blur applied here).
function drawSubject(ctx, x, y, scale, palette, motionBlur = 0) {
  const s = scale; // scale factor for sizing

  // If motion blur > 0, draw the subject with horizontal smear
  const blurSteps = motionBlur > 0 ? Math.floor(motionBlur * 6) : 0;
  const stepOffset = motionBlur > 0 ? motionBlur * 3 : 0;

  // Draw multiple ghost copies for motion blur effect
  for (let i = blurSteps; i >= 0; i--) {
    const alpha = i === 0 ? 1.0 : (0.12 / blurSteps) * (blurSteps - i);
    const xOffset = i === 0 ? 0 : -(stepOffset * (i / blurSteps));
    ctx.globalAlpha = alpha;
    drawPersonBody(ctx, x + xOffset, y, s, palette);
  }

  ctx.globalAlpha = 1;
}

// Draw the actual person shape
function drawPersonBody(ctx, x, y, s, palette) {
  // Head (circle)
  ctx.fillStyle = palette.subjectSkin;
  ctx.beginPath();
  ctx.arc(x, y - s * 2.5, s * 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Hair
  ctx.fillStyle = palette.subjectHair;
  ctx.beginPath();
  ctx.arc(x, y - s * 2.85, s * 0.5, Math.PI, 0);
  ctx.fill();

  // Body / shirt
  ctx.fillStyle = palette.subjectShirt;
  ctx.beginPath();
  ctx.roundRect(x - s * 0.4, y - s * 2.0, s * 0.8, s * 1.2, 4);
  ctx.fill();

  // Arms
  ctx.fillStyle = palette.subjectSkin;
  ctx.fillRect(x - s * 0.72, y - s * 2.0, s * 0.28, s * 0.9);
  ctx.fillRect(x + s * 0.44, y - s * 2.0, s * 0.28, s * 0.9);

  // Legs / pants
  ctx.fillStyle = '#3A3A5C';
  ctx.fillRect(x - s * 0.38, y - s * 0.8, s * 0.32, s * 0.85);
  ctx.fillRect(x + s * 0.06, y - s * 0.8, s * 0.32, s * 0.85);
}

// ---- Apply ISO noise overlay directly on the canvas ----
// Draws random colored pixels. More at high ISO.
function applyNoise(ctx, width, height, noiseAmount) {
  if (noiseAmount <= 0) return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const intensity = noiseAmount * 80; // scale 0-1 to pixel variance

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity;
    data[i]     = Math.min(255, Math.max(0, data[i]     + noise)); // R
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // G
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // B
    // Alpha stays unchanged
  }

  ctx.putImageData(imageData, 0, 0);
}

// ---- Apply brightness shift (exposure compensation or ISO) ----
// Multiplier > 1 = brighter, < 1 = darker
function applyBrightness(ctx, width, height, multiplier) {
  if (multiplier === 1) return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i]     = Math.min(255, data[i]     * multiplier); // R
    data[i + 1] = Math.min(255, data[i + 1] * multiplier); // G
    data[i + 2] = Math.min(255, data[i + 2] * multiplier); // B
  }

  ctx.putImageData(imageData, 0, 0);
}

// ---- Draw "No Lens Attached" message on canvas ----
function drawNoLensMessage(ctx, width, height) {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#999';
  ctx.font = '16px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Select a lens to see the simulation', width / 2, height / 2);
}
