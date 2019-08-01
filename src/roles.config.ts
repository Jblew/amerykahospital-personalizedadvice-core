import { FirestoreRolesConfiguration } from "firestore-roles";

const roles: FirestoreRolesConfiguration = {
    accountsCollection: "accounts",
    roleCollectionPrefix: "role_",
    roleRequestsCollectionPrefix: "rolereq_",
    roles: {
        admin: {
            manages: ["provisioner", "medicalprofessional"],
        },
        provisioner: {
            manages: ["medicalprofessional"],
        },
        medicalprofessional: {
            manages: [],
        },
    },
};

export default roles;
