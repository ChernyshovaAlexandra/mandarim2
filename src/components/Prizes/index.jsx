import React from "react";
import './index.scss'
import imgSum from '../../assets/img/prize-sum.png'
import mand from '../../assets/img/prizes-m-main.png'
import b1 from '../../assets/img/ball-iphone.png'
import b2 from '../../assets/img/ball-hudi.png'
import b3 from '../../assets/img/ball-bag.png'
import b4 from '../../assets/img/ball-cup.png'
import b5 from '../../assets/img/ball-cup-2.png'
import snow from '../../assets/img/ball-snow.png'
import ScrollAnimation from 'react-animate-on-scroll';
// animate__bounceInDown

export default function Prizes() {
    let wW = window.innerWidth
    return (
        <section className="prizes -mb-16" id="prizes">
            <div className="container mx-auto px-4 relative">
                <div className="prizes__content lg:flex pt-8">
                    <div className="prizes__content--block flex flex-col items-center">
                        <h2 className='mb-4 self-start tex-center lg:text-left'>Призы</h2>
                        <div className="sum w-fit mb-8 relative " >
                            <p className='text-center text-orange uppercase font-bold ubuntu'>Главный приз - </p>
                            <ScrollAnimation animateIn="animate__tada" animateOnce={true}>  <img src={imgSum} alt="" /></ScrollAnimation>
                        </div>
                        <div className="mand">
                            <img src={mand} alt="" />

                        </div>
                    </div>
                    <div className="prizes__content--block balls -mt-8 relative">
                        <div className="first-line lg:-mb-28 lg:ml-48 lg:flex-row flex-col flex mx-auto lg:mr-0 relative">

                            <div className="ball -mt-8 self-start ">
                                <ScrollAnimation animateIn=" bounceInDown1" animateOnce={true}> <img src={b1} alt="" /></ScrollAnimation>
                            </div>
                            <div className="ball self-end -mt-28 lg:-mt-0">
                            <ScrollAnimation animateIn="animate__bounceInDown" animateOnce={true}> <img src={b2} alt="" /></ScrollAnimation>
                            </div>
                        </div>
                        <div className="second-line lg:flex-row flex-col flex mx-auto lg:mx-0 -mt-8 lg:-mt-0">
                            <div className="ball -mt-8 self-start relative lg:ml-6">
                                <ScrollAnimation animateIn="bounceInDown2" animateOnce={true}>   <img src={b3} alt="" /></ScrollAnimation>
                            </div>
                            <div className="ball self-end -mt-28 lg:ml-10 lg:-mt-0 relative">
                                <ScrollAnimation animateIn="bounceInDown3" animateOnce={true}> <img src={b4} alt="" /></ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}