import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/navigation';
import { ArrowRight } from 'lucide-react';
import PrevArrow from '@/asset/icons/PrevArrow';
import NextArrow from '@/asset/icons/NextArrow';

const Slider = () => {
  const slides = [
    { id: 1, image: '/home/product1.png' },
    { id: 2, image: '/home/product2.png' },
    { id: 3, image: '/home/product1.png' },
    { id: 4, image: '/home/product2.png' },
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
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
          }}
          loop
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
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="rounded-lg flex flex-col items-start justify-center">
                <Image src={slide.image} alt={`Slide ${slide.id}`} width={200} height={200} className='mb-6' />
                <div className='flex justify-between items-center w-full'>
                  <h4 className='font-helvetica text-xs'>Product Name Demo</h4>
                  <ArrowRight />
                </div>
                <h4 className='font-helvetica text-[10px]'>Category Detail</h4>
              </div>
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
