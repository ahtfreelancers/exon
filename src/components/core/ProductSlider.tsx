import { useLayoutEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

const ProductSlider = () => {
  const slides = [
    { src: '/about/product1.svg', description: 'Description text', title: 'PRODUCT NAME DEMO' },
    { src: '/about/product2.svg', description: 'Description text', title: 'PRODUCT NAME DEMO' },
    { src: '/about/product3.svg', description: 'Description text', title: 'PRODUCT NAME DEMO' },
    { src: '/about/product4.svg', description: 'Description text', title: 'PRODUCT NAME DEMO' },
    { src: '/about/product4.svg', description: 'Description text', title: 'PRODUCT NAME DEMO' },
  ];

  const [maxHeight, setMaxHeight] = useState(0);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const swiperRef = useRef(null);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      slideRefs.current[index] = el;
    }
  };

  useLayoutEffect(() => {
    const heights = slideRefs.current.map(slide => slide.offsetHeight);
    setMaxHeight(Math.max(...heights));
  }, [slides.length]);

  return (
    <div className="bg-background py-[115px] px-12 rounded-[72px]">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={12}
        slidesPerView={4}
        loop
        onSlideChange={() => {
          const heights = slideRefs.current.map(slide => slide.offsetHeight);
          setMaxHeight(Math.max(...heights));
        }}
        onSwiper={() => {
          const heights = slideRefs.current.map(slide => slide.offsetHeight);
          setMaxHeight(Math.max(...heights));
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              ref={(el) => setRef(el, index)}
              className="bg-white shadow px-10 py-12 rounded-[50px] text-center relative"
              style={{ height: maxHeight ? `${maxHeight}px` : 'auto' }}
            >
              <h3 className="text-[28px] mb-4 font-bold font-helvetica">{slide.title}</h3>
              <h4 className="text-lg text-[#6D6D6D] font-semibold font-helvetica mb-14">{slide.description}</h4>
              <img src={slide.src} alt={`Product Image ${index + 1}`} className="mx-auto mb-4" />
              <button className="mt-4 py-2 px-[52px] rounded-t-full absolute bottom-0 left-[26%]">Buy Now</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
