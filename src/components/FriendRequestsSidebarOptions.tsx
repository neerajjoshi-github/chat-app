"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React, { FC, useState } from "react";

type FriendRequestsSidebarOptionsProps = {
  sessionId: string;
  initialUnseenRequestCount: number;
};

const FriendRequestsSidebarOptions: FC<FriendRequestsSidebarOptionsProps> = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState(
    initialUnseenRequestCount
  );
  return (
    <Link
      href="/dashboard/requests"
      className="text-gray-700 hover:text-blue-600 flex items-center gap-x-3 rounded-md text-sm leading-6 font-semibold"
    >
      <div className="mr-2 text-gray-400 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600 flex w-6 h-6 shrink-0 items-center justify-center rounded-lg border text-[0.65rem] font-medium bg-white">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend requests</p>
      {unseenRequestCount > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-blue-600">
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestsSidebarOptions;
