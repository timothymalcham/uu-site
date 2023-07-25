module.exports = {
    plugins: [
        require.resolve("prettier-plugin-tailwindcss", "prettier-plugin-astro"),
    ],
    tailwindConfig: "./tailwind.config.js",
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
                trailingComma: "es5",
                tabWidth: 4,
                semi: false,
            },
        },
        {
            files: ["*.tsx", "*.ts"],
            options: {
                parser: "astro",
                trailingComma: "es5",
                tabWidth: 4,
                semi: false,
            },
        },
    ],
};
