import { texts } from "../../assets/localization";

export interface LocalizationDictionary {
  [index: string]: string[]
}

export enum Language {
    english,
    deutsch
}

export const languageOptions = [
    'English',
    'Deutsch'
];

class Localizer {
    private _languageIndex: Language = Language.english;

    public set currentLanguage(language: Language) {
        this._languageIndex = language;
    }

    public get currentLanguage(): Language {
        return this._languageIndex;
    }

    public text(key: string): string {
        try {
            if (texts[key][this._languageIndex]) {
                return texts[key][this._languageIndex];
            }
            console.log(`failed to find localization text for key: ${key}`);
            return key;
        } catch (err) {
            console.log('localization text(err): ', err);
            return key;
        }
    }
}
const localizer = new Localizer();
export default localizer;
