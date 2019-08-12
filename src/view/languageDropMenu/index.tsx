import * as React from 'react';
import localizer, { languageOptions } from "../../lib/controller/localizer";
import { appController } from '../../controller/appController';
import OptionsInput from '../../lib/view/optionsInput';

class LanguageDropMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <OptionsInput index={localizer.currentLanguage} title='' OnOptionSelected={this.onOptionChoosen} options={languageOptions} />
            </div>
        );
    }

    public onOptionChoosen = (index: number) => {
        localizer.currentLanguage = index;
        appController.updateView();
    }
}

export default LanguageDropMenu;