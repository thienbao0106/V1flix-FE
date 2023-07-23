/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#42484E",
        secondColor: "#e89b26",
        secondColorBrighter: "#ecaf51",
        thirdColor: "#FFECCC",
        bgColor: "#171d22",
        detail: "#193445",
        ongoing: "#007C4E",
        fistAnime: "#8789C0",
        secondAnime: "#5DFDCB",
        thirdAnime: "#7cc6fe",
        other: "#c2cae8",
        opacityText: "#22282d",
      },
      outlineColor: {
        outColor: "#e89b26",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
