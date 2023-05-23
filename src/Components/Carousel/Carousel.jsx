import style from './Carousel.module.scss';
import React, {useEffect, useState} from "react";
import axios from "axios";
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

export function Carousel() {
    let [banners, setBanners] = useState( null);


    useEffect(() => {
        axios.get('/data.json')
            .then(response => {
                setBanners(response.data.banners);
            })
    }, []);


    return (
        <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={3000}
            className={style.Carousel}
        >
            {
                banners && banners.map(banner => {
                    return <div data-src={banner.img} key={banner.id}/>
                })
            }
        </AutoplaySlider>
    )
}
