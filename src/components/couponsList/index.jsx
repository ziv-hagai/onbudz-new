import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCoupons } from '../../redux/actions-exporter'
import Coupon from './_components/_coupon'
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

const CouponsList = () => {
    const dispatch = useDispatch()
    const coupons = useSelector(state => state.coupon.coupons)
    const couponsPending = useSelector(state => state.coupon.isCouponsPending)

    useEffect(() => {
        dispatch(getCoupons())
    }, [dispatch])

    if (couponsPending) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />

    return (
        <div className='caseback-center'>
            <ScrollingCarousel>
                {coupons?.map(coupon => <Coupon
                    title={coupon.title}
                    subTitle={coupon.couponCode}
                    discountValue={coupon.discountValue}
                    discountType={coupon.discountType}
                    key={coupon.id}
                />)}
            </ScrollingCarousel>
        </div>

    )
}

export default CouponsList