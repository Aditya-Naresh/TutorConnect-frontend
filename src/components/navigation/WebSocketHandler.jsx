import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotificationCount } from '../../redux/slices/notificationSlice';

export const useNotificationWebSocket = (NotificationSocketUrl, location, access, render) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket(NotificationSocketUrl);
    
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      dispatch(
        setNotificationCount(data.notifications ? data.notifications.length : 0)
      );
    };
    
    socket.onclose = function () {
      console.error("WebSocket closed unexpectedly");
    };

    return () => socket.close();
  }, [location, access, render, NotificationSocketUrl, dispatch]);
};

export const useChatWebSocket = (access, roomName, location, setMessageCount) => {
  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/chat-notifications/?token=${access}`
    );

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setMessageCount(data.message_notification);
    };

    socket.onclose = function () {
      console.error("WebSocket closed unexpectedly");
    };

    return () => socket.close();
  }, [roomName, access, location, setMessageCount]);
};