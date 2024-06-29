import React from "react";
import BlockButton from "./BlockButton";
import UnblockButton from "./UnblockButton";
import UserDetails from "./UserDetails";

const UserManagementTable = ({ data, reRender, blockUser, showCard }) => {
  return (
    <table className="relative border border-white">
      <thead>
        <tr className="font-bold text-amber-100 ">
          <th className="px-4 py-2 border border-white">Email</th>
          <th className="hidden md:table-cell px-4 py-2 border border-white">First Name</th>
          <th className="hidden md:table-cell py-2 border border-white">Last Name</th>
          <th className="hidden md:table-cell py-2 border border-white">Auth Provider</th>
          <th className="py-2 border border-white">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"}
          >
            <td className="border px-4 py-2 border-white">{user.email}</td>
            <td className="hidden md:table-cell border px-4 py-2 border-white">
              {user.first_name}
            </td>
            <td className="hidden md:table-cell border px-4 py-2 border-white">{user.last_name}</td>
            <td className="hidden md:table-cell border px-4 py-2 border-white">
              {user.auth_provider}
            </td>

            <td className="border px-4 py-2 border-white">
              {blockUser? 
              <div>
                {user.is_blocked ? (
                  <UnblockButton id={user.id} reRender={reRender} />
                ) : (
                  <BlockButton id={user.id} reRender={reRender} />
                )}
              </div> :
              <UserDetails id={user.id} showCard={showCard} />
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserManagementTable;
