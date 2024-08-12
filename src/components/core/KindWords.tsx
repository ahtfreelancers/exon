import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';

const KindWords = () => {
  const slides = [
    {
      name: 'William Harris',
      feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis.',
      position: 'Lorem ipsum dolor sit amet',
    },
    {
      name: 'Susan Johnson',
      feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque. Donec tempus congue lacinia. Phasellus lacinia felis est, placerat commodo odio tincidunt iaculis. Sed felis magna, iaculis a metus id, ullamcorper suscipit nulla.',
      position: 'Lorem ipsum dolor sit amet',
    },
    {
      name: 'Sam Martin',
      feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis.',
      position: 'Lorem ipsum dolor sit amet',
    },
    {
      name: 'Susan Johnson',
      feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis nunc a molestie dictum. Mauris venenatis, felis scelerisque aliquet lacinia, nulla nisi venenatis odio, id blandit mauris ipsum id sapien. Vestibulum malesuada orci sit amet pretium facilisis. In lobortis congue augue, a commodo libero tincidunt scelerisque. Donec tempus congue lacinia. Phasellus lacinia felis est, placerat commodo odio tincidunt iaculis. Sed felis magna, iaculis a metus id, ullamcorper suscipit nulla.',
      position: 'Lorem ipsum dolor sit amet',
    },
  ];

  return (
    <div className="md:pl-14 lg:pl-28 spbp:pl-44 2xl:pl-60">
      <p className='mb-2 text-[#D7F9F7A3] font-normal' data-aos="fade-right">What Client say</p>
      <h2 className='text-white mb-10' data-aos="fade-right">Kind Words</h2>
      <div className='pl-10 md:pl-0'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            stopOnLastSlide: false,
          }}
          breakpoints={{
            430: {
              slidesPerView: 1.3,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 2.7,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className={`${index % 2 === 0 ? 'w-[70%]' : ''
              }`}>
              <div
                className={`bg-[#2d4251] border text-white border-[#818e97] p-8 rounded-2xl `}
              >
                <div className="flex items-center mb-4">
                  <span className="text-lg mr-2">★★★★★</span>
                </div>
                <p className="text-xs 2xl:text-sm leading-5 mb-4">{slide.feedback}</p>
                <h3 className="font-helvetica text-sm 2xl:text-lg font-bold">{slide.name}</h3>
                <p className="text-left font-medium text-[11px] 2xl:text-sm">{slide.position}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default KindWords;
