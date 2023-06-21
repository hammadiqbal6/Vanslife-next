import NavigateBack from "@/components/NavigateBack";
import { headers } from "next/headers";
import Image from "next/image";

const fetchVan = async (id) => {
  const host = headers().get("host");
  const response = await fetch(`http://${host}/api/vans/${id}`);
  const data = await response.json();
  return data;
};

async function VanDetails({ params }) {
  const van = await fetchVan(params.id);

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
