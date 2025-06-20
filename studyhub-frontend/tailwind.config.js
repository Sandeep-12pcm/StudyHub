/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      
      width: {
        'fit': 'fit-content',
      },
      colors: {
        brightBlue: '#0099ff',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowText: {
          '0%, 100%': {
            textShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6',
            transform: 'scale(1)',
          },
          '50%': {
            textShadow: '0 0 20px #1e3a8a, 0 0 30px #3b82f6',
            transform: 'scale(1.05)',
          },
        },
        popup: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        typewriter: {
          '0%': { width: '0ch' },
          '100%': { width: '40ch' }, // Adjust ch based on character count
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#fff' }, // white blinking cursor
        },
        


      },
      animation: {
        floatSlow: 'floatSlow 4s ease-in-out infinite',
        slideUp: 'slideUp 0.6s ease-out',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient-move': 'gradientMove 4s ease infinite',
        popup: 'popup 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        'popup-then-float': 'popup 0.6s ease-out forwards, float 3s ease-in-out 0.6s infinite',
        typewriter: 'typewriter 7s steps(50) infinite', // match steps to character count
        blink: 'blink 0.8s step-end infinite',
        

      },
      backgroundSize: {
        'size-200': '200% 100%',
      },
    },
  },
  plugins: [],
};