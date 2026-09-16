// ================================================
// LEARN VISUAL PHOTOGRAPHY
// exposure-simulator.js (DOM/CSS Based)
//
// Powers ALL three exposure simulators using clean CSS layers:
//   - Aperture: CSS Blur + Radial Mask
//   - Shutter Speed: CSS Rotation Animation + SVG filter/CSS Blur
//   - ISO: SVG Noise overlay + Opacity
// And the combined Exposure Triangle simulator.
// ================================================


// ================================================
// APERTURE SIMULATOR
// ================================================
class ApertureSimulator {

  constructor(containerId, infoId, valueId, scene = 'portrait') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    // In module2.html, the container is the parent .sim-container
    // The blur layer is inside it.
    this.blurLayer = this.container.querySelector('.sim-bg-blur');
    
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);

    this.fStops = ['f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22'];
    this.render(2); // start at f/2.8
  }

  render(sliderValue) {
    if (!this.blurLayer) return;
    const fStopLabel = this.fStops[sliderValue];
    const blurAmount = this.getBlurAmount(sliderValue);

    this.valueEl.textContent = fStopLabel;
    
    // Apply blur to the top layer
    this.blurLayer.style.filter = `blur(${blurAmount}px)`;
    
    this.updateInfo(fStopLabel, sliderValue);
  }

  getBlurAmount(sliderIndex) {
    const maxBlur = 15;
    return maxBlur - (sliderIndex / 8) * maxBlur;
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
    if(this.infoEl) this.infoEl.innerHTML = descriptions[sliderIndex] || descriptions[4];
  }
}


// ================================================
// SHUTTER SPEED SIMULATOR
// ================================================
class ShutterSimulator {

  constructor(containerId, infoId, valueId, scene = 'sports') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.pinwheel = this.container.querySelector('.sim-pinwheel');
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);

    this.speeds = [
      '1/4000s', '1/2000s', '1/1000s', '1/500s',
      '1/250s',  '1/125s',  '1/60s',
      '1/30s',   '1/15s',   '1/8s',
      '1/4s',    '1/2s',    '1s'
    ];

    this.animationFrame = null;
    this.rotation = 0;
    this.currentBlur = 0;

    this.startAnimation();
    this.render(4); // start at 1/250s
  }

  startAnimation() {
    let lastTime = 0;
    const animate = (time) => {
      const dt = lastTime ? (time - lastTime) : 16;
      lastTime = time;
      
      // Pinwheel rotates at a constant speed (e.g. 720 deg/sec)
      this.rotation = (this.rotation + 720 * (dt / 1000)) % 360;
      
      if (this.pinwheel) {
        this.pinwheel.style.transform = `rotate(${this.rotation}deg)`;
      }
      
      this.animationFrame = requestAnimationFrame(animate);
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  stopAnimation() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  render(sliderValue) {
    if (!this.pinwheel) return;
    const speedLabel  = this.speeds[sliderValue];
    const blurAmount  = this.getMotionBlur(sliderValue);

    this.valueEl.textContent = speedLabel;
    
    // Apply blur to simulate motion blur on the spinning object
    this.pinwheel.style.filter = `blur(${blurAmount}px)`;
    
    this.updateInfo(speedLabel, sliderValue);
  }

  getMotionBlur(sliderIndex) {
    if (sliderIndex <= 4)  return 0;           // 1/4000s to 1/250s — frozen
    if (sliderIndex === 5) return 0.5;         // 1/125s — tiny blur
    if (sliderIndex === 6) return 1.5;         // 1/60s — noticeable
    if (sliderIndex === 7) return 3.0;         // 1/30s — clear blur
    if (sliderIndex === 8) return 5.0;          // 1/15s — strong
    if (sliderIndex === 9) return 8.0;          // 1/8s
    return 8.0 + (sliderIndex - 9) * 4.0;      // 1/4s and slower
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
    if(this.infoEl) this.infoEl.innerHTML = message;
  }
}


// ================================================
// ISO SIMULATOR
// ================================================
class ISOSimulator {

  constructor(containerId, infoId, valueId, scene = 'lowlight') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.noiseLayer = this.container.querySelector('.sim-noise');
    this.brightnessLayer = this.container.querySelector('.sim-brightness');
    
    this.infoEl  = document.getElementById(infoId);
    this.valueEl = document.getElementById(valueId);

    this.isoValues = [100, 200, 400, 800, 1600, 3200, 6400];
    this.render(0); // start at ISO 100
  }

  render(sliderIndex) {
    const isoValue    = this.isoValues[sliderIndex];
    const brightness  = this.getBrightness(sliderIndex);
    const noiseAmount = this.getNoiseAmount(sliderIndex);

    this.valueEl.textContent = `ISO ${isoValue}`;
    
    if (this.brightnessLayer) {
        // Brightness multiplier > 1 means white overlay with opacity
        if (brightness > 1) {
            this.brightnessLayer.style.backgroundColor = 'white';
            // Map 1.0 - 2.4 to opacity 0.0 - 0.4
            this.brightnessLayer.style.opacity = (brightness - 1.0) / 3.5;
        } else {
            this.brightnessLayer.style.backgroundColor = 'black';
            // Map 0.85 - 1.0 to opacity 0.15 - 0.0
            this.brightnessLayer.style.opacity = 1.0 - brightness;
        }
    }
    
    if (this.noiseLayer) {
        this.noiseLayer.style.opacity = noiseAmount;
    }
    
    this.updateInfo(isoValue, sliderIndex);
  }

  getBrightness(sliderIndex) {
    const brightnessLevels = [0.85, 1.0, 1.25, 1.55, 1.85, 2.1, 2.4];
    return brightnessLevels[sliderIndex] || 1;
  }

  getNoiseAmount(sliderIndex) {
    const noiseLevels = [0, 0.08, 0.18, 0.35, 0.55, 0.75, 0.95];
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
    if (this.infoEl) this.infoEl.innerHTML = descriptions[sliderIndex] || descriptions[0];
  }
}


// ================================================
// EXPOSURE TRIANGLE — COMBINED SIMULATOR
// ================================================
class ExposureTriangleSimulator {

  constructor(containerId, infoId, meterId, scene = 'portrait') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.blurLayer = this.container.querySelector('.sim-bg-blur');
    this.noiseLayer = this.container.querySelector('.sim-noise');
    this.brightnessLayer = this.container.querySelector('.sim-brightness');
    this.pinwheelContainer = this.container.querySelector('.sim-pinwheel-container');
    this.pinwheel = this.container.querySelector('.sim-pinwheel');
    
    this.infoEl   = document.getElementById(infoId);
    this.meterEl  = document.getElementById(meterId);
    this.scene    = scene;

    this.settings = { aperture: 2, shutter: 4, iso: 0 };

    this.fStops  = ['f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16', 'f/22'];
    this.speeds  = ['1/4000s','1/2000s','1/1000s','1/500s','1/250s','1/125s','1/60s','1/30s','1s'];
    this.isoVals = [100, 200, 400, 800, 1600, 3200, 6400];

    this.animationFrame = null;
    this.rotation = 0;
    
    this.setScene(scene);
    this.startAnimation();
    this.render();
  }
  
  setScene(scene) {
      this.scene = scene;
      const imgLayer = this.container.querySelector('#exp-image') || this.container.querySelector('#cap-image');
      const blurLyr = this.container.querySelector('#exp-blur-layer') || this.container.querySelector('#cap-blur-layer');
      
      let bgUrl = '';
      if (scene === 'portrait') bgUrl = 'url("../assets/images/sim_portrait.jpg")';
      else if (scene === 'lowlight') bgUrl = 'url("../assets/images/sim_lowlight.jpg")';
      else if (scene === 'sports') bgUrl = ''; // transparent for pinwheel
      else bgUrl = 'url("../assets/images/sim_portrait.jpg")'; // landscape fallback
      
      if (imgLayer) imgLayer.style.backgroundImage = bgUrl;
      if (blurLyr) blurLyr.style.backgroundImage = bgUrl;
      
      if (this.pinwheelContainer) {
          this.pinwheelContainer.style.display = (scene === 'sports') ? 'block' : 'none';
      }
      
      if (scene === 'sports') {
          if (imgLayer) imgLayer.style.backgroundColor = '#e0f2fe';
      } else {
          if (imgLayer) imgLayer.style.backgroundColor = 'transparent';
      }
  }
  
  startAnimation() {
    let lastTime = 0;
    const animate = (time) => {
      const dt = lastTime ? (time - lastTime) : 16;
      lastTime = time;
      this.rotation = (this.rotation + 720 * (dt / 1000)) % 360;
      if (this.pinwheel && this.scene === 'sports') {
        this.pinwheel.style.transform = `rotate(${this.rotation}deg)`;
      }
      this.animationFrame = requestAnimationFrame(animate);
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  setAperture(index)  { this.settings.aperture = index; this.render(); }
  setShutter(index)   { this.settings.shutter  = index; this.render(); }
  setISO(index)       { this.settings.iso      = index; this.render(); }

  render() {
    const { aperture, shutter, iso } = this.settings;

    const blurAmount   = this.getApertureBlur(aperture);
    const motionBlur   = this.getMotionBlur(shutter);
    const brightness   = this.getCombinedBrightness(aperture, shutter, iso);
    const noiseAmount  = this.getNoiseAmount(iso);

    if (this.blurLayer) {
        this.blurLayer.style.filter = `blur(${blurAmount}px)`;
    }
    
    if (this.pinwheel) {
        this.pinwheel.style.filter = `blur(${motionBlur}px)`;
    }
    
    if (this.brightnessLayer) {
        if (brightness > 1) {
            this.brightnessLayer.style.backgroundColor = 'white';
            this.brightnessLayer.style.opacity = Math.min(1, (brightness - 1.0) / 2.0);
        } else {
            this.brightnessLayer.style.backgroundColor = 'black';
            this.brightnessLayer.style.opacity = Math.min(1, 1.0 - brightness);
        }
    }
    
    if (this.noiseLayer) {
        this.noiseLayer.style.opacity = noiseAmount;
    }

    this.updateMeter(aperture, shutter, iso);
    this.updateInfo(aperture, shutter, iso);
  }

  getApertureBlur(apertureIndex) {
    return 15 - (apertureIndex / 8) * 15;
  }
  
  getMotionBlur(sliderIndex) {
    if (sliderIndex <= 4)  return 0;           
    if (sliderIndex === 5) return 0.5;         
    if (sliderIndex === 6) return 1.5;         
    if (sliderIndex === 7) return 3.0;         
    if (sliderIndex === 8) return 5.0;          
    if (sliderIndex === 9) return 8.0;          
    return 8.0 + (sliderIndex - 9) * 4.0;      
  }

  getCombinedBrightness(apertureIndex, shutterIndex, isoIndex) {
    const apertureLight = 1.0 + (8 - apertureIndex) * 0.12;
    const shutterLight = 0.6 + shutterIndex * 0.1;
    const isoLight = [0.85, 1.0, 1.2, 1.5, 1.8, 2.1, 2.4][isoIndex] || 1;
    return Math.min(3.0, Math.max(0.1, apertureLight * shutterLight * isoLight * 0.6));
  }

  getNoiseAmount(isoIndex) {
    return [0, 0.08, 0.18, 0.35, 0.55, 0.75, 0.95][isoIndex] || 0;
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

    if (this.infoEl) {
        this.infoEl.innerHTML = `
          <p><strong>Aperture:</strong> ${this.fStops[aperture]} &nbsp;|&nbsp;
             <strong>Shutter:</strong> ${this.speeds[shutter]} &nbsp;|&nbsp;
             <strong>ISO:</strong> ${this.isoVals[iso]}</p>
          <p style="margin-top:6px">${exposureStatus}</p>
        `;
    }
  }
}
