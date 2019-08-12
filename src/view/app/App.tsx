import React from 'react';
import './App.css';
import '../commonStyles.css';

import { LogEntity } from '../../model/logEntity';
import { format } from 'date-fns'

import AutoHeadersTable from '../../lib/view/autoHeadersTable';
import ConnectionSensor from '../connectionSensor';
import FlexRow from '../../lib/view/flexRow';
import DigitsInput from '../../lib/view/digitsInput';
import OptionsInput from '../../lib/view/optionsInput';
import LoadingIndicator from '../../lib/view/loadingIndicator';
import LanguageDropMenu from '../languageDropMenu';
import { appController } from '../../controller/appController';
import localizer from '../../lib/controller/localizer';

import config from '../../config';

export interface AppState {
  logs: LogEntity[];
  blocksPerDay: number;
  limit: number;
  fromBlockIndex: number;
  toBlockIndex: number;
  fromBlockNumber: number;
  toBlockNumber: number;
  isBusy: boolean;
}

const blockOptions = [
  'latest', 'earliest', 'pending', 'custom'
];

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isBusy: false,
      blocksPerDay: 12000,
      limit: 5,
      fromBlockIndex: 1,
      toBlockIndex: 0,
      fromBlockNumber: 0,
      toBlockNumber: 0,
      logs: []
    };
  }

  public async componentDidMount() {
    appController.updateView = this.forceUpdate.bind(this);
    await appController.setup();
  }

  public render() {
    return (
      <div id="formDiv">
        <LanguageDropMenu />
        <div id='formTitle'>{localizer.text('title')}</div>
        <FlexRow flexLeft={6}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('connectorLabel'))}
          rightColumn={<ConnectionSensor status={appController.connectionStatus} />}
        />

        <FlexRow flexLeft={5}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('connectBtn'))}
          rightColumn={
            <div className='center'>
              <button className='btn' onClick={this.onForceReconnectClicked}>{localizer.text('connectBtn')}</button>
            </div>
          }
        />

        <FlexRow flexLeft={5}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('limit'))}
          rightColumn={
            <div className='center'>
              <DigitsInput className='fillContainer leftFloat' value={this.state.limit} placeHolder={localizer.text('limitPlaceHolder')} onChange={this.onLimitChange} />
            </div>
          }
        />

        <FlexRow flexLeft={5}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('blockesPerDay'))}
          rightColumn={
            <div className='center'>
              <DigitsInput className='fillContainer leftFloat' value={this.state.blocksPerDay} placeHolder={localizer.text('blockesPerDayPlaceholder')} onChange={this.onBlocksPerDayChange} />
            </div>
          }
        />

        <FlexRow flexLeft={5}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('fromBlock'))}
          rightColumn={
            <div className='center'>
              <OptionsInput className='fillContainer' OnOptionSelected={this.onFromChanged} options={blockOptions} index={this.state.fromBlockIndex} title='' />
            </div>
          }
        />

        {this.renderCustomFromBlockNumber()}

        <FlexRow flexLeft={5}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('toBlock'))}
          rightColumn={
            <div className='center'>
              <OptionsInput className='fillContainer' OnOptionSelected={this.onToChanged} options={blockOptions} index={this.state.toBlockIndex} title='' />
            </div>
          }
        />

        {this.renderCustomToBlockNumber()}

        <FlexRow flexLeft={5}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('readEvents'))}
          rightColumn={
            <div className='center'>
              <button className='btn' onClick={this.onReadEnsEventsTapped}>{localizer.text('readBtn')}</button>
            </div>
          }
        />

        {this.renderEnsEvents()}

        <LoadingIndicator visible={this.state.isBusy} />
      </div>
    );
  }

  renderEnsEvents = () => {
    if (this.state.logs.length === 0) {
      return null;
    }
    return (
      <div>
        <div id='tableTitle' className='center'>{localizer.text('results')}</div>
        <div id='tableContainer'>
          <AutoHeadersTable rows={this.state.logs} />
        </div>
      </div>
    );
  }

  renderLabel = (text: string) => {
    return (
      <div className='center label'>{text}</div>
    );
  }

  renderCustomFromBlockNumber() {
    if (this.state.fromBlockIndex === 3) {
      return (
        <FlexRow flexLeft={5}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('fromBlockNumber'))}
          rightColumn={
            <div className='center'>
              <DigitsInput className='fillContainer leftFloat' value={this.state.fromBlockNumber} placeHolder={localizer.text('fromBlockNumberPlaceHolder')} onChange={this.onFromBlockNumberChange} />
            </div>
          }
        />
      );
    }
    return null;
  }

  renderCustomToBlockNumber() {
    if (this.state.toBlockIndex === 3) {
      return (
        <FlexRow flexLeft={5}
          flexRight={6}
          leftColumn={this.renderLabel(localizer.text('toBlockNumber'))}
          rightColumn={
            <div className='center'>
              <DigitsInput className='fillContainer leftFloat' value={this.state.toBlockNumber} placeHolder={localizer.text('toBlockNumberPlaceHolder')} onChange={this.toBlockNumberChange} />
            </div>
          }
        />
      );
    }
    return null;
  }

  onReadEnsEventsTapped = async () => {
    this.setState({
      logs: [],
      isBusy: true
    });
    const fromBlock = this.getFromBlock();
    const toBlock = this.getToBlock();
    const extendedLogs = await appController.contractObject.events.NameRegistered.getLogs({
      fromBlock,
      toBlock,
      limit: this.state.limit
    });

    const logs: LogEntity[] = [];
    for (let index = 0; index < extendedLogs.length; index++) {
      const item = extendedLogs[index];
      logs.push({
        owner: item.owner,
        name: item.name,
        cost: item.cost.words[0],
        expiryDate: format(new Date(item.expires.toNumber() * 1000), config.In3AppConfig.dateFormatMask)
      });
    }
    this.setState({
      logs,
      isBusy: false
    });
  }

  onForceReconnectClicked = async () => {
    await appController.setup();
  }

  onLimitChange = async (limit: number) => {
    this.setState({
      limit
    });
  }

  onBlocksPerDayChange = async (blocksPerDay: number) => {
    this.setState({
      blocksPerDay
    });
  }

  onFromChanged = (fromBlockIndex: number) => {
    this.setState({
      fromBlockIndex
    });
  }

  onToChanged = (toBlockIndex: number) => {
    this.setState({
      toBlockIndex
    });
  }

  onFromBlockNumberChange = (fromBlockNumber: number) => {
    this.setState({
      fromBlockNumber
    });
  }

  toBlockNumberChange = (toBlockNumber: number) => {
    this.setState({
      toBlockNumber
    });
  }

  getFromBlock = () => {
    if (this.state.fromBlockIndex !== 3) {
      return blockOptions[this.state.fromBlockIndex];
    }
    return this.state.fromBlockNumber;
  }

  getToBlock = () => {
    if (this.state.toBlockIndex !== 3) {
      return blockOptions[this.state.toBlockIndex];
    }
    return this.state.toBlockNumber;
  }
}

export default App;
