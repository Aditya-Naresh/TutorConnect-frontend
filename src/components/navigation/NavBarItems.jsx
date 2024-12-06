import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchWalletDetails } from '../../redux/thunk/walletThunk';
import Logo from '../Logo';
import { MessageIcon, NotificationIcon, UserIcon } from './NavBarIcons';
import { useNotificationWebSocket, useChatWebSocket } from './WebSocketHandler';

const NavBarItems = () => {
  const { access, full_name } = useSelector((state) => state.auth);
  const { count } = useSelector((state) => state.notifications);
  const { render } = useSelector((state) => state.timeSlot);
  const [messageCount, setMessageCount] = useState(0);
  const NotificationSocketUrl = `ws://localhost:8000/ws/notifications/?token=${access}`;
  
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomName } = useParams();

  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [location, dispatch]);

  useNotificationWebSocket(NotificationSocketUrl, location, access, render);
  useChatWebSocket(access, roomName, location, setMessageCount);

  const moveToChat = () => navigate("/chat");

  return (
    <>
      <Link to="/">
        <Logo />
      </Link>
      <div className="relative flex items-center text-slate-900">
        <MessageIcon messageCount={messageCount} onClick={moveToChat} />
        <NotificationIcon count={count} />
        <UserIcon fullName={full_name} />
      </div>
    </>
  );
};

export default NavBarItems;