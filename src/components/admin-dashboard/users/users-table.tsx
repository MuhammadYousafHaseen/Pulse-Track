"use client";

import UserActions from "./user-actions";


import { Badge } from "@/components/ui/badge";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked?: boolean;
  createdAt?: string;
};

type Props = {
  users: UserType[];
  loading: boolean;
  refreshUsers: () => void;
};

export default function UsersTable({
  users,
  loading,
  refreshUsers,
}: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-cyan-500/10 bg-white/5 backdrop-blur-xl">
      <table className="w-full min-w-175 text-left">
        <thead className="border-b border-cyan-500/10 text-gray-400">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td className="p-6 text-center text-gray-400" colSpan={5}>
                Loading users...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td className="p-6 text-center text-gray-400" colSpan={5}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-4 font-medium">{user.name}</td>

                <td className="p-4 text-gray-300">{user.email}</td>

                <td className="p-4">
                  <Badge
                    className={
                      user.role === "admin"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "bg-gray-500/20 text-gray-300"
                    }
                  >
                    {user.role}
                  </Badge>
                </td>

                <td className="p-4">
                  <Badge
                    className={
                      user.isBlocked
                        ? "bg-red-500/20 text-red-300"
                        : "bg-green-500/20 text-green-300"
                    }
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Badge>
                </td>

                <td className="p-4 text-right">
                  <UserActions
                    userId={user._id}
                    isBlocked={user.isBlocked}
                    refreshUsers={refreshUsers}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}