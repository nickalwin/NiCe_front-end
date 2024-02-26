/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    plugins: [
        require("daisyui"),
    ],
    daisyui: {
        themes: [
            {
                green: {
                    "--color-primary": "#45b97c",
                    "--color-secondary": "#b1d249",
                    "--color-tertiary": "#d5e05b",
                    "--color-background": "#b1d249",
                },
                yellow: {
                    "--color-primary": "#ffcb05",
                    "--color-secondary": "#F5A61A",
                    "--color-tertiary": "#ffff578",
                    "--color-background": "#fff578",
                },
            }
        ]
    }
}

