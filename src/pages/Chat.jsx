import React from 'react';
import ContactList from '../components/ContactList';
import ChatRoom from '../components/ChatRoom';

const Chat = () => {
  return (
    <div className="flex h-screen bg-gray-100 mb-8 w-full">
      <div className="w-1/3 p-4 border-r border-gray-300">
        <ContactList />
      </div>
      <div className="flex-grow p-4">
        <ChatRoom  />
      </div>
    </div>
  );
};

export default Chat;
