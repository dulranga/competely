import "server-only";

import { createLogger, format, transports } from "winston";
import { isDev } from "./isDev";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.prettyPrint(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.json(),
    ),
    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
});

// format logger differently on dev
if (isDev()) {
    logger.format = format.combine(
        format.errors({ stack: true }),
        format.printf((info) => {
            console.log(info);
            return "";
        }),
    );
}

export default logger;
