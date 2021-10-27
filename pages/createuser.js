import React, { useState } from 'react';
import { create } from '../public/api/userApi.js';
import { useRouter } from 'next/router';



export default function CreateUser() {
  const router = useRouter()
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: '',
    unit: "",
    designation: "",
    password: '',
    error: ''
  })
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })

  }

  const clickSubmit = (e) => {
    e.preventDefault()
    const user = {
      password: values.password || undefined,
      email: values.email || undefined,
      unit: values.unit || undefined,
      firstname: values.firstname || undefined,
      lastname: values.lastname || undefined,
      designation: values.designation || undefined
    }
    create(user).then((data) => {

      if (data.error) {

        setValues({ ...values, error: data.error })


      } else {
        console.log(data)
        router.push('/admin/manageuser')

      }

    })
  }

  return (
    <>
      <div className='bg-gray-700 bg-opacity-10'>
        {/*   <Link href='/'>
        <div className='cursor-pointer absolute inset-5 bg-red-400 rounded-full h-24 w-24 flex items-center justify-center'> <h2 className='text-5xl text-white'> &lt; </h2></div>
        </Link> */}
        <main className=" w-screen h-screen flex-col flex justify-center  items-center">
          <h2 className='p-4 text-red-600'>{values.error}</h2>
          <div className='bg-blue-700 p-10 rounded-t-lg shadow-2xl'>
            <h3 className="font-semibold text-gray-200 pb-8 ">Create Account</h3>
            <form className='flex flex-col text-sm'>
              <input value={values.firstname} onChange={handleChange('firstname')} className='w-80 p-1 text-sm pl-2 mb-4' type="text" name='firstname' placeholder='Firstname' />
              <input value={values.lastname} onChange={handleChange('lastname')} className='w-80 p-1 pl-2 mb-4' type="text" name='lastname' placeholder='Lastname' />
              <input value={values.email} onChange={handleChange('email')} className='w-80 p-1 pl-2 mb-4' type="text" name='email' placeholder='Email' />
              <input value={values.unit} onChange={handleChange('unit')} className='w-80 p-1 pl-2 mb-4' type="text" name='unit' placeholder='Unit' />
              <input value={values.designation} onChange={handleChange('designation')} className='w-80 p-1 pl-2 mb-4' type="text" name='designation' placeholder='Designation' />
              <input value={values.password} onChange={handleChange('password')} className='w-80 p-1 pl-2 mb-4' type="text" name='password' placeholder='Password' type='password' />
              <input value={values.confirmpassword} onChange={handleChange('confirmpassword')} className='w-80 p-1  pl-2 mb-4' type="text" name='confirmpassword' type='password' placeholder='Confirm Password' />
              <input onClick={clickSubmit} className='w-40 p-1 mt-4 mb- rounded' type="submit" />
            </form>
          </div>

        </main>
      </div>
    </>
  )
}