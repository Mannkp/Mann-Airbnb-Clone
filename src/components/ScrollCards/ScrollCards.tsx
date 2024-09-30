import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Cards_Data = {
  img: string;
  title: string;
};

// function CustomNextArrow(props: any) {
//   const { onClick } = props;
//   return (
//     <button
//       className={
//         "absolute top-1/2 right-0 z-10 bg-gray-400 text-white p-2 rounded-full"
//       }
//       onClick={onClick}
//     >
//       &rarr;
//     </button>
//   );
// }

// function CustomPrevArrow(props: any) {
//   const { onClick } = props;
//   return (
//     <button
//       className="absolute top-1/2 left-0 z-10 bg-gray-400 text-white p-2 rounded-full"
//       onClick={onClick}
//     >
//       &larr;
//     </button>
//   );
// }

function ScrollCards({ data }: { data: Cards_Data[] }) {
  const slider = useRef<Slider | null>(null);

  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    draggable: true,
    swipeToSlide: true,
    swipe: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // nextArrow: <CustomNextArrow />,
    // prevArrow: <CustomPrevArrow />,
  };

  return (
    <section className="pt-20 md:pt-24">
      <h2 className="text-4xl font-semibold pb-8">Live Anywhere</h2>
      {/* <div className="flex flex-row gap-8 overflow-scroll scrollbar-hide p-3 -ml-3 scroll-smooth focus:scroll-auto"> */}
      <div className="relative slides">
        <Slider {...settings} className="pt-8" ref={slider}>
          {data?.map((item: Cards_Data, index: number) => {
            return (
              <div className="py-6 px-1 md:pr-3 md:px-0" key={index}>
                <Link href={"/d"} className="group">
                  <div className="relative min-w-80 min-h-80">
                    <Image
                      src={item?.img}
                      alt={item?.title}
                      fill
                      className="rounded-lg object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <p className="content text-2xl mt-3 flex">
                    <span className="flex-grow">{item?.title}</span>
                    <span className="pr-4 md:pr-8 group-hover:translate-x-3 transition">
                      &rarr;
                    </span>
                  </p>
                </Link>
              </div>
            );
          })}
        </Slider>
        <div className="sliderButtons absolute top-4 right-4 space-x-4">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="hover:scale-105 hover:font-semibold active:underline transition"
          >
            Prev
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="hover:scale-105 hover:font-semibold active:underline transition"
          >
            Next
          </button>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default ScrollCards;
