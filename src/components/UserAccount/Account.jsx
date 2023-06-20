import React from 'react';


export default function Account({ exit, userData, editUser, setForm, checks, setScan,logout }) {

  // {userData.first_name}
  return (
    <div className="box mx-auto p-10 sm:p-8 pt-16 sm:pt-8 ubuntu text-black registration ubuntu">
      <div className="close" onClick={() => setForm(false)}  >
        <span></span><span></span>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-auto">
          <h2 className=' text-5xl mb-8'>
            Личный кабинет
          </h2>
          <div className="sm:flex sm:gap-4 sm:justify-between ">
            <div className="left  ">
              <p className='font-black mb-4 text-darkGreen'>Привет, {userData.first_name}!</p>
              <p className='mt-4 text-darkGreen'>
                Ты участвуешь в розыгрыше призов. Здесь будут отображены чеки и личная информация. Обращаем внимание на необходимость указывать реальные данные и сохранять чеки до конца акции.
              </p>

            </div>
            <div className="right s:mt-0 mt-8">
              <button className='btn grid py-4 px-8 w-full' onClick={() => setScan(true)}>
                <span>Добавить чек</span>
              </button>
              <button className='btn grid mt-4 py-4 px-8 w-full' onClick={() => editUser(true)}>
                <span>Редактировать</span>
              </button>
              <button className='btn grid mt-4 py-4 px-8 w-full' type='submit'
                onClick={logout}
              >
                <span>Выход</span>
              </button>
            </div>
          </div>
          <div className="sm:mt-4 mt-8 checks-container">
            <h2 className='text-center'>Мои чеки</h2>
            <p className="text-center mt-4 text-darkGreen">При совершении покупки по карте «Клуб Друзей ДИКСИ», чеки автоматически<br />добавляются в «Личный кабинет», их не нужно сканировать.</p>
            <table className="checks w-full mt-8">
              <thead>
                <tr className='text-left text-orange font-bold checks-list'>
                  <th className='p-4'>Дата</th>
                  <th className='p-4'>Сумма чека</th>
                  <th className='p-4'>Розыгрыш</th>
                </tr>
              </thead>
              <tbody>
                {checks.length ?
                  checks.map(
                    (check, id) => (
                      <tr className={`${check.participate ==='Не участвует в розыгрыше' ? 'text-gray':'text-darkGreen'} checks-list mb-4`} key={id}>
                        <td className="p-4 font-bold">{check.created_at.split('-').reverse().toString().replaceAll(',','.')}</td>
                        <td className="p-4">{check.sum} руб.</td>
                        <td className="p-4">{check.participate}</td>
                      </tr>
                    )
                  ) : <td colspan='3' className='text-center'>У тебя пока нет чеков</td>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}