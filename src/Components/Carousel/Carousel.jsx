import style from './Carousel.module.scss';
import React, {useEffect, useState} from "react";
// import axios from "axios";
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import data from "../../data/data.json";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export function Carousel() {
    let [banners, setBanners] = useState(null);


    useEffect(() => {
        setBanners(data.banners);

        // axios.get('/data.json')
        //     .then(response => {
        //         setBanners(response.data.banners);
        //     })
    }, []);


    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{clickable: true}}
            scrollbar={{draggable: true}}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            className={style.Carousel}
        >
            {banners && banners.map(banner => {
                return (
                    <SwiperSlide key={banner.id}>
                            <img src={banner.img} alt="banner" className={style.carousel_img}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
