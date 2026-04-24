import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Colors ───────────────────────────────────────────
      colors: {
        base:             '#080C14',
        surface:          '#0D1220',
        'surface-mid':    '#0F1628',
        'surface-elevated': '#111827',
        border:           '#1A2035',
        'border-strong':  '#252D47',

        primary:          '#4F6EF7',
        'primary-hover':  '#3A58E8',
        'primary-muted':  'rgba(79,110,247,0.12)',

        secondary:        '#00E5C4',
        'secondary-muted': 'rgba(0,229,196,0.10)',

        cta:              '#FF6B35',
        'cta-hover':      '#FF8A5B',
        'cta-muted':      'rgba(255,107,53,0.12)',

        success:          '#00D084',
        'success-muted':  'rgba(0,208,132,0.12)',

        error:            '#FF4D6A',
        'error-muted':    'rgba(255,77,106,0.12)',

        'text-primary':   '#F0F2FF',
        'text-secondary': '#8B9DBF',
        'text-muted':     '#4A5568',
        'text-disabled':  '#2D3748',
      },

      // ─── Typography scale (PRD §4.3) ──────────────────────
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-jakarta)', 'sans-serif'],
        serif:   ['var(--font-instrument)', 'serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        // Display
        'display-xl': ['clamp(64px,8vw,120px)',  { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-l':  ['clamp(48px,6vw,80px)',   { lineHeight: '0.97', letterSpacing: '-0.03em' }],
        'display-m':  ['clamp(36px,4.5vw,56px)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        // Headings
        'heading-l':  ['clamp(28px,3vw,40px)',   { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'heading-m':  ['clamp(20px,2vw,28px)',   { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-s':  ['clamp(16px,1.5vw,20px)', { lineHeight: '1.35', letterSpacing: '-0.005em' }],
        // Body
        'body-xl':    ['clamp(18px,1.5vw,22px)', { lineHeight: '1.65' }],
        'body-l':     ['18px',                   { lineHeight: '1.70' }],
        'body-m':     ['16px',                   { lineHeight: '1.60' }],
        'body-s':     ['14px',                   { lineHeight: '1.55' }],
        // Special
        caption:      ['13px',                   { lineHeight: '1.50', letterSpacing: '0.02em' }],
        label:        ['11px',                   { lineHeight: '1.40', letterSpacing: '0.12em' }],
        metric:       ['clamp(40px,5vw,72px)',   { lineHeight: '1.00', letterSpacing: '-0.02em' }],
        'metric-sm':  ['clamp(24px,3vw,40px)',   { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        quote:        ['clamp(20px,2.5vw,32px)', { lineHeight: '1.45' }],
      },

      // ─── Spacing (base unit 8px) ───────────────────────────
      spacing: {
        1:  '4px',
        2:  '8px',
        3:  '12px',
        4:  '16px',
        5:  '20px',
        6:  '24px',
        8:  '32px',
        10: '40px',
        12: '48px',
        13: '52px',
        14: '56px',
        16: '64px',
        18: '72px',
        20: '80px',
        24: '96px',
        30: '120px',
        // Named section spacings
        'section':    '120px',
        'section-md': '80px',
        'section-sm': '60px',
      },

      // ─── Border radius ─────────────────────────────────────
      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '24px',
        '2xl': '32px',
      },

      // ─── Layout ────────────────────────────────────────────
      maxWidth: {
        container: '1280px',
        prose:     '680px',
        narrow:    '480px',
      },

      // ─── Gradients ─────────────────────────────────────────
      backgroundImage: {
        'gradient-hero':   'linear-gradient(135deg, #080C14 0%, #0D1527 50%, #080C14 100%)',
        'gradient-accent': 'linear-gradient(90deg, #4F6EF7 0%, #00E5C4 100%)',
        'gradient-cta':    'linear-gradient(135deg, #FF6B35 0%, #FF3D77 100%)',
        'gradient-surface':'linear-gradient(180deg, #0D1220 0%, #080C14 100%)',
        'gradient-glow-primary': 'radial-gradient(ellipse at center, rgba(79,110,247,0.15) 0%, transparent 70%)',
        'gradient-glow-cta':     'radial-gradient(ellipse at center, rgba(255,107,53,0.15) 0%, transparent 70%)',
      },

      // ─── Shadows / Glow ────────────────────────────────────
      boxShadow: {
        'glow-primary': '0 0 24px rgba(79,110,247,0.25)',
        'glow-primary-sm': '0 0 12px rgba(79,110,247,0.2)',
        'glow-cta':     '0 0 28px rgba(255,107,53,0.3)',
        'glow-cta-sm':  '0 0 14px rgba(255,107,53,0.2)',
        'glow-secondary': '0 0 20px rgba(0,229,196,0.2)',
        'card':         '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover':   '0 8px 40px rgba(0,0,0,0.4)',
      },

      // ─── Transitions ───────────────────────────────────────
      transitionDuration: {
        fast:   '150ms',
        base:   '200ms',
        slow:   '300ms',
        slower: '500ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      // ─── Keyframes ─────────────────────────────────────────
      keyframes: {
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(79,110,247,0.35)', boxShadow: '0 0 10px rgba(79,110,247,0.1)' },
          '50%':       { borderColor: 'rgba(79,110,247,0.9)', boxShadow: '0 0 20px rgba(79,110,247,0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // ─── Animations ────────────────────────────────────────
      animation: {
        'pulse-border': 'pulse-border 2.5s ease-in-out infinite',
        float:          'float 6s ease-in-out infinite',
        'fade-up':      'fade-up 0.5s ease-out-expo forwards',
        'fade-in':      'fade-in 0.4s ease-out forwards',
        shimmer:        'shimmer 1.8s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
