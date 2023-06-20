import React from "react";
import phone from '../../assets/img/phone.png'
import qr from '../../assets/img/qr.png'
import gp from '../../assets/img/google_play.png'
import as from '../../assets/img/appstore.png'
import './index.scss';



export default function Application() {
    return (
        <section className="application py-16 ">
            <div className="container mx-auto lg:px-4 ">
                <div className="application__inner mx-auto sm:p-8 lg:p-16 relative">
                    <div className="application__inner-block lg:px-10 lg:mt-0 mt-8">
                        <h2 className="text-white mb-4 lg:mt-0 mt-28">Скачивайте наше приложение и выигрывайте ещё больше призов</h2>
                    </div>
                    <div className="application__inner-block phone lg:mt-0 mt-8">
                        <img src={phone} alt="" />
                    </div>
                    <div className="application__inner-block qr mt-8">
                        <div className="flex lg:px-10 gap-8 application-download relative z-20">
                            <div className="flex-1 lg:block hidden">
                                <img src={qr} alt="" />
                            </div>
                            <div className="flex-1 lg:block flex w-fit justify-center lg:w-auto">
                                <a href="https://play.google.com/store/apps/details?id=com.ru.dixy" target="_blank"  className='lg:mb-4 w-fit block lg:mr-0 mr-4'>
                                    <img className="h-12 lg:h-auto w-auto"
                                        src={gp} alt="" />
                                </a>
                                <a href="https://itunes.apple.com/ru/app/id1411447398?mt=8" target="_blank" className='lg:mb-4 w-fit block'>
                                    <img className="h-12 lg:h-auto w-auto"
                                        src={as} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}