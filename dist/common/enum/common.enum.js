"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constant = exports.ApiResponseErrorCode = exports.ApiResponseStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["PUBLISHER"] = "PUBLISHER";
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
var ApiResponseStatus;
(function (ApiResponseStatus) {
    ApiResponseStatus["SUCCESS"] = "success";
    ApiResponseStatus["FAILURE"] = "failure";
})(ApiResponseStatus || (exports.ApiResponseStatus = ApiResponseStatus = {}));
var ApiResponseErrorCode;
(function (ApiResponseErrorCode) {
    ApiResponseErrorCode[ApiResponseErrorCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ApiResponseErrorCode[ApiResponseErrorCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ApiResponseErrorCode[ApiResponseErrorCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ApiResponseErrorCode[ApiResponseErrorCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ApiResponseErrorCode[ApiResponseErrorCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    ApiResponseErrorCode[ApiResponseErrorCode["SUCCESS"] = 200] = "SUCCESS";
    ApiResponseErrorCode[ApiResponseErrorCode["CREATED"] = 201] = "CREATED";
})(ApiResponseErrorCode || (exports.ApiResponseErrorCode = ApiResponseErrorCode = {}));
var Constant;
(function (Constant) {
    Constant[Constant["DEFAULT_PAGENO"] = 1] = "DEFAULT_PAGENO";
    Constant["DEFAULT_SORTDIR"] = "asc";
    Constant["DEFAULT_KEYWORD"] = "";
    Constant[Constant["DEFAULT_LIMIT"] = 10] = "DEFAULT_LIMIT";
})(Constant || (exports.Constant = Constant = {}));
//# sourceMappingURL=common.enum.js.map