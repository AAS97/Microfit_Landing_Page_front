import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';

import './carousel.css'

import process from '../assets/image/process.png'

class CustomSlider extends Component {
    render() {
        const settings = {
            autoplay: true,
            adaptiveHeight: true,
            autoplaySpeed: 60000,
            centerPadding: 60,
            dots: true,
            gutter: 10
        };
        return (
            <div>
                <Slider {...settings} >
                    <div className="description">
                        <h1>RETROUVEZ LE CONTRÔLE DE VOTRE MICROBIOTE INTESTINAL</h1>
                        <p>Notre équipe d'experts analyse votre microbiote et vous recommande des probiotiques personnalisés</p>
                    </div>
                    <div className="process">
                        <img src={process} alt="Notre procédé"></img>
                    </div>


                </Slider>
            </div >
        );
    }
}

export default CustomSlider;