import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const carouselData = [
  {
    url: "https://images.unsplash.com/photo-1582610191340-fa501e6e5040?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Pool Party or Great Memories!",
  },
  {
    url: "https://images.unsplash.com/photo-1724011428197-b58b34bdf1bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Maybe these houses of Turkey?!",
  },
  {
    url: "https://images.unsplash.com/photo-1519378045141-f05b62faa055?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "A Tree House? Childhood dream!",
  },
];

const Banner = () => {
  return (
    <>
      {/* <div className="relative sm:h-auto  min-h-[500px] min-w-80 flex items-center"> */}
      <Splide
        tag="div"
        aria-label="Explore New Memories!"
        options={{
          type: "loop",
          interval: 5000,
          gap: "0.2rem",
          drag: "free",
          autoplay: true,
          pauseOnHover: true,
          snap: true,
          speed: 3000,
        }}
      >
        {carouselData &&
          carouselData?.map(
            (item: { url: string; desc: string }, index: number) => {
              return (
                <SplideSlide
                  key={index}
                  className={
                    "relative min-h-[350px] md:min-h-[400px] xl:min-h-[450px] 2xl:min-h-[600px] min-w-80 w-full flex items-center justify-center"
                  }
                >
                  <Image
                    src={item?.url}
                    fill
                    alt={item?.desc}
                    className="object-cover object-center"
                    quality={100}
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute top-8 bg-white/10 backdrop-blur-sm p-4 mx-auto">
                    <p className="text-black font-semibold bg-white/40 p-2 md:text-3xl lg:text-4xl">
                      {item?.desc}
                    </p>
                  </div>
                </SplideSlide>
              );
            }
          )}
      </Splide>
      {/* <Image
          src={"/banner-forest.webp"}
          fill
          alt={"a person and dog walking in forest"}
          quality={100}
          style={{ objectPosition: "bottom", objectFit: "cover" }}
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
        /> */}
      <div className="absolute w-full text-center p-4 md:p-8">
        <p className="text-md sm:text-2xl">Not Sure where to go? Perfect.</p>
      </div>
      {/* </div> */}
    </>
  );
};

export default Banner;
