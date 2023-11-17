import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSocketUrl } from '../redux/slices/statusSlice';
import { RootState } from '../redux/store';
import { Button } from '@rneui/themed';
import { replaceHttpWithWs } from '../functions';

export function ConnectionManagerButtons() {
    const dispatch = useDispatch();
    const socketUrl = useSelector((state: RootState) => state.status.socketUrl);
    const socketUrlVar = process.env.WEB_SOCKET_URL

    const connectSocket = () => {
        if (socketUrl) {
            console.log('WebSocket is already connected.');
            return;
        }

        // const newSocketUrl = replaceHttpWithWs(serverUrl);
        dispatch(setSocketUrl(socketUrlVar!));
    };

    const disconnectSocket = () => {
        if (socketUrl) {
            dispatch(setSocketUrl(null));
            console.log('WebSocket disconnected.');
        } else {
            console.log('WebSocket is not connected.');
        }
    };

    return (
        <>
            {socketUrl ? <Button title='Disconnect' onPress={() => disconnectSocket()} containerStyle={{ maxWidth: 440, margin: 'auto' }} />
                : <Button title='Connect' onPress={() => connectSocket()} containerStyle={{ maxWidth: 440, margin: 'auto' }} />}
        </>
    );
}
