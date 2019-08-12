import In3Client from 'in3';
import config from '../config';
import { ConnectionStatus } from '../model/connectionStatus';

class AppController {
    private _in3Client: In3Client | undefined = undefined;
    private _lastBlockNumber: number = -1;
    private _contractObject: any = undefined;
    private _connectionStatus: ConnectionStatus = ConnectionStatus.Offline;

    public setup = async () => {
        try {
            this._connectionStatus = ConnectionStatus.Connecting;
            this.updateView();
            this._in3Client = new In3Client({
                proof: 'none',
                signatureCount: 1,
                requestCount: 2,
                chainId: 'mainnet',
                timeout: config.In3AppConfig.defaultTimeout
            });
            if (this._in3Client) {
                this._lastBlockNumber = await this._in3Client.eth.blockNumber();
                this._contractObject = this._in3Client.eth.contractAt(config.In3AppConfig.nameRegisteredSmartContractABI, config.In3AppConfig.contractAddress);
                this._connectionStatus = ConnectionStatus.Online;
            } else {
                this._connectionStatus = ConnectionStatus.Offline;
            }
            this.updateView();
        } catch (error) {
            console.error('failed during connection: ', error);
            this._connectionStatus = ConnectionStatus.Offline;
            this.updateView();
        }
    }

    public get isConnected() {
        return (this._in3Client !== null) && (this._connectionStatus === ConnectionStatus.Online);
    }

    public get lastBlockNumber() {
        return this._lastBlockNumber;
    }

    public get contractObject() {
        return this._contractObject;
    }

    public get connectionStatus() {
        return this._connectionStatus;
    }

    public updateView = () => {
        //
    }
}

export const appController = new AppController();
