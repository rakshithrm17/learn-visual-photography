// ================================================
// LEARN VISUAL PHOTOGRAPHY
// exposure-simulator.js
//
// Powers ALL three exposure simulators:
//   - Aperture (Depth of Field)
//   - Shutter Speed (Motion Blur)
//   - ISO (Noise & Brightness)
// And the combined Exposure Triangle simulator.
//
// Each simulator is a self-contained class that:
// 1. Draws the scene on a canvas
// 2. Applies effects based on slider values
// 3. Updates the info text explaining what's happening
// ================================================


// ================================================
// APERTURE SIMULATOR
// Controls: f-stop slider
// Effect: background blur (depth of field)
// ================================================
class ApertureSimulator {

  constructor(canvasId, infoId, valueId, scene = 'portrait') {
    this.canvas  = document.getElementById(canvasId);
    this.ctx     = this.canvas.getContext('2d');
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);
    this.scene   = scene;
    this.palette = SCENE_PALETTES[scene];

    // f-stop scale: index 0 = f/1.4 (wide open), index 6 = f/22 (narrow)
    this.fStops = ['f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22'];

    this.render(2); // start at f/2.8
  }

  // Called when the aperture slider moves
  // sliderValue = 0 (f/1.4) to 8 (f/22)
  render(sliderValue) {
    const fStopLabel = this.fStops[sliderValue];
    const blurAmount = this.getBlurAmount(sliderValue);

    // Update the displayed value
    this.valueEl.textContent = fStopLabel;

    // Draw the scene with background blur applied
    this.drawWithBlur(blurAmount);

    // Update the explanation text
    this.updateInfo(fStopLabel, sliderValue);
  }

  // Map slider 0-8 to blur radius 0-20px
  // Wide aperture (low f-number, low index) = lots of blur
  // Narrow aperture (high f-number, high index) = no blur
  getBlurAmount(sliderIndex) {
    const maxBlur = 18;
    return maxBlur - (sliderIndex / 8) * maxBlur;
  }

  drawWithBlur(blurPx) {
    const { canvas, ctx } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw background, then apply CSS blur via filter
    if (blurPx > 0) {
      ctx.save();
      ctx.filter = `blur(${blurPx.toFixed(1)}px)`;
    }

    drawBackground(ctx, w, h, this.palette);

    if (blurPx > 0) {
      ctx.restore(); // reset filter before drawing subject
    }

    // Draw sharp foreground subject (no blur)
    const subjectX = w / 2;
    const subjectY = h * 0.88;
    const subjectScale = h * 0.1;
    drawSubject(ctx, subjectX, subjectY, subjectScale, this.palette);
  }

  updateInfo(fStopLabel, sliderIndex) {
    const descriptions = [
      `<strong>${fStopLabel} — Wide Open:</strong> Maximum background blur (bokeh). Subject pops out against a creamy, soft background. Used for portraits and low-light situations.`,
      `<strong>${fStopLabel} — Very Wide:</strong> Strong background blur. Subject stands out clearly. Great for environmental portraits.`,
      `<strong>${fStopLabel} — Wide:</strong> Good background separation. More of the scene is in focus. Popular for everyday portraits.`,
      `<strong>${fStopLabel} — Mid Aperture:</strong> Balanced sharpness. Some background blur remains. Good for street photography.`,
      `<strong>${fStopLabel} — Mid Range:</strong> Most of the scene is sharp. Background starts to show detail. Kit lens default range.`,
      `<strong>${fStopLabel} — Narrowing:</strong> Deep depth of field. Sharp from near to far. Good for group photos.`,
      `<strong>${fStopLabel} — Narrow:</strong> Very deep depth of field. Landscape photography territory.`,
      `<strong>${fStopLabel} — Very Narrow:</strong> Maximum sharpness front to back. Used for product shots on tripod.`,
      `<strong>${fStopLabel} — Minimum Aperture:</strong> Everything sharp from close to horizon. Used for landscape with foreground detail.`
    ];

    this.infoEl.innerHTML = descriptions[sliderIndex] || descriptions[4];
  }
}


// ================================================
// SHUTTER SPEED SIMULATOR
// Controls: shutter speed slider
// Effect: motion blur on the moving subject
// ================================================
class ShutterSimulator {

  constructor(canvasId, infoId, valueId, scene = 'sports') {
    this.canvas  = document.getElementById(canvasId);
    this.ctx     = this.canvas.getContext('2d');
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);
    this.scene   = scene;
    this.palette = SCENE_PALETTES[scene];

    // Shutter speed scale: fast to slow
    this.speeds = [
      '1/4000s', '1/2000s', '1/1000s', '1/500s',
      '1/250s',  '1/125s',  '1/60s',
      '1/30s',   '1/15s',   '1/8s',
      '1/4s',    '1/2s',    '1s'
    ];

    this.animationFrame = null;
    this.subjectX = 0; // animated position of moving subject
    this.startAnimation();
    this.render(4); // start at 1/250s
  }

  // Animate the subject moving across the frame
  startAnimation() {
    const animate = () => {
      this.subjectX = (this.subjectX + 1.5) % (this.canvas.width + 60);
      this.drawCurrentFrame();
      this.animationFrame = requestAnimationFrame(animate);
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  stopAnimation() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  render(sliderValue) {
    this.currentSlider = sliderValue;
    const speedLabel  = this.speeds[sliderValue];
    const blurAmount  = this.getMotionBlur(sliderValue);

    this.valueEl.textContent = speedLabel;
    this.currentBlur = blurAmount;
    this.updateInfo(speedLabel, sliderValue);
  }

  drawCurrentFrame() {
    const { canvas, ctx } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw static background (no blur here — shutter doesn't affect background)
    drawBackground(ctx, w, h, this.palette);

    // Draw moving subject with motion blur based on shutter speed
    const subjectY    = h * 0.88;
    const subjectScale = h * 0.1;
    const xPos        = this.subjectX - 30;

    drawSubject(ctx, xPos, subjectY, subjectScale, this.palette, this.currentBlur || 0);
  }

  // Map slider to motion blur intensity
  // Fast shutter = no blur, slow shutter = heavy blur
  getMotionBlur(sliderIndex) {
    // 0 = fastest (no blur), 12 = slowest (max blur)
    if (sliderIndex <= 4)  return 0;           // 1/4000s to 1/250s — frozen
    if (sliderIndex === 5) return 0.15;         // 1/125s — tiny blur
    if (sliderIndex === 6) return 0.40;         // 1/60s — noticeable
    if (sliderIndex === 7) return 0.70;         // 1/30s — clear blur
    if (sliderIndex === 8) return 1.0;          // 1/15s — strong
    if (sliderIndex === 9) return 1.4;          // 1/8s
    return 1.0 + (sliderIndex - 9) * 0.4;      // 1/4s and slower
  }

  updateInfo(speedLabel, sliderIndex) {
    let message = '';

    if (sliderIndex <= 2) {
      message = `<strong>${speedLabel} — Super Fast:</strong> Freezes fast-moving subjects perfectly. Used for hummingbirds, race cars, and water droplets.`;
    } else if (sliderIndex <= 4) {
      message = `<strong>${speedLabel} — Fast:</strong> Freezes most subjects cleanly. Great for sports, running children, and active subjects.`;
    } else if (sliderIndex <= 6) {
      message = `<strong>${speedLabel} — Medium:</strong> Slight motion blur appears. Good for walking subjects. Camera shake may appear without stabilization.`;
    } else if (sliderIndex <= 9) {
      message = `<strong>${speedLabel} — Slow:</strong> Clear motion blur. Subject streaks across the frame. Use a tripod! Creative for waterfalls and street lights.`;
    } else {
      message = `<strong>${speedLabel} — Very Slow:</strong> Heavy motion blur. Long exposure photography. Tripod essential. Used for silky waterfalls, light trails, and star tracks.`;
    }

    this.infoEl.innerHTML = message;
  }
}


// ================================================
// ISO SIMULATOR
// Controls: ISO slider
// Effect: brightness + grain noise
// ================================================
class ISOSimulator {

  constructor(canvasId, infoId, valueId, scene = 'lowlight') {
    this.canvas  = document.getElementById(canvasId);
    this.ctx     = this.canvas.getContext('2d');
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);
    this.scene   = scene;
    this.palette = SCENE_PALETTES[scene];

    // ISO values in typical stops
    this.isoValues = [100, 200, 400, 800, 1600, 3200, 6400];

    this.render(0); // start at ISO 100
  }

  render(sliderIndex) {
    const isoValue    = this.isoValues[sliderIndex];
    const brightness  = this.getBrightness(sliderIndex);
    const noiseAmount = this.getNoiseAmount(sliderIndex);

    this.valueEl.textContent = `ISO ${isoValue}`;

    this.draw(brightness, noiseAmount);
    this.updateInfo(isoValue, sliderIndex);
  }

  draw(brightness, noiseAmount) {
    const { canvas, ctx } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw the full scene first
    drawBackground(ctx, w, h, this.palette);
    drawSubject(ctx, w / 2, h * 0.88, h * 0.1, this.palette);

    // Apply brightness shift (ISO makes image brighter)
    if (brightness !== 1) applyBrightness(ctx, w, h, brightness);

    // Apply noise on top (ISO adds grain)
    if (noiseAmount > 0) applyNoise(ctx, w, h, noiseAmount);
  }

  // Higher ISO = more brightness
  // Doubles every stop: ISO 100 = 1x, ISO 200 = 1.3x, ISO 400 = 1.6x, etc.
  getBrightness(sliderIndex) {
    const brightnessLevels = [0.85, 1.0, 1.25, 1.55, 1.85, 2.1, 2.4];
    return brightnessLevels[sliderIndex] || 1;
  }

  // Higher ISO = more noise
  getNoiseAmount(sliderIndex) {
    const noiseLevels = [0, 0.04, 0.10, 0.20, 0.38, 0.58, 0.80];
    return noiseLevels[sliderIndex] || 0;
  }

  updateInfo(isoValue, sliderIndex) {
    const descriptions = [
      `<strong>ISO ${isoValue} — Base ISO:</strong> Cleanest, sharpest image with no noise. Use outdoors in bright daylight. Images look pristine.`,
      `<strong>ISO ${isoValue} — Low ISO:</strong> Very clean image. Slight sensitivity increase. Good for open shade or overcast sky.`,
      `<strong>ISO ${isoValue} — Medium ISO:</strong> Minimal noise, barely visible. Good for indoor daylight or evening shots.`,
      `<strong>ISO ${isoValue} — Medium-High:</strong> Slight grain visible in shadows. Usable for indoor lighting or sports indoors.`,
      `<strong>ISO ${isoValue} — High ISO:</strong> Noticeable grain throughout the image. Acceptable for urgent situations — dark events, concerts.`,
      `<strong>ISO ${isoValue} — Very High:</strong> Clear grain/noise visible. Use only when you need a usable shot over a perfect one.`,
      `<strong>ISO ${isoValue} — Maximum ISO:</strong> Heavy noise. Colors may shift. Use only in extreme darkness. Grain becomes part of the aesthetic.`
    ];

    this.infoEl.innerHTML = descriptions[sliderIndex] || descriptions[0];
  }
}


// ================================================
// EXPOSURE TRIANGLE — COMBINED SIMULATOR
// Controls: all three sliders
// Effect: combined brightness + blur + noise + meter
// ================================================
class ExposureTriangleSimulator {

  constructor(canvasId, infoId, meterId, scene = 'portrait') {
    this.canvas   = document.getElementById(canvasId);
    this.ctx      = this.canvas.getContext('2d');
    this.infoEl   = document.getElementById(infoId);
    this.meterEl  = document.getElementById(meterId);
    this.scene    = scene;
    this.palette  = SCENE_PALETTES[scene];

    // Current settings
    this.settings = {
      aperture: 2,  // index into fStop array
      shutter: 4,   // index into shutter speed array
      iso: 0        // index into ISO array
    };

    this.fStops  = ['f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22'];
    this.speeds  = ['1/4000s','1/2000s','1/1000s','1/500s','1/250s','1/125s','1/60s','1/30s','1s'];
    this.isoVals = [100, 200, 400, 800, 1600, 3200, 6400];

    this.render();
  }

  // Update one setting and re-render
  setAperture(index)  { this.settings.aperture = index; this.render(); }
  setShutter(index)   { this.settings.shutter  = index; this.render(); }
  setISO(index)       { this.settings.iso       = index; this.render(); }

  render() {
    const { aperture, shutter, iso } = this.settings;
    const { canvas, ctx } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Calculate individual effects
    const blurAmount   = this.getApertureBlur(aperture);
    const brightness   = this.getCombinedBrightness(aperture, shutter, iso);
    const noiseAmount  = this.getNoiseAmount(iso);

    // Draw background (with aperture blur)
    if (blurAmount > 0) {
      ctx.save();
      ctx.filter = `blur(${blurAmount.toFixed(1)}px)`;
    }
    drawBackground(ctx, w, h, this.palette);
    if (blurAmount > 0) ctx.restore();

    // Draw subject
    drawSubject(ctx, w / 2, h * 0.88, h * 0.1, this.palette);

    // Apply brightness across full image
    if (brightness !== 1) applyBrightness(ctx, w, h, brightness);

    // Apply noise
    if (noiseAmount > 0) applyNoise(ctx, w, h, noiseAmount);

    // Update exposure meter and info
    this.updateMeter(aperture, shutter, iso);
    this.updateInfo(aperture, shutter, iso);
  }

  getApertureBlur(apertureIndex) {
    return 18 - (apertureIndex / 8) * 18;
  }

  // Exposure Value increases with: wider aperture, slower shutter, higher ISO
  // This gives us a simple combined brightness multiplier
  getCombinedBrightness(apertureIndex, shutterIndex, isoIndex) {
    // Aperture: index 0 = widest (most light), index 8 = narrowest (least light)
    const apertureLight = 1.0 + (8 - apertureIndex) * 0.12;

    // Shutter: index 0 = fastest (least light), index 8 = slowest (most light)
    const shutterLight = 0.6 + shutterIndex * 0.1;

    // ISO: higher ISO = brighter
    const isoLight = [0.85, 1.0, 1.2, 1.5, 1.8, 2.1, 2.4][isoIndex] || 1;

    // Clamp to prevent total white or pure black
    return Math.min(3.0, Math.max(0.1, apertureLight * shutterLight * isoLight * 0.6));
  }

  getNoiseAmount(isoIndex) {
    return [0, 0.04, 0.10, 0.20, 0.38, 0.58, 0.80][isoIndex] || 0;
  }

  // Calculate exposure level: negative = underexposed, 0 = balanced, positive = overexposed
  // Used to position the meter needle
  getExposureLevel(apertureIndex, shutterIndex, isoIndex) {
    // +1 per stop in aperture (wide open = more light)
    const apertureEV = (8 - apertureIndex) - 4; // center around f/5.6
    // +1 per stop in shutter (slow = more light)
    const shutterEV  = shutterIndex - 4;          // center around 1/250s
    // +1 per ISO doubling
    const isoEV      = isoIndex - 1;             // center around ISO 200

    return apertureEV + shutterEV + isoEV;
  }

  updateMeter(aperture, shutter, iso) {
    const ev = this.getExposureLevel(aperture, shutter, iso);
    const needle = this.meterEl;
    if (!needle) return;

    // Map EV (-4 to +4) to needle position (10% to 90%)
    const clamped  = Math.max(-4, Math.min(4, ev));
    const position = 50 + (clamped / 4) * 40; // 10% to 90%
    needle.style.left = `${position}%`;

    // Color the needle based on exposure
    if (Math.abs(clamped) <= 0.5)     needle.style.backgroundColor = '#16a34a'; // balanced
    else if (Math.abs(clamped) <= 1.5) needle.style.backgroundColor = '#f59e0b'; // slightly off
    else                               needle.style.backgroundColor = '#dc2626'; // badly off
  }

  updateInfo(aperture, shutter, iso) {
    const ev = this.getExposureLevel(aperture, shutter, iso);
    let exposureStatus = '';

    if (ev < -2)       exposureStatus = '⚫ Heavily underexposed — image will be very dark.';
    else if (ev < -1)  exposureStatus = '🔵 Underexposed — image will be darker than normal.';
    else if (ev <= 1)  exposureStatus = '🟢 Well exposed — good balance of light.';
    else if (ev <= 2)  exposureStatus = '🟡 Overexposed — image will be brighter than normal.';
    else               exposureStatus = '🔴 Heavily overexposed — highlights will be blown out.';

    this.infoEl.innerHTML = `
      <p><strong>Aperture:</strong> ${this.fStops[aperture]} &nbsp;|&nbsp;
         <strong>Shutter:</strong> ${this.speeds[shutter]} &nbsp;|&nbsp;
         <strong>ISO:</strong> ${this.isoVals[iso]}</p>
      <p style="margin-top:6px">${exposureStatus}</p>
    `;
  }
}
