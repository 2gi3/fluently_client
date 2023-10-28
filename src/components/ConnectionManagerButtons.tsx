import { useDispatch, useSelector } from 'react-redux';
import { setSocketUrl } from '../redux/slices/statusSlice';
import { RootState } from '../redux/store';
import { Button } from '@rneui/base';
import { replaceHttpWithWs } from '../functions';

export function ConnectionManagerButtons() {
    const dispatch = useDispatch();
    const socketUrl = useSelector((state: RootState) => state.status.socketUrl);
    //@ts-ignore
    const socketUrlVar = process.env.WEB_SOCKET_URL

    const connectSocket = () => {
        if (socketUrl) {
            console.log('WebSocket is already connected.');
            return;
        }

        // const newSocketUrl = replaceHttpWithWs(serverUrl);
        dispatch(setSocketUrl(socketUrlVar));
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
            <Button title='Connect' onPress={() => connectSocket()} />
            <Button title='Disconnect' onPress={() => disconnectSocket()} />
        </>
    );
}
