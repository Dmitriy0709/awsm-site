import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base:               '#FAFAFE',
        surface:            '#FFFFFF',
        'surface-mid':      '#F4F4FA',
        'surface-elevated': '#F0F0F8',
        border:             '#E4E2F0',
        'border-strong':    '#D4D2E8',

        primary:            '#5A50DF',
        'primary-hover':    '#4840C8',
        'primary-muted':    'rgba(90,80,223,0.08)',

        secondary:          '#0EA888',
        'secondary-muted':  'rgba(14,168,136,0.08)',

        cta:                '#D06830',
        'cta-hover':        '#BA5C28',
        'cta-muted':        'rgba(208,104,48,0.08)',

        success:            '#0A9060',
        'success-muted':    'rgba(10,144,96,0.08)',

        error:              '#CC3355',
        'error-muted':      'rgba(204,51,85,0.08)',

        'text-primary':     '#17152E',
        'text-secondary':   '#4A4870',
        'text-muted':       '#9898B8',
        'text-disabled':    '#C0C0D8',
      },

      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        serif:   ['var(--font-display)', 'sans-serif'],
        mono:    ['var(--font-body)',    'sans-serif'],
      },

      fontSize: {
        'display-xl': ['clamp(56px,7vw,104px)',  { lineHeight: '0.93', letterSpacing: '-0.04em' }],
        'display-l':  ['clamp(44px,5.5vw,72px)', { lineHeight: '0.97', letterSpacing: '-0.035em' }],
        'display-m':  ['clamp(32px,4vw,52px)',   { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'heading-l':  ['clamp(26px,2.8vw,40px)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'heading-m':  ['clamp(20px,2vw,28px)',   { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'heading-s':  ['clamp(16px,1.5vw,20px)', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'body-xl':    ['clamp(17px,1.4vw,20px)', { lineHeight: '1.70' }],
        'body-l':     ['17px',                   { lineHeight: '1.70' }],
        'body-m':     ['15px',                   { lineHeight: '1.65' }],
        'body-s':     ['13px',                   { lineHeight: '1.55' }],
        caption:      ['12px',                   { lineHeight: '1.50', letterSpacing: '0.01em' }],
        label:        ['11px',                   { lineHeight: '1.40', letterSpacing: '0.10em' }],
        metric:       ['clamp(36px,5vw,64px)',   { lineHeight: '1.00', letterSpacing: '-0.03em' }],
        'metric-sm':  ['clamp(22px,3vw,36px)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        quote:        ['clamp(18px,2.5vw,28px)', { lineHeight: '1.50' }],
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
        'gradient-hero':    'linear-gradient(135deg, #FAFAFE 0%, #F0F0FA 50%, #FAFAFE 100%)',
        'gradient-accent':  'linear-gradient(90deg, #5A50DF 0%, #0EA888 100%)',
        'gradient-cta':     'linear-gradient(135deg, #D06830 0%, #BA5C28 100%)',
        'gradient-surface': 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFE 100%)',
        'gradient-glow-primary': 'radial-gradient(ellipse at center, rgba(90,80,223,0.08) 0%, transparent 70%)',
        'gradient-glow-cta':     'radial-gradient(ellipse at center, rgba(208,104,48,0.08) 0%, transparent 70%)',
      },

      boxShadow: {
        'card':           '0 1px 4px rgba(23,21,46,0.06), 0 4px 16px rgba(23,21,46,0.06)',
        'card-hover':     '0 2px 8px rgba(23,21,46,0.08), 0 8px 32px rgba(23,21,46,0.10)',
        'glow-primary':   '0 4px 20px rgba(90,80,223,0.18)',
        'glow-primary-sm':'0 2px 10px rgba(90,80,223,0.14)',
        'glow-cta':       '0 4px 20px rgba(208,104,48,0.30)',
        'glow-cta-sm':    '0 2px 12px rgba(208,104,48,0.22)',
        'glow-secondary': '0 4px 16px rgba(14,168,136,0.18)',
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
          '0%, 100%': { borderColor: 'rgba(90,80,223,0.25)' },
          '50%':       { borderColor: 'rgba(90,80,223,0.60)' },
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
