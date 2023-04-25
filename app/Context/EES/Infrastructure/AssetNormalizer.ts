export default class AssetNormalizer {
    public normalize(value: string, asset: any): number {
        return parseInt(value) / Math.pow(10, asset.get("precision"));
    }

    public denormalize(value: number, asset: any): string {
        return (value * Math.pow(10, asset.get("precision"))).toString();
    }
}
