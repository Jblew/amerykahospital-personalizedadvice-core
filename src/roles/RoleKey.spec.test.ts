/* tslint:disable:max-classes-per-file */
import { FirestoreRolesConfiguration } from "firestore-roles";
import "mocha";

import { RoleKey } from "./RoleKey";
import rolesConfig from "./roles.config";

describe("RoleKey", () => {
    it("All roles match configuration", () => {
        FirestoreRolesConfiguration.isAllowedRole(rolesConfig, RoleKey.admin);
        FirestoreRolesConfiguration.isAllowedRole(rolesConfig, RoleKey.medicalprofessional);
        FirestoreRolesConfiguration.isAllowedRole(rolesConfig, RoleKey.provisioner);
    });
});
