import React from "react";
import './index.scss'
import ScrollAnimation from 'react-animate-on-scroll';
import Three from './Three'
import { HashLink } from 'react-router-hash-link';


export default function Mechanics({ setForm, baseUrl }) {
    return (
        <section className="mechanics py-16 lg:mt-0 -mt-40" id='mechanics'>
            <div className="container relative px-4 mx-auto">
                <div className="lg:flex mt-32 mechanics--blocks mx-auto">
                    <div className='flex flex-col items-center lg:items-start mb-8 lg:mb-0 relative z-10'>
                        <ScrollAnimation
                            animateIn="animate__fadeInLeft self-center"
                            animateOnce={true}>
                            <h2 className='mb-8 text-center lg:text-left'>условия акции:</h2></ScrollAnimation>
                        <ScrollAnimation
                            animateIn="animate__backInLeft block-w w-fit block-w-left mb-8 p-8 lg:self-end"
                            animateOnce={true}>
                            <p>C <b>20.12.2021</b> по <b>26.01.2022</b><br />совершите покупку на<br />сумму <b>от 1000 руб.</b></p>
                        </ScrollAnimation>
                        <ScrollAnimation
                            animateIn="animate__backInLeft block-w w-fit block-w-left mb-8 p-8"
                            animateOnce={true}>
                            <p>Получите карту на кассе, сотрите<br />защитный слой и получите скидку<br /><b>до 50%</b> на следующую покупку</p>
                        </ScrollAnimation>
                        <a href="https://dixy.ru/uploads/rules_mandarim.pdf" target="_blank" className='text-orange underline hover:no-underline text-center block lg:self-center'>Полные правила акции</a>
                    </div>
                    <div className='lg:-mx-20 tree mb-8 lg:mb-0 relative'>
                        <Three />
                        <div className='overflow-object'></div>
                    </div>
                    <div className='flex flex-col items-center lg:items-end relative z-10'>
                        <ScrollAnimation animateIn="animate__fadeInRight" animateOnce={true}>
                            <h2 className='mb-8 text-center lg:text-left'>условия розыгрыша:</h2>
                        </ScrollAnimation>
                        <ScrollAnimation
                            animateIn="animate__backInRight block-w w-fit block-w-right mb-8 p-8 lg:self-start"
                            animateOnce={true}>
                            <p>Cовершите покупку на сумму<br /><b>от 1000 руб. с <HashLink to={baseUrl + "/#sponsors"} replace className='underline hover:no-underline cursor-pointer'>товарами-<br />спонсорами</HashLink> в чеке</b></p>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="animate__backInRight block-w w-fit block-w-right mb-8 p-8"
                            animateOnce={true}>

                            <p><b>Регистрируйте чек</b><br />на сайте и участвуйте<br />
                                в розыгрыше призов!</p>
                        </ScrollAnimation>
                        <button className="btn self-center relative z-20" onClick={() => setForm(true)}>добавить чек</button>
                    </div>
                </div>
            </div>
        </section>
    )
}