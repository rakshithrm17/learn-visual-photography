// ================================================
// LEARN VISUAL PHOTOGRAPHY
// lenses.js — Lens database organized by mount system
//
// Each lens entry contains accurate, publicly documented specs.
// Purpose descriptions are based on how these lenses are
// commonly used by photographers in real-world shooting.
// ================================================

// Each lens has:
//   id          — unique identifier
//   name        — official name
//   focal       — focal length string (e.g. '50mm' or '24-70mm')
//   aperture    — maximum aperture (e.g. 'f/1.8')
//   type        — lens category (prime, zoom, wide, tele, macro, fisheye)
//   purpose     — plain-English best use
//   purposeIcon — emoji for visual display
//   fovDegrees  — horizontal angle of view (used by simulator)
//   blurAmount  — relative bokeh potential: 1 (low) to 5 (high)
//   description — beginner-friendly explanation

const LENSES = {

  // ---- Canon EF Mount (fits all EF Canon DSLRs) ----
  ef: {
    mountName: 'Canon EF',
    compatibleBodies: 'Canon DSLR cameras (EOS series)',
    lenses: [
      {
        id: 'ef-18-55',
        name: 'EF-S 18-55mm f/3.5-5.6',
        focal: '18-55mm',
        aperture: 'f/3.5-5.6',
        type: 'zoom',
        purpose: 'Kit Lens — Everyday Use',
        purposeIcon: '📷',
        fovDegrees: 74,
        blurAmount: 1,
        description: 'The standard kit lens that comes with most entry Canon DSLRs. Good for everyday photos, travel, and beginners learning composition.'
      },
      {
        id: 'ef-50-18',
        name: 'EF 50mm f/1.8 STM',
        focal: '50mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait — Bokeh Background',
        purposeIcon: '🎭',
        fovDegrees: 47,
        blurAmount: 4,
        description: 'Called the "nifty fifty." At f/1.8 it creates beautiful blurry backgrounds. Great for portraits and low-light photography. Affordable and sharp.'
      },
      {
        id: 'ef-85-18',
        name: 'EF 85mm f/1.8 USM',
        focal: '85mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait — Subject Separation',
        purposeIcon: '🧑',
        fovDegrees: 29,
        blurAmount: 5,
        description: 'The "portrait lens." 85mm compresses the background beautifully and f/1.8 gives strong subject separation. Ideal for headshots and portraits.'
      },
      {
        id: 'ef-17-40',
        name: 'EF 17-40mm f/4 L',
        focal: '17-40mm',
        aperture: 'f/4',
        type: 'wide',
        purpose: 'Landscape — Wide Scene',
        purposeIcon: '🏔️',
        fovDegrees: 104,
        blurAmount: 1,
        description: 'Wide angle zoom for landscape and architecture. Captures sweeping scenes. The "L" means it\'s Canon\'s professional quality glass.'
      },
      {
        id: 'ef-70-200-28',
        name: 'EF 70-200mm f/2.8 L IS',
        focal: '70-200mm',
        aperture: 'f/2.8',
        type: 'tele',
        purpose: 'Sports & Wildlife — Long Distance',
        purposeIcon: '🦁',
        fovDegrees: 12,
        blurAmount: 4,
        description: 'The iconic telephoto zoom. Reaches far subjects like athletes or animals. Image stabilization prevents camera shake. Used by professional sports photographers.'
      },
      {
        id: 'ef-100-macro',
        name: 'EF 100mm f/2.8 Macro L IS',
        focal: '100mm',
        aperture: 'f/2.8',
        type: 'macro',
        purpose: 'Macro — Extreme Close-Up',
        purposeIcon: '🌸',
        fovDegrees: 24,
        blurAmount: 3,
        description: 'Specialized for extreme close-up photography. Can photograph tiny subjects like insects, flowers, or jewellery at 1:1 life-size magnification.'
      }
    ]
  },

  // ---- Canon RF Mount (fits Canon Mirrorless EOS R cameras) ----
  rf: {
    mountName: 'Canon RF',
    compatibleBodies: 'Canon EOS R mirrorless cameras',
    lenses: [
      {
        id: 'rf-50-18',
        name: 'RF 50mm f/1.8 STM',
        focal: '50mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait — Bokeh Background',
        purposeIcon: '🎭',
        fovDegrees: 47,
        blurAmount: 4,
        description: 'Compact and affordable prime lens for portraits and everyday shooting. Sharp wide open with beautiful background blur at f/1.8.'
      },
      {
        id: 'rf-85-12',
        name: 'RF 85mm f/1.2 L',
        focal: '85mm',
        aperture: 'f/1.2',
        type: 'prime',
        purpose: 'Professional Portrait',
        purposeIcon: '🧑',
        fovDegrees: 29,
        blurAmount: 5,
        description: 'Cinema-quality portrait lens. f/1.2 creates an extremely thin plane of focus — only the eyes are sharp, face melts into beautiful blur.'
      },
      {
        id: 'rf-15-35-28',
        name: 'RF 15-35mm f/2.8 L IS',
        focal: '15-35mm',
        aperture: 'f/2.8',
        type: 'wide',
        purpose: 'Landscape & Architecture',
        purposeIcon: '🏙️',
        fovDegrees: 110,
        blurAmount: 1,
        description: 'Professional wide-angle zoom. Captures expansive scenes with great sharpness corner to corner. Perfect for landscape, interiors, and astrophotography.'
      },
      {
        id: 'rf-70-200-28',
        name: 'RF 70-200mm f/2.8 L IS',
        focal: '70-200mm',
        aperture: 'f/2.8',
        type: 'tele',
        purpose: 'Sports & Wildlife',
        purposeIcon: '🦅',
        fovDegrees: 12,
        blurAmount: 4,
        description: 'The gold-standard telephoto zoom, redesigned for mirrorless. Compact for its reach with fast f/2.8 for dim stadiums and indoor sports.'
      },
      {
        id: 'rf-100-macro',
        name: 'RF 100mm f/2.8 Macro L IS',
        focal: '100mm',
        aperture: 'f/2.8',
        type: 'macro',
        purpose: 'Macro & Close-Up',
        purposeIcon: '🐛',
        fovDegrees: 24,
        blurAmount: 3,
        description: 'Up to 1.4x magnification macro lens. Also excellent for portraits. Unique SA control ring creates soft-focus effects impossible on other lenses.'
      },
      {
        id: 'rf-24-105-4',
        name: 'RF 24-105mm f/4 L IS',
        focal: '24-105mm',
        aperture: 'f/4',
        type: 'zoom',
        purpose: 'All-Purpose Travel & Events',
        purposeIcon: '✈️',
        fovDegrees: 84,
        blurAmount: 2,
        description: 'The most versatile single lens. Wide enough for landscapes, long enough for portraits. Great image stabilization. If you only own one lens, this is it.'
      }
    ]
  },

  // ---- Nikon F Mount (fits all Nikon DSLRs) ----
  f: {
    mountName: 'Nikon F',
    compatibleBodies: 'Nikon DSLR cameras (D-series)',
    lenses: [
      {
        id: 'f-18-55',
        name: 'AF-P DX 18-55mm f/3.5-5.6 G VR',
        focal: '18-55mm',
        aperture: 'f/3.5-5.6',
        type: 'zoom',
        purpose: 'Kit Lens — Everyday Use',
        purposeIcon: '📷',
        fovDegrees: 74,
        blurAmount: 1,
        description: 'Nikon\'s standard kit lens. Versatile range for everyday shots, travel, and general photography. VR (Vibration Reduction) helps reduce blur.'
      },
      {
        id: 'f-50-18',
        name: 'AF-S 50mm f/1.8 G',
        focal: '50mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait — Bokeh Background',
        purposeIcon: '🎭',
        fovDegrees: 47,
        blurAmount: 4,
        description: 'Sharp, affordable prime lens. Excellent for portraits, street photography, and low-light indoor shooting. Beautiful background separation at f/1.8.'
      },
      {
        id: 'f-85-18',
        name: 'AF-S 85mm f/1.8 G',
        focal: '85mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait — Subject Separation',
        purposeIcon: '🧑',
        fovDegrees: 29,
        blurAmount: 5,
        description: 'Nikon\'s popular portrait prime. Natural compression at 85mm, smooth bokeh at f/1.8. Professional headshot and portrait photographers love this lens.'
      },
      {
        id: 'f-14-24-28',
        name: 'AF-S 14-24mm f/2.8 G ED',
        focal: '14-24mm',
        aperture: 'f/2.8',
        type: 'wide',
        purpose: 'Landscape & Astrophotography',
        purposeIcon: '🌌',
        fovDegrees: 114,
        blurAmount: 1,
        description: 'One of the sharpest ultra-wide lenses ever made. Used for dramatic landscapes, interiors, and night sky photography. Very wide with fast f/2.8.'
      },
      {
        id: 'f-70-200-28',
        name: 'AF-S 70-200mm f/2.8 E FL ED VR',
        focal: '70-200mm',
        aperture: 'f/2.8',
        type: 'tele',
        purpose: 'Sports & Events',
        purposeIcon: '⚽',
        fovDegrees: 12,
        blurAmount: 4,
        description: 'Nikon\'s flagship telephoto. Used by professional sports and news photographers worldwide. Vibration reduction and fast autofocus for action shots.'
      },
      {
        id: 'f-105-macro',
        name: 'AF-S Micro 105mm f/2.8 G VR',
        focal: '105mm',
        aperture: 'f/2.8',
        type: 'macro',
        purpose: 'Macro & Close-Up',
        purposeIcon: '🌺',
        fovDegrees: 23,
        blurAmount: 3,
        description: 'True 1:1 macro for tiny subjects. VR stabilization helps when shooting handheld at high magnification. Also works well as a portrait lens.'
      }
    ]
  },

  // ---- Nikon Z Mount (fits Nikon mirrorless Z cameras) ----
  z: {
    mountName: 'Nikon Z',
    compatibleBodies: 'Nikon Z mirrorless cameras',
    lenses: [
      {
        id: 'z-50-18',
        name: 'Nikkor Z 50mm f/1.8 S',
        focal: '50mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait & Everyday',
        purposeIcon: '🎭',
        fovDegrees: 47,
        blurAmount: 4,
        description: 'Outstanding sharpness and smooth bokeh. Nikon\'s S-line means highest optical quality. Beautiful for portraits, street, and everyday use.'
      },
      {
        id: 'z-85-12',
        name: 'Nikkor Z 85mm f/1.2 S',
        focal: '85mm',
        aperture: 'f/1.2',
        type: 'prime',
        purpose: 'Professional Portrait',
        purposeIcon: '🧑',
        fovDegrees: 29,
        blurAmount: 5,
        description: 'Nikon\'s optical masterpiece. f/1.2 renders subjects with a three-dimensional quality. Perfect subject isolation against silky background blur.'
      },
      {
        id: 'z-24-70-28',
        name: 'Nikkor Z 24-70mm f/2.8 S',
        focal: '24-70mm',
        aperture: 'f/2.8',
        type: 'zoom',
        purpose: 'Weddings & Events',
        purposeIcon: '💍',
        fovDegrees: 84,
        blurAmount: 2,
        description: 'Professional standard zoom. Covers the most common focal lengths with fast f/2.8. Workhorse for wedding photographers and photojournalists.'
      },
      {
        id: 'z-70-200-28',
        name: 'Nikkor Z 70-200mm f/2.8 VR S',
        focal: '70-200mm',
        aperture: 'f/2.8',
        type: 'tele',
        purpose: 'Sports & Wildlife',
        purposeIcon: '🦅',
        fovDegrees: 12,
        blurAmount: 4,
        description: 'Z-mount telephoto zoom for sports and wildlife. Fast, sharp, and compact. Pairs with the Z9 for serious professional action photography.'
      }
    ]
  },

  // ---- Sony E Mount (fits Sony mirrorless — FE = full-frame, E = APS-C) ----
  e: {
    mountName: 'Sony E-mount (FE)',
    compatibleBodies: 'Sony Alpha mirrorless cameras',
    lenses: [
      {
        id: 'fe-50-18',
        name: 'FE 50mm f/1.8',
        focal: '50mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait & Everyday',
        purposeIcon: '🎭',
        fovDegrees: 47,
        blurAmount: 4,
        description: 'Sony\'s compact and affordable standard prime. Great for portraits, street, and low-light. Pairs perfectly with the A7 III for an all-around kit.'
      },
      {
        id: 'fe-85-14',
        name: 'FE 85mm f/1.4 GM',
        focal: '85mm',
        aperture: 'f/1.4',
        type: 'prime',
        purpose: 'Professional Portrait',
        purposeIcon: '🧑',
        fovDegrees: 29,
        blurAmount: 5,
        description: 'Sony\'s G Master portrait lens. f/1.4 aperture with 11-blade aperture for stunning circular bokeh. Used by professional portrait and fashion photographers.'
      },
      {
        id: 'fe-16-35-28',
        name: 'FE 16-35mm f/2.8 GM',
        focal: '16-35mm',
        aperture: 'f/2.8',
        type: 'wide',
        purpose: 'Landscape & Architecture',
        purposeIcon: '🏔️',
        fovDegrees: 107,
        blurAmount: 1,
        description: 'Sony\'s premium wide-angle zoom. Corner-to-corner sharpness for landscapes. Fast f/2.8 enables astro and night photography.'
      },
      {
        id: 'fe-70-200-28',
        name: 'FE 70-200mm f/2.8 GM OSS II',
        focal: '70-200mm',
        aperture: 'f/2.8',
        type: 'tele',
        purpose: 'Sports & Wildlife',
        purposeIcon: '🦁',
        fovDegrees: 12,
        blurAmount: 4,
        description: 'The world\'s lightest 70-200mm f/2.8. Built for speed — works with Sony\'s tracking AI for sports and wildlife. OSS optical stabilization included.'
      },
      {
        id: 'fe-90-macro',
        name: 'FE 90mm f/2.8 Macro G OSS',
        focal: '90mm',
        aperture: 'f/2.8',
        type: 'macro',
        purpose: 'Macro & Close-Up',
        purposeIcon: '🌸',
        fovDegrees: 27,
        blurAmount: 3,
        description: 'True 1:1 macro with optical stabilization. Sharp across the entire focus range. Works great as both a macro and portrait lens.'
      },
      {
        id: 'fe-24-105-4',
        name: 'FE 24-105mm f/4 G OSS',
        focal: '24-105mm',
        aperture: 'f/4',
        type: 'zoom',
        purpose: 'Travel & All-Purpose',
        purposeIcon: '✈️',
        fovDegrees: 84,
        blurAmount: 2,
        description: 'Versatile travel zoom. Wide enough for landscapes, long enough for portraits. Constant f/4 throughout the range. A true one-lens solution.'
      }
    ]
  },

  // ---- Fujifilm X Mount ----
  x: {
    mountName: 'Fujifilm X',
    compatibleBodies: 'Fujifilm X-series cameras',
    lenses: [
      {
        id: 'xf-23-20',
        name: 'XF 23mm f/2 R WR',
        focal: '23mm',
        aperture: 'f/2',
        type: 'prime',
        purpose: 'Street — 35mm Equivalent',
        purposeIcon: '🏙️',
        fovDegrees: 63,
        blurAmount: 3,
        description: '23mm on APS-C equals 35mm field of view on full-frame. Classic street photography focal length. Weather resistant. Fast and silent autofocus.'
      },
      {
        id: 'xf-35-14',
        name: 'XF 35mm f/1.4 R',
        focal: '35mm',
        aperture: 'f/1.4',
        type: 'prime',
        purpose: 'Portrait & Low-Light',
        purposeIcon: '🎭',
        fovDegrees: 47,
        blurAmount: 4,
        description: 'The most beloved Fujifilm lens. 35mm equals 50mm full-frame equivalent. f/1.4 gives beautiful bokeh and low-light performance. Character-rich rendering.'
      },
      {
        id: 'xf-56-12',
        name: 'XF 56mm f/1.2 R APD',
        focal: '56mm',
        aperture: 'f/1.2',
        type: 'prime',
        purpose: 'Portrait — Silky Bokeh',
        purposeIcon: '🧑',
        fovDegrees: 29,
        blurAmount: 5,
        description: 'Equals 85mm portrait lens on full-frame. f/1.2 with APD (apodization) filter creates uniquely smooth, film-like bokeh transitions. Best Fuji portrait lens.'
      },
      {
        id: 'xf-10-24-4',
        name: 'XF 10-24mm f/4 R OIS WR',
        focal: '10-24mm',
        aperture: 'f/4',
        type: 'wide',
        purpose: 'Landscape & Architecture',
        purposeIcon: '🏔️',
        fovDegrees: 110,
        blurAmount: 1,
        description: 'Ultra-wide zoom for Fujifilm. Great for dramatic landscapes and tight indoor spaces. Optical image stabilization helps handheld shooting in low light.'
      },
      {
        id: 'xf-80-macro',
        name: 'XF 80mm f/2.8 R LM OIS WR Macro',
        focal: '80mm',
        aperture: 'f/2.8',
        type: 'macro',
        purpose: 'Macro & Close-Up',
        purposeIcon: '🌺',
        fovDegrees: 30,
        blurAmount: 3,
        description: 'Fujifilm\'s dedicated macro lens with true 1:1 magnification. Also excellent for portraits. Weather resistant for outdoor macro work.'
      }
    ]
  },

  // ---- Micro Four Thirds (MFT) — used by Olympus/OM System and Panasonic ----
  mft: {
    mountName: 'Micro Four Thirds',
    compatibleBodies: 'Olympus/OM System cameras (also Panasonic)',
    lenses: [
      {
        id: 'mft-25-18',
        name: 'M.Zuiko 25mm f/1.8',
        focal: '25mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait — 50mm Equivalent',
        purposeIcon: '🎭',
        fovDegrees: 47,
        blurAmount: 3,
        description: '25mm on MFT equals 50mm on full-frame. Natural perspective for portraits and everyday shooting. f/1.8 gives pleasant background separation.'
      },
      {
        id: 'mft-45-18',
        name: 'M.Zuiko 45mm f/1.8',
        focal: '45mm',
        aperture: 'f/1.8',
        type: 'prime',
        purpose: 'Portrait — 90mm Equivalent',
        purposeIcon: '🧑',
        fovDegrees: 29,
        blurAmount: 4,
        description: 'Equals 90mm portrait lens on full-frame. Excellent bokeh at f/1.8 and very sharp. One of the best value portrait lenses in any system.'
      },
      {
        id: 'mft-7-14-28',
        name: 'M.Zuiko 7-14mm f/2.8 PRO',
        focal: '7-14mm',
        aperture: 'f/2.8',
        type: 'wide',
        purpose: 'Landscape & Interior',
        purposeIcon: '🌅',
        fovDegrees: 114,
        blurAmount: 1,
        description: 'Ultra-wide zoom equivalent to 14-28mm. Excellent for landscape, astrophotography, and tight interior spaces. Weather-sealed PRO build quality.'
      },
      {
        id: 'mft-40-150-28',
        name: 'M.Zuiko 40-150mm f/2.8 PRO',
        focal: '40-150mm',
        aperture: 'f/2.8',
        type: 'tele',
        purpose: 'Sports & Wildlife',
        purposeIcon: '🦅',
        fovDegrees: 16,
        blurAmount: 4,
        description: 'Equals 80-300mm on full-frame. Fast f/2.8 across the zoom range. Excellent for wildlife and sports — lighter than equivalent full-frame telephoto lenses.'
      },
      {
        id: 'mft-60-macro',
        name: 'M.Zuiko 60mm f/2.8 Macro',
        focal: '60mm',
        aperture: 'f/2.8',
        type: 'macro',
        purpose: 'Macro Photography',
        purposeIcon: '🐝',
        fovDegrees: 40,
        blurAmount: 2,
        description: 'True 1:1 macro with 60mm focal length. MFT sensor gives extra depth of field — useful for keeping small subjects fully in focus.'
      }
    ]
  }

};

// Map camera mount IDs to which lens sets apply
// This tells the UI which lenses to show for a selected camera
const MOUNT_TO_LENSES = {
  ef:    'ef',    // Canon DSLR
  rf:    'rf',    // Canon Mirrorless
  f:     'f',     // Nikon DSLR
  z:     'z',     // Nikon Mirrorless
  a:     'e',     // Sony old A-mount (showing E-mount for relevance)
  e:     'e',     // Sony Mirrorless
  x:     'x',     // Fujifilm X
  mft:   'mft',   // Olympus/Panasonic
  fixed: null     // Fixed lens cameras (like X100VI) — no interchangeable lenses
};
