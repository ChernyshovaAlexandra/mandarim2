import React, { useEffect, useState } from "react";
import './index.scss'
import Slider from "react-slick";



export default function Winners({ users }) {
    const [date, setDate] = useState(0)
    const [tabs, setTabs] = useState([])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 2,
        rows: 7,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "4rem"
                }
            }
        ]
    };
    const setCurDate = (cur) => {
        setDate(cur)
    }

    useEffect(() => {
        let allTabs = []
        for (let key in users) {
            allTabs.push(key)
        }
        setTabs(allTabs)
        setDate(allTabs[0])
    }, [])


    return (
        <section className="winners py-16 relative">
            <div className="container mx-auto sm:px-4 relative">

                <div className="winners--inner mx-auto mt-8 p-16 sm:p-28 relative">
                    <div className="boxes boxes-1"></div>
                    <div className="boxes boxes-2"></div>
                    <h2 className='text-white text-center'>Победители</h2>
                    <div className="winners--inner__content">
                        <div className="tabs mt-8 mb-12 mx-auto flex flex-col lg:flex-row items-center justify-center	gap-4 flex-wrap">
                            {
                                tabs.map(
                                    (dateCur, id) => (
                                        <button
                                            className={`tab btn ${date === dateCur ? 'active' : ''}`}
                                            key={id}
                                            onClick={() => setCurDate(dateCur)}
                                        >{dateCur}</button>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <Slider {...settings}>
                        {users[date] ? users[date].map(
                            (winner, id) => (
                                <div className="winner ubuntu text-white mb-4" key={id}>
                                    <p className='font-bold inline'>{winner.name}</p> <span>{winner.phone}</span>
                                </div>
                            )
                        ) : null}
                    </Slider>
                </div>

            </div>
        </section>
    )
}