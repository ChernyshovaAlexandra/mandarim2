import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { REGION_LIST } from './REGION_LIST.js'
import { useForm, Controller } from 'react-hook-form'
import API from "../../utils/API.js";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { parse, isDate } from "date-fns";





const schema = yup.object().shape({
    first_name: yup.string()
        .required('Обязательно')
        .min(3, 'Минимум 3 символа')
        .max(30, 'Максимум 30 символов')
        .matches(/[А-ЯЁA-Z]{2,15}/i, 'Только буквы и пробел'),
    agree: yup.bool().oneOf([true], 'Обязательно'),

});


export default function UserForm({ userData, setForm, editUser, updateUser, token }) {
    const [values, setValues] = useState({
        first_name: userData.first_name ? userData.first_name : "",
        last_name: userData.last_name ? userData.last_name : '',
        email: userData.email ? userData.email : "",
        region: userData.region ? REGION_LIST.filter(item => item.city === userData.region) : "",
        agree: "",
        birthday: userData.date ? userData.date : ""
    })

    const [pending, setPending] = useState(false)

    const [message, setMessage] = useState(false)
    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }


    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const updateUserData = (formData) => {
        setPending(true)
        API.post('/profile/update', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(
                res => {
                    if (!res.data.success) {
                        setMessage(res.data.message)
                        setPending(false)
                    }
                    else {
                        updateUser()
                        editUser(false)
                        setPending(false)

                    }
                }
            )
            .catch(
                error => {
                    setMessage(error.message)
                    setPending(false)

                }
            )
    }

    const onSubmit = async data => {
        let formData = new FormData();
        formData.append('first_name', data.first_name)
        data.last_name ? formData.append('last_name', data.last_name) : null
        data.email ? formData.append('email', data.email) : null
        data.region ? formData.append('region', data.region) : null
        data.birthday ? formData.append('birthday', data.birthday) : null
        updateUserData(formData)
    };

    return (
        <div className="box mx-auto p-10 sm:p-8 pt-16 sm:pt-8 ubuntu text-black registration
       ">
            <div className="close"
                onClick={() => setForm(false)}
            >
                <span></span><span></span>
            </div>
            <div className="row justify-content-center">
                <header >
                    <div className="row justify-content-center">
                        <div className="col-lg-auto">
                            <h2 className='text-violet text-5xl mb-4'>
                                регистрация
                            </h2>
                            <p className='text-violet'>Принять участие в розыгрыше могут только лица, достигшие 18 лет</p>
                        </div>
                    </div>

                </header>
                <form
                    className='mt-8'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="w-full">
                            <TextField
                                className="w-full"
                                id="first_name"
                                name="first_name"
                                label="Имя"
                                variant="outlined"
                                error={errors.first_name}
                                value={values.first_name}
                                helperText={errors.first_name && errors.first_name.message}
                                {...register("first_name")}
                                onChange={handleChange}
                            />

                        </div>
                        <div className="w-full">
                            <TextField
                                className="w-full"
                                id="last_name"
                                name="last_name"
                                label="Фамилия"
                                variant="outlined"
                                error={errors.last_name}
                                value={values.last_name}
                                helperText={errors.last_name && errors.last_name.message}
                                {...register("last_name")}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="w-full">
                            <TextField
                                className='cursor-pointer'
                                id="birthday"
                                variant="outlined"
                                label="Дата рождения"
                                type="date"
                                // value={values.birthday}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={errors.birthday}
                                helperText={errors.birthday && errors.birthday.message}
                                {...register("birthday")}
                                onChange={handleChange}

                            />
                        </div>
                        <div className="w-full">
                            <TextField
                                label="E-mail"
                                id="email"
                                value={values.email}
                                variant="outlined"
                                error={errors.email}
                                helperText={errors.email && errors.email.message}
                                {...register("email")}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-age-native-simple">
                                    Выберите регион
                                </InputLabel>
                                <Controller
                                    name="region"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <Select
                                            labelId="demo-customized-select-label"
                                            value={value}
                                            onChange={onChange}
                                            label="Выберите регион"
                                            inputProps={{
                                                name: "Выберите регион",
                                                id: "outlined-age-native-simple",
                                            }}
                                        >
                                            {REGION_LIST.map((item, index) => (
                                                <MenuItem value={item.city} key={index}>{item.city}</MenuItem>
                                            ))}
                                        </Select>)
                                    }
                                />

                            </FormControl>
                            <div className='text-red ml-3'>{errors.region && errors.region.message}</div>
                        </div>

                        <div className="w-full">
                            <FormControlLabel
                                className='w-full check-box mx-auto'
                                style={{ color: '#520084' }}
                                control={<Checkbox />}
                                id="agree"
                                {...register("agree")}
                                label={<p>Я согласен(-на) с <a className='underline hover:no-underline' href='https://dixy.ru/politika-obrabotki-i-zashity.pdf' target='_blank'>условиями обработки персональных данных</a></p>}
                            />
                            <p className='text-red'>{errors.agree && errors.agree.message}</p>
                        </div>
                    </div>

                    <div className="mx-auto" style={{ width: 'fit-content', display: 'grid' }}>
                        <button className='btn grid mt-8 py-4 px-8' type='submit' disabled={pending}>
                            <span>{pending ? 'Загрузка..' : 'сохранить'}</span>
                        </button>

                    </div>
                </form>
                {
                    message ?
                        <p className='text-center mx-auto text-red mt-8'>{message}</p> : false
                }
            </div>
        </div>
    )

}