import React, { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactPlayer from 'react-player';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../style.css';

const slidesData = [
  {
    imgSrc: "./images.jpg",
    title: "Beginner: Knife Skills 101",
    description: "Learn essential knife skills — chopping, slicing, dicing with safety.",
    categories: ["Beginner", "Knife Skills", "Basics"],
    videoUrl: "https://www.youtube.com/watch?v=YrHpeEwk_-U"
  },
  {
    imgSrc: "./cmethod.webp",
    title: "14 Cooking Methods for Beginners | Vil and Zoe's Galley",
    description: "Master water-based cooking techniques for eggs, vegetables, and more.",
    categories: ["Boiling", "Steaming", "Basics"],
    videoUrl: "https://www.youtube.com/watch?v=Lh91QeRcVFQ"
  },
  {
    imgSrc: "./rice.jpg",
    title: "Beginner: Cooking Rice Perfectly",
    description: "Never get mushy or undercooked rice again with this beginner-friendly method.",
    categories: ["Rice", "Beginner", "Staples"],
    videoUrl: "https://www.youtube.com/watch?v=Xx7sxWI9FNI"
  },
  {
    imgSrc: "./spices.webp",
    title: "The Beginner's Guide to Cooking with Spices (with Testing)",
    description: "Quick and delicious chicken recipe using just one pan.",
    categories: ["Spices", "Intermediate", "Meal Prep"],
    videoUrl: "https://www.youtube.com/watch?v=bsYzWK3cxOM&t=96s"
  },
  {
    imgSrc: "https://img.youtube.com/vi/4aZr5hZXP_s/maxresdefault.jpg",
    title: "Intermediate: Pasta From Scratch",
    description: "Learn how to knead, roll, and cut fresh pasta at home.",
    categories: ["Pasta", "Homemade", "Intermediate"],
    videoUrl: "https://www.youtube.com/watch?v=4aZr5hZXP_s"
  },
  {
    imgSrc: "https://img.youtube.com/vi/Kc8N4RkA9jY/maxresdefault.jpg",
    title: "Intermediate: Stir Fry Mastery",
    description: "The key to a flavorful and fast stir fry every time.",
    categories: ["Stir Fry", "Wok", "Intermediate"],
    videoUrl: "https://www.youtube.com/watch?v=Kc8N4RkA9jY"
  },
  {
    imgSrc: "https://img.youtube.com/vi/ZJy1ajvMU1k/maxresdefault.jpg",
    title: "Advanced: Gordon Ramsay’s Beef Wellington",
    description: "A high-skill recipe that challenges timing, texture, and flavor balance.",
    categories: ["Beef", "Fine Dining", "Advanced"],
    videoUrl: "https://www.youtube.com/watch?v=ZJy1ajvMU1k"
  },
  {
    imgSrc: "https://img.youtube.com/vi/xyk3R1XWffE/maxresdefault.jpg",
    title: "Advanced: French Omelette Technique",
    description: "Learn the classic French omelette — silky, smooth, and tricky to perfect.",
    categories: ["Eggs", "French", "Advanced"],
    videoUrl: "https://www.youtube.com/watch?v=xyk3R1XWffE"
  },
  {
    imgSrc: "https://img.youtube.com/vi/ggNEFzWbJcY/maxresdefault.jpg",
    title: "Advanced: Sushi Rolling & Knife Precision",
    description: "Dive into sushi-making with authentic Japanese knife and rolling techniques.",
    categories: ["Sushi", "Knife Skills", "Advanced"],
    videoUrl: "https://www.youtube.com/watch?v=ggNEFzWbJcY"
  }
];

const Chefstart = () => {
  const swiperWrappedRef = useRef(null);
  const [modalVideoUrl, setModalVideoUrl] = useState(null);

  const adjustMargin = () => {
    const screenWidth = window.innerWidth;
    if (swiperWrappedRef.current) {
      swiperWrappedRef.current.style.marginLeft =
        screenWidth <= 520
          ? "0px"
          : screenWidth <= 650
          ? "-50px"
          : screenWidth <= 800
          ? "-100px"
          : "-150px";
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage =
       "linear-gradient(90deg,rgba(0, 29, 43, 1) 33%, rgba(2, 2, 18, 1) 50%, rgba(0, 33, 48, 1) 100%)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";

    adjustMargin();
    window.addEventListener("resize", adjustMargin);

    return () => {
      document.body.style.backgroundImage = "";
      window.removeEventListener("resize", adjustMargin);
    };
  }, []);

  return (
    <div >
      <h1 style={{
        fontFamily:"Life Savers",
        display:"flex",
        justifyContent:"Center",
        alignItems:"center",
         textAlign: "center",      // Center text inside container
  marginLeft: "auto",       // These make it horizontally centered
  marginRight: "auto",
  width: "fit-content",     // Shrinks to content size
  fontSize: "clamp(24px, 6vw, 60px)"
      }}>ChefStart</h1>
      <main>
        <div className="container">
          <Swiper
            modules={[Pagination]}
            grabCursor
            initialSlide={0}
            centeredSlides
            slidesPerView="auto"
            speed={800}
            slideToClickedSlide
            pagination={{ clickable: true }}
            breakpoints={{
              320: { spaceBetween: 40 },
              650: { spaceBetween: 30 },
              1000: { spaceBetween: 20 },
            }}
            onSwiper={(swiper) => {
              swiperWrappedRef.current = swiper.wrapperEl;
            }}
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide key={index}>
                <img src={slide.imgSrc} alt={slide.title} loading="lazy" />
                <div className="title">
                  <h1>{slide.title}</h1>
                </div>
                <div className="content">
                  <div className="text-box">
                    <p>{slide.description}</p>
                  </div>
                  <div className="footer">
                    <div className="category">
                      {slide.categories.map((category, idx) => (
                        <span key={idx} style={{ "--i": idx + 1 }}>
                          {category}
                        </span>
                      ))}
                    </div>
                    <button style={{marginRight:"20px"}} onClick={() => setModalVideoUrl(slide.videoUrl)}>
                      <span className="label" >Watch Video</span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Modal Video Player */}
        {modalVideoUrl && (
          <div className="video-modal" onClick={() => setModalVideoUrl(null)}>
            <div className="video-container" onClick={(e) => e.stopPropagation()}>
              <ReactPlayer
                url={modalVideoUrl}
                playing
                controls
                width="100%"
                height="100%"
              />
              <button className="close-btn" onClick={() => setModalVideoUrl(null)}>✕</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chefstart;
