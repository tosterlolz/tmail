module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff1e4b',
        glassdark: 'rgba(32, 28, 38, 0.75)',
        glasslight: 'rgba(255,255,255,0.09)'
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(0,0,0,0.25)',
        accent: '0 0 32px 0 #ff1e4b44',
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xl: '20px'
      }
    }
  },
  plugins: [],
}