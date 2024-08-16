import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/navigation';
import { ArrowRight, CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import PrevArrow from '@/asset/icons/PrevArrow';
import NextArrow from '@/asset/icons/NextArrow';

const TeamSlider = () => {
  const slides = [
    { id: 1, image: '/about/team1.png', name: "Michael Cannon", designation: "Founder" },
    { id: 2, image: '/about/team2.png', name: "Dianne Russell", designation: "Sales Lead" },
    { id: 3, image: '/about/team3.png', name: "Devona Lane", designation: "Sales Lead" },
    { id: 4, image: '/about/team4.png', name: "Dianne Russell", designation: "Sales Lead" },
    { id: 4, image: '/about/team4.png', name: "Dianne Russell", designation: "Sales Lead" },
  ];

  return (
    <div className="mx-auto px-5 md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1200px]">
      <div className='relative flex items-center'>
        <div className="swiper-btn-prev text-black md:text-white hover:text-secondary absolute bottom-[-40px] left-[40%] sm:left-[45%] md:left-[47%]">
          <CircleArrowLeft />
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
              spaceBetween: 30,
            },
            // For tablet screens
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            // For larger screens
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="rounded-lg flex flex-col items-start justify-center">
                <Image src={slide.image} alt={`Slide ${slide.id}`} width={230} height={358} className='mb-6 w-[270px] md:w-[230px]' />
                <h4 className='font-helvetica text-2xl font-bold w-full text-center text-black md:text-white'>{slide.name}</h4>
                <h4 className='font-helvetica text-base w-full font-normal text-center text-[#6B7280]'>{slide.designation}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-btn-next text-black md:text-white hover:text-secondary absolute bottom-[-40px] right-[40%] sm:right-[45%] md:right-[47%]">
          <CircleArrowRight/>
        </div>
      </div>
    </div>
  );
};

export default TeamSlider;
