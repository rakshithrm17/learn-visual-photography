// ================================================
// LEARN VISUAL PHOTOGRAPHY
// camera-buttons.js — What each camera button does
//
// This data powers the interactive camera body UI.
// When a user clicks a button on the camera diagram,
// this data shows: name, what it does, how to use it,
// and what effect it has on the image.
//
// Controls listed here are STANDARD on virtually all
// interchangeable-lens cameras. Naming differences
// between brands (Av vs A, Tv vs S) are noted.
// ================================================

// Each button entry has:
//   id          — matches the hotspot on the camera body SVG
//   name        — what this button is called on the camera body
//   brandNames  — how each brand labels it (for accuracy)
//   icon        — emoji for visual representation
//   category    — 'exposure', 'focus', 'capture', 'settings', 'review'
//   what        — plain-English explanation of what this button does
//   howToUse    — step-by-step instructions for a beginner
//   effectOnImage — what changes in the final photo when you use this
//   simEffect   — which simulator parameter this controls (optional)

const CAMERA_BUTTONS = [

  {
    id: 'shutter-half',
    name: 'Shutter Button (Half Press)',
    brandNames: { canon: 'Shutter', nikon: 'Shutter', sony: 'Shutter', fujifilm: 'Shutter', olympus: 'Shutter' },
    icon: '🔴',
    category: 'capture',
    what: 'The main button to take a photo. Pressing it halfway activates autofocus and metering without taking the shot.',
    howToUse: [
      'Aim at your subject',
      'Gently press halfway — you\'ll hear a beep and see the focus confirmation dot light up',
      'Hold it there while composing your shot',
      'Press fully down to take the photo'
    ],
    effectOnImage: 'Locks focus and exposure before you shoot. This prevents the camera from refocusing when you press fully.',
    simEffect: null
  },

  {
    id: 'shutter-full',
    name: 'Shutter Button (Full Press)',
    brandNames: { canon: 'Shutter', nikon: 'Shutter', sony: 'Shutter', fujifilm: 'Shutter', olympus: 'Shutter' },
    icon: '📸',
    category: 'capture',
    what: 'Pressing the shutter button all the way down takes the photo. The shutter curtain opens and closes to expose the sensor.',
    howToUse: [
      'After half-press (focus locked), press all the way down',
      'Press smoothly — don\'t jab it, as that can shake the camera',
      'In low light, hold your breath and squeeze gently'
    ],
    effectOnImage: 'The shutter speed you\'ve set determines how long the sensor is exposed to light. Fast speed = frozen action. Slow speed = motion blur.',
    simEffect: 'shutter'
  },

  {
    id: 'mode-dial',
    name: 'Mode Dial',
    brandNames: { canon: 'Mode Dial', nikon: 'Mode Dial', sony: 'Mode Dial', fujifilm: 'Mode Dial', olympus: 'Mode Dial' },
    icon: '🎛️',
    category: 'settings',
    what: 'The most important dial on the camera. It switches between shooting modes, which determines how much control YOU have vs the camera.',
    howToUse: [
      'Turn the dial to select a mode',
      'Start with P (Program) — camera controls everything',
      'Try Av/A for portrait photos (you control aperture)',
      'Try Tv/S for sports (you control shutter speed)',
      'Use M (Manual) when you want full control'
    ],
    effectOnImage: 'The mode changes WHICH settings you control. In Auto, the camera decides. In Manual, you decide everything.',
    simEffect: 'mode',
    modes: [
      { label: 'AUTO', name: 'Auto / Scene', description: 'Camera decides everything. Good for total beginners. Just point and shoot.' },
      { label: 'P', name: 'Program', description: 'Camera sets aperture and shutter speed. You control ISO, white balance, and flash. Good starting point.' },
      { label: 'Av / A', name: 'Aperture Priority', description: 'YOU set the aperture. Camera sets the shutter speed automatically. Use for portraits (low f-number) or landscapes (high f-number).' },
      { label: 'Tv / S', name: 'Shutter Priority', description: 'YOU set the shutter speed. Camera sets aperture automatically. Use for sports (fast speed) or waterfalls (slow speed).' },
      { label: 'M', name: 'Manual', description: 'You set EVERYTHING — aperture, shutter speed, and ISO. Full creative control. Best learned after understanding the exposure triangle.' },
      { label: 'B', name: 'Bulb', description: 'Shutter stays open as long as you hold the button. Used for very long exposures like star trails or light painting.' }
    ]
  },

  {
    id: 'main-dial',
    name: 'Main Command Dial',
    brandNames: { canon: 'Main Dial', nikon: 'Command Dial', sony: 'Control Dial', fujifilm: 'Shutter Speed Dial', olympus: 'Main Dial' },
    icon: '⚙️',
    category: 'exposure',
    what: 'A spinning wheel (usually near your index finger) that changes the main exposure setting for the current mode.',
    howToUse: [
      'In Av/A mode: turn this to change aperture (f-stop)',
      'In Tv/S mode: turn this to change shutter speed',
      'In M mode: turn this to change shutter speed (secondary dial changes aperture)',
      'Turn right to increase value, left to decrease'
    ],
    effectOnImage: 'Changes the exposure setting for the active mode. For example in portrait mode (Av), rolling this dial changes how blurry or sharp the background is.',
    simEffect: 'aperture-or-shutter'
  },

  {
    id: 'iso-button',
    name: 'ISO Button',
    brandNames: { canon: 'ISO', nikon: 'ISO', sony: 'ISO', fujifilm: 'ISO Dial', olympus: 'ISO' },
    icon: '🌟',
    category: 'exposure',
    what: 'Sets the camera sensor\'s sensitivity to light. Higher ISO = brighter image but more grain (digital noise).',
    howToUse: [
      'Press ISO button (or find ISO in the quick menu)',
      'Use ISO 100-400 in bright outdoor light',
      'Use ISO 800-3200 indoors or at dusk',
      'Use ISO 6400+ in very dark situations (expect noise)',
      'Set to AUTO ISO as a beginner — camera adjusts automatically'
    ],
    effectOnImage: 'Higher ISO brightens the image in dark places, but adds visible grain/noise. You\'ll see speckles in shadows on high ISO photos.',
    simEffect: 'iso'
  },

  {
    id: 'af-mf-switch',
    name: 'AF / MF Switch',
    brandNames: { canon: 'AF/MF', nikon: 'AF/MF', sony: 'AF/MF', fujifilm: 'AF/MF', olympus: 'AF/MF' },
    icon: '🎯',
    category: 'focus',
    what: 'Switches between Autofocus (AF — camera focuses automatically) and Manual Focus (MF — you turn the focus ring yourself).',
    howToUse: [
      'Keep it on AF for most shooting — let the camera focus',
      'Switch to MF for macro photography (camera struggles with tiny subjects)',
      'MF is also useful through glass (windows, aquariums) where AF gets confused',
      'In MF mode, turn the focus ring on the lens until subject is sharp'
    ],
    effectOnImage: 'Determines whether your subject is sharp or blurry. In AF, the camera finds focus. In MF, you control it manually.',
    simEffect: 'focus'
  },

  {
    id: 'af-point',
    name: 'AF Point Selector',
    brandNames: { canon: 'AF Point Selection', nikon: 'Focus Point', sony: 'Focus Area', fujifilm: 'AF Area', olympus: 'AF Target' },
    icon: '🔲',
    category: 'focus',
    what: 'Lets you choose WHERE in the frame the camera focuses. You can set a single point, a zone, or let the camera track the subject.',
    howToUse: [
      'Default "Wide/Auto" mode: camera picks what to focus on (usually nearest face)',
      'Single point: you pick exactly which part of the scene to focus on',
      'Use single point for portraits to ensure eyes are sharp',
      'Use tracking for moving subjects (sports, kids, animals)'
    ],
    effectOnImage: 'Changes which part of your photo is in sharp focus. For portraits, always place the focus point on the eyes.',
    simEffect: 'focus-point'
  },

  {
    id: 'ae-lock',
    name: 'AE Lock (★ Button)',
    brandNames: { canon: 'AE Lock ★', nikon: 'AE-L/AF-L', sony: 'AEL', fujifilm: 'AE Lock', olympus: 'AEL' },
    icon: '⭐',
    category: 'exposure',
    what: 'Locks the exposure (brightness) without locking focus. Useful when your subject is in a different light than where you want to focus.',
    howToUse: [
      'Aim at a neutral area (like the sky or a mid-tone) and press AE Lock',
      'Now recompose your shot — exposure stays locked',
      'Useful when a bright window or lamp would confuse the camera\'s metering'
    ],
    effectOnImage: 'Separates exposure control from focus control. Lets you expose for one area of the scene while focusing on another.',
    simEffect: null
  },

  {
    id: 'exposure-comp',
    name: 'Exposure Compensation (+/-)',
    brandNames: { canon: '+/-', nikon: '+/-', sony: 'EV', fujifilm: 'Exposure Comp Dial', olympus: '+/-' },
    icon: '⊕',
    category: 'exposure',
    what: 'Lets you make the photo brighter or darker than what the camera\'s metering system suggests. Works in P, Av, and Tv modes.',
    howToUse: [
      'Press the +/- button while turning the main dial',
      'Positive (+1, +2): makes the photo brighter',
      'Negative (-1, -2): makes the photo darker',
      'Use +1 to +2 for photos of white things (snow, white walls)',
      'Use -1 to -2 when bright background makes subject dark'
    ],
    effectOnImage: 'Directly changes the brightness of the final photo. The exposure meter shows how far you\'ve deviated from "correct" exposure.',
    simEffect: 'ev-compensation'
  },

  {
    id: 'drive-mode',
    name: 'Drive Mode Button',
    brandNames: { canon: 'Drive', nikon: 'Release Mode', sony: 'Drive Mode', fujifilm: 'Drive', olympus: 'Drive' },
    icon: '⏩',
    category: 'capture',
    what: 'Changes how the camera takes photos: one at a time, continuous burst, or with a timer delay.',
    howToUse: [
      'Single shot: one photo per press (default, good for most situations)',
      'Continuous/Burst: holds the button and fires multiple shots per second (great for sports)',
      '2s Timer: takes photo 2 seconds after pressing (useful to avoid camera shake on tripod)',
      '10s Timer: for taking selfies or group photos'
    ],
    effectOnImage: 'In burst mode, you capture multiple frames per second. Great for sports or unpredictable moments — you pick the best frame later.',
    simEffect: 'drive'
  },

  {
    id: 'white-balance',
    name: 'White Balance (WB)',
    brandNames: { canon: 'WB', nikon: 'WB', sony: 'WB', fujifilm: 'WB', olympus: 'WB' },
    icon: '🎨',
    category: 'settings',
    what: 'Tells the camera what "white" looks like under your current lighting, so colors come out naturally instead of too orange or too blue.',
    howToUse: [
      'Auto WB works well for most situations',
      'Daylight: for outdoor sunny shots',
      'Cloudy: warms up the image slightly (good for portraits)',
      'Tungsten/Incandescent: for indoor yellow light bulbs',
      'Fluorescent: for office / tube light environments'
    ],
    effectOnImage: 'Changes the overall color tone of the photo. Wrong WB makes photos look unnaturally orange (too warm) or blue (too cool).',
    simEffect: 'white-balance'
  },

  {
    id: 'playback-button',
    name: 'Playback Button',
    brandNames: { canon: '▶ Play', nikon: '▶ Play', sony: '▶ Play', fujifilm: '▶ Play', olympus: '▶ Play' },
    icon: '▶️',
    category: 'review',
    what: 'Shows the photos you\'ve already taken on the camera\'s rear screen. Press again (or half-press shutter) to return to shooting mode.',
    howToUse: [
      'Press to enter playback and see your last photo',
      'Use the scroll wheel to go forward/back through photos',
      'Press the + button to zoom in and check focus sharpness',
      'Press the Trash button to delete unwanted shots'
    ],
    effectOnImage: 'No effect on the photo — this is for reviewing shots you\'ve already taken.',
    simEffect: null
  },

  {
    id: 'menu-button',
    name: 'Menu Button',
    brandNames: { canon: 'MENU', nikon: 'MENU', sony: 'MENU', fujifilm: 'MENU/OK', olympus: 'MENU' },
    icon: '☰',
    category: 'settings',
    what: 'Opens the full camera settings menu. This is where you find all the detailed settings that don\'t have dedicated buttons.',
    howToUse: [
      'Press MENU to open settings',
      'Use arrow buttons or the control wheel to navigate',
      'Press OK/SET to confirm a setting',
      'Important settings here: image quality (RAW vs JPEG), file numbering, date/time, custom functions'
    ],
    effectOnImage: 'Settings inside the menu affect many aspects of the photo — image quality, color profile, noise reduction, and more.',
    simEffect: null
  },

  {
    id: 'quick-menu',
    name: 'Quick Menu (Q Button)',
    brandNames: { canon: 'Q', nikon: 'i', sony: 'Fn', fujifilm: 'Q', olympus: 'OK (Quick Control)' },
    icon: '⚡',
    category: 'settings',
    what: 'Opens a fast-access shortcut screen showing the most commonly changed settings without going into the full menu.',
    howToUse: [
      'Press Q / i / Fn to open the quick settings grid',
      'Navigate to the setting you want (AF mode, file quality, picture style, etc.)',
      'Change it and press OK',
      'Much faster than digging through the full MENU'
    ],
    effectOnImage: 'Lets you quickly change settings that affect the look of your photos — like Picture Style (vivid vs neutral colors), image stabilization on/off, etc.',
    simEffect: null
  }

];

// Organize buttons by which controls are active in each shooting mode
// This lets the simulator gray out irrelevant controls per mode
const MODE_ACTIVE_CONTROLS = {
  AUTO: ['shutter-half', 'shutter-full', 'drive-mode', 'playback-button'],
  P:    ['shutter-half', 'shutter-full', 'iso-button', 'white-balance', 'af-mf-switch', 'af-point', 'ae-lock', 'exposure-comp', 'drive-mode', 'quick-menu', 'menu-button', 'playback-button'],
  Av:   ['shutter-half', 'shutter-full', 'main-dial', 'iso-button', 'white-balance', 'af-mf-switch', 'af-point', 'ae-lock', 'exposure-comp', 'drive-mode', 'quick-menu', 'menu-button', 'playback-button'],
  Tv:   ['shutter-half', 'shutter-full', 'main-dial', 'iso-button', 'white-balance', 'af-mf-switch', 'af-point', 'ae-lock', 'exposure-comp', 'drive-mode', 'quick-menu', 'menu-button', 'playback-button'],
  M:    ['shutter-half', 'shutter-full', 'main-dial', 'iso-button', 'white-balance', 'af-mf-switch', 'af-point', 'ae-lock', 'drive-mode', 'quick-menu', 'menu-button', 'playback-button'],
  B:    ['shutter-half', 'shutter-full', 'iso-button', 'white-balance', 'af-mf-switch', 'af-point', 'drive-mode', 'menu-button', 'playback-button']
};
