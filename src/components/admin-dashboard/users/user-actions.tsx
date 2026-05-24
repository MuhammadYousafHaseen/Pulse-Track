"use client";

import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Shield, Trash2 } from "lucide-react";

type Props = {
  userId: string;
  isBlocked?: boolean;
  refreshUsers: () => void;
};

export default function UserActions({
  userId,
  isBlocked,
  refreshUsers,
}: Props) {
  const [loading, setLoading] = useState(false);

  const toggleBlock = async () => {
    try {
      setLoading(true);

      await axios.patch(`/api/admin/users/${userId}`, {
        isBlocked: !isBlocked,
      });

      refreshUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/admin/users/${userId}`);

      refreshUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={loading}
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={toggleBlock}
          disabled={loading}
        >
          <Shield className="mr-2 h-4 w-4" />
          {isBlocked ? "Unblock User" : "Block User"}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={deleteUser}
          disabled={loading}
          className="text-red-500"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}