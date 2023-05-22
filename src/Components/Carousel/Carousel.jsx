import style from './Carousel.module.scss';
import React, {useEffect, useState} from "react"
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
// import axios from "axios";

export function Carousel() {
    let [banners, setBanners] = useState(
        [
        {id: '01', img: '/static/media/banner_1.739f21fead5e2890c673.png'},
        {id: '02', img: '/static/media/banner_2.5082cb025c11c98fac45.png'},
        {id: '03', img: '/static/media/banner_3.155c7e618d7b35225ac6.png'},
        {id: '04', img: '/static/media/banner_4.dd15477a9d8242ad5882.png'},
        {id: '05', img: '/static/media/banner_5.2aa4e0b559dd76bbae8c.png'},
        {id: '06', img: '/static/media/banner_5.2aa4e0b559dd76bbae8c.png'}
    ]
    );


    // useEffect(() => {
    //     axios.get('/data.json')
    //         .then(response => {
    //             setBanners(response.data.banners);
    //             console.log(response.data.banners);
    //         })
    // }, []);


    const [sliderRef] = useKeenSlider(
        {
            loop: true,
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false

                function clearNextTimeout() {
                    clearTimeout(timeout)
                }

                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 2000)
                }

                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )


    return (
        <>
            <div ref={sliderRef} className={`keen-slider ${style.Carousel}`}>
                {
                    banners && banners.map((banner, i) => {
                        return (
                            <div className={`keen-slider__slide number-slide${i + 1} ${style.carousel_item}`} key={banner && banner.id}>
                                <img src={banner && banner.img} alt="toys banner" className={style.carousel_img}/>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}
