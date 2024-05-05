"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestWinsternConfig = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const NestWinsternConfig = () => {
    return {
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('MyApp', {
                    colors: true,
                    prettyPrint: true,
                })),
            }),
        ],
    };
};
exports.NestWinsternConfig = NestWinsternConfig;
exports.default = exports.NestWinsternConfig;
//# sourceMappingURL=nest-winstern.config.js.map