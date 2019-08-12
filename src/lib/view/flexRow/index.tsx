import React from 'react';

export interface FlexRowProps {
    flexLeft: number;
    flexRight: number;
    leftColumn: JSX.Element
    rightColumn: JSX.Element
}

const style = {
    margin: '10px 0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
}

const FlexRow: React.SFC<FlexRowProps> = (props: FlexRowProps) => {
    return (
        <div style={style as any}>
            <div style={{ flex: props.flexLeft }}>
                {props.leftColumn}
            </div>
            <div style={{ flex: props.flexRight }}>
                {props.rightColumn}
            </div>
        </div>
    );
}

export default FlexRow;
