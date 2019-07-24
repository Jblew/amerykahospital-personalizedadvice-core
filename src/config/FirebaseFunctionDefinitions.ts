import { Advice } from "../model/Advice";

export namespace FirebaseFunctionDefinitions {
    export namespace AddAdvice {
        export type Function = (data: Input, context: any) => Promise<Result>;

        export type Input = Advice;

        export interface Result {
            log: string;
        }

        export const NAME = "add_advice";
    }
}
