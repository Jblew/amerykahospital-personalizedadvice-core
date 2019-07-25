import firebase from "firebase/app";
import "firebase/firestore";

import { FirestoreCollections } from "../config/FirestoreCollections";
import { Advice } from "../model/Advice";

export class AdvicesManager {
    public static async addAdvice(advice: Advice, firestoreOrNull?: firebase.firestore.Firestore) {
        const firestore: firebase.firestore.Firestore = firestoreOrNull || firebase.firestore();
        Advice.validate(advice);
        await AdvicesManager.getAdviceDoc(advice.id, firestore).set(advice);
    }

    public static async getAdvice(
        id: string,
        firestoreOrNull?: firebase.firestore.Firestore,
    ): Promise<Advice | undefined> {
        const firestore: firebase.firestore.Firestore = firestoreOrNull || firebase.firestore();
        const doc = await AdvicesManager.getAdviceDoc(id, firestore).get();
        if (!doc.exists) return undefined;
        const advice = doc.data() as Advice;
        Advice.validate(advice);
        return advice;
    }

    public static async adviceExists(id: string, firestoreOrNull?: firebase.firestore.Firestore): Promise<boolean> {
        const firestore: firebase.firestore.Firestore = firestoreOrNull || firebase.firestore();
        return (await AdvicesManager.getAdviceDoc(id, firestore).get()).exists;
    }

    public static async fetchAdvices(filter: AdvicesManager.FetchFilter): Promise<Advice[]> {
        let query: firebase.firestore.Query = firebase
            .firestore()
            .collection(FirestoreCollections.ADVICES_COLLECTION_KEY)
            .orderBy(Advice.keys.timestamp, "desc");

        if (filter.medicalprofessionalName) {
            query = AdvicesManager.createStartsWithQueryClause(
                query,
                Advice.keys.medicalprofessionalName,
                filter.medicalprofessionalName,
            );
        }

        if (filter.patientName) {
            query = AdvicesManager.createStartsWithQueryClause(query, Advice.keys.patientName, filter.patientName);
        }

        if (filter.parentPhoneNumber) {
            query = AdvicesManager.createStartsWithQueryClause(
                query,
                Advice.keys.parentPhoneNumber,
                filter.parentPhoneNumber,
            );
        }

        query = query.limit(20);

        const querySnapshot = await query.get();

        const advices: Advice[] = [];

        querySnapshot.forEach(document => advices.push((document.data() as any) as Advice));

        return advices as Advice[];
    }

    private static getAdviceDoc(
        adviceId: string,
        firestore: firebase.firestore.Firestore,
    ): firebase.firestore.DocumentReference {
        return firestore.collection(FirestoreCollections.ADVICES_COLLECTION_KEY).doc(adviceId);
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
