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
                lichtroze: {
                    "--color-primary": "#f287b7",
                    "--color-secondary": "#f16682",
                    "--color-tertiary": "#f16682",
                    "--color-background": "#f287b7",
                },
                production: {
                    "--color-primary": "#1ebcc5",
                    "--color-secondary": "#4594d3",
                    "--color-tertiary": "#4594d3",
                    "--color-background": "#1ebcc5",
                },
                labor: {
                    "--color-primary": "#f16682",
                    "--color-secondary": "#ee3135",
                    "--color-tertiary": "#ee3135",
                    "--color-background": "#f16682",
                }
            }
        ]
    }
}

