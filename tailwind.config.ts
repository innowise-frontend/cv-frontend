export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-family)"],
      },
      boxShadow: {
        button: "0px 1px 5px 0px #0000001F, 0px 2px 2px 0px #00000024, 0px 3px 1px -2px #00000033",
      },
      colors: {
        gray: {
          DEFAULT: "var(--color-gray)",
          2: "var(--color-gray-2)",
          3: "var(--color-gray-3)",
          4: "var(--color-gray-4)",
          5: "var(--color-gray-5)",
          6: "var(--color-gray-6)",
          7: "var(--color-gray-7)",
          8: "var(--color-gray-8)",
        },
        red: {
          DEFAULT: "var(--color-red)",
          2: "var(--color-red-2)",
        },
        pink: "var(--color-pink)",
        blue: {
          DEFAULT: "var(--color-blue)",
          2: "var(--color-blue-2)",
          3: "var(--color-blue-3)",
          4: "var(--color-blue-4)",
        },
        green: {
          DEFAULT: "var(--color-green)",
          2: "var(--color-green-2)",
          3: "var(--color-green-3)",
          4: "var(--color-green-4)",
        },
        yellow: {
          DEFAULT: "var(--color-yellow)",
          2: "var(--color-yellow-2)",
          3: "var(--color-yellow-3)",
        },
      },
      borderRadius: {
        "40": "40px",
      },
    },
  },
};
