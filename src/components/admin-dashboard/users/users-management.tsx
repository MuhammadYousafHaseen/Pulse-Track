"use client";

import { useEffect, useState } from "react";

import UsersTable from "./users-table";

import { Search, Users } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked?: boolean;
  createdAt?: string;
};

export default function UsersManagement() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        let url = "/api/admin/users";
        const params = new URLSearchParams();

        if (search) {
          params.append("search", search);
        }

        if (role !== "all") {
          params.append("role", role);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, role]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
            <Users size={24} />
          </div>

          <div>
            <h2 className="text-3xl font-black">Users Management</h2>
            <p className="mt-1 text-gray-400">
              Search, filter and manage platform users
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full border-cyan-500/20 bg-white/5 pl-10 text-white placeholder:text-gray-500 md:w-65"
            />
          </div>

          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="h-12 w-full border-cyan-500/20 bg-white/5 text-white md:w-45">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>

            <SelectContent className="border-cyan-500/20 bg-[#020617] text-white">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TABLE */}
      <UsersTable
        users={users}
        loading={loading}
        refreshUsers={() => {
          // optional manual refresh
          setSearch((prev) => prev);
        }}
      />
    </div>
  );
}