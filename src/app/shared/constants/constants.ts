export class Constant {
    public static ENVTYPE = {
        Dev: 0,
        Test: 1,
        STG: 2,
        Prod: 3
    }
    public static MODE: number = 0;
    public static USER_VERFIED_FOR_SESSION = 'USER_VERFIED_FOR_SESSION';
    public static STOTE_ID_FOR_SESSION = 'STOTE_ID_FOR_SESSION';
    public static PROMO: string = 'PROMO';
    public static GBP: string = 'GBP';
    public static EUR: string = 'EUR';
    public static ENV: number = Constant.ENVTYPE.Test;
}
