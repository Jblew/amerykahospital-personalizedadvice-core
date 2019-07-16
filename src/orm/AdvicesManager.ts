// tslint:disable no-console

import firebase from "firebase/app";
import "firebase/firestore";

import { FirestoreCollections } from "../FirestoreCollections";
import { Advice } from "../model/Advice";

export class AdvicesManager {
    public static async addAdvice(advice: Advice, firestoreOrNull?: firebase.firestore.Firestore) {
        const firestore: firebase.firestore.Firestore = firestoreOrNull || firebase.firestore();
        await firestore.collection(FirestoreCollections.ADVICES_COLLECTION_KEY).add(advice);
    }

    public static async fetchAdvices(filter: AdvicesManager.FetchFilter): Promise<Advice[]> {
        let query: firebase.firestore.Query = firebase
            .firestore()
            .collection(FirestoreCollections.ADVICES_COLLECTION_KEY);

        console.log("Query with filter", filter);

        if (filter.medicalprofessionalName) {
            query = AdvicesManager.createStartsWithQueryClause(
                query,
                "medicalprofessionalName",
                filter.medicalprofessionalName,
            );
        }

        if (filter.patientName) {
            query = AdvicesManager.createStartsWithQueryClause(query, "patientName", filter.patientName);
        }

        if (filter.parentPhoneNumber) {
            query = AdvicesManager.createStartsWithQueryClause(query, "parentPhoneNumber", filter.parentPhoneNumber);
        }

        query = query.limit(20);

        const querySnapshot = await query.get();

        const advices: Advice[] = [];

        querySnapshot.forEach(document => advices.push((document.data() as any) as Advice));
        console.log(advices);

        return advices as Advice[];
    }

    private static createStartsWithQueryClause(
        queryObj: firebase.firestore.CollectionReference | firebase.firestore.Query,
        fieldName: string,
        startingStr: string,
    ): firebase.firestore.Query {
        const strlength = startingStr.length;
        const strFrontCode = startingStr.slice(0, strlength - 1);
        const strEndCode = startingStr.slice(strlength - 1, startingStr.length);

        const startcode = startingStr;
        const endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        return queryObj.where(fieldName, ">=", startcode).where(fieldName, "<", endcode);
    }
}

export namespace AdvicesManager {
    export interface FetchFilter {
        medicalprofessionalName?: string;
        patientName?: string;
        parentPhoneNumber?: string;
    }
}
