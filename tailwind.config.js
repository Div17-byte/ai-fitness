/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container": "#34d399",
        "surface": "#ffffff",
        "outline": "#d0d0ce",
        "surface-container": "#f3f4f2",
        "outline-variant": "#d0d0ce",
        "on-error": "#fef2f2",
        "inverse-primary": "#6ee7b7",
        "tertiary-fixed-dim": "#6ee7b7",
        "background": "#fafaf8",
        "primary-fixed": "#34d399",
        "secondary": "#34d399",
        "primary": "#10b981",
        "secondary-container": "#d1f7e8",
        "on-secondary-fixed-variant": "#047857",
        "on-surface": "#1a1a1a",
        "surface-tint": "#10b981",
        "on-tertiary": "#ffffff",
        "surface-dim": "#ede8e0",
        "surface-container-low": "#f9f9f7",
        "secondary-fixed": "#6ee7b7",
        "on-secondary-container": "#047857",
        "on-error-container": "#7f1d1a",
        "error-container": "#fecaca",
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",
        "on-primary-fixed-variant": "#059669",
        "on-background": "#1a1a1a",
        "on-tertiary-fixed": "#ffffff",
        "tertiary-container": "#a7f3d0",
        "surface-bright": "#fefdfb",
        "tertiary-fixed": "#a7f3d0",
        "error": "#dc2626",
        "surface-variant": "#e5e5e3",
        "on-tertiary-container": "#047857",
        "surface-container-high": "#ede8e0",
        "on-secondary-fixed": "#ffffff",
        "on-surface-variant": "#5a5a5a",
        "tertiary": "#6ee7b7",
        "on-tertiary-fixed-variant": "#059669",
        "secondary-fixed-dim": "#34d399",
        "primary-fixed-dim": "#10b981",
        "surface-container-lowest": "#fefdfb",
        "on-primary-container": "#ffffff",
        "surface-container-highest": "#d9d9d6",
        "inverse-surface": "#1a1a1a",
        "inverse-on-surface": "#fafaf8",
        "on-primary-fixed": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-mobile": "16px",
        "gutter": "24px",
        "base": "8px",
        "margin-desktop": "40px",
        "card-padding": "24px"
      },
      fontFamily: {
        "headline-md": ["Manrope"],
        "body-lg": ["Manrope"],
        "headline-lg": ["Manrope"],
        "headline-lg-mobile": ["Manrope"],
        "label-sm": ["JetBrains Mono"],
        "body-md": ["Manrope"],
        "sans": ["Manrope", "system-ui", "-apple-system", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
