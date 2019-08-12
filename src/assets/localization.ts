import { LocalizationDictionary } from "../lib/controller/localizer";

export const texts: LocalizationDictionary = {
  title: ['ENS Events Reader', 'Evenementen gevonden'],
  connectorLabel: ['Connectionn Status', 'Verbindingsstatus'],
  connectBtn: ['Re-Connect', 'sluit'],
  readEvents: ['Read ENS Events', 'Lees ENS-evenementen'],
  readBtn: ['Start Reading', 'Start met lezen'],
  blockesPerDay: ['Blocks per day', 'Blokken per dag'],
  blockesPerDayPlaceholder: ['Enter the approximate generated blocks per day', 'Voer de bij benadering gegenereerde blokken per dag in'],
  limit: ['Events count limit', 'Limiet voor evenementen'],
  limitPlaceHolder: ['Limit the results count here', 'Beperk het aantal resultaten hier'],
  fromBlock: ['From Block', 'Van blok'],
  fromBlockNumber: ['From Block Number', 'Van bloknummer'],
  toBlock: ['To Block', 'Blokkeren'],
  toBlockNumber: ['To Block Number', 'Nummer blokkeren'],
  fromBlockNumberPlaceHolder: ['enter the number of the block you want events to start from', 'voer het nummer in van het blok waarvan u wilt dat evenementen beginnen'],
  toBlockNumberPlaceHolder: ['enter the number of the block you want events to finish at', 'voer het nummer in van het blok waar de evenementen moeten eindigen'],
  contractAddress: ['Contract Address', 'Contractadres'],
  results: ['Events Found', 'Evenementen gevonden']
};
