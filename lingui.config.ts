const config = {
    locales: ["en", "fr"],
    sourceLocale: "en",
    catalogs: [
        {
            path: "src/i18n/{locale}/messages",
            include: ["src"],
        },
    ],
    format: "po",
};

export default config;
