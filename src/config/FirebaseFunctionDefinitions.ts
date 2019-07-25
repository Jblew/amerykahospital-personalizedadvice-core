import { Advice, PendingAdvice } from "../model/PendingAdvice";

export namespace FirebaseFunctionDefinitions {
    export namespace AddAdvice {
        export type Function = (data: Input, context: any) => Promise<Result>;
        export type Adapter = (data: Input) => Promise<Result>;

        export type Input = PendingAdvice;

        export interface Result {
            log: string;
            adviceId: string;
        }

        export const NAME = "add_advice";
    }

    export namespace SendSMS {
        export type Function = (data: Input, context: any) => Promise<Result>;
        export type Adapter = (data: Input) => Promise<Result>;

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

    export namespace ImportAdviceToUser {
        export type Function = (data: Input, context: any) => Promise<Result>;
        export type Adapter = (data: Input) => Promise<Result>;

        export interface AdviceId {
            adviceId: string;
        }
        export type Input = AdviceId;

        export interface Result {
            advice: Advice;
        }

        export const NAME = "import_advice_to_user";
    }
}
