import RepositoryInterface, {
    ParameterObjectValueType,
    ParameterValueType
} from "../Domain/RepositoryInterface";

class StubRepository implements RepositoryInterface {
    private items: ParameterObjectValueType = {};

    add(key: string, value: ParameterValueType): void {
        this.items[key] = value;
    }

    clear() {
        this.items = {};
    }

    async load(): Promise<ParameterObjectValueType> {
        return this.items;
    }
}

export default new StubRepository();
