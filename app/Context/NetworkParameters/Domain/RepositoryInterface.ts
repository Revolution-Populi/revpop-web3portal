export type ParameterObjectValueType = {
    [key: string]: ParameterValueType;
};

type currentFees = {
    parameters: (number | ParameterObjectValueType)[][];
    scale: number;
};

export type ParameterValueType =
    | string
    | number
    | ParameterObjectValueType
    | currentFees;

export default interface RepositoryInterface {
    load: () => Promise<ParameterObjectValueType>;
}
