import Fee from "./Fee";
import {OrderedSet} from "immutable";

export default class Operation {
    private _fees: OrderedSet<Fee> = OrderedSet<Fee>().asMutable();
    private _showCHParticipantTransferFee = false;

    constructor(
        private _id: number,
        private _code: string,
        private _name: string
    ) {}

    get id(): number {
        return this._id;
    }

    get code(): string {
        return this._code;
    }

    get name(): string {
        return this._name?.length > 0 ? this._name : this._code;
    }

    get showCHParticipantTransferFee(): boolean {
        return this._showCHParticipantTransferFee;
    }

    setShowCHParticipantTransferFee() {
        this._showCHParticipantTransferFee = true;
    }

    get rowSpan(): number {
        let rowSpan = this.fees.size;

        if (this.showCHParticipantTransferFee) {
            rowSpan++;
        }

        return rowSpan;
    }

    addFee(fee: Fee) {
        this._fees.add(fee);
    }

    get fees(): OrderedSet<Fee> {
        return this._fees;
    }
}
