import * as React from 'react';

export interface OptionsInputProps {
    title: string;
    options: string[];
    index: number;
    id?: string;
    className?: string;
    OnOptionSelected: (index: number) => void;
}

export default class OptionsInput extends React.Component<OptionsInputProps, {}> {
    public render() {
        const options = this.props.options.map((option: string, index: number) =>
            <option value={index} key={index}>{option}</option>
        );
        return (
            <select
                id={this.props.id}
                className={this.props.className}
                name={this.props.title}
                onChange={this.onChange}
                value={this.props.index}
            >
                {options}
            </select>
        );
    }

    private onChange = async (element: any) => {
        const activeIndex = element.target.value;
        this.props.OnOptionSelected(parseInt(activeIndex, 10));
    }
}
