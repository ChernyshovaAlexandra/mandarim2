import './index.scss';
import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { Link } from 'react-router-dom';

export default function Sponsory({ main, baseUrl, products, sponsoryPageProducts, start, end, regions }) {

    const [region, setRegion] = useState('Москва')

    const [lengthP, setLength] = useState(16)


    const onChange = (e) => {
        setRegion(e.target.value)
        setLength(16)
    }
    const setNewLength = () => {
        if (length < sponsoryPageProducts[region].length) {
            setLength(length => length += 16)
        }
    }

    return (
        <section className={`sponsory py-16 relative ${main ? 'pt-40 main-sp' : ''}`} id='sponsors'>
            <div className="container mx-auto px-4 relative">

                {main ?
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <div className="left-col flex-auto">
                            <h2 className=''>товары-спонсоры</h2>
                            {start && end ? <p className='mt-4 ubuntu font-bold text-orange'>С {start} по {end}</p> : ''}
                            <p className='mt-4 ubuntu font-bold text-orange'>Добавьте в чек от 1000 рублей любой товар-спонсор!</p>
                        </div>
                        <div className="right-col flex-auto mt-8 sm:mt-0">
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-age-native-simple">
                                    Выберите регион
                                </InputLabel>
                                <Select
                                    labelId="demo-customized-select-label"
                                    value={region}
                                    onChange={onChange}
                                    label="Выберите регион"
                                    inputProps={{
                                        name: "Выберите регион",
                                        id: "outlined-age-native-simple",
                                    }}
                                >
                                    {regions.length ? regions.map((item, index) => (
                                        <MenuItem value={item} key={index}>{item}</MenuItem>
                                    )) : <MenuItem value={region} >{region}</MenuItem>}
                                </Select>
                            </FormControl>
                        </div>
                    </div> :
                    <>
                        <h2 className='text-center'>товары-спонсоры</h2>
                        {start && end ? <p className='mt-4 ubuntu font-bold text-center text-orange'>С {start} по {end}</p> : ''}
                        <p className='mt-4 ubuntu font-bold text-center text-orange'>Добавьте в чек от 1000 рублей любой товар-спонсор!</p>
                    </>
                }

                {main ?

                    <>
                        <div className="products grid grid-cols-5 mt-8">
                            {sponsoryPageProducts ? sponsoryPageProducts[region].slice(0, lengthP).map(
                                (item, id) => (
                                    <div className="product" key={id}>
                                        <Carousel items={item} />
                                    </div>
                                )
                            ) : null}
                        </div>
                        {sponsoryPageProducts && lengthP < sponsoryPageProducts[region].length ?
                            <button
                                onClick={setNewLength}
                                className="btn mx-auto mt-16 block w-fit">загрузить еще</button> : null}
                    </>
                    :
                    <>
                        <div className="products grid grid-cols-5 mt-8">
                            {products.map(
                                (item, id) => (
                                    <div className="product" key={id}>
                                        <Carousel items={item} />
                                    </div>
                                )
                            )}
                        </div>
                        <Link to={baseUrl + "/sponsory"} replace className="btn mx-auto mt-16 block w-fit relative z-20">смотреть все</Link>
                    </>
                }
            </div>
        </section>

    )
}