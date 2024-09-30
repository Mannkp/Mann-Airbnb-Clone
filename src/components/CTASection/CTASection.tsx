import Image from "next/image";
import Link from "next/link";

type Cta_Data = {
  img: string;
  title: string;
  description: string;
  cta_desc: string;
};

const CTASection = ({ data }: { data: Cta_Data }) => {
  return (
    <section className="relative pt-24 pb-16 flex items-start md:items-center">
      <div className="relative min-h-96 min-w-[280px] basis-full">
        <Image
          src={data?.img}
          alt={data?.title}
          fill
          className="rounded-2xl"
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
        ></Image>
      </div>
      <div className="absolute px-4 py-8 lg:px-8 ">
        <p className="text-4xl mb-3 w-64">
          {data?.title || "The Greatest Outdoors"}
        </p>
        <p className="mb-4">
          {data?.description || "Wishlists curated by Airbnb."}
        </p>
        <Link
          className="text-sm text-white bg-gray-900 px-4 py-2 mt-5 rounded-lg"
          href={"/"}
        >
          {data?.cta_desc || "Get Inspired"}
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
