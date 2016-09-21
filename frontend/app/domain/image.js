"use strict";
var Image = (function () {
    function Image(id, altText, extension, uri, //use just string or URI obj ???
        description) {
        this.id = id;
        this.altText = altText;
        this.extension = extension;
        this.uri = uri;
        this.description = description;
    }
    return Image;
}());
exports.Image = Image;
//# sourceMappingURL=image.js.map