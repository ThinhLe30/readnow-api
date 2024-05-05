"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const common_1 = require("@nestjs/common");
const mime = require("mime-types");
const fileFilter = {
    fileFilter: (req, file, cb) => {
        const ext = mime.extension(file.mimetype).toString();
        if (!['png', 'jpg', 'jpeg'].includes(ext)) {
            return cb(new common_1.BadRequestException('Extension not allowed'), false);
        }
        return cb(null, true);
    },
    limits: {
        fileSize: 10000000,
    },
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=file-filter.helper.js.map