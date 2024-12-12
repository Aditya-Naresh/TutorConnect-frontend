import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ to, text, borderColor, icon: Icon }) => {
  return (
    <div className={`border-b ${borderColor} py-3 px-4 transition-all duration-200 hover:bg-white/10 rounded-lg`}>
      <Link 
        to={to} 
        className="cursor-pointer text-lg font-medium text-gray-100 hover:text-white flex items-center gap-3"
      >
        {Icon && <Icon className="w-5 h-5" />}
        {text}
      </Link>
    </div>
  );
};

export default SidebarLink;