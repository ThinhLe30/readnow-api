export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum ApiResponseStatus {
  SUCCESS = "success",
  FAILURE = "failure",
}

export enum ApiResponseErrorCode {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  SUCCESS = 200,
  CREATED = 201,
}

export enum Constant {
  DEFAULT_PAGENO = 1,
  // DEFAULT_SORTFIELD = 'id',
  DEFAULT_SORTDIR = "asc",
  DEFAULT_KEYWORD = "",
  DEFAULT_LIMIT = 10,
}
