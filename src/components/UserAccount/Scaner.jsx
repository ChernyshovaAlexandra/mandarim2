import React, { useEffect, useState } from 'react';
import QrReader from "react-qr-reader";
import API from '../../utils/API';
import HandleForm from './HandleForm';



export default function Scaner({ setForm, handleEdit, handle, token }) {
    const [finish, finishScan] = useState(false)
    const [message, setMessage] = useState(false)
    const [name, setName] = useState(false)

    const wW = window.innerWidth;

    const scan = async (data) => {
        console.log(data)
        if (data) {
            finishScan(true)
            const fn = data.slice(data.indexOf("fn=") + 3, data.indexOf("&i="));
            const fp = data.slice(data.indexOf("fp=") + 3, data.indexOf("&n="));
            const doc_number = data.slice(
                data.indexOf("&i=") + 3,
                data.indexOf("&fp=")
            );
            const date = data.slice(data.indexOf("t=") + 2, data.indexOf("&s="));
            await API.post("/checks", {
                date,
                fn,
                fp,
                doc_number,
            })
                .then(
                    (response) => {
                        if (response.data.success) {
                            setMessage(response.data.message);
                            setName("Чек принят");
                        }
                        else {
                            setMessage(response.data.message);
                            setName("Чек не принят");
                        }
                    },
                    (error) => {
                        setMessage("Qr-код, который вы сканируете, не прошел валидацию");
                        setName("Чек не принят");
                    }
                );
        }
    }
    const toggle = (e) => {
        handleEdit(true)
    }
    const handleError = (error) => {
        console.log(error)
    }
    return (
        <div className="scaner box">
            {!handle ?
                <div className="close" onClick={() => setForm(false)}  >
                    <span></span><span></span>
                </div> : null}

            {!handle && wW < 1025 ?
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={scan}
                />

                : <HandleForm setForm={setForm} token={token} />
            }
            {!message && !handle && wW < 1025 ?
                <>
                    <h2 className='absolute mx-auto z-50 text-center'> Сканер qr-кодов</h2>
                    <p className='absolute w-fit mx-auto text-center text-white z-50'>Для сканирования
                        помести qr-код в&nbsp;рамку</p>
                    <button onClick={toggle} className="btn absolute mx-auto z-80">ввести вручную</button>
                </> :
                !handle && wW < 1025 ?
                    <>
                        <h2 className='absolute mx-auto z-50 text-center message'>{name}</h2>
                        <p className='absolute w-fit mx-auto text-center text-white z-50'>{message}</p>
                        <button
                            onClick={toggle}
                            className="btn absolute mx-auto z-80">ввести вручную</button>
                    </> : null}
        </div>
    )
}