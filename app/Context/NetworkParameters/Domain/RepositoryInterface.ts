export type ParameterObjectValueType = {
    [key: string]: ParameterValueType;
};

export type ParameterValueType = string | number | ParameterObjectValueType;

export default interface RepositoryInterface {
    load: () => Promise<ParameterObjectValueType>;
}
