import { PendingAdvice } from "../model/PendingAdvice";

export namespace FirebaseFunctionDefinitions {
    export namespace AddAdvice {
        export type Function = (data: Input, context: any) => Promise<Result>;

        export type Input = Advice;

        export interface Result {
            log: string;
            adviceId: string;
        }

        export const NAME = "add_advice";
    }

    export namespace SendSMS {
        export type Function = (data: Input, context: any) => Promise<Result>;

        export type Input = Advice;

        export interface Result {
            messageSent: string;
        }

        export const NAME = "send_sms";
    }
}
