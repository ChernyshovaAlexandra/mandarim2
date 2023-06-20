import React, { useEffect, useState } from "react";

import { Hoc } from "./Hoc";
import Nav from './components/Nav'
import Main from "./components/Main";
import UserAccount from "./components/UserAccount";
import Mechanics from "./components/Mechanics";
import Prizes from "./components/Prizes";
import Application from "./components/Application";
import Sponsory from "./components/Sponsory";
import Winners from "./components/Winners";
import API from "./utils/API";
import Footer from "./components/Footer";

import productsAPI from './utils/productsAPI'

const tokenCur = window.localStorage.getItem('mandarim2021-token')



function IndexPage(props) {
  const [account, openAccount] = useState(false)
  const [winnersMas, setWinners] = useState(false)
  const [token, setToken] = useState(tokenCur)
  const [checks, setChecks] = useState([])
  const [products, setProducts] = useState([])
  const [sponsoryPageProducts, setSpProducts] = useState(false)
  const [regions, setRegions] = useState([])
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [userData, setUserData] = useState(false)
  const [serverError, setServerError] = useState(false)

  const getChecks = () => {
    API.get('/checks-winners').then(
      res => {
        setWinners(res.data)
      }
    )
  }
  useEffect(() => {
    productsAPI.get("/main-page-products", {
      params: { project: 'mandarim-kdd' }
    }).then(
      (res) => {
        setProducts(res.data.data)
        setStart(res.data.start)
        setEnd(res.data.end)
      }
    )
  }, [])
  useEffect(() => {
    getChecks()
    productsAPI.get("/region-products", {
      params: { project: 'mandarim-kdd' },

    }).then(
      (res) => {
        setSpProducts(res.data.products)
        let arr = []
        for (let key in res.data.products) {
          arr.push(key)
        }
        setRegions(arr)
      }
    )

  }, [])






  const updateUser = (newToken) => {
    API.get('/profile', {
      headers: {
        'Authorization': `Bearer ${newToken ? newToken : token}`,
      }
    })
      .then(
        res => {
          if (res.data.data) {
            setUserData(res.data.data)
            if (res.data.data.name) {
              editUser(false)
            }
          }
        }
      )
      .catch(
        error => {
          console.log(error.message)
          setServerError(true)
        }
      )

      

    API.get('/checks', {
      headers: {
        'Authorization': `Bearer ${newToken ? newToken : token}`,
      }
    })
      .then(
        res => {
          if (res.data.data) {
            setChecks(res.data.data)
          }
        }
      )
      
  }

  useEffect(() => {
    if (token) {
      updateUser()
    }
  }, [])
  console.log(winnersMas)
  return (
    <div className="content">
      <Nav setForm={openAccount} baseUrl={props.baseUrl} products={products} sponsoryPageProducts={sponsoryPageProducts} />
      {props.page === 'main' ?
        <><Main />
          <Mechanics baseUrl={props.baseUrl} setForm={openAccount} />
          <Prizes />
          <Application />
          <Sponsory
            start={start}
            end={end}
            regions={regions}
            main={false}
            sponsoryPageProducts={sponsoryPageProducts}
            baseUrl={props.baseUrl} products={products} />
          {winnersMas ?
            <Winners users={winnersMas} />
            : false}
          <Footer />
        </> :
        props.page === 'sponsory' ?
          <Sponsory
            main={true}
            start={start}
            end={end}
            products={products}
            regions={regions}
            sponsoryPageProducts={sponsoryPageProducts} />
          : null

      }
      {account ?
        <UserAccount
          setForm={openAccount}
          checks={checks}
          setToken={setToken}
          updateUser={updateUser}
          serverError={serverError}
          userData={userData}
          token={token} /> : null}
    </div>
  );

}

export default Hoc(IndexPage);
