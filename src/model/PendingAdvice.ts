import ow from "ow";

export interface PendingAdvice {
    patientName: string;
    medicalprofessionalName: string;
    parentPhoneNumber: string;
    advice: string;
}

export namespace PendingAdvice {
    export function validate(o: PendingAdvice, prefix: string = "PendingAdvice") {
        ow(o, `${prefix}`, ow.object);
        ow(o.medicalprofessionalName, `${prefix}.medicalprofessionalName`, ow.string.nonEmpty);
        ow(o.patientName, `${prefix}.patientName`, ow.string.nonEmpty);
        ow(o.parentPhoneNumber, `${prefix}.parentPhoneNumber`, ow.string.numeric.length(9));
        ow(o.advice, `${prefix}.advice`, ow.string.nonEmpty);
    }
}
