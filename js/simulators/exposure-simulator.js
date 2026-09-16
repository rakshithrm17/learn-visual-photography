// ================================================
// LEARN VISUAL PHOTOGRAPHY
// exposure-simulator.js
//
// Powers ALL three exposure simulators:
//   - Aperture (Depth of Field)
//   - Shutter Speed (Motion Blur)
//   - ISO (Noise & Brightness)
// And the combined Exposure Triangle simulator.
// ================================================


// ================================================
// APERTURE SIMULATOR
// ================================================
class ApertureSimulator {

  constructor(canvasId, infoId, valueId, scene = 'portrait') {
    this.canvas  = document.getElementById(canvasId);
    this.ctx     = this.canvas.getContext('2d');
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);
    this.scene   = scene;

    this.fStops = ['f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22'];
    this.currentSlider = 2; // f/2.8

    window.addEventListener('scene-assets-loaded', () => this.render(this.currentSlider));
    this.render(this.currentSlider); 
  }

  render(sliderValue) {
    this.currentSlider = sliderValue;
    const fStopLabel = this.fStops[sliderValue];
    const blurAmount = this.getBlurAmount(sliderValue);

    this.valueEl.textContent = fStopLabel;
    this.drawWithBlur(blurAmount);
    this.updateInfo(fStopLabel, sliderValue);
  }

  getBlurAmount(sliderIndex) {
    const maxBlur = 18;
    return maxBlur - (sliderIndex / 8) * maxBlur;
  }

  drawWithBlur(blurPx) {
    const { canvas, ctx } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (blurPx > 0) {
      ctx.save();
      ctx.filter = `blur(${blurPx.toFixed(1)}px)`;
    }
    drawBackground(ctx, w, h, this.scene);
    if (blurPx > 0) ctx.restore();

    drawSubject(ctx, w, h, this.scene);
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
// ================================================
class ShutterSimulator {

  constructor(canvasId, infoId, valueId, scene = 'sports') {
    this.canvas  = document.getElementById(canvasId);
    this.ctx     = this.canvas.getContext('2d');
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);
    this.scene   = scene;

    this.speeds = [
      '1/4000s', '1/2000s', '1/1000s', '1/500s',
      '1/250s',  '1/125s',  '1/60s',
      '1/30s',   '1/15s',   '1/8s',
      '1/4s',    '1/2s',    '1s'
    ];

    this.animationFrame = null;
    this.subjectX = -50; 
    this.currentSlider = 4;
    this.currentBlur = 0;

    window.addEventListener('scene-assets-loaded', () => this.drawCurrentFrame());
    this.startAnimation();
    this.render(this.currentSlider);
  }

  startAnimation() {
    let lastTime = 0;
    const animate = (time) => {
      // Use time to keep consistent speed regardless of framerate
      const dt = lastTime ? (time - lastTime) : 16;
      lastTime = time;
      
      // Move subject horizontally
      this.subjectX += (100 * (dt / 1000)); // pixels per second
      
      // Loop around
      if (this.subjectX > this.canvas.width * 0.4) {
        this.subjectX = -this.canvas.width * 0.4;
      }
      
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
    drawBackground(ctx, w, h, this.scene);
    
    // Pass the offset and blur
    drawSubject(ctx, w, h, this.scene, this.currentBlur, this.subjectX);
  }

  getMotionBlur(sliderIndex) {
    if (sliderIndex <= 4)  return 0;           // 1/4000s to 1/250s — frozen
    if (sliderIndex === 5) return 0.2;         // 1/125s — tiny blur
    if (sliderIndex === 6) return 0.5;         // 1/60s — noticeable
    if (sliderIndex === 7) return 1.0;         // 1/30s — clear blur
    if (sliderIndex === 8) return 1.6;          // 1/15s — strong
    if (sliderIndex === 9) return 2.2;          // 1/8s
    return 2.2 + (sliderIndex - 9) * 0.8;      // 1/4s and slower
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
// ================================================
class ISOSimulator {

  constructor(canvasId, infoId, valueId, scene = 'lowlight') {
    this.canvas  = document.getElementById(canvasId);
    this.ctx     = this.canvas.getContext('2d');
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);
    this.scene   = scene;

    this.isoValues = [100, 200, 400, 800, 1600, 3200, 6400];
    this.currentSlider = 0;

    window.addEventListener('scene-assets-loaded', () => this.render(this.currentSlider));
    this.render(this.currentSlider);
  }

  render(sliderIndex) {
    this.currentSlider = sliderIndex;
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
    drawBackground(ctx, w, h, this.scene);
    drawSubject(ctx, w, h, this.scene);

    if (brightness !== 1) applyBrightness(ctx, w, h, brightness);
    if (noiseAmount > 0) applyNoise(ctx, w, h, noiseAmount);
  }

  getBrightness(sliderIndex) {
    const brightnessLevels = [0.85, 1.0, 1.25, 1.55, 1.85, 2.1, 2.4];
    return brightnessLevels[sliderIndex] || 1;
  }

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
// ================================================
class ExposureTriangleSimulator {

  constructor(canvasId, infoId, meterId, scene = 'portrait') {
    this.canvas   = document.getElementById(canvasId);
    this.ctx      = this.canvas.getContext('2d');
    this.infoEl   = document.getElementById(infoId);
    this.meterEl  = document.getElementById(meterId);
    this.scene    = scene;

    this.settings = { aperture: 2, shutter: 4, iso: 0 };

    this.fStops  = ['f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22'];
    this.speeds  = ['1/4000s','1/2000s','1/1000s','1/500s','1/250s','1/125s','1/60s','1/30s','1s'];
    this.isoVals = [100, 200, 400, 800, 1600, 3200, 6400];

    window.addEventListener('scene-assets-loaded', () => this.render());
    this.render();
  }

  setAperture(index)  { this.settings.aperture = index; this.render(); }
  setShutter(index)   { this.settings.shutter  = index; this.render(); }
  setISO(index)       { this.settings.iso      = index; this.render(); }

  render() {
    const { aperture, shutter, iso } = this.settings;
    const { canvas, ctx } = this;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const blurAmount   = this.getApertureBlur(aperture);
    const brightness   = this.getCombinedBrightness(aperture, shutter, iso);
    const noiseAmount  = this.getNoiseAmount(iso);

    if (blurAmount > 0) {
      ctx.save();
      ctx.filter = `blur(${blurAmount.toFixed(1)}px)`;
    }
    drawBackground(ctx, w, h, this.scene);
    if (blurAmount > 0) ctx.restore();

    drawSubject(ctx, w, h, this.scene);

    if (brightness !== 1) applyBrightness(ctx, w, h, brightness);
    if (noiseAmount > 0) applyNoise(ctx, w, h, noiseAmount);

    this.updateMeter(aperture, shutter, iso);
    this.updateInfo(aperture, shutter, iso);
  }

  getApertureBlur(apertureIndex) {
    return 18 - (apertureIndex / 8) * 18;
  }

  getCombinedBrightness(apertureIndex, shutterIndex, isoIndex) {
    const apertureLight = 1.0 + (8 - apertureIndex) * 0.12;
    const shutterLight = 0.6 + shutterIndex * 0.1;
    const isoLight = [0.85, 1.0, 1.2, 1.5, 1.8, 2.1, 2.4][isoIndex] || 1;
    return Math.min(3.0, Math.max(0.1, apertureLight * shutterLight * isoLight * 0.6));
  }

  getNoiseAmount(isoIndex) {
    return [0, 0.04, 0.10, 0.20, 0.38, 0.58, 0.80][isoIndex] || 0;
  }

  getExposureLevel(apertureIndex, shutterIndex, isoIndex) {
    const apertureEV = (8 - apertureIndex) - 4; 
    const shutterEV  = shutterIndex - 4;        
    const isoEV      = isoIndex - 1;            
    return apertureEV + shutterEV + isoEV;
  }

  updateMeter(aperture, shutter, iso) {
    const ev = this.getExposureLevel(aperture, shutter, iso);
    const needle = this.meterEl;
    if (!needle) return;

    const clamped  = Math.max(-4, Math.min(4, ev));
    const position = 50 + (clamped / 4) * 40; 
    needle.style.left = `${position}%`;

    if (Math.abs(clamped) <= 0.5)      needle.style.backgroundColor = '#16a34a'; 
    else if (Math.abs(clamped) <= 1.5) needle.style.backgroundColor = '#f59e0b'; 
    else                               needle.style.backgroundColor = '#dc2626'; 
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
