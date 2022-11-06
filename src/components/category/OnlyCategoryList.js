import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/swiper.min.css";
import 'swiper/css/navigation';

import noImage from "../../assets/images/noimage.png";

function OnlyCategoryList({ divClassName, h5ClassName, categories, slider, categoriesSlidesPerView }) {
  // console.log(slidesPerView);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // const swiper = new Swiper('.swiper', {

  //   // Navigation arrows
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },

  // });

  return (
    <>
      {categories.length ? (
        slider ? (
          <Swiper
            freeMode={true}
            // slidesPerView={"auto"}
            navigation
            slidesPerView={categoriesSlidesPerView}
            style={{
              width: "auto", "--swiper-navigation-size": "25px"
            }}
            autoplay={{
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              stopOnLastSlide: true,
            }}
            spaceBetween={10}
            modules={[Autoplay, Pagination, Navigation]}

          // pagination={{
          //   clickable: true,
          // }}
          // breakpoints={{
          //   600: {
          //     slidesPerView: 3,
          //   },
          //   900: {
          //     slidesPerView: 4,
          //   },
          // }}
          >
            {categories
              .filter((category) => !category.parent)
              .map((category, index) => {
                let delay = 0
                if (index === 0) {
                  delay = 3000
                }
                return (
                  <SwiperSlide
                    key={index}
                    style={{ width: "auto" }}
                    onClick={() => {
                      navigate(`/category/${category.id}`, {
                        state: { id: category.id },
                      });
                    }}
                  >
                    <div
                      className={divClassName}
                      style={{
                        backgroundImage: `url(${category.image || noImage})`,
                        // width: "363px",
                        cursor: "pointer",
                      }}
                    >
                      <h5 className={h5ClassName}>{category.title}</h5>
                    </div>
                  </SwiperSlide>
                );
              })}
            {/* <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div> */}
          </Swiper>
        ) : (
          <>
            {categories
              .filter((category) => !category.parent)
              .map((category, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(`/category/${category.id}`, {
                        state: { id: category.id },
                      });
                    }}
                    className={divClassName}
                    style={{
                      backgroundImage: `url(${category.image || noImage})`,
                    }}
                  >
                    <h5 className={h5ClassName}>{category.title}</h5>
                  </li>
                );
              })}
          </>
        )
      ) : (
        t("No categories")
      )}
    </>
  );
}

export default OnlyCategoryList;
