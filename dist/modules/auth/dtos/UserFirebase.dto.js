"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFirebase = void 0;
const openapi = require("@nestjs/swagger");
class UserFirebase {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, picture: { required: false, type: () => String }, userId: { required: true, type: () => String }, iat: { required: true, type: () => Number }, name: { required: true, type: () => String }, exp: { required: true, type: () => Number } };
    }
}
exports.UserFirebase = UserFirebase;
//# sourceMappingURL=UserFirebase.dto.js.map