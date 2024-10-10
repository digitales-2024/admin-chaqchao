"use client";
import { useProfile } from "@/hooks/use-profile";
import { getGreeting } from "@/utils/getGreeting";

export const Greeting = () => {
  const { user } = useProfile();
  return (
    <h1 className="inline-flex flex-wrap gap-2 text-2xl font-semibold text-gray-800">
      {getGreeting()},
      <span className="font-medium capitalize">{user?.name}</span>
    </h1>
  );
};
