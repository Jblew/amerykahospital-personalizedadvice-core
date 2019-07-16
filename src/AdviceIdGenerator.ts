import uuid from "uuid/v4";

export class AdviceIdGenerator {
    public static generateId(): string {
        return uuid();
    }
}
