"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function VanView({
  vans,
  basePath,
  bannerSize = { width: 40, height: 40 },
  containerStyles,
  itemStyles,
  detailStyles,
  imageStyles,
}) {
  const pathname = usePathname();
  const resolvedBase =
    basePath || (pathname === "/host" ? "/host/van" : pathname);

  if (!vans?.length) return null;

  return (
    <div className={containerStyles}>
      {vans.map((van) => (
        <div key={van.id}>
          <Link
            href={`${resolvedBase}/${van.id.toString()}`}
            className={itemStyles}
          >
            <Image
              src={van.image}
              alt={van.name}
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
      ))}
    </div>
  );
}

export default VanView;
