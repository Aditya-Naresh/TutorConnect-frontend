import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotificationCount } from '../../redux/slices/notificationSlice';
import { WEBSOCKETSERVER } from '../../server';

export const useNotificationWebSocket = (NotificationSocketUrl, location, access, render) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let notificationSocket;

    const connectSocket = () => {
      notificationSocket = new WebSocket(NotificationSocketUrl);

      notificationSocket.onopen = () => {
        console.log("Notification WebSocket connected");
      };

      notificationSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.notifications) {
          dispatch(setNotificationCount(data.notifications.length || 0));
        }
      };

      notificationSocket.onclose = function (event) {
        console.error("Notification WebSocket closed unexpectedly", event);
        setTimeout(connectSocket, 5000); 
      };

      notificationSocket.onerror = (error) => {
        console.error("Notification Socket error:", error);
      };
    };

    connectSocket();

    return () => {
      if (notificationSocket) notificationSocket.close();
    };
  }, [NotificationSocketUrl, location, access, render, dispatch]);
};

export const useChatWebSocket = (access, roomName, location, setMessageCount, render) => {
  useEffect(() => {
    let socket;

    const connectSocket = () => {
      socket = new WebSocket(
        `${WEBSOCKETSERVER}/chat-notifications/?token=${access}`
      );

      socket.onopen = () => {
        console.log("Chat WebSocket connected");
      };

      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.message_notification !== undefined) {
          setMessageCount(data.message_notification);
        }
      };

      socket.onclose = function () {
        console.error("Chat WebSocket closed unexpectedly");
        setTimeout(connectSocket, 5000); 
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };

    connectSocket();

    return () => {
      if (socket) socket.close();
    };
  }, [access, roomName, location, render, setMessageCount]);
};
