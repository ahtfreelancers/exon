import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import Link from 'next/link';

const ProductSlider = () => {
  const slides = [
    { src: '/products/infinity.png', description: 'Description text', title: 'Infinity', slug: 'infinity' },
    { src: '/products/sleek.png', description: 'Description text', title: 'Sleek', slug: 'sleek' },
    { src: '/products/swift.png', description: 'Description text', title: 'Swift', slug: 'swift' },
    { src: '/products/intima.png', description: 'Description text', title: 'Intima', slug: 'intima' },
    { src: '/products/endostent.png', description: 'Description text', title: 'Endostent', slug: 'endostent' },
  ];

  const [maxHeight, setMaxHeight] = useState(538);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const [mounted, setMounted] = useState(false);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      slideRefs.current[index] = el;
    }
  };

  const calculateMaxHeight = () => {
    const heights = slideRefs.current.map(slide => slide?.offsetHeight || 0);
    setMaxHeight(Math.max(...heights));
  };

  useEffect(() => {
    if (mounted) {
      calculateMaxHeight();
    } else {
      setMounted(true);
    }
  }, [mounted, slides.length]);

  useEffect(() => {
    if (mounted) {
      calculateMaxHeight();
      window.addEventListener('resize', calculateMaxHeight);
      return () => {
        window.removeEventListener('resize', calculateMaxHeight);
      };
    }
  }, [mounted]);

  return (
    <div className="bg-background py-12 lg:px-12 rounded-[72px]">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={12}
        breakpoints={{
          320: {
            slidesPerView: 1.3,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
        loop={true}
        autoplay={{
          delay: 3000, // Adjust the delay as needed
          disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
        }}
        onSlideChange={calculateMaxHeight}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              ref={(el) => setRef(el, index)}
              className="bg-white shadow px-10 py-12 rounded-[50px] text-center relative"
              style={{ height: maxHeight ? `${maxHeight}px` : 'auto' }} data-aos="fade-up"
            >
              <h3 className="text-[28px] mb-20 font-bold font-helvetica">{slide.title}</h3>
              {/* <h4 className="text-lg text-[#6D6D6D] font-semibold font-helvetica mb-14">{slide.description}</h4> */}
              <img src={slide.src} alt={`Product Image ${index + 1}`} className="mx-auto mb-4" />
              <Link href={`/product/${slide.slug}`}>
                <button
                  className="mt-4 py-2 px-8 font-medium md:font-bold text-base rounded-b-none sm:px-10 md:px-6 lg:px-5 3xl:px-[42px] rounded-t-[28px] md:rounded-t-full absolute bottom-0 left-1/2 transform -translate-x-1/2"
                >
                  Know More
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
