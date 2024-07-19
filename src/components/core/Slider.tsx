import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

const Slider = () => {
  const slides = [
    { src: '/home/mission.svg', title: 'PRODUCT NAME DEMO', category: 'Category - Detail' },
    { src: '/home/mission.svg', title: 'PRODUCT NAME DEMO', category: 'Category - Detail' },
    { src: '/home/mission.svg', title: 'PRODUCT NAME DEMO', category: 'Category - Detail' },
    { src: '/home/mission.svg', title: 'PRODUCT NAME DEMO', category: 'Category - Detail' },
  ];

  return (
    <div className="slider-container max-w-[1260px] mx-auto">
      <div className='flex justify-between items-center'>
        <h2 className="mb-4 border-l-[10px] border-[#12A89D] pl-[10px] w-[400px]">
          Explore
          all products
        </h2>
        <h5>VIEW ALL</h5>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        // navigation
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center bg-primary p-6 rounded-lg">
              <Image
                src={slide.src}
                alt={slide.title}
                width={200}
                height={200}
                className="rounded-lg"
              />
              <h3 className="text-white text-center mt-2">{slide.title}</h3>
              <p className="text-white text-center text-sm">{slide.category}</p>
              <div className="arrow mt-2">
                <Image
                  src="/path/to/arrow/image.png"
                  alt="arrow"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
