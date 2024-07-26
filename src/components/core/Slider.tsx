import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/navigation';
import { ArrowRight } from 'lucide-react';

const Slider = () => {
  const slides = [
    { id: 1, image: '/home/product1.png' },
    { id: 2, image: '/home/product2.png' },
    { id: 3, image: '/home/product1.png' },
    { id: 4, image: '/home/product2.png' },
  ];

  return (
    <div className="slider-container max-w-[980px] mx-auto ">
      <div className='flex justify-between items-center mb-16'>
        <h2 className="border-l-[10px] border-[#ddf1f0] pl-[10px] w-[400px]" data-aos="fade-right">
          Explore
          all products
        </h2>
        <h5>VIEW ALL</h5>
      </div>
      <div className='px-36 relative'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop
        >
          <div className="swiper-button-prev">
            <Image src="/icons/left.png" alt="Previous" width={38} height={38} className='!absolute z-50 left-[-60px]' />
          </div>
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
          <div className="swiper-button-next absolute z-50">
            <Image src="/icons/right.png" alt="Next" width={38} height={38} />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
