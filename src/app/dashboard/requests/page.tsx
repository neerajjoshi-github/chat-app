import { authOptions } from "<@>/libs/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

const RequestsPage = () => {
  const session = getServerSession(authOptions);
  if (!session) notFound();

  return <div>RequestPage</div>;
};

export default RequestsPage;
