import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/swiper.min.css";

import noImage from "../../assets/images/noimage.png";

function OnlyCategoryList({ divClassName, h5ClassName, categories, slider, slidesPerView }) {
  console.log(slidesPerView);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {categories.length ? (
        slider ? (
          <Swiper
            freeMode={true}
            // slidesPerView={"auto"}
            slidesPerView={slidesPerView}
            style={{ width: "auto" }}
            autoplay={{
              // delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              stopOnLastSlide: true,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[ Autoplay, Pagination ]}
            breakpoints={{
              // when window width is >= 600px
              600: {
                  slidesPerView: 3,
              },
              // when window width is >= 900px
              900: {
                  slidesPerView: 4,
              },
            }}
            spaceBetween={10}
          // style={{ direction: "ltr" }}
          >
            {categories
              .filter((category) => !category.parent)
              .map((category, index) => {
                let delay = 0
                if (index === 0) {
                  delay=3000
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
