import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
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
