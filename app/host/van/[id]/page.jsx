"use client";
import NavigateBack from "@/components/NavigateBack";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const fetchVan = async (id, token) => {
  const response = await fetch(`/api/host/van/${id}`, {
    headers: { accessToken: token },
    cache: "default",
  });
  const data = await response.json();
  return data;
};

async function VanDetails({ params }) {
  const { data: session } = useSession();
  const [van, setVan] = useState(null);
  useEffect(() => {
    fetchData();
  }, [session?.user]);

  const fetchData = async () => {
    if (!session?.user) return;

    const result = await fetchVan(params.id, session?.user?.token);
    setVan(result);
  };

  return (
    <div className="wrapper">
      <NavigateBack message={"back to all vans"} />
      {van && (
        <div className="mt-4 flex flex-col gap-y-4">
          <Image
            src={van.image}
            alt=""
            width={400}
            height={400}
            priority
            className="max-h-128 w-full rounded-lg object-contain"
          />
          <i className={`van-type-${van.type}`}>{van.type}</i>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold">{van.name}</h2>
            <p className="van-price">
              <span>${van.price}</span>/day
            </p>
          </div>
          <p className="text-lg font-bold">Description:</p>
          <p>{van.description}</p>
        </div>
      )}
    </div>
  );
}

export default VanDetails;
