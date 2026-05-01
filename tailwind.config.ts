import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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

        success:            '#000000',
        'success-muted':    'rgba(0,0,0,0.05)',
        error:              '#000000',
        'error-muted':      'rgba(0,0,0,0.05)',
        cta:                '#000000',
        'cta-muted':        'rgba(0,0,0,0.05)',

        'text-primary':     '#000000',
        'text-secondary':   '#333333',
        'text-muted':       '#888888',
        'text-disabled':    '#CCCCCC',

        // Reset Accents to Grey
        'accent-indigo':    '#333333',
        'accent-violet':    '#444444',
        'accent-crimson':   '#222222',
        'accent-teal':      '#555555',
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
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },

      animation: {
        'pulse-border': 'pulse-border 2.5s ease-in-out infinite',
        float:          'float 6s ease-in-out infinite',
        'fade-up':      'fade-up 0.5s ease-out-expo forwards',
        'fade-in':      'fade-in 0.4s ease-out forwards',
        'live-dot':     'live-dot 2s ease-in-out infinite',
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
    },
  },
  plugins: [],
}

export default config
