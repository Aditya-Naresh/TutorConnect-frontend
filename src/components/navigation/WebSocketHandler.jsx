import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotificationCount } from '../../redux/slices/notificationSlice';
import { WEBSOCKETSERVER } from '../../server';

export const useNotificationWebSocket = (NotificationSocketUrl, location, access, render) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const notificationSocket = new WebSocket(NotificationSocketUrl);
    
    notificationSocket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.notifications){
        dispatch(
          setNotificationCount(data.notifications? data.notifications.length : 0)
        );

      }
    };
    
    notificationSocket.onclose = function (event) {
      console.error("NotificationWebSocket closed unexpectedly", event);
    };

    return () => notificationSocket.close();
  }, [location, access, render, NotificationSocketUrl, dispatch]);
};

export const useChatWebSocket = (access, roomName, location, setMessageCount) => {
  useEffect(() => {
    const socket = new WebSocket(
      `${WEBSOCKETSERVER}/chat-notifications/?token=${access}`
    );

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setMessageCount(data.message_notification);
    };

    socket.onclose = function () {
      console.error("ChatWebSocket closed unexpectedly");
    };

    return () => socket.close();
  }, [roomName, access, location, setMessageCount]);
};