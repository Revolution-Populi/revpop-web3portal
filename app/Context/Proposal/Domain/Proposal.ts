import {Moment} from "moment";
import {Set} from "immutable";
import {ProposalTypes} from "../types";
import ParametersType = ProposalTypes.ParametersType;
import ChangedParameterType = ProposalTypes.ChangedParameterType;
import ChangedParametersType = ProposalTypes.ChangedParametersType;

export default class Proposal {
    private _changedParameters: ChangedParametersType = Set();
    private _voted = false;

    constructor(
        private _id: string,
        private _parameters: ParametersType,
        private _expirationDate: Moment,
        private _reviewPeriod: Moment
    ) {}

    get id(): string {
        return this._id;
    }

    get parameters(): ParametersType {
        return this._parameters;
    }

    get expirationDate(): Moment {
        return this._expirationDate;
    }

    get reviewPeriod(): Moment {
        return this._reviewPeriod;
    }

    setVoted() {
        this._voted = true;
    }

    get voted(): boolean {
        return this._voted;
    }

    addChangedParameter(changedParameter: ChangedParameterType) {
        this._changedParameters = this._changedParameters.add(changedParameter);
    }

    get changedParameters(): ParametersType {
        return this._changedParameters;
    }
}
