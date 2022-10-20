import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import ChatBot from "../chat/ChatBot";
import Header from "../header/Header";
import OnlyCategoryList from "../category/OnlyCategoryList";

import {
  getMerchants,
  getProductCategories,
} from "../../redux/actions-exporter";
import CouponsList from "../couponsList";
import VendorList from "./VendorList";

import Art from "../../assets/images/art.jpg";
import "./dashboard.css";
import Pagination from "./pagination";
import OtherCategories from "./otherCategories/OtherCategories";

//icons
import { FaTheaterMasks } from "react-icons/fa";
import { MdAttractions } from "react-icons/md";
import { GiPopcorn } from "react-icons/gi";
import { MdRoomService } from "react-icons/md";
import { TbMassage } from "react-icons/tb";
import { FaUmbrellaBeach } from "react-icons/fa";
import { RiPriceTagFill } from "react-icons/ri";
import { MdToys } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";

const screenWidth = window.innerWidth;
let makeProductsPerPage = 0;
if (screenWidth > 991) {
  makeProductsPerPage = 12;
} else if (screenWidth > 767) {
  makeProductsPerPage = 8;
} else if (screenWidth > 500) {
  makeProductsPerPage = 6;
} else {
  makeProductsPerPage = 10;
}

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(makeProductsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentFilterProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const merchants = useSelector((state) => state.merchant.merchants);
  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );

  const x = useSelector((state) => state);
  console.log(x);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getMerchants());
    dispatch(getProductCategories());
  }, [dispatch]); // eslint-disable-line

  const handleFavChange = () => {
    // let temp = [{ name: "test" }];
    // dispatch({
    //   type: ADD_TO_CART,
    //   payload: temp,
    // });
  };

  useEffect(() => {
    if (categories.length) {
      const prepareProduct = categories.reduce(
        (previous, current) => [
          ...previous,
          ...current.products.map((product) => ({
            ...product,
            categoryId: current.id,
            categoryName: current.title,
          })),
        ],
        []
      );
      setProducts(prepareProduct);
      setFilterProducts(prepareProduct);
    }
  }, [categories]);

  const handleChange = (event, newValue) => {
    setCurrentPage(1);
    if (newValue === "all") {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((product) => product.categoryId === newValue)
      );
    }
  };

  const otherCategoriesArr = [
    {
      title: t("plays&performances"),
      icon: <FaTheaterMasks />,
    },
    {
      title: t("attractions&activities"),
      icon: <MdAttractions />,
    },
    {
      title: t("cinema&movies"),
      icon: <GiPopcorn />,
    },
    {
      title: t("food&treats"),
      icon: <MdRoomService />,
    },
    {
      title: t("spa&treatments"),
      icon: <TbMassage />,
    },
    {
      title: t("vacationInIsrael"),
      icon: <FaUmbrellaBeach />,
    },
    {
      title: t("benefitsToTheHouse"),
      icon: <RiPriceTagFill />,
    },
    {
      title: t("children'sCorner"),
      icon: <MdToys />,
    },
    {
      title: t("enrichment&subscriptions"),
      icon: <HiLightBulb />,
    },
  ];

  return (
    <>
      <div className="dashboard-tamplate">
        <Header />

        <div className="container">
          <div className="block-slider">
            <div className="module-heading">
              <OtherCategories slider={true} categories={otherCategoriesArr} />

              <div className="featured-product">
                <div className="module-heading">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h6 className="module-heading__title">
                        {t("featuredCategories")}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="allCategory">
                  <OnlyCategoryList
                    slider={true}
                    categories={categories}
                    divClassName="featuredProduct-box"
                    h5ClassName="featuredProduct-box__title"
                  />
                </div>
              </div>

              <div
                className="balanceBox"
                style={{
                  backgroundImage: "url(" + Art + ")",
                }}
              >
                <div className="balanceBoxInner">
                  <p className="balanceBoxTitle">{t("yourBalance")}</p>
                  <h6 className="balanceBoxprice">
                    {user?.money?.toFixed(1) || 0}₪/
                    {user?.credit?.toFixed(1) || 0} e-credit
                  </h6>
                </div>
              </div>

              <CouponsList />

              {/* <div className="row align-items-center">
                <div className="col-7">
                  <h6 className="module-heading__title">
                    {t("featuredVendors")}
                  </h6>
                </div>
                <div
                  className="col-5 text-right isLink"
                  onClick={() => {
                    navigate("/allvendors");
                  }}
                >
                  <div className="module-heading__link">{t("allvendors")}</div>
                </div>
              </div> */}
            </div>

            <VendorList isAllVendors={false} storesText={"stores"} />

            {/* <ScrollingCarousel>
              <ul className="categoryList">
                {merchants.length > 0
                  ? merchants.map((item) => (
                      <>
                        <li
                          onClick={() => {
                            navigate(`/vendor/${item.id}`, {
                              state: { id: item.id },
                            });
                          }}
                          className="categoryList__block isLink"
                        >
                          <div className="category-box text-center">
                            <div className="category-box__img">
                              <img
                                src={item.image}
                                className="img-fluid"
                                alt="My Awesome"
                              />
                            </div>
                            <h6 className="category-box__title">
                              {item.title}
                            </h6>
                          </div>
                        </li>
                      </>
                    ))
                  : t("No merchants")}
              </ul>
            </ScrollingCarousel> */}
          </div>
          {/*<ScrollingCarousel>*/}
          <Tabs
            defaultSelectedIndex={0}
            className="categoriesSliderTabs"
            onChange={handleChange}
          >
            <Tab value="all" label={t("all")}>
              All
            </Tab>
            {categories.length > 0 &&
              categories.map((category) => (
                <Tab value={category.id} label={category.title}>
                  {category.title}
                </Tab>
              ))}
          </Tabs>
          {/*</ScrollingCarousel>*/}

          <div className="product-block">
            <ul className="product-Module">
              {filterProducts.length > 0
                ? currentFilterProducts.map((product) => (
                  <>
                    <li
                      className="product-Module__list isLink"
                      onClick={() => {
                        // if (product.imagename === "booking") {
                        //   navigate("/company", {
                        //     state: { isBookingApp: true },
                        //   });
                        // } else {
                        navigate(`/product/${product.id}`, {
                          state: { id: product.id },
                        });
                        // }
                      }}
                    >
                      <div className="product-box">
                        <div
                          className="product-box__img"
                          style={{ backgroundImage: `url(${product.image})` }}
                        >
                          <div className="product-box__likeBtn">
                            <FavoriteBorderOutlinedIcon
                              onClick={() => handleFavChange()}
                            />
                          </div>
                          {product?.discount && (
                            <div className="product-box__discount">
                              <span className="product-box__off">
                                {product.discountType ? "" : "-"}
                                {product.discount}
                                {product.discountType}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="product-box__info">
                          <div className="product-box__infoTop">
                            <h6 className="product-box__brand">
                              {product.title}
                            </h6>
                            <span className="product-box__price">
                              {product?.oldPrice && (
                                <>
                                  <s>{product.oldPrice}₪</s>&nbsp;
                                </>
                              )}
                              {product?.price || 0}₪
                              {product?.credit && (
                                <>
                                  {" "}
                                  + <br></br> {product.credit} e-credits
                                </>
                              )}
                            </span>
                          </div>
                          {/*<h5 className="product-box__name">*/}
                          {/*  3 {t("boxSimple")}{" "}*/}
                          {/*</h5>*/}
                        </div>
                      </div>
                    </li>
                  </>
                ))
                : t("No products")}
            </ul>
            {/* <ChatBot /> */}
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filterProducts.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </>
  );
}
