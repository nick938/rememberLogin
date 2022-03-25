import React, { useEffect, useState } from 'react'
// import logo from './logo.svg'
import Cookies from 'js-cookie'
import './App.css'

/*
用户输入账号密码，并且勾选了记住密码，此时设置cookie ->accountInfo = username + '&' + password + '&' + remember
*/

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(load)

  function login() {
    let account = JSON.stringify({ username: username, password: password })
    // console.log(account)
    if (remember) {
      Cookies.set('account', account, {
        expires: 7,
      })
    } else {
      // Cookies.remove('account')
    }
  }

  function load() {
    if (Cookies.get('account')) {
      console.log(JSON.parse(Cookies.get('account') || ''))
      let res = JSON.parse(Cookies.get('account') || '')
      setUsername(res.username)
      setPassword(res.password)
      setRemember(true)
    }
  }
  function handleRember(e: any) {
    console.log(e.target.checked)
    Cookies.remove('account')
    setRemember(e.target.checked)
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <input
          type='text'
          placeholder='用户名/手机号'
          className='login_input'
          id='usernameLogin'
          maxLength={11}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          placeholder='密码'
          className='login_input'
          id='pwdLogin'
          maxLength={20}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
        />

        <input
          type='checkbox'
          checked={remember}
          onChange={handleRember}
          value='remember'
        />
        <button onClick={login}>登录</button>
        <span className='color-white'>记住密码(七天)</span>
      </header>
    </div>
  )
}

export default App
