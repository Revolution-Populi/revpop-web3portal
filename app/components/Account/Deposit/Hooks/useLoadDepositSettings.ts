import {useEffect, useState} from "react";
import GetDepositSettings from "../../../../Context/Deposit/Application/Query/GetDepositSettings/GetDepositSettings";
import GetDepositSettingsHandler from "../../../../Context/Deposit/Application/Query/GetDepositSettings/GetDepositSettingsHandler";

export interface Settings {
    contractAddress: string;
    receiverAddress: string;
    minimumValue: string;
    minimumTimeLock: number;
}

export default function useLoadDepositSettings(): [Settings | null, boolean] {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function load() {
            const query = new GetDepositSettings();

            try {
                const settings = (await new GetDepositSettingsHandler().execute(
                    query
                )) as Settings;

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
