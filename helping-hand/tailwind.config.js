/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

  },
  plugins: [require("daisyui")],
  daisyui: {

      themes:[
        {
          mytheme: {
            primary: "#5d5c61",

            secondary: "#7395ae",

            accent: "#557a95",

            neutral: "#b1a296",

            "base-100": "#2A303C",

            info: "#3ABFF8",

            success: "#36D399",

            warning: "#FBBD23",

            error: "#F87272",
          },
        }
      ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
