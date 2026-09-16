// ================================================
// LEARN VISUAL PHOTOGRAPHY
// camera-explorer.js — Module 5 Interactive Explorer
//
// Handles the full camera brand explorer:
//   1. Brand selection
//   2. Camera model selection (filtered by brand)
//   3. Lens selection (filtered by mount)
//   4. Camera body UI with clickable hotspot buttons
//   5. Button info panel
//   6. Real-time capture simulation
// ================================================


// ---- State: tracks what the user has selected ----
const explorerState = {
  selectedBrand:  null,  // e.g. 'canon'
  selectedCamera: null,  // camera object from CAMERAS data
  selectedLens:   null,  // lens object from LENSES data
  activeButton:   null,  // which camera button was last clicked
  activeMode:     'Av',  // current shooting mode
  shootingScene:  'portrait'
};


// ================================================
// STEP 1 — Brand Selection
// ================================================

// Render brand selector tabs
function renderBrandTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  Object.entries(CAMERAS).forEach(([brandKey, brandData]) => {
    const tab = document.createElement('button');
    tab.className  = 'brand-tab';
    tab.textContent = brandData.brand;
    tab.setAttribute('data-brand', brandKey);
    tab.setAttribute('id', `brand-tab-${brandKey}`);

    tab.addEventListener('click', () => {
      selectBrand(brandKey);
    });

    container.appendChild(tab);
  });
}

// Handle brand selection
function selectBrand(brandKey) {
  explorerState.selectedBrand  = brandKey;
  explorerState.selectedCamera = null;
  explorerState.selectedLens   = null;

  // Update tab active state
  document.querySelectorAll('.brand-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-brand') === brandKey);
  });

  // Show brand description
  const brandInfo = CAMERAS[brandKey];
  const descEl = document.getElementById('brand-description');
  if (descEl) {
    descEl.textContent = brandInfo.description;
    descEl.style.display = 'block';
  }

  // Render models for this brand
  renderModelGrid('model-grid', brandKey);

  // Clear lens and camera UI sections
  clearSection('lens-section');
  clearSection('camera-ui-section');
  clearSection('capture-section');
}


// ================================================
// STEP 2 — Camera Model Selection
// ================================================

// Render grid of camera models for a brand
function renderModelGrid(containerId, brandKey) {
  const container = document.getElementById(containerId);
  const brand     = CAMERAS[brandKey];
  if (!container || !brand) return;

  container.innerHTML = '';

  // Show the model grid container
  showSection('model-section');

  brand.models.forEach(camera => {
    const card = document.createElement('div');
    card.className = 'model-card';
    card.setAttribute('id', `model-card-${camera.id}`);

    card.innerHTML = `
      <div class="model-year">${camera.year}</div>
      <div class="model-name">${camera.name}</div>
      <div class="model-type">${formatCameraType(camera.type)} · ${formatSensorSize(camera.sensorSize)}</div>
    `;

    card.addEventListener('click', () => {
      selectCamera(camera, brandKey);
    });

    container.appendChild(card);
  });
}

// Handle camera model selection
function selectCamera(camera, brandKey) {
  explorerState.selectedCamera = camera;
  explorerState.selectedLens   = null;

  // Update card active state
  document.querySelectorAll('.model-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('id') === `model-card-${camera.id}`);
  });

  // Show camera details
  const detailEl = document.getElementById('camera-detail');
  if (detailEl) {
    detailEl.innerHTML = `
      <div class="row gap-2 mb-2">
        <span class="badge badge-blue">${formatCameraType(camera.type)}</span>
        <span class="badge badge-gray">${formatSensorSize(camera.sensorSize)}</span>
        <span class="badge badge-amber">${formatLevel(camera.level)}</span>
      </div>
      <h4>${CAMERAS[brandKey].brand} ${camera.name} (${camera.year})</h4>
      <p class="mt-1"><strong>Best for:</strong> ${camera.bestFor}</p>
      <p class="mt-1 text-sm text-muted">Mount: ${formatMount(camera.mount)}</p>
    `;
    detailEl.style.display = 'block';
  }

  // Load lenses for this camera's mount
  if (camera.mount === 'fixed') {
    showFixedLensMessage(camera);
  } else {
    renderLensGrid('lens-grid', camera.mount);
    showSection('lens-section');
  }

  // Clear camera body and capture sections until lens is chosen
  clearSection('camera-ui-section');
  clearSection('capture-section');
}


// ================================================
// STEP 3 — Lens Selection
// ================================================

// Render lens cards filtered by mount system
function renderLensGrid(containerId, mountKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lensSetKey = MOUNT_TO_LENSES[mountKey];
  const lensSet    = lensSetKey ? LENSES[lensSetKey] : null;

  container.innerHTML = '';

  if (!lensSet) {
    container.innerHTML = '<p class="text-muted text-sm">No compatible lens data available for this mount.</p>';
    return;
  }

  // Show mount system name
  const mountLabelEl = document.getElementById('mount-label');
  if (mountLabelEl) {
    mountLabelEl.textContent = `${lensSet.mountName} Lenses`;
  }

  lensSet.lenses.forEach(lens => {
    const card = document.createElement('div');
    card.className = 'lens-card';
    card.setAttribute('id', `lens-card-${lens.id}`);

    card.innerHTML = `
      <div class="lens-icon">${lens.purposeIcon}</div>
      <div class="lens-focal">${lens.focal}</div>
      <div class="lens-name">${lens.name.split(' ').slice(0, 3).join(' ')}</div>
      <div class="lens-purpose">
        <span class="badge badge-blue text-xs">${lens.type}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      selectLens(lens);
    });

    container.appendChild(card);
  });
}

// Handle lens selection
function selectLens(lens) {
  explorerState.selectedLens = lens;

  // Update card active state
  document.querySelectorAll('.lens-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('id') === `lens-card-${lens.id}`);
  });

  // Show lens detail
  const lensDetailEl = document.getElementById('lens-detail');
  if (lensDetailEl) {
    lensDetailEl.innerHTML = `
      <div class="row gap-2 mb-2">
        <span class="badge badge-blue">${lens.type}</span>
        <span class="badge badge-amber">${lens.aperture}</span>
      </div>
      <h4>${lens.focal} — ${lens.purpose}</h4>
      <p class="mt-1">${lens.description}</p>
    `;
    lensDetailEl.style.display = 'block';
  }

  // Activate the camera body UI and capture simulator
  showSection('camera-ui-section');
  showSection('capture-section');

  // Render camera body UI
  renderCameraBodyUI('camera-body-container');

  // Update capture simulator with new lens settings
  updateCaptureSimulator();
}

// Handle cameras with fixed (non-interchangeable) lenses
function showFixedLensMessage(camera) {
  const lensSection = document.getElementById('lens-section');
  if (lensSection) {
    lensSection.style.display = 'block';
    lensSection.innerHTML = `
      <div class="callout callout-amber">
        <div class="callout-icon">📷</div>
        <div class="callout-body">
          <strong>Fixed Lens Camera</strong>
          <p>The ${camera.name} has a built-in lens that cannot be changed. This is intentional — the manufacturer designed the lens specifically for this sensor. Select the camera to proceed to the camera controls.</p>
        </div>
      </div>
    `;
    showSection('camera-ui-section');
    renderCameraBodyUI('camera-body-container');
  }
}


// ================================================
// STEP 4 — Camera Body UI
// ================================================

// Render the visual camera body with clickable hotspot buttons
function renderCameraBodyUI(containerId) {
  const container = document.getElementById(containerId);
  const camera    = explorerState.selectedCamera;
  if (!container || !camera) return;

  const isMirrorless = camera.type === 'mirrorless';
  const brandKey     = explorerState.selectedBrand;
  const brand        = CAMERAS[brandKey];

  container.innerHTML = `
    <div class="camera-body">
      <!-- Camera body shell -->
      <div class="camera-shell ${isMirrorless ? 'mirrorless' : 'dslr'}" id="camera-shell">

        <!-- Lens mount circle -->
        <div class="camera-lens-mount"></div>

        <!-- ---- Hotspot Buttons ---- -->
        <!-- Shutter button — top right raised -->
        <div class="cam-btn has-tooltip" style="top:-18px; right:22%; z-index:2;"
             id="hotspot-shutter-full" onclick="onCameraButtonClick('shutter-full')">
          <div class="cam-btn-shutter"></div>
          <div class="tooltip">Shutter Button</div>
        </div>

        <!-- Mode dial — top left -->
        <div class="cam-btn has-tooltip" style="top:-22px; left:18%;"
             id="hotspot-mode-dial" onclick="onCameraButtonClick('mode-dial')">
          <div class="cam-btn-dial" id="mode-dial-display">${explorerState.activeMode}</div>
          <div class="tooltip">Mode Dial</div>
        </div>

        <!-- Main command dial — near shutter -->
        <div class="cam-btn has-tooltip" style="top:12%; right:14%;"
             id="hotspot-main-dial" onclick="onCameraButtonClick('main-dial')">
          <div class="cam-btn-circle" style="width:34px;height:34px;"></div>
          <div class="tooltip">Main Dial</div>
        </div>

        <!-- ISO button — top row, right side -->
        <div class="cam-btn has-tooltip" style="top:8%; right:30%;"
             id="hotspot-iso-button" onclick="onCameraButtonClick('iso-button')">
          <div class="cam-btn-circle" style="width:22px;height:22px;font-size:0.55rem;color:#bbb;display:flex;align-items:center;justify-content:center;">ISO</div>
          <div class="tooltip">ISO Button</div>
        </div>

        <!-- AF/MF switch — left side of body -->
        <div class="cam-btn has-tooltip" style="top:55%; left:4%;"
             id="hotspot-af-mf-switch" onclick="onCameraButtonClick('af-mf-switch')">
          <div class="cam-btn-circle" style="width:20px;height:20px;font-size:0.5rem;color:#bbb;display:flex;align-items:center;justify-content:center;">AF</div>
          <div class="tooltip">AF/MF Switch</div>
        </div>

        <!-- Exposure compensation — right of body -->
        <div class="cam-btn has-tooltip" style="top:22%; right:8%;"
             id="hotspot-exposure-comp" onclick="onCameraButtonClick('exposure-comp')">
          <div class="cam-btn-circle" style="width:22px;height:22px;font-size:0.7rem;color:#ccc;display:flex;align-items:center;justify-content:center;">±</div>
          <div class="tooltip">Exp. Compensation</div>
        </div>

        <!-- AE Lock — right side -->
        <div class="cam-btn has-tooltip" style="top:36%; right:8%;"
             id="hotspot-ae-lock" onclick="onCameraButtonClick('ae-lock')">
          <div class="cam-btn-circle" style="width:22px;height:22px;font-size:0.55rem;color:#ccc;display:flex;align-items:center;justify-content:center;">★</div>
          <div class="tooltip">AE Lock</div>
        </div>

        <!-- AF Point / joystick -->
        <div class="cam-btn has-tooltip" style="top:48%; right:10%;"
             id="hotspot-af-point" onclick="onCameraButtonClick('af-point')">
          <div class="cam-btn-circle" style="width:28px;height:28px;font-size:0.55rem;color:#ccc;display:flex;align-items:center;justify-content:center;">⊕</div>
          <div class="tooltip">AF Point Selector</div>
        </div>

        <!-- Drive mode button -->
        <div class="cam-btn has-tooltip" style="top:22%; left:4%;"
             id="hotspot-drive-mode" onclick="onCameraButtonClick('drive-mode')">
          <div class="cam-btn-circle" style="width:22px;height:22px;font-size:0.55rem;color:#ccc;display:flex;align-items:center;justify-content:center;">⏩</div>
          <div class="tooltip">Drive Mode</div>
        </div>

        <!-- WB button -->
        <div class="cam-btn has-tooltip" style="top:36%; left:4%;"
             id="hotspot-white-balance" onclick="onCameraButtonClick('white-balance')">
          <div class="cam-btn-circle" style="width:22px;height:22px;font-size:0.55rem;color:#ccc;display:flex;align-items:center;justify-content:center;">WB</div>
          <div class="tooltip">White Balance</div>
        </div>

        <!-- Playback button — bottom right -->
        <div class="cam-btn has-tooltip" style="bottom:18%; right:8%;"
             id="hotspot-playback-button" onclick="onCameraButtonClick('playback-button')">
          <div class="cam-btn-circle" style="width:24px;height:24px;font-size:0.75rem;color:#ccc;display:flex;align-items:center;justify-content:center;">▶</div>
          <div class="tooltip">Playback</div>
        </div>

        <!-- Menu button -->
        <div class="cam-btn has-tooltip" style="bottom:18%; right:20%;"
             id="hotspot-menu-button" onclick="onCameraButtonClick('menu-button')">
          <div class="cam-btn-circle" style="width:24px;height:24px;font-size:0.55rem;color:#ccc;display:flex;align-items:center;justify-content:center;">MENU</div>
          <div class="tooltip">Menu</div>
        </div>

        <!-- Quick menu Q button -->
        <div class="cam-btn has-tooltip" style="bottom:18%; right:34%;"
             id="hotspot-quick-menu" onclick="onCameraButtonClick('quick-menu')">
          <div class="cam-btn-circle" style="width:24px;height:24px;font-size:0.65rem;color:#ccc;display:flex;align-items:center;justify-content:center;">Q</div>
          <div class="tooltip">Quick Menu</div>
        </div>
      </div>

      <!-- Camera label -->
      <p class="text-center text-xs text-muted mt-2">
        ${brand.brand} ${camera.name} · Click any button to learn what it does
      </p>
    </div>
  `;

  // Show the default "click a button" message in info panel
  showDefaultButtonInfo();
}

// Called when user clicks a camera body hotspot
function onCameraButtonClick(buttonId) {
  explorerState.activeButton = buttonId;

  // Highlight the clicked button
  document.querySelectorAll('.cam-btn-circle, .cam-btn-dial, .cam-btn-shutter').forEach(el => {
    el.classList.remove('active');
  });
  const hotspot = document.getElementById(`hotspot-${buttonId}`);
  if (hotspot) {
    const btn = hotspot.querySelector('[class*="cam-btn-"]');
    if (btn) btn.classList.add('active');
  }

  // Find button data
  const btnData = CAMERA_BUTTONS.find(b => b.id === buttonId);
  if (btnData) renderButtonInfoPanel(btnData);

  // Apply real-time effects to the simulator based on the button
  if (buttonId === 'shutter-full') {
    capturePhoto();
  } else if (buttonId === 'iso-button' && captureSim) {
    const slider = document.getElementById('cap-iso-slider');
    if (slider) {
      slider.value = (parseInt(slider.value) + 1) % 7;
      slider.dispatchEvent(new Event('input'));
    }
  } else if (buttonId === 'main-dial' && captureSim) {
    const slider = document.getElementById('cap-aperture-slider');
    if (slider) {
      slider.value = (parseInt(slider.value) + 1) % 9;
      slider.dispatchEvent(new Event('input'));
    }
  } else if (buttonId === 'exposure-comp' && captureSim) {
    const slider = document.getElementById('cap-shutter-slider');
    if (slider) {
      slider.value = (parseInt(slider.value) + 1) % 9;
      slider.dispatchEvent(new Event('input'));
    }
  }
}

// Show explanatory info for the selected button
function renderButtonInfoPanel(btnData) {
  const panel = document.getElementById('button-info-panel');
  if (!panel) return;

  const brandKey = explorerState.selectedBrand;
  const brandName = CAMERAS[brandKey]?.brand || '';

  // Get this brand's name for the button (e.g. Canon says "Av", Sony says "A")
  const brandSpecificName = btnData.brandNames[brandKey] || btnData.name;

  // Format how-to-use steps
  const howToSteps = btnData.howToUse
    .map(step => `<li style="margin-bottom:4px;font-size:0.85rem;color:#374151;">• ${step}</li>`)
    .join('');

  // Render mode options if this is the mode dial
  let modeContent = '';
  if (btnData.id === 'mode-dial' && btnData.modes) {
    modeContent = `
      <div class="mt-2">
        <div class="effect-label">Shooting Modes:</div>
        <div class="stack" style="gap:6px;margin-top:6px;">
          ${btnData.modes.map(mode => `
            <div onclick="setMode('${mode.label}')" style="cursor:pointer;padding:8px 10px;border-radius:6px;border:1.5px solid #e5e7eb;background:#fff;transition:all 0.2s;" class="mode-option" id="mode-opt-${mode.label.replace('/','')}">
              <div style="font-weight:700;font-size:0.85rem;color:#2563eb;margin-bottom:2px;">${mode.label} — ${mode.name}</div>
              <div style="font-size:0.78rem;color:#6b7280;">${mode.description}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  panel.innerHTML = `
    <div class="btn-name">${btnData.icon} ${btnData.category.toUpperCase()}</div>
    <h4>${brandSpecificName}</h4>
    <p class="mt-1" style="font-size:0.875rem;">${btnData.what}</p>

    <div class="btn-effect mt-2">
      <div class="effect-label">How to use it:</div>
      <ul style="margin-top:6px;list-style:none;padding:0;">${howToSteps}</ul>
    </div>

    <div class="btn-effect mt-2">
      <div class="effect-label">Effect on your photo:</div>
      <p style="margin-top:4px;font-size:0.85rem;">${btnData.effectOnImage}</p>
    </div>

    ${modeContent}
  `;
}

// Show mode dial options when user picks a mode
function setMode(modeLabel) {
  explorerState.activeMode = modeLabel;

  // Update the dial display
  const dialDisplay = document.getElementById('mode-dial-display');
  if (dialDisplay) dialDisplay.textContent = modeLabel;

  // Highlight selected mode option
  document.querySelectorAll('.mode-option').forEach(opt => {
    opt.style.borderColor = '#e5e7eb';
    opt.style.background  = '#fff';
  });
  const selectedOpt = document.getElementById(`mode-opt-${modeLabel.replace('/', '')}`);
  if (selectedOpt) {
    selectedOpt.style.borderColor = '#2563eb';
    selectedOpt.style.background  = '#eff6ff';
  }

  // Update which controls are active in simulator
  highlightActiveControls(modeLabel);
  updateCaptureSimulator();
}

// Dim buttons that aren't used in the current mode
function highlightActiveControls(modeLabel) {
  const activeIds  = MODE_ACTIVE_CONTROLS[modeLabel] || [];

  CAMERA_BUTTONS.forEach(btn => {
    const hotspot = document.getElementById(`hotspot-${btn.id}`);
    if (!hotspot) return;

    const isActive = activeIds.includes(btn.id);
    hotspot.style.opacity = isActive ? '1' : '0.3';
  });
}

// Default message before any button is clicked
function showDefaultButtonInfo() {
  const panel = document.getElementById('button-info-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div style="text-align:center;padding:32px 16px;color:#9ca3af;">
      <div style="font-size:2rem;margin-bottom:12px;">👆</div>
      <p style="font-size:0.9rem;">Click any button on the camera to learn what it does and how it affects your photo.</p>
    </div>
  `;
}


// ================================================
// STEP 5 — Capture Simulator
// ================================================

let captureSim = null; // holds the active simulator instance

// Initialize or update the capture simulator
function updateCaptureSimulator() {
  const canvas = document.getElementById('capture-canvas');
  if (!canvas) return;

  const lens   = explorerState.selectedLens;
  const scene  = explorerState.shootingScene;

  if (!lens) {
    drawNoLensMessage(canvas.getContext('2d'), canvas.width, canvas.height);
    return;
  }

  // Use the combined Exposure Triangle simulator for the capture view
  if (!captureSim) {
    captureSim = new ExposureTriangleSimulator('capture-canvas', 'capture-info', 'capture-meter-needle', scene);
  }

  // Adjust default aperture based on lens's blur potential
  // Wide-aperture portrait lenses start more open
  const defaultAperture = Math.max(0, 4 - lens.blurAmount);
  captureSim.setAperture(defaultAperture);
}

// Simulate pressing the shutter — freeze the current canvas state
function capturePhoto() {
  const canvas  = document.getElementById('capture-canvas');
  const preview = document.getElementById('capture-preview');
  if (!canvas || !preview) return;

  // Copy canvas to the preview image
  const dataUrl = canvas.toDataURL('image/png');
  preview.src  = dataUrl;
  preview.style.display = 'block';

  // Show "Captured!" flash animation
  const flash = document.getElementById('shutter-flash');
  if (flash) {
    flash.style.opacity = '1';
    setTimeout(() => { flash.style.opacity = '0'; }, 200);
  }
}


// ================================================
// UTILITY FUNCTIONS
// ================================================

// Show a section by ID
function showSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.style.display = 'block';
}

// Hide a section and clear its content
function clearSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.style.display = 'none';
  }
}

// Format camera type for display
function formatCameraType(type) {
  return type === 'dslr' ? 'DSLR' : 'Mirrorless';
}

// Format sensor size for display
function formatSensorSize(size) {
  const map = { 'full-frame': 'Full Frame', 'aps-c': 'APS-C', 'mft': 'Micro Four Thirds' };
  return map[size] || size;
}

// Format mount name for display
function formatMount(mountKey) {
  const map = {
    ef: 'Canon EF', rf: 'Canon RF', f: 'Nikon F', z: 'Nikon Z',
    a: 'Sony A', e: 'Sony E', x: 'Fujifilm X', mft: 'Micro Four Thirds',
    fixed: 'Fixed (Non-interchangeable)'
  };
  return map[mountKey] || mountKey.toUpperCase();
}

// Format camera level for display
function formatLevel(level) {
  const map = { beginner: 'Beginner', enthusiast: 'Enthusiast', professional: 'Pro' };
  return map[level] || level;
}


// ================================================
// INITIALIZATION
// ================================================

// Called when Module 5 page loads
function initCameraExplorer() {
  // Render brand tabs
  renderBrandTabs('brand-tabs-container');

  // Set up scene selector for capture simulator
  document.querySelectorAll('[data-scene]').forEach(btn => {
    btn.addEventListener('click', () => {
      explorerState.shootingScene = btn.getAttribute('data-scene');
      document.querySelectorAll('[data-scene]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Reset simulator with new scene
      captureSim = null;
      updateCaptureSimulator();
    });
  });

  // Set up capture button
  const captureBtn = document.getElementById('capture-btn');
  if (captureBtn) {
    captureBtn.addEventListener('click', capturePhoto);
  }

  // Set up exposure sliders for the capture simulator
  const apertureSlider = document.getElementById('cap-aperture-slider');
  const shutterSlider  = document.getElementById('cap-shutter-slider');
  const isoSlider      = document.getElementById('cap-iso-slider');

  if (apertureSlider) {
    apertureSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (captureSim) captureSim.setAperture(val);
      updateSliderValue('cap-aperture-value', ['f/1.4','f/2','f/2.8','f/4','f/5.6','f/8','f/11','f/16','f/22'][val]);
    });
  }

  if (shutterSlider) {
    shutterSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (captureSim) captureSim.setShutter(val);
      updateSliderValue('cap-shutter-value', ['1/4000s','1/2000s','1/1000s','1/500s','1/250s','1/125s','1/60s','1/30s','1s'][val]);
    });
  }

  if (isoSlider) {
    isoSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (captureSim) captureSim.setISO(val);
      updateSliderValue('cap-iso-value', ['ISO 100','ISO 200','ISO 400','ISO 800','ISO 1600','ISO 3200','ISO 6400'][val]);
    });
  }
}

// Update the value badge next to a slider
function updateSliderValue(valueElId, text) {
  const el = document.getElementById(valueElId);
  if (el) el.textContent = text;
}
