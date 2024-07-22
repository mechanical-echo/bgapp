/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        morningTheme: {
            "primary": "#473f34",
            "secondary": "#8C9657",
            "accent": "#5b642d",
            "neutral": "#aaaca2",

            "base-100": "#8c9657",
            "base-200": "#f0e5e7",
            "base-300": "#e7dee0",

            "info": "#473f34",
            "success": "#77bf37",
            "warning": "#dfaa00",
            "error": "#aa1212",
          },
          dayTheme: {
            "primary": "#9481FF",
            "primary-content": "#F8F7FD",
            "secondary": "#F8F7FD",
            "accent": "#B8B8FE",
            "neutral": "#9481FF",

            "base-100": "#F8F7FD",
            "base-200": "#B8B8FE",
            "base-300": "#F8F7FD",
            
            "info": "#9481FF",
            "success": "#77bf37",
            "warning": "#dfaa00",
            "error": "#aa1212",
          },
          nightTheme: {
            "primary": "#EFF0ED",
            "secondary": "#313A4B",
            "accent": "#7B7F80",
            "neutral": "#AAACA2",
            
            "base-100": "#313A4B",
            "base-200": "#EDEDED",
            "base-300": "#DDDDDD",
            
            "info": "#7B7F80",
            "success": "#77bf37",
            "warning": "#dfaa00",
            "error": "#aa1212",
          },
        },
      ],
    },
}

