import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/Header";
import {
  getProductCategory,
  getProductsByCategoryId,
} from "../../redux/API/productCategories/productCategories.action";

export default function CategoryProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location?.state;
  const category = useSelector(
    (state) => state.productCategories.productCategory
  );
  const products = useSelector(
    (state) => state.productCategories.productsCategory
  );
  const isProductsCategoryPending = useSelector(
    (state) => state.productCategories.isProductsCategoryPending
  );

  useEffect(() => {
    dispatch(getProductCategory(id));
    dispatch(getProductsByCategoryId(id));
  }, [id]); //eslint-disable-line

  return (
    <div>
      <Header />
      <div className="pageTemplate">
        <div className="container">
          <div
            className="PageBgHeading"
            style={
              category?.image
                ? { backgroundImage: `url(${category.image})` }
                : {}
            }
          >
            <h5 className="PageBgHeading-title">{category?.title}</h5>
          </div>
          {!isProductsCategoryPending ? (
            <ul className="product-Module">
              {products.length > 0
                ? products.map((product) => {
                    return (
                      <>
                        <li
                          className="product-Module__list isLink"
                          onClick={() => {
                            // if (catItem.imagename === "booking") {
                            //   navigate("/company", {
                            //     state: { isBookingApp: true },
                            //   });
                            // }
                            // if (
                            //   location.state.featureCategory.name === t("gifts")
                            // ) {
                            //   navigate("/gift", {
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
                              style={{
                                backgroundImage: `url(${product.image})`,
                              }}
                            ></div>
                            <div className="product-box__info">
                              <div className="product-box__infoTop">
                                <h6 className="product-box__brand">
                                  {product.title}
                                </h6>
                                <span className="product-box__price">
                                  {product?.price || 0}₪
                                </span>
                              </div>
                              <h5 className="product-box__name">
                                {/* 3 {t("boxSimple")} */}
                              </h5>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })
                : t("No products")}
            </ul>
          ) : (
            t("Loading...")
          )}
        </div>
      </div>
    </div>
  );
}
