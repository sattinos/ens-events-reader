import React from 'react';

export interface SimpleTableProps {
    headers: string[];
    rows: string[][];
}

const renderArrayAsTableRow = (words: string[], isHeader: boolean, renderKey?: string): JSX.Element => {
    const renderedWords: JSX.Element[] = [];
    for (let index = 0; index < words.length; index++) {
        const word = words[index];
        if (isHeader) {
            renderedWords.push(
                <th key={`header_${index}_${word}`}>{word}</th>
            );
        } else {
            renderedWords.push(
                <td key={`row_${index}_${word}`}>{word}</td>
            );
        }
    }
    return (
        <tr key={renderKey}>{renderedWords}</tr>
    );
}

const SimpleTable: React.SFC<SimpleTableProps> = (props: SimpleTableProps) => {
    const renderedHeader = renderArrayAsTableRow(props.headers, true);
    const renderedRows: JSX.Element[] = [];
    for (let index = 0; index < props.rows.length; index++) {
        renderedRows.push(
            renderArrayAsTableRow(props.rows[index], false, `row_${index}`)
        );
    }
    const renderedHeaders: JSX.Element[] = [];
    for (let index = 0; index < props.headers.length; index++) {
        const header = props.headers[index];
        renderedHeaders.push(
            <th key={`header_${index}_${header}`}>{header}</th>
        );
    }
    return (
        <table>
            <tbody>
                {renderedHeader}
                {renderedRows}
            </tbody>
        </table>
    );
}

export default SimpleTable;
