"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import VanView from "@/components/VanView";

const fetchHost = async (id, token) => {
  const response = await fetch(`api/host/${id}`, {
    headers: { accessToken: token },
  });
  const data = await response.json();
  return data;
};

async function Host({ searchParams }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    if (!session?.user) return;
    const result = await fetchHost(session?.user?.id, session?.user?.token);
    setUser(result);
  };

  useEffect(() => {
    fetchData();
  }, [session?.user]);

  if (!user) return;

  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Your vans</h1>
      <VanView
        vans={user.vans}
        searchParams={searchParams}
        containerStyles={"flex flex-col mt-4 gap-y-4"}
        imageStyles={"h-40 w-40 object-contain rounded-lg"}
        itemStyles={
          "flex gap-x-4 items-center rounded-lg bg-white p-4 shadow-sm"
        }
        bannerSize={{ width: 100, height: 100 }}
        detailStyles={"flex flex-col gap-y-3"}
      />
    </div>
  );
}

export default Host;
