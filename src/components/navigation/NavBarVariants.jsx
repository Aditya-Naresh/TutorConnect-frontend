import React from 'react';
import NavBarItems from './NavBarItems';

export const StudentNavBar = () => (
  <div className="bg-gradient-to-r from-emerald-900 via-emerald-600 to-teal-500 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full shadow-lg">
    <NavBarItems />
  </div>
);

export const TutorNavBar = () => (
  <div className="bg-gradient-to-r from-indigo-900 via-blue-700 to-sky-500 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full shadow-lg">
    <NavBarItems />
  </div>
);

export const AdminNavBar = () => (
  <div className="bg-gradient-to-r from-slate-900 via-purple-800 to-purple-600 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full shadow-lg">
    <NavBarItems />
  </div>
);