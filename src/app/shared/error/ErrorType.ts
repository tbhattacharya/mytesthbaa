export class ErrorType {
    public static INVALID_ITEM_NO: string = 'INVALID_ITEM_NUMBER';
    public static INVALID_STORE_NO: string = 'INVALID_STORE_NO';
    public static ITEM_NO_NOT_FOUND: string = 'ITEM_NO_NOT_FOUND';
    public static STORE_NO_NOT_FOUND: string = 'STORE_NO_NOT_FOUND';
    public static INVALID_HEADERS: string = 'INVALID_HEADERS';
    public static ITEM_NOT_IN_STORE: string = 'ITEM_NOT_IN_STORE';
    public static GENERIC: string = 'GENERIC';
}

export class ServerError {
    public static INVALID_SITE: string = 'INVALID_SITE';
    public static INVALID_ARTICLE: string = 'INVALID_ARTICLE';
}

export class UserValidationError {
    public static INVALID_USER: string = 'INVALID_USER';
    public static GENERIC: string = 'GENERIC';
}