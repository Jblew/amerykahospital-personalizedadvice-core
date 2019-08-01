/* tslint:disable:max-classes-per-file */
import { FirestoreRolesConfiguration } from "firestore-roles";
import "mocha";

import rolesConfig from "./roles.config";

describe("roles.config", () => {
    it("Passes FirestoreRolesConfiguration", () => {
        FirestoreRolesConfiguration.validate(rolesConfig);
    });
});
