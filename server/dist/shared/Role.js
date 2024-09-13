"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(RoleID, RoleName, Description, CreatedAt, UpdatedAt) {
        this.RoleID = RoleID;
        this.RoleName = RoleName;
        this.Description = Description;
        this.CreatedAt = CreatedAt;
        this.UpdatedAt = UpdatedAt;
    }
}
exports.Role = Role;
