"use client";
import { Bell } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const notifications = [
  { id: 1, message: "New message from John", time: "5 minutes ago" },
  { id: 2, message: "You have a new follower", time: "1 hour ago" },
  { id: 3, message: "Your post was liked by Jane", time: "2 hours ago" },
];

export const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
          {notifications.length > 0 && (
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between border-b px-4 py-2 font-semibold">
          <span>Notifications</span>
          <span className="text-xs text-muted-foreground">
            {notifications.length} new
          </span>
        </div>
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className="flex flex-col items-start px-4 py-2"
          >
            <span>{notification.message}</span>
            <span className="text-xs text-muted-foreground">
              {notification.time}
            </span>
          </DropdownMenuItem>
        ))}
        {notifications.length === 0 && (
          <div className="px-4 py-2 text-center text-sm text-muted-foreground">
            No new notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
