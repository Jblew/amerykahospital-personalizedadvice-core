import ow from "ow";

import { PendingAdvice } from "./PendingAdvice";

//
export interface Advice extends PendingAdvice {
    id: string;
    uid?: string;
    timestamp: number;
}

export namespace Advice {
    export function validate(o: Advice) {
        ow(o, "Advice", ow.object);
        PendingAdvice.validate(o, "Advice");

        ow(o.id, "Advice.id", ow.string.nonEmpty);
        ow(o.uid, "Advice.uid", ow.any(ow.undefined, ow.string.nonEmpty));
        ow(o.timestamp, "Advice.timestamp", ow.number.finite.integer.greaterThan(0));
    }
}
