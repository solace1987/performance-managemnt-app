
import styles from '../styles/Home.module.css'
import { signin } from '../public/api/userApi.js'
import React, { useState } from 'react';
import { localSave } from '../public/api/helper.js';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Home() {

  const router = useRouter()
  const [values, setValues] = useState({
    password: '',
    email: '',
    error: '',
    })

  const handleChange = name => event => {

    setValues({ ...values, [name]: event.target.value })

  }

  const clickSubmit = (e) => {
    e.preventDefault()
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    }

    signin(user).then((data) => {

      if (data.error) {
        
        setValues({ ...values, error: data.error,})


      } else {
        localSave("token", data.token);
        localSave("user", data.user);
        router.push('/dashboard')

      }

    })
  }

  return (
    <div className={styles.container}>
        <main className='w-screen h-screen home flex justify-center  items-center'>
        <div className='flex flex-col lg:w-1/4 md:w-3/5 h-4/5 sm:w-12/12 shadow-lg' >
          <div className=' p-8 h-2/4 head text-white flex flex-col  bg-blue-800'>
            <h1 className=' text-xl font-black'>PERFORMANCE</h1>
            <h1 className='pb-8 text-xl font-black'>MANAGEMENT</h1>
            <div className='mt-20'>
              <Link href="/createuser">
                <a className='text-sm  text-gray-200 text-left '>Create Account</a>
              </Link>
            </div>
          </div>
          <div className='h-2/4 bg-white  items-center flex flex-col w-12/12'>
              <h2 className='p-4 text-red-500'>{values.error}</h2>
            <div>
              <h3 className='mt-4 text-gray-500 text-xs font-medium'>USER LOGIN</h3>
            </div>

            <form className="mt-8 w-12/12 flex flex-col items-center">
              <input value={values.email} placeholder='Email' onChange={handleChange('email')} name='email' className="focus:outline-none h-8 bg-blue-300 rounded-lg text-white text-sm w-80 bg-gradient-to-r from-blue-800 to-blue-400 pl-2 pr-2" type='text' />
              <input value={values.password} placeholder='Password' onChange={handleChange('password')} name='password' className="focus:outline-none h-8 bg-blue-300 rounded-lg w-80 text-white text-sm bg-gradient-to-r from-blue-800 to-blue-400 pl-2 pr-2 mt-3" type='password' />
              <input onClick={clickSubmit} type='submit' value="Submit" className='mt-4 p-2 text-white text-sm w-2/5 bg-blue-700 rounded-sm' />
            </form>

          </div>
        </div>
      </main>

    </div>
  )
}
