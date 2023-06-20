import React, { useEffect, useState } from "react";
import './index.scss';
import LoginForm from "./LoginForm";
import UserForm from './UserForm';
import Account from './Account';
import Scaner from "./Scaner";


export default function UserAccount({ setForm, token, setToken, userData, checks, updateUser, serverError }) {
    const [edit, editUser] = useState(false)
    const [log, exit] = useState(false)
    const [scaner, setScan] = useState(false)
    const [handle, handleEdit] = useState(false)
    const logout = () => {
        setForm(false)
        window.localStorage.clear()
        setToken(null)
    }
    useEffect(() => {
        updateUser()
    }, [])
    return (
        <section className='userAccount'>
            <div className="container mx-auto">
                {scaner ?
                    <Scaner
                        setForm={setForm}
                        handleEdit={handleEdit}
                        handle={handle}
                        token={token}
                        setScan={setScan}
                    /> :
                    <>
                        {token ?
                            <>
                                {userData ?
                                    userData.first_name && !edit ?
                                        <Account
                                            setForm={setForm}
                                            exit={exit}
                                            userData={userData}
                                            checks={checks}
                                            editUser={editUser}
                                            setScan={setScan}
                                            logout={logout}
                                            token={token} /> :
                                        <UserForm token={token} userData={userData} setForm={setForm} editUser={editUser} updateUser={updateUser} />
                                    : serverError ?
                                        <>
                                            <div className="box mx-auto p-10 sm:p-8 pt-16 sm:pt-8 ubuntu text-black registration ubuntu">
                                                <div className="close" onClick={() => setForm(false)}  >
                                                    <span></span><span></span>
                                                </div>
                                                <p className="mx-auto text-center">
                                                    Временно недоступно, попробуйте позже. <br />
                                                    Приносим свои извинения за доставленные неудобства.
                                                </p>
                                            </div>
                                        </> : null}
                            </>

                            :


                            <LoginForm setForm={setForm} setToken={setToken} token={token} updateUser={updateUser} />}
                    </>
                }
            </div>
        </section>
    )
}