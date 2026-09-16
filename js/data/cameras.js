// ================================================
// LEARN VISUAL PHOTOGRAPHY
// cameras.js — Real camera brand & model database
//
// Data source: publicly documented product releases.
// Only accurate, verifiable information is included.
// No guessing on specs that could be wrong.
// ================================================

// Each camera has:
//   id         — unique identifier used in the UI
//   year       — release year
//   name       — official model name
//   type       — 'dslr' or 'mirrorless'
//   mount      — lens mount system used
//   sensorSize — 'full-frame', 'aps-c', 'mft'
//   level      — 'beginner', 'enthusiast', 'professional'
//   bestFor    — plain-English use case

const CAMERAS = {

  canon: {
    brand: 'Canon',
    color: '#CC0000',
    description: 'World\'s best-selling camera brand. Known for color science and reliable autofocus.',
    models: [
      {
        id: 'canon-eos-d30',
        year: 2000,
        name: 'EOS D30',
        type: 'dslr',
        mount: 'ef',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Early digital photography, journalism'
      },
      {
        id: 'canon-eos-10d',
        year: 2003,
        name: 'EOS 10D',
        type: 'dslr',
        mount: 'ef',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'General photography, portraits'
      },
      {
        id: 'canon-eos-5d',
        year: 2005,
        name: 'EOS 5D',
        type: 'dslr',
        mount: 'ef',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'First affordable full-frame DSLR, portraits, weddings'
      },
      {
        id: 'canon-eos-5d-mark2',
        year: 2008,
        name: 'EOS 5D Mark II',
        type: 'dslr',
        mount: 'ef',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'First DSLR with full HD video, films, weddings'
      },
      {
        id: 'canon-eos-7d',
        year: 2009,
        name: 'EOS 7D',
        type: 'dslr',
        mount: 'ef',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Sports, wildlife, fast action'
      },
      {
        id: 'canon-eos-5d-mark3',
        year: 2012,
        name: 'EOS 5D Mark III',
        type: 'dslr',
        mount: 'ef',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Professional portraits, events, video'
      },
      {
        id: 'canon-eos-70d',
        year: 2013,
        name: 'EOS 70D',
        type: 'dslr',
        mount: 'ef',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Video with Dual Pixel AF, vlogging, travel'
      },
      {
        id: 'canon-eos-5d-mark4',
        year: 2016,
        name: 'EOS 5D Mark IV',
        type: 'dslr',
        mount: 'ef',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Commercial, portraits, photojournalism'
      },
      {
        id: 'canon-eos-r',
        year: 2018,
        name: 'EOS R',
        type: 'mirrorless',
        mount: 'rf',
        sensorSize: 'full-frame',
        level: 'enthusiast',
        bestFor: 'Canon\'s first full-frame mirrorless, general use'
      },
      {
        id: 'canon-eos-r5',
        year: 2020,
        name: 'EOS R5',
        type: 'mirrorless',
        mount: 'rf',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: '8K video, sports, wildlife, commercial'
      },
      {
        id: 'canon-eos-r6-mark2',
        year: 2022,
        name: 'EOS R6 Mark II',
        type: 'mirrorless',
        mount: 'rf',
        sensorSize: 'full-frame',
        level: 'enthusiast',
        bestFor: 'Events, sports, video content creation'
      }
    ]
  },

  nikon: {
    brand: 'Nikon',
    color: '#FFD700',
    description: 'Japanese precision optics leader. Known for dynamic range and build quality.',
    models: [
      {
        id: 'nikon-d70s',
        year: 2005,
        name: 'D70s',
        type: 'dslr',
        mount: 'f',
        sensorSize: 'aps-c',
        level: 'beginner',
        bestFor: 'Entry-level digital, everyday photography'
      },
      {
        id: 'nikon-d3',
        year: 2007,
        name: 'D3',
        type: 'dslr',
        mount: 'f',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Sports, low-light, photojournalism'
      },
      {
        id: 'nikon-d90',
        year: 2008,
        name: 'D90',
        type: 'dslr',
        mount: 'f',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'First Nikon DSLR with video, general photography'
      },
      {
        id: 'nikon-d800',
        year: 2012,
        name: 'D800',
        type: 'dslr',
        mount: 'f',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Landscape, studio, high-resolution commercial work'
      },
      {
        id: 'nikon-d750',
        year: 2014,
        name: 'D750',
        type: 'dslr',
        mount: 'f',
        sensorSize: 'full-frame',
        level: 'enthusiast',
        bestFor: 'Weddings, events, portraits, travel'
      },
      {
        id: 'nikon-d500',
        year: 2016,
        name: 'D500',
        type: 'dslr',
        mount: 'f',
        sensorSize: 'aps-c',
        level: 'professional',
        bestFor: 'Sports, wildlife — best APS-C DSLR'
      },
      {
        id: 'nikon-d850',
        year: 2017,
        name: 'D850',
        type: 'dslr',
        mount: 'f',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Landscape, portraits, studio, all-rounder'
      },
      {
        id: 'nikon-z6',
        year: 2018,
        name: 'Z6',
        type: 'mirrorless',
        mount: 'z',
        sensorSize: 'full-frame',
        level: 'enthusiast',
        bestFor: 'General use, video, low-light, events'
      },
      {
        id: 'nikon-z7',
        year: 2018,
        name: 'Z7',
        type: 'mirrorless',
        mount: 'z',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'High-res landscape, commercial, studio'
      },
      {
        id: 'nikon-z9',
        year: 2021,
        name: 'Z9',
        type: 'mirrorless',
        mount: 'z',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Sports, wildlife, photojournalism — 8K video'
      },
      {
        id: 'nikon-z8',
        year: 2023,
        name: 'Z8',
        type: 'mirrorless',
        mount: 'z',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Versatile flagship — portraits, sports, video'
      }
    ]
  },

  sony: {
    brand: 'Sony',
    color: '#0066CC',
    description: 'Pioneer of full-frame mirrorless. Known for cutting-edge autofocus and video.',
    models: [
      {
        id: 'sony-a100',
        year: 2006,
        name: 'Alpha A100',
        type: 'dslr',
        mount: 'a',
        sensorSize: 'aps-c',
        level: 'beginner',
        bestFor: 'Sony\'s first DSLR, general photography'
      },
      {
        id: 'sony-a7',
        year: 2013,
        name: 'Alpha A7',
        type: 'mirrorless',
        mount: 'e',
        sensorSize: 'full-frame',
        level: 'enthusiast',
        bestFor: 'World\'s first affordable full-frame mirrorless, travel'
      },
      {
        id: 'sony-a7r2',
        year: 2015,
        name: 'Alpha A7R II',
        type: 'mirrorless',
        mount: 'e',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Landscape, studio, 42MP high-resolution'
      },
      {
        id: 'sony-a6500',
        year: 2016,
        name: 'Alpha A6500',
        type: 'mirrorless',
        mount: 'e',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Travel, street, compact with great autofocus'
      },
      {
        id: 'sony-a9',
        year: 2017,
        name: 'Alpha A9',
        type: 'mirrorless',
        mount: 'e',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'Sports, journalism — 20fps silent shooting'
      },
      {
        id: 'sony-a7-iii',
        year: 2018,
        name: 'Alpha A7 III',
        type: 'mirrorless',
        mount: 'e',
        sensorSize: 'full-frame',
        level: 'enthusiast',
        bestFor: 'Best all-rounder — portraits, events, video'
      },
      {
        id: 'sony-a7c',
        year: 2020,
        name: 'Alpha A7C',
        type: 'mirrorless',
        mount: 'e',
        sensorSize: 'full-frame',
        level: 'enthusiast',
        bestFor: 'Compact full-frame, vlogging, travel'
      },
      {
        id: 'sony-a7-iv',
        year: 2021,
        name: 'Alpha A7 IV',
        type: 'mirrorless',
        mount: 'e',
        sensorSize: 'full-frame',
        level: 'enthusiast',
        bestFor: 'Hybrid photo and video, content creation'
      },
      {
        id: 'sony-a9-iii',
        year: 2023,
        name: 'Alpha A9 III',
        type: 'mirrorless',
        mount: 'e',
        sensorSize: 'full-frame',
        level: 'professional',
        bestFor: 'World\'s first global shutter camera, sports'
      }
    ]
  },

  fujifilm: {
    brand: 'Fujifilm',
    color: '#009900',
    description: 'Film simulation technology from real film expertise. Beloved for color and retro design.',
    models: [
      {
        id: 'fuji-xpro1',
        year: 2012,
        name: 'X-Pro1',
        type: 'mirrorless',
        mount: 'x',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Street photography, rangefinder-style shooting'
      },
      {
        id: 'fuji-xt1',
        year: 2014,
        name: 'X-T1',
        type: 'mirrorless',
        mount: 'x',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Landscape, travel, physical dials control'
      },
      {
        id: 'fuji-xt2',
        year: 2016,
        name: 'X-T2',
        type: 'mirrorless',
        mount: 'x',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'All-rounder, 4K video, improved autofocus'
      },
      {
        id: 'fuji-xt3',
        year: 2018,
        name: 'X-T3',
        type: 'mirrorless',
        mount: 'x',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Video, sports, best Fuji value camera'
      },
      {
        id: 'fuji-xpro3',
        year: 2019,
        name: 'X-Pro3',
        type: 'mirrorless',
        mount: 'x',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Street, documentary, film simulation'
      },
      {
        id: 'fuji-xs10',
        year: 2020,
        name: 'X-S10',
        type: 'mirrorless',
        mount: 'x',
        sensorSize: 'aps-c',
        level: 'beginner',
        bestFor: 'Beginners, vlogging, IBIS in a small body'
      },
      {
        id: 'fuji-xt4',
        year: 2020,
        name: 'X-T4',
        type: 'mirrorless',
        mount: 'x',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Flagship video + photo, IBIS, cinema'
      },
      {
        id: 'fuji-xt5',
        year: 2022,
        name: 'X-T5',
        type: 'mirrorless',
        mount: 'x',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'High-resolution 40MP, landscape, portraits'
      },
      {
        id: 'fuji-x100vi',
        year: 2024,
        name: 'X100VI',
        type: 'mirrorless',
        mount: 'fixed',
        sensorSize: 'aps-c',
        level: 'enthusiast',
        bestFor: 'Street photography, fixed 35mm lens, compact'
      }
    ]
  },

  olympus: {
    brand: 'Olympus / OM System',
    color: '#003087',
    description: 'Micro Four Thirds pioneer. Best-in-class image stabilization and compact system.',
    models: [
      {
        id: 'oly-ep1',
        year: 2009,
        name: 'PEN E-P1',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'enthusiast',
        bestFor: 'First modern mirrorless camera (with kit lens), travel'
      },
      {
        id: 'oly-em5',
        year: 2012,
        name: 'OM-D E-M5',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'enthusiast',
        bestFor: 'Travel, landscape, weather-sealed compact'
      },
      {
        id: 'oly-em1',
        year: 2013,
        name: 'OM-D E-M1',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'professional',
        bestFor: 'Sports, wildlife, pro build quality'
      },
      {
        id: 'oly-em1-mark2',
        year: 2016,
        name: 'OM-D E-M1 Mark II',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'professional',
        bestFor: 'Pro sports, 60fps burst, wildlife'
      },
      {
        id: 'oly-em10-mark3',
        year: 2017,
        name: 'OM-D E-M10 Mark III',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'beginner',
        bestFor: 'Entry-level mirrorless, travel, everyday'
      },
      {
        id: 'oly-em1-mark3',
        year: 2020,
        name: 'OM-D E-M1 Mark III',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'professional',
        bestFor: 'Handheld high-res, live composite photography'
      },
      {
        id: 'om1',
        year: 2022,
        name: 'OM-1',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'professional',
        bestFor: 'Wildlife, sports, computational photography'
      },
      {
        id: 'om5',
        year: 2022,
        name: 'OM-5',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'enthusiast',
        bestFor: 'Adventure, weather-sealed, compact for travel'
      },
      {
        id: 'om1-mark2',
        year: 2024,
        name: 'OM-1 Mark II',
        type: 'mirrorless',
        mount: 'mft',
        sensorSize: 'mft',
        level: 'professional',
        bestFor: 'Pro wildlife, AI subject detection, 120fps'
      }
    ]
  }

};

// Export so other JS files can use it
// (In a plain HTML project, CAMERAS is a global variable — no import needed)
