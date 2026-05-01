import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        // Organic Typography System — "Quiet Luxury" Scale
        'display-xl': ['clamp(64px, 10vw, 140px)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display-l':  ['clamp(32px, 6vw, 64px)',   { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-m':  ['clamp(28px, 4vw, 48px)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading-l':  ['clamp(24px, 4vw, 36px)',   { lineHeight: '1.20', letterSpacing: '-0.02em' }],
        'title-l':    ['clamp(24px, 3.5vw, 40px)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'title-m':    ['clamp(18px, 2vw, 24px)',   { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'body-xl':    ['20px',                    { lineHeight: '1.60' }],
        'body-l':     ['18px',                    { lineHeight: '1.60' }],
        'body-m':     ['16px',                    { lineHeight: '1.60' }],
        'body-s':     ['14px',                    { lineHeight: '1.50' }],
        'label-sm':   ['11px',                    { lineHeight: '1.40', letterSpacing: '0.12em' }],
        'metric-xl':  ['clamp(32px, 6vw, 56px)',   { lineHeight: '1.00', letterSpacing: '-0.02em' }],
        'metric-l':   ['clamp(20px, 4vw, 32px)',   { lineHeight: '1.00', letterSpacing: '-0.02em' }],
      },
      colors: {
        base:               '#FFFFFF',
        surface:            '#FFFFFF',
        'surface-mid':      '#F8F8F8',
        'surface-elevated': '#F2F2F2',
        border:             '#E0E0E0',
        'border-strong':    '#B0B0B0',

        primary:            '#000000',
        'primary-hover':    '#1A1A1A',
        'primary-muted':    'rgba(0,0,0,0.05)',
        'primary-foreground': '#FFFFFF',

        secondary:          '#666666',
        'secondary-muted':  'rgba(0,0,0,0.03)',

        'text-primary':     '#000000',
        'text-secondary':   '#333333',
        'text-muted':       '#888888',
        'text-disabled':    '#CCCCCC',
      },

      fontFamily: {
        display: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        body:    ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },



      spacing: {
        1: '4px', 2: '8px', 3: '12px', 4: '16px',
        5: '20px', 6: '24px', 8: '32px', 10: '40px',
        12: '48px', 13: '52px', 14: '56px', 16: '64px',
        18: '72px', 20: '80px', 24: '96px', 30: '120px',
        'section':    '96px',
        'section-md': '72px',
        'section-sm': '56px',
      },

      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '20px',
        '2xl':'28px',
      },

      maxWidth: {
        container: '1280px',
        prose:     '680px',
        narrow:    '480px',
      },

      backgroundImage: {
        'gradient-hero':    'none',
        'gradient-accent':  'none',
        'gradient-surface': 'none',
        'gradient-glow-primary': 'none',
      },

      boxShadow: {
        'card':           '0 1px 3px rgba(0,0,0,0.05)',
        'card-hover':     '0 4px 12px rgba(0,0,0,0.08)',
        'glow-primary':   'none',
        'glow-primary-sm':'none',
        'glow-secondary': 'none',
      },

      transitionDuration: {
        fast:   '150ms',
        base:   '200ms',
        slow:   '300ms',
        slower: '500ms',
      },
      transitionTimingFunction: {
        'spring':       'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'ease-out-expo':'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      keyframes: {
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(0,0,0,0.1)' },
          '50%':       { borderColor: 'rgba(0,0,0,0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'live-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.35' },
        },

      },

      animation: {
        'pulse-border': 'pulse-border 2.5s ease-in-out infinite',
        float:          'float 6s ease-in-out infinite',
        'fade-up':      'fade-up 0.5s ease-out-expo forwards',
        'fade-in':      'fade-in 0.4s ease-out forwards',
        'live-dot':     'live-dot 2s ease-in-out infinite',

      },
    },
  },
  plugins: [],
}

export default config
