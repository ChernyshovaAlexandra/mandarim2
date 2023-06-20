import React from "react";
import './index.scss';
import coup from '../../assets/img/coupons.png'
import tiger from '../../assets/img/tiger.png'
import gsap from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TimelineMax } from "gsap/gsap-core";


export default function Main() {
    return (
        <section className="main pb-16 pt-40">
            <div className="container mx-auto px-4 ">
                <div className="lg:flex">
                    <div className="left-block lg:flex-1 relative">
                        <div className="w-full header animate__animated animate__bounceInDown"></div>
                        <div className="mt-8 coupons ">
                            <img src={coup} alt="" className='lg:mx-0 mx-auto'/>
                        </div>
                    </div>
                    <div className="right-block lg:flex-1 tiger relative">
                        <img src={tiger} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}