import Fee from "./Fee";

export default class Operation {
    constructor(private _id: number, private _name: string, private _changed: boolean, private _fees: Fee[]) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get changed(): boolean {
        return this._changed;
    }

    get fees(): Fee[] {
        return this._fees;
    }

    static create(id: number, name: string, fees: Fee[], changed: boolean) {
        return new Operation(id, name, changed, fees);
    }
}
