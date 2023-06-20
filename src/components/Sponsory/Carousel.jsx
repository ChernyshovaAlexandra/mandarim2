import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ items }) {
    const [nav1, setSlider1] = useState(null)
    const [nav2, setSlider2] = useState(null)
    let slider1, slider2;
    useEffect(() => {
        setSlider1(slider1)
        setSlider2(slider2)
    }, [])
    return (
        <div className="carousel">
            <Slider
                asNavFor={nav2}
                ref={slider => (slider1 = slider)}
            >
                {items.map(
                    (itm, id) => (
                        <div className="product-img p-8" key={id}>
                            <img className='mx-auto' src={itm.img} alt="" key={id} />
                        </div>
                    )
                )}
            </Slider>
            <Slider
                asNavFor={nav1}
                ref={slider => (slider2 = slider)}
                slidesToShow={1}
                swipeToSlide={true}
                focusOnSelect={true}
                arrows={false}
            >
                {items.map(
                    (itm, id) => (
                        <h5 key={id} className='px-2'>{items.length > 1 ? itm.name + ' в асс.' : itm.name}</h5>
                    )
                )}
            </Slider>
        </div>
    )
}
