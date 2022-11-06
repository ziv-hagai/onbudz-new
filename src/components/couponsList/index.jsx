import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';

import { getCoupons } from '../../redux/actions-exporter'
import Coupon from './_components/_coupon'

const CouponsList = ({ couponsSlidesPerView }) => {
    const dispatch = useDispatch()
    const coupons = useSelector(state => state.coupon.coupons)
    const couponsPending = useSelector(state => state.coupon.isCouponsPending)
    const { t } = useTranslation();
    // console.log(slidesPerView);
    useEffect(() => {
        dispatch(getCoupons())
    }, [dispatch])

    if (couponsPending) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
    return (
        <div className='caseback-center'>
            <Swiper

                modules={[Navigation]}
                freeMode={true}
                slidesPerView={couponsSlidesPerView}
                style={{
                    width: "auto", "--swiper-navigation-size": "25px"
                }}
                navigation
                // breakpoints={{
                //     // when window width is >= 600px
                //     600: {
                //         slidesPerView: 2,
                //     },
                //     // when window width is >= 900px
                //     900: {
                //         slidesPerView: 3,
                //     },
                // }}
                // slidesPerView={"auto"}
                spaceBetween={10}
            // style={{ direction: "ltr" }}
            >
                {coupons
                    .map((coupon, index) => {
                        return (
                            <SwiperSlide
                                key={index}
                                style={{ width: "auto" }}
                            >
                                <Coupon
                                    title={t(coupon.title)}
                                    subTitle={coupon.couponCode}
                                    discountValue={coupon.discountValue}
                                    discountType={coupon.discountType}
                                // key={coupon.id}x
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>

    )
}

export default CouponsList