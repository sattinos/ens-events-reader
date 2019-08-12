import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { appController } from '../../controller/appController';

jest.setTimeout(50000); // 10 second timeout

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('should connect to blockchain network successfully', async () => {
  await appController.setup();
  expect(appController.isConnected).toBe(true);
  expect(appController.lastBlockNumber).toBeGreaterThan(-1);
  expect(appController.contractObject).toBeDefined();
});

it('should read the events successfully', async () => {
  const extendedLogs = await appController.contractObject.events.NameRegistered.getLogs({
    fromBlock: 'earliest',
    toBlock: 'latest',
    limit: 10
  });
  expect(extendedLogs).toBeDefined();
  expect(extendedLogs).toHaveProperty('length');
  expect(extendedLogs.length).toBeGreaterThan(0);
  const firstEvent = extendedLogs[0];
  expect(firstEvent).toHaveProperty('owner');
  expect(firstEvent).toHaveProperty('name');
  expect(firstEvent).toHaveProperty('cost');
  expect(firstEvent).toHaveProperty('expires');
});
