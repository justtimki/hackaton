export class UrlUtil {

    private static HOST_NAME: string = 'http://localhost:3004'; // need to user real address of server

    /**
     * Registration url's
     */
    public static REGISTER_ACCOUNT: string = UrlUtil.HOST_NAME + '/register';

    /**
     * Vacations url's
     */
    public static GET_ALL_VACATIONS: string = UrlUtil.HOST_NAME + '/vacations';
}