import {useEffect, useState} from "react";
import GetDepositSettings from "../../../../Context/Deposit/Application/Query/GetDepositSettings/GetDepositSettings";
import GetDepositSettingsHandler from "../../../../Context/Deposit/Application/Query/GetDepositSettings/GetDepositSettingsHandler";
import {DepositSettings} from "../../../../Context/Deposit/Domain/EES/RepositoryInterface";
import EesRepository from "../../../../Context/Deposit/Infrastructure/EES/Repository";

export default function useLoadDepositSettings(): [
    DepositSettings | null,
    boolean
] {
    const [settings, setSettings] = useState<DepositSettings | null>(null);
    const [error, setError] = useState<boolean>(false);
    const eesRepository = new EesRepository();
    const handler = new GetDepositSettingsHandler(eesRepository);

    useEffect(() => {
        async function load() {
            const query = new GetDepositSettings();

            try {
                const settings = await handler.execute(query);

                setSettings(settings);
                setError(false);
            } catch (e) {
                setError(true);
            }
        }

        load();
    }, []);

    return [settings, error];
}
