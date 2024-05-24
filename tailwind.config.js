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
                goud: {
                    "--color-primary": "#ffcb05",
                    "--color-secondary": "#F5A61A",
                    "--color-tertiary": "#ffff578",
                    "--color-background": "#fff578",
                },
                appelgroen: {
                    "--color-primary": "#45b97c",
                    "--color-secondary": "#45b97c",
                    "--color-tertiary": "#d5e05b",
                    "--color-background": "#b1d249",
                },
                lichtroze: {
                    "--color-primary": "#f287b7",
                    "--color-secondary": "#f16682",
                    "--color-tertiary": "#f16682",
                    "--color-background": "#f287b7",
                },
                blauw: {
                    "--color-primary": "#1ebcc5",
                    "--color-secondary": "#4594d3",
                    "--color-tertiary": "#4594d3",
                    "--color-background": "#1ebcc5",
                },
                lichtblauw: {
                    "--color-primary": "#84D0D9",
                    "--color-secondary": "#1ebcc5",
                    "--color-tertiary": "#1ebcc5",
                    "--color-background": "#84D0D9",
                },
                donkerroze: {
                    "--color-primary": "#f16682",
                    "--color-secondary": "#ee3135",
                    "--color-tertiary": "#ee3135",
                    "--color-background": "#f16682",
                }
            }
        ]
    }
}

