import { Address, ABI } from 'in3/js/src/modules/eth/api';

interface In3AppConfig {
    defaultTimeout: number;
    contractAddress: Address;
    nameRegisteredSmartContractABI: ABI[];
    dateFormatMask: string;
}

class Config {
    private _in3AppConfig: In3AppConfig;
    private _appName = 'ENS Events Readers';

    constructor() {
        this._in3AppConfig = {
            defaultTimeout: 50000,
            contractAddress: '0xF0AD5cAd05e10572EfcEB849f6Ff0c68f9700455',
            nameRegisteredSmartContractABI: [
                {
                    anonymous: false,
                    inputs: [
                        { indexed: false, name: 'name', type: 'string' },
                        { indexed: true, name: 'label', type: 'bytes32' },
                        { indexed: true, name: 'owner', type: 'address' },
                        { indexed: false, name: 'cost', type: 'uint256' },
                        { indexed: false, name: 'expires', type: 'uint256' },
                    ],
                    name: 'NameRegistered',
                    type: 'event'
                }
            ],
            dateFormatMask: 'MM/DD/YYYY HH:mm:ssaa'
        };
    }

    public get In3AppConfig() {
        return this._in3AppConfig;
    }

    public get AppName() {
        return this._appName;
    }
}
const config = new Config();
export default config;
