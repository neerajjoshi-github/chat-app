/* eslint-disable @next/next/no-img-element */
import { authOptions } from "<@>/libs/auth";
import { getServerSession } from "next-auth";
import { FC, ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconType } from "react-icons";
import { BsPersonAdd } from "react-icons/bs";
import Image from "next/image";
import SignOutButton from "<@>/components/SignOutButton";
import FriendRequestsSidebarOptions from "<@>/components/FriendRequestsSidebarOptions";
import { fetchRedis } from "<@>/helpers/redis";

type LayoutProps = {
  children: ReactNode;
};

type SideBarOption = {
  id: number;
  name: string;
  herf: string;
  icon: IconType;
};

const sideBarOptions: SideBarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    herf: "/dashboard/add",
    icon: BsPersonAdd,
  },
];
const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_request`
    )) as []
  ).length;

  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pt-8">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <img
            src="/logo/WebWhishper.png"
            alt="Logo Image"
            className="object-cover w-32 h-32"
          />
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your Chats
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>chats this guy have</li>
            <li>
              <div className="text-sm font-semibold leading-6 text-gray-400">
                Overview
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sideBarOptions.map((option) => {
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.herf}
                        className="text-gray-700 hover:text-blue-600 group flex items-center gap-3 rounded-md p-2 text-sm leading-6  font-semibold"
                      >
                        <span>
                          <option.icon size={30} />
                        </span>
                        <span className=" truncate ">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <FriendRequestsSidebarOptions
                sessionId={session.user.id}
                initialUnseenRequestCount={unseenRequestCount}
              />
            </li>
            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="profile image"
                  />
                </div>
                <span className="sr-only">Your Profile Image</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="textxs text-zinc-400">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
