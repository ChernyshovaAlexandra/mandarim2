import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import API from "../../utils/API";


export default function HandleForm({ setForm, token }) {
    const [example, showExample] = useState(false)
    const [values, setValues] = useState({
        fp: "",
        doc_number: "",
        fn: "",
        date: ''
    })
    const [pending, setPending] = useState(false)
    const [errors, setErrors] = useState({
        fp: false,
        doc_number: false,
        fn: false,
        date: false
    })
    const [errorMessage, setErrorMessage] = useState(false)

    const handleChange = (e) => {
        setErrorMessage(false)
        setErrors({
            fp: false,
            doc_number: false,
            fn: false,
            date: false
        })
        let key = e.target.id;
        let value = e.target.value;


        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }
    const setError = (key, message) => {
        setErrors(values => ({
            ...values,
            [key]: message,
        }))
    }
    const sendCheck = e => {
        e.preventDefault()
        setPending(true)
        API.post('/checks', values, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(
                res => {

                    if (!res.data.success) {
                        setErrorMessage(res.data.message)
                        setPending(false)
                        setPending(false)
                    }
                }
            )
            .catch(
                error => {
                    if (error.response.data.errors) {
                        for (var key in error.response.data.errors) {
                            setError(key, error.response.data.errors[key])
                        }
                        setError(error.response.data.errors)
                        setPending(false)
                    }

                    else {
                        setErrorMessage(error.message)
                        setPending(false)
                    }
                }
            )
    }

    return (
        <>
            {example ?
                <div className="example">
                    <div className="example-top p-8">
                        <p className='text-center text-white font-bold'>Расположение данных на  чеке:</p>
                        <div className="close" onClick={() => setForm(false)}  >
                            <span></span><span></span>
                        </div>
                    </div>
                    <div className="check"> </div>
                </div> :
                <div className='box sm:pt-8 pt-16 p-8'>
                    <div className="close" onClick={() => setForm(false)}  >
                        <span></span><span></span>
                    </div>
                    <p className='text-center text-orange font-bold'>Ввести код чека вручную</p>
                    <form className="my-4 sm:p-0 px-8 " onSubmit={sendCheck}>
                        <div className="mb-4">
                            <TextField
                                className={`w-full ${errors.doc_number ? 'error-input' : ''}`}
                                id="doc_number"
                                name="doc_number"
                                label="ФД"
                                variant="outlined"
                                value={values.doc_number}
                                autoFocus={errors.doc_number}
                                onChange={handleChange}
                                required
                            />
                            {errors.doc_number ? <p className='text-center text-red mt-4'>{errors.doc_number}</p> : null}
                        </div>
                        <div className="mb-4">
                            <TextField
                                className={`w-full ${errors.fp ? 'error-input' : ''}`}
                                id="fp"
                                name="fp"
                                label="ФП"
                                variant="outlined"
                                value={values.fp}
                                autoFocus={errors.fp}
                                onChange={handleChange}
                                required
                            />
                            {errors.fp ? <p className='text-center text-red mt-4'>{errors.fp}</p> : null}

                        </div>
                        <div className="mb-4">
                            <TextField
                                className={`w-full ${errors.fn ? 'error-input' : ''}`}
                                id="fn"
                                name="fn"
                                label="ФН"
                                variant="outlined"
                                value={values.fn}
                                onChange={handleChange}
                                autoFocus={errors.fn}
                                required
                            />
                            {errors.fn ? <p className='text-center text-red mt-4'>{errors.fn}</p> : null}

                        </div>
                        <InputMask
                            id="date-input"
                            mask="99.99.2022"
                            maskChar=" "
                            className={`w-full ${errors.date ? 'error-input' : ''}`}
                            onChange={handleChange}
                            value={values.date}
                        >
                            {() => (<TextField
                                required
                                id="date"
                                name="date"
                                label="Дата покупки"
                                variant="outlined" />)}
                        </InputMask>
                        {errors.date ? <p className='text-center text-red mt-4'>{errors.date}</p> : null}

                        <button className="btn w-full sm:w-fit mx-auto mt-4" type="submit" disabled={pending}>
                            {pending ? 'Загрузка...' : 'Готово'}</button>
                        {
                            errorMessage ?
                                <p className='text-center mx-auto text-red mt-8'>{errorMessage}</p> : false
                        }
                    </form>
                    {/* <p
                        onClick={() => showExample(true)}
                        className='text-center text-orange mt-8 underline hover:no-underline cursor-pointer'>Как найти данные на чеке?</p> */}
                </div>
            }
        </>
    )
}