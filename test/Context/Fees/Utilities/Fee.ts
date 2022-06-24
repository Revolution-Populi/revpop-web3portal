import Fee from "../../../../app/Context/Fees/Domain/Fee";

type FeeType = {
    code: string;
    value: number;
    newValue?: number;
};

export function getFee(code: string, value: number, newValue?: number): Fee {
    const fee = Fee.create(code, value);

    if (newValue) {
        fee.update(newValue);
    }

    return fee;
}

export function getFees(fees: FeeType[]): Fee[] {
    const newFees = [];

    for (const fee of fees) {
        newFees.push(getFee(fee.code, fee.value, fee.newValue));
    }

    return newFees;
}
