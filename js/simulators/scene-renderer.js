// ================================================
// LEARN VISUAL PHOTOGRAPHY
// scene-renderer.js — Shared canvas scene drawing
//
// Now uses photorealistic image assets.
// ================================================

// ---- Image Asset Manager ----
const SceneAssets = {
  portrait: { bgSrc: '../assets/images/bg_portrait.jpg', subSrc: '../assets/images/subject_portrait.jpg', bgImg: null, subImg: null },
  landscape:{ bgSrc: '../assets/images/bg_portrait.jpg', subSrc: '../assets/images/subject_portrait.jpg', bgImg: null, subImg: null }, // reuse portrait for now or standard
  sports:   { bgSrc: '../assets/images/bg_sports.jpg', subSrc: '../assets/images/subject_sports.jpg', bgImg: null, subImg: null },
  lowlight: { bgSrc: '../assets/images/bg_lowlight.jpg', subSrc: '../assets/images/subject_lowlight.jpg', bgImg: null, subImg: null }
};

let assetsLoaded = false;
const callbacks = [];

// Load all images and process chromakey for subjects
function preloadSceneAssets(onComplete) {
  if (assetsLoaded) return onComplete();
  callbacks.push(onComplete);
  if (callbacks.length > 1) return; // already loading

  let toLoad = 0;
  
  // Helper to load image
  const loadImg = (src, onLoad) => {
    toLoad++;
    const img = new Image();
    img.onload = () => { onLoad(img); checkDone(); };
    img.onerror = () => { console.error('Failed to load', src); checkDone(); };
    img.src = src;
  };

  const checkDone = () => {
    toLoad--;
    if (toLoad === 0) {
      assetsLoaded = true;
      callbacks.forEach(cb => cb());
    }
  };

  // Helper to chromakey white background
  const processChromakey = (img) => {
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const idata = ctx.getImageData(0,0,c.width,c.height);
    const d = idata.data;
    // White background removal (threshold)
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 230 && d[i+1] > 230 && d[i+2] > 230) {
        // Soften edges slightly based on brightness
        const brightness = (d[i] + d[i+1] + d[i+2]) / 3;
        const alpha = Math.max(0, 255 - (brightness - 230) * 10);
        d[i+3] = alpha; 
      }
    }
    ctx.putImageData(idata, 0, 0);
    return c; // return canvas to draw directly
  };

  Object.values(SceneAssets).forEach(scene => {
    loadImg(scene.bgSrc, img => scene.bgImg = img);
    loadImg(scene.subSrc, img => {
      // Create a transparent version of the subject
      scene.subImg = processChromakey(img);
    });
  });
}

// Call this immediately to start loading
preloadSceneAssets(() => {
  // Dispatch event when ready so simulators can re-render
  window.dispatchEvent(new Event('scene-assets-loaded'));
});


// ---- Draw the background layer ----
// This layer gets blurred based on aperture.
function drawBackground(ctx, width, height, sceneName) {
  // Fallback to portrait if scene not found
  const scene = SceneAssets[sceneName] || SceneAssets.portrait;
  
  if (scene.bgImg) {
    // Fill canvas, preserving aspect ratio (cover)
    const imgRatio = scene.bgImg.width / scene.bgImg.height;
    const canvasRatio = width / height;
    let drawW = width, drawH = height, x = 0, y = 0;
    
    if (imgRatio > canvasRatio) {
      drawW = height * imgRatio;
      x = (width - drawW) / 2;
    } else {
      drawH = width / imgRatio;
      y = (height - drawH) / 2;
    }
    ctx.drawImage(scene.bgImg, x, y, drawW, drawH);
  } else {
    // Fallback if not loaded
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, width, height);
  }
}

// ---- Draw the foreground subject ----
// This layer stays sharp (no blur applied here).
function drawSubject(ctx, width, height, sceneName, motionBlur = 0, xOffset = 0) {
  const scene = SceneAssets[sceneName] || SceneAssets.portrait;
  
  if (!scene.subImg) return; // not loaded yet

  // If motion blur > 0, draw the subject with horizontal smear
  const blurSteps = motionBlur > 0 ? Math.floor(motionBlur * 6) : 0;
  const stepOffset = motionBlur > 0 ? motionBlur * 4 : 0; // px per step

  // Calculate subject size (e.g. 80% of height)
  const subH = height * 0.85;
  const subW = subH * (scene.subImg.width / scene.subImg.height);
  const baseX = (width / 2) - (subW / 2) + xOffset;
  const baseY = height - subH; // align to bottom

  // Draw multiple ghost copies for motion blur effect
  for (let i = blurSteps; i >= 0; i--) {
    const alpha = i === 0 ? 1.0 : (0.15 / blurSteps) * (blurSteps - i);
    const motionX = i === 0 ? 0 : -(stepOffset * i);
    ctx.globalAlpha = alpha;
    ctx.drawImage(scene.subImg, baseX + motionX, baseY, subW, subH);
  }

  ctx.globalAlpha = 1;
}

// ---- Apply ISO noise overlay directly on the canvas ----
// Draws random colored pixels. More at high ISO.
function applyNoise(ctx, width, height, noiseAmount) {
  if (noiseAmount <= 0) return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const intensity = noiseAmount * 100; 

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

  // Enhance contrast slightly when applying brightness to avoid washout
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
