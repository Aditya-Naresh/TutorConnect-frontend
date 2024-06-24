import React from "react";
import BlockButton from "./BlockButton";
import UnblockButton from "./UnblockButton";

const UserManagementTable = ({ data, reRender }) => {
  return (
    <table className="border border-white">
      <thead>
        <tr className="font-bold text-amber-100 ">
          <th className="px-4 py-2 border border-white">Email</th>
          <th className="sm:hidden md:table-cell px-4 py-2 border border-white">First Name</th>
          <th className="sm:hidden md:table-cell py-2 border border-white">Last Name</th>
          <th className="sm:hidden md:table-cell py-2 border border-white">Auth Provider</th>
          <th className="py-2 border border-white">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"}
          >
            <td className=" border px-4 py-2 border-white">{user.email}</td>
            <td className="sm:hidden md:table-cell border px-4 py-2 border-white">
              {user.first_name}
            </td>
            <td className="sm:hidden md:table-cell border px-4 py-2 border-white">{user.last_name}</td>
            <td className="sm:hidden md:table-cell border px-4 py-2 border-white">
              {user.auth_provider}
            </td>

            <td className="border px-4 py-2 border-white">
              <div>
                {user.is_blocked ? (
                  <UnblockButton id={user.id} reRender={reRender} />
                ) : (
                  <BlockButton id={user.id} reRender={reRender} />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserManagementTable;
