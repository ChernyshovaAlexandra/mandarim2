import React, { useState } from "react";
import InputMask from "react-input-mask";
import API from "../../utils/API";
import Countdown from 'react-countdown';



export default function LoginForm({ setToken, setForm,updateUser }) {
    const [timer, setTimer] = useState(false)
    const [codeSent, setCodeSent] = useState(false)
    const [code, setCode] = useState('')
    const [phoneNumber, setPhone] = useState()
    const [error, setErrorMessage] = useState()
    const [pending, setPending] = useState(false)


    const renderer = ({ seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        }

        else {
            return (
                <div className="formCodeAgain" >
                    {timer === 'ended' ?
                        <div className='mt-4 mx-auto text-center'>Код отправлен повторно</div> :
                        <div className='mt-4 mx-auto text-center'>
                            Повторная отправка возможна через&#160;
                            <span className="text-violet">{seconds}</span>&#160;сек
                        </div>
                    }
                </div >)


        }
    };
    const Completionist = () => (
        <a className="underline hover:no-underline text-violet  text-center mt-4 mx-auto block"
            onClick={() => stopTimer()}
        >Отправить повторно</a>
    );
    const startTimer = (e) => {
        setTimer(true)
    }

    // Код отправлен повторно
    const stopTimer = () => {
        setTimer('ended')
        getCode()
    }
    const setCorrectCode = e => {
        setErrorMessage(false)
        setCode(e.target.value)
    }
    const getCode = (e) => {
        setCodeSent(true)
        setPending(true)
        error ? setErrorMessage(false) : null;
        API.post('/login_sms', {
            phone: phoneNumber
        }).then(res => {
            setCodeSent(false)
            const { success } = res.data
            setPending(false)
            if (success) {
                startTimer()
            }
            else if (res.data.message) {
                setErrorMessage(res.data.message)
            }
        })
            .catch(error => {
                setPending(false)
                setCodeSent('error')
                setTimeout(() => {
                    setCodeSent(false)
                }, 1500)
                error.message && setErrorMessage(error.message)
            })
    }
    const login = async () => {
        setTimer('ended')
        setPending(true)

        await API.post('/sms', {
            phone: phoneNumber,
            confirm_code: code
        })
            .then(res => {
                setPending(false)
                const { success, token } = res.data
                if (success) {
                    setToken(token)
                    window.localStorage.setItem('mandarim2021-token', token)
                    updateUser(token)
                }
                if (res.data.message) {
                    setErrorMessage(res.data.message)
                }
            })
            .catch(() => {
                setPending(false)
            })
    }
    const setCorrectPhone = (e) => {
        setErrorMessage(false)
        let cur = e.target.value
        cur = cur.replaceAll(/\s/g, '').replaceAll(/[{()}]/g, '').replaceAll('+', '')
        setPhone(cur)
        setCode('')
    }

    return (
        <div className="box mx-auto p-10 sm:p-8 pt-16 sm:pt-8">
            <div className="close"
                onClick={() => setForm(false)}
            >
                <span></span><span></span>
            </div>
            <div className="row">
                <h4 className='mb-4'>Регистрация/Вход</h4>
                <p>{!timer ?
                    'Введи номер телефона и мы отправим код для регистрации участия в розыгрыше' : 'Введи код из смс:'}
                </p>

                <form
                    autoComplete="off"
                    className='mt-4'
                    onSubmit={
                        (e) => {
                            e.preventDefault();
                            !code ? getCode(e) : login(e)
                        }
                    }
                >
                    {error ? <p className="text-xxs text-red text-center mb-4">{error}</p> : ''}
                    {/* {codeSent === true ? <p className='codeSent text-xs text-center mb-4 text-green'>Код отправлен ✅</p> : codeSent === 'error' ?
                        <p className='codeSent text-xs text-center mt-4 text-red'>Не удалось отправить</p> :
                        false} */}
                    <InputMask
                        alwaysShowMask={false}
                        className={`w-full ${error ? 'error' : ''}`}
                        placeholder={timer ? '4-значный код' : 'Введи номер телефона'}
                        mask={!timer ? "+7 (999) 999 99 99" : '9999'}
                        required
                        autofill='false'
                        id="user_phone"
                        value={timer ? code : phoneNumber}
                        onChange={(e) => { timer ? setCorrectCode(e) : setCorrectPhone(e) }}
                        maskChar="" />

                    {timer && timer !== 'ended' ?
                        <Countdown date={Date.now() + 590000} intervalDelay={1000} precision={.3} renderer={renderer}>
                            <Completionist />
                        </Countdown> : null}
                    <button
                        className='btn grid py-4 px-8 w-fit mx-auto mt-8'
                        disabled={pending}
                        type='submit'>
                        <span>{
                            pending ? 'Загрузка...' :
                            timer ? 'Подтвердить' : 'отправить код'
                        }</span>
                    </button>
                </form>
            </div>
        </div>
    )
}