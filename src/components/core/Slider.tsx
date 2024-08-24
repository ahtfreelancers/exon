import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import { ArrowRight } from 'lucide-react';
import PrevArrow from '@/asset/icons/PrevArrow';
import NextArrow from '@/asset/icons/NextArrow';
import Link from 'next/link';

const Slider = () => {
  const slides = [
    { id: 1, image: '/products/intima.png', name: "Intima", slug: "/product/intima" },
    { id: 2, image: '/products/swift.png', name: "Swift", slug: "/product/swift" },
    { id: 3, image: '/products/sleek.png', name: "Sleek", slug: "/product/sleek" },
    { id: 4, image: '/products/endostent.png', name: "Endostent", slug: "/product/endostent" },
    { id: 5, image: '/products/infinity.png', name: "Infinity", slug: "/product/infinity" },
  ];

  return (
    <div className="slider-container md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1200px] mx-auto px-5">
      <div className='flex justify-center md:justify-between items-center mb-16'>
        <h2 className="borderText w-[400px]" data-aos="fade-right">
          Explore
          all products
        </h2>
        <h5 className=' hidden md:flex'>VIEW ALL</h5>
      </div>
      <div className='relative flex items-center'>
        <div className="swiper-btn-prev hidden md:inline-block">
          <PrevArrow />
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
          }}
          loop={true}
          autoplay={{
            delay: 2500, // Adjust the delay as needed
            disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
          }}
          breakpoints={{
            // For mobile screens
            320: {
              slidesPerView: 1.7,
              centeredSlides: true,
              spaceBetween: 20,
            },
            // For tablet screens
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            // For larger screens
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {slides?.map((slide) => (
            <SwiperSlide key={slide?.id}>
              <Link href={slide?.slug}>
                <div className="rounded-lg flex flex-col items-start justify-center">
                  <div className='bg-primary flex justify-center rounded-[30px] items-center size-[200px]'>
                    <Image src={slide?.image} alt={`Slide ${slide?.id}`} width={150} height={150} />
                  </div>
                  <div className='flex justify-between items-center w-full mt-3'>
                    <h4 className='font-helvetica text-xs'>{slide?.name}</h4>
                    <ArrowRight />
                  </div>
                  {/* <h4 className='font-helvetica text-[10px]'>Category Detail</h4> */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-btn-next hidden md:inline-block">
          <NextArrow />
        </div>
      </div>
    </div>
  );
};

export default Slider;
