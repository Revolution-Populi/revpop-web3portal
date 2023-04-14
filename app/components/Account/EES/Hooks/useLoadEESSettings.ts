import {useEffect, useState} from "react";
import GetDepositSettings from "../../../../Context/EES/Application/Query/GetEESSettings/GetEESSettings";
import GetDepositSettingsHandler from "../../../../Context/EES/Application/Query/GetEESSettings/GetEESSettingsHandler";
import {EESSettings} from "../../../../Context/EES/Domain/EES/RepositoryInterface";
import EesRepository from "../../../../Context/EES/Infrastructure/EES/Repository";

export default function useLoadEESSettings(): [EESSettings | null, boolean] {
    const [settings, setSettings] = useState<EESSettings | null>(null);
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
