import { FirestoreRolesConfiguration } from "firestore-roles";

import { RoleKey } from "./RoleKey";

const roles: FirestoreRolesConfiguration = {
    accountsCollection: "accounts",
    roleCollectionPrefix: "role_",
    roleRequestsCollectionPrefix: "rolereq_",
    roles: {
        [RoleKey.admin]: {
            manages: [RoleKey.provisioner, RoleKey.medicalprofessional],
        },
        [RoleKey.provisioner]: {
            manages: [RoleKey.medicalprofessional],
        },
        [RoleKey.medicalprofessional]: {
            manages: [],
        },
    },
};

export default roles;
