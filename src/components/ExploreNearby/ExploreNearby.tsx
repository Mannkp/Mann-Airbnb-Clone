import Image from "next/image";
import Link from "next/link";

type miniData = {
  img: string;
  location: string;
  distance: string;
};

const ExploreNearby = ({ data }: { data: miniData[] }) => {
  return (
    <section className="pt-20 md:pt-28">
      <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
      <div className="flex items-stretch justify-between flex-col md:flex-row flex-wrap">
        {data?.map((item: miniData, index: number) => {
          return (
            <Link
              href={"/"}
              key={index}
              className="flex-grow basis-full md:basis-1/2 lg:basis-1/4"
            >
              <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl hover:scale-105 transition transform duration-200 ease-out border-2 p-2 hover:shadow-lg">
                <div className="relative h-16 w-16">
                  <Image
                    src={item.img}
                    alt={item?.location + " house demo"}
                    fill
                    className="rounded-lg"
                    priority
                    style={{ objectFit: "fill" }}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                <div>
                  <h2>{item?.location || "London"}</h2>
                  <p className="text-gray-500">
                    {item?.distance || "4-hour drive"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreNearby;
