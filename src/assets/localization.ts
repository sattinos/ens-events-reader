import { LocalizationDictionary } from "../lib/controller/localizer";

export const texts: LocalizationDictionary = {
  title: ['ENS Events Reader', 'ENS Ereignisleser'],
  connectorLabel: ['Connectionn Status', 'Verbindungsstatus'],
  connectBtn: ['Re-Connect', 'wieder verbinden'],
  readEvents: ['Read ENS Events', 'ENS-Ereignis lesen'],
  readBtn: ['Start Reading', 'Anfangen zu lesen'],
  blockesPerDay: ['Blocks per day', 'Blöcke pro Tag'],
  blockesPerDayPlaceholder: ['Enter the approximate generated blocks per day', 'Geben Sie die ungefähre anzahl der generierten Blöcke pro Tag ein'],
  limit: ['Events count limit', 'limit der Events'],
  limitPlaceHolder: ['Limit the results count here', 'Beperk het aantal resultaten hier'],
  fromBlock: ['From Block', 'vom Block'],
  fromBlockNumber: ['From Block Number', 'von Blocknummer'],
  toBlock: ['To Block', 'zum Block'],
  toBlockNumber: ['To Block Number', 'Zur Blocknummer'],
  fromBlockNumberPlaceHolder: ['enter the number of the block you want events to start from', 'Geben Sie die nummer des Blocks ein, von dem aus die Ereignisse beginnen sollen'],
  toBlockNumberPlaceHolder: ['enter the number of the block you want events to finish at', 'Geben Sie die nummer des Blocks ein, von dem aus die Ereignisse enden sollen'],
  contractAddress: ['Contract Address', 'vertrag Adresse'],
  results: ['Events Found', 'gefundene Ereignisse']
};
