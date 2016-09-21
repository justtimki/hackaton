"use strict";
var Vacation = (function () {
    function Vacation(id, owner, members, title, description, beginDate, endDate, tags, estimatedCost, minMembers, status, plannedActivities, comments, gallery) {
        this.id = id;
        this.owner = owner;
        this.members = members;
        this.title = title;
        this.description = description;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.tags = tags;
        this.estimatedCost = estimatedCost;
        this.minMembers = minMembers;
        this.status = status;
        this.plannedActivities = plannedActivities;
        this.comments = comments;
        this.gallery = gallery;
    }
    return Vacation;
}());
exports.Vacation = Vacation;
//# sourceMappingURL=vacation.js.map