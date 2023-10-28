import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSocketUrl, clearSocketUrl, setConnected } from '../redux/slices/statusSlice';

export function ConnectionManagerAuto() {
  const dispatch = useDispatch();
  const socketUrl = useSelector(selectSocketUrl);

  useEffect(() => {
    if (socketUrl) {
      const newSocket = new WebSocket(socketUrl);

      newSocket.onopen = () => {
        dispatch(setConnected(true));
        console.log('Connected to the server via WebSocket');
      };

      newSocket.onmessage = (event) => {
        const message = event.data;
        console.log('Received message from the server:', message);
      };

      newSocket.onclose = (event) => {
        dispatch(setConnected(false));
        if (event.wasClean) {
          console.log('Closed cleanly, code=' + event.code + ', reason=' + event.reason);
        } else {
          console.error('Connection died');
        }
      };

      return () => {
        newSocket.close();
        dispatch(clearSocketUrl());
      };
    }
  }, [socketUrl, dispatch]);

  return null;
}
