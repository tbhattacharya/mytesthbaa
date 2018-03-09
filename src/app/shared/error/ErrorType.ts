export class ServerError {
    public static INVALID_SITE: string = '01';
    public static INVALID_ARTICLE: string = '02';
    public static ARTICLE_NOT_LISTED: string = '03';
    public static NOT_HOMEBASE: string = '04';
    public static STORE_CLOSED: string = '05';
    public static INVALID_ITEM_NO: string = 'INVALID_ITEM_NO';
    public static INVALID_STORE_NO: string = 'INVALID_STORE_NO';
    public static GENERIC: string = 'GENERIC';
}

export class UserValidationError {
    public static INVALID_USER: string = 'INVALID_USER';
    public static INVALID_CLOCK_IN: string = 'INVALID_CLOCK_IN';
    public static GENERIC: string = 'GENERIC';
}

export class ErrorType {
    public static GENERIC: string = 'GENERIC';
}