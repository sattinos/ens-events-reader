import React from 'react';
import './style.css';

import { ConnectionStatus } from "../../model/connectionStatus";

export interface ConnectionSensorProps {
    status: ConnectionStatus;
}

const connectionStatusMapping = {
    [ConnectionStatus.Connecting]: 'Connecting...',
    [ConnectionStatus.Offline]: 'Offline',
    [ConnectionStatus.Online]: 'Online'
}

const cssClassMapping = {
    [ConnectionStatus.Connecting]: 'connecting',
    [ConnectionStatus.Offline]: 'offline',
    [ConnectionStatus.Online]: 'online'
}

const ConnectionSensor: React.SFC<ConnectionSensorProps> = (props: ConnectionSensorProps) => {
    return (
        <div className={`${cssClassMapping[props.status]}`} id='connectionStatusDiv-3nsKHRBL'>{connectionStatusMapping[props.status]}</div>
    );
}

export default ConnectionSensor;
