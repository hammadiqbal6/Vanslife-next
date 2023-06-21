"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function VanView({
  vans,
  bannerSize = { width: 40, height: 40 },
  containerStyles,
  itemStyles,
  detailStyles,
  imageStyles,
}) {
  let pathname = usePathname();
  pathname = pathname === "/host" ? "/host/van" : pathname;

  const vanElement = (van) => {
    return (
      <div key={van.id}>
        <Link href={`${pathname}/${van.id.toString()}`} className={itemStyles}>
          <Image
            src={van.image}
            alt=""
            {...bannerSize}
            className={imageStyles}
          />
          <div className={detailStyles}>
            <h3 className="text-xl font-bold">{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
            <i className={`van-type-${van.type}`}>{van.type}</i>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      {vans && (
        <div className={containerStyles}>
          {vans.map((van) => vanElement(van))}
        </div>
      )}
    </>
  );
}

export default VanView;
