import React, { useState } from "react";
import './index.scss'
import Logo from '../../assets/img/logo.png'
import Logo2 from '../../assets/img/logo2.png'
import Logo3 from '../../assets/img/logo3.png'
import lk from '../../assets/img/lk.png'
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';


export default function Nav({ setForm, baseUrl, products, sponsoryPageProducts }) {

    const [mobMenu, openMobMenu] = useState(false)
    const [active, setActive] = useState(1)

    const openLink = (link, top) => {
        setActive(link)
        mobMenu ? openMobMenu(false) : '';
        top ? window.scrollTo(0,0) : null
    }
    return (
        <nav className='fixed z-30 w-full nav'>
            <div className="container mx-auto">
                <div className="menu p-4 flex w-full justify-between">
                    <div className={`burger block relative lg:hidden rounded-full bg-white bg-opacity-20 h-16 w-16 p-4 z-30 ${mobMenu ? 'opened' : ''}`}
                        onClick={() => openMobMenu(!mobMenu)}
                    >
                        <span className='bg-white absolute'></span>
                        <span className='bg-white absolute'></span>
                        <span className='bg-white absolute'></span>
                    </div>
                    <a href="https://dixy.ru/" target="_blank" className="logo -mt-4 relative z-30 animate__animated animate__bounceInDown animate__delay-2s">
                        <img
                            srcSet={`${Logo} 320w,
                                ${Logo2} 480w,
                                ${Logo3} 800w`}
                            sizes="(max-width: 320px) 320px,
                                (max-width: 480px) 350px,
                                400px"

                            alt="" />
                    </a>
                    <div className={`navigation lg:block ${mobMenu ? 'block opened' : 'hidden'} animate__animated animate__fadeInRight animate__delay-1s`}>
                        <ul className='lg:flex text-white junegull items-center'>
                            <li><button onClick={() => setForm(true)} className='p-6 bordered'>Добавить чек</button></li>
                            <li
                                onClick={() => openLink(1)}
                            ><Link to={baseUrl + "/"} replace className={`p-6 bordered ${active === 1 ? 'active' : ''}`}>Главная</Link></li>
                            <li
                                onClick={() => openLink(2)}
                            ><HashLink to={baseUrl + '/#mechanics'} replace className={`p-6 bordered ${active === 2 ? 'active' : ''}`}>Условия акции</HashLink></li>
                            <li
                                onClick={() => openLink(3)}
                            ><HashLink to={baseUrl + "/#prizes"} replace className={`p-6 bordered ${active === 3 ? 'active' : ''}`}>Призы</HashLink></li>
                            {sponsoryPageProducts ? 
                            <li onClick={() => openLink(4, 'top')} >
                                <Link to={baseUrl + "/sponsory"} replace className={`p-6 bordered ${active === 4 ? 'active' : ''}`}>Товары-спонсоры</Link>
                            </li> : null}

                            <li className='lg:block hidden'>
                                <div className="account block relative lg:display-none rounded-full bg-white bg-opacity-20 h-16 w-16 p-4 cursor-pointer"
                                    onClick={() => setForm(true)}
                                >
                                    <img src={lk} alt="" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="account block relative lg:hidden rounded-full bg-white bg-opacity-20 h-16 w-16 p-4"
                        onClick={() => setForm(true)}
                    >
                        <img src={lk} alt="" />
                    </div>
                </div>
            </div>
        </nav >
    )
}