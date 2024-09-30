import Link from "next/link";
import Image from "next/image";
import footerData from "../../data/mock_footerData.json";

interface FooterData {
  logo: Logo;
  links: Links[];
  social: Social[];
}

type Links = {
  title: string;
  items: { text: string; url: string; target?: string }[];
};

type Social = { icon: string; url: string; iconSrc: string };

type Logo = {
  src: string;
  alt: string;
  description: string;
};

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="text-gray-600 body-font bg-[#f8f8f8] min-w-[350px]">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left flex flex-row items-center md:flex-col md:items-start gap-4 md:gap-0 mb-8 md:mb-0">
          <Link href={"#"}>
            <Image
              src={
                footerData?.logo?.src ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
              }
              alt={footerData?.logo?.alt || "Airbnb logo"}
              width={120}
              height={60}
              style={{ objectPosition: "left", objectFit: "contain" }}
            />
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            {footerData?.logo?.description || "It's Airbnb! Belong anywhere."}
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {footerData &&
            footerData?.links?.map((data: Links, index: number) => {
              return (
                <div
                  className="lg:w-1/4 md:w-1/2 w-full px-4"
                  key={index + data?.title}
                >
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
                    {data?.title}
                  </h2>
                  <ul className="list-none mb-10">
                    {data?.items &&
                      data?.items?.map((data, index: number) => {
                        return (
                          <li className="leading-6" key={index + data?.text}>
                            <Link
                              href={data?.url || "#"}
                              target={data?.target || "_self"}
                              className="text-gray-600 hover:text-gray-900 hover:shadow-sm"
                            >
                              {data?.text}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center justify-between gap-4 ">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            &copy; {year} Airbnb clone — &nbsp; Next.js &nbsp;|&nbsp; Typescript
            &nbsp;|&nbsp; Tailwind CSS &nbsp;
          </p>
          <span className="inline-flex items-center justify-center gap-4 sm:justify-start">
            {footerData &&
              footerData?.social?.map((data: Social, index: number) => {
                return (
                  <Link
                    href={"#"}
                    className="text-gray-500"
                    key={index + data?.icon}
                  >
                    <Image
                      src={data?.iconSrc}
                      alt={data?.icon}
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  </Link>
                );
              })}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
