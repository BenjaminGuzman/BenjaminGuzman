module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        obsidian: '#0b0b0b',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(34, 197, 94, 0.6)',
      },
      dropShadow: {
        'neon': '0 0 10px rgba(34, 197, 94, 0.8)',
      }
    },
  },
  plugins: []
}
