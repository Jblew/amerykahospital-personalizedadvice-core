import { PendingAdvice } from "../model/PendingAdvice";

export namespace FirebaseFunctionDefinitions {
    export namespace AddAdvice {
        export type Function = (data: Input, context: any) => Promise<Result>;

        export type Input = PendingAdvice;

        export interface Result {
            log: string;
            adviceId: string;
        }

        export const NAME = "add_advice";
    }

    export namespace SendSMS {
        export type Function = (data: Input, context: any) => Promise<Result>;

        export interface AdviceId {
            adviceId: string;
        }
        export type Input = AdviceId;

        export interface Result {
            message: string;
            smsResult: string;
        }

        export const NAME = "send_sms";
    }
}
