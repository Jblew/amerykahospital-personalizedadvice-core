import ow from "ow";

export interface Advice {
    id: string;
    patientName: string;
    medicalprofessionalName: string;
    parentPhoneNumber: string;
    uid?: string;
    advice: string;
    timestamp: number;
}

export namespace Advice {
    export function validate(o: Advice) {
        ow(o, "Advice", ow.object);
        ow(o.id, "Advice.id", ow.string.nonEmpty);
        ow(o.medicalprofessionalName, "Advice.medicalprofessionalName", ow.string.nonEmpty);
        ow(o.patientName, "Advice.patientName", ow.string.nonEmpty);
        ow(o.parentPhoneNumber, "Advice.parentPhoneNumber", ow.string.numeric.length(9));
        ow(o.uid, "Advice.uid", ow.any(ow.undefined, ow.string.nonEmpty));
        ow(o.advice, "Advice.advice", ow.string.nonEmpty);
        ow(o.timestamp, "Advice.timestamp", ow.number.finite.integer.greaterThan(0));
    }
}
