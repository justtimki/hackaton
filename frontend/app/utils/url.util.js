"use strict";
var UrlUtil = (function () {
    function UrlUtil() {
    }
    UrlUtil.HOST_NAME = 'http://localhost:3004'; // need to user real address of server
    /**
     * Registration url's
     */
    UrlUtil.REGISTER_ACCOUNT = UrlUtil.HOST_NAME + '/register';
    /**
     * Vacations url's
     */
    UrlUtil.GET_ALL_VACATIONS = UrlUtil.HOST_NAME + '/vacations';
    return UrlUtil;
}());
exports.UrlUtil = UrlUtil;
//# sourceMappingURL=url.util.js.map