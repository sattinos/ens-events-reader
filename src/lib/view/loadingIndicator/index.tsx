import React from 'react';
import './style.css';

export interface LoadingIndicatorProps {
    visible: boolean;
}

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = (props: LoadingIndicatorProps) => {
    if (!props.visible) {
        return null;
    }
    return (
        <div className='LoaderBG'>
            <div className='LoaderContainer'>
                <div className='Loader' />
            </div>
        </div>
    );
}

export default LoadingIndicator;