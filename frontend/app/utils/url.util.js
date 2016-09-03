"use strict";
var UrlUtil = (function () {
    function UrlUtil() {
    }
    UrlUtil.HOST_NAME = "http://localhost:8001"; // need to user real address of server
    /**
     * Registration url's
     */
    UrlUtil.REGISTER_ACCOUNT = UrlUtil.HOST_NAME + "/register";
    return UrlUtil;
}());
exports.UrlUtil = UrlUtil;
//# sourceMappingURL=url.util.js.map