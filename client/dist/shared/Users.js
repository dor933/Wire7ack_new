"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userID, Username, password, role, CreationDate, roleID) {
        this.userID = userID;
        this.Username = Username;
        this.password = password;
        this.role = role;
        this.CreationDate = CreationDate;
        this.roleID = roleID;
    }
}
exports.User = User;
