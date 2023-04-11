import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "<@>/libs/auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  return <div>Dashboard</div>;
};

export default DashboardPage;
