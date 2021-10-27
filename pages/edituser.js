import { localFetch } from '../public/api/helper.js';
import React, { useState, useEffect } from 'react';
import { updateUser, readUser } from '../public/api/userApi.js';
import { useRouter } from 'next/router';

export default function EditUser() {
   // const router = useRouter()
    let currentUser = '';
    let currentToken = ''

    const [menu, setMenu] = useState('info')
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: '',
        unit: "",
        designation: "",
        password: "",
        tempPassword: "",
        confirmPassword: "",
        color: ''
    })

    const changeMenu = (option) => (e) => {

        setMenu(option)
    }
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })

    }
    const clickSubmit = (e) => {
        e.preventDefault()
        if (typeof window !== "undefined") {
            currentUser = localFetch('user');
            currentToken = localFetch('token')
        }
        if (values.tempPassword === values.confirmPassword) {

            const user = {
                password: values.tempPassword || undefined,
                email: values.email || undefined,
                unit: values.unit || undefined,
                firstname: values.firstname || undefined,
                lastname: values.lastname || undefined,
                designation: values.designation || undefined
            }
            updateUser(currentUser._id, currentToken, user).then((data) => {

                if (data.error) {

                    setValues({ ...values, error: data.error, color: "red" })


                } else {

                    setValues({ ...values, error: "Password Updated", color: "green" })

                }

            })
        }
        else {

            setValues({ ...values, error: 'Password do not match', color: 'red' })

        }
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        if (typeof window !== "undefined") {
            currentUser = localFetch('user');
            currentToken = localFetch('token')
        }

        readUser(currentUser._id, currentToken, signal).then((data) => {

            if (data && data.error) {
                console.log(data.error)
            } else {

                setValues((prevState) => { return { ...prevState, ...data } })

            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const changeDisplay = () => {

        if (menu === "info") {
            return (

                <div className="flex w-9/12 justify-center m-20">
                    <form className="text-sm ">
                        <fieldset className=' p-2 '>
                            <legend className="text-sm pl-2 text-gray-600">Firstname </legend>
                            <input value={values.firstname} type="text" className=" pl-2 w-80 rounded h-8" />
                        </fieldset>
                        <fieldset className=' p-2 '>
                            <legend className="text-sm pl-2 text-gray-600">Surname </legend>
                            <input value={values.lastname} type="text" className="pl-2 w-80 rounded h-8" />
                        </fieldset>
                        <fieldset className=' p-2 '>
                            <legend className="text-sm pl-2 text-gray-600">Email </legend>
                            <input value={values.email} type="text" className="pl-2 w-96 rounded h-8" />
                        </fieldset>
                        <fieldset className=' p-2 '>
                            <legend className="text-sm pl-2 text-gray-600">Unit </legend>
                            <input value={values.unit} type="text" className="pl-2 w-80 rounded h-8" />

                        </fieldset>
                        <fieldset className=' p-2 '>
                            <legend className="text-sm pl-2 text-gray-600">Designation </legend>
                            <input value={values.designation} type="text" className="pl-2 w-80 rounded h-8" />
                        </fieldset>


                    </form>
                </div>

            )
        }

        else if (menu === "password") {

            return (


                <div className="flex w-9/12 justify-center m-16">
                    <form className="text-sm ">
                        <fieldset className=' p-2 '>
                            <legend className="text-sm pl-2 text-gray-600">New Password</legend>
                            <input onChange={handleChange('tempPassword')} value={values.tempPassword} name="tempPassword" type="password" className=" pl-2 w-80 rounded h-8" />
                        </fieldset>
                        <fieldset className=' p-2 '>
                            <legend className="text-sm pl-2 text-gray-600">Confirm Password</legend>
                            <input onChange={handleChange('confirmPassword')} value={values.confirmPassword} name='confirmPassword' type="password" className="pl-2 w-80 rounded h-8" />
                        </fieldset>
                        <input onClick={clickSubmit} type="submit" value='Update' className="mt-4 ml-2 pl-2 w-40 rounded h-8 text-white bg-blue-600" />

                    </form>
                </div>



            )
        }
    }

    return (

        <main className="bg-blue-50 h-screen w-screen flex flex-row">
            <div className='h-screen w-3/12 bg-white'>
                <h2 className='text-blue-600 pt-2 pb-2 border-b text-center'> Profile</h2>
                <div className='flex flex-col p-4 '>

                    <a onClick={changeMenu('info')} className='flex flex-col p-4 border-b cursor-pointer'>View Information</a>
                    <a onClick={changeMenu('password')} className='flex flex-col p-4 border-b cursor-pointer'>Change Password</a>

                </div>
            </div>

            <div className='w-full'>
                <h2 className={`w-full text-center text-${values.color}-500 mt-10`}>{values.error}</h2>
                {changeDisplay()}
            </div>

        </main>
    )
}