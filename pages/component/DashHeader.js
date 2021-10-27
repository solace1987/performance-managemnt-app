import { localFetch } from '../../public/api/helper.js';
import React, { useState, useEffect } from 'react';
import { readUser } from '../../public/api/userApi.js';
import Link from 'next/link'

export default function Dashboard() {
    let currentUser = '';
    let currentToken = ''
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: '',
        unit: "",
        designation: ""
    })


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
    //console.log(values)



    return (
        <div >
            <div className='h-12 flex flex-row bg-blue-700 w-screen' >
                <Link href="/">
                    <div className='flex items-center w-2/4 '>
                        <h2 className='text-white text-lg font-black pl-4'>PERFORMANCE DASHBOARD</h2>
                        <h3 className='text-white pl-2 text-gray-300 text-xs font-extralight'>Manage your scorecard</h3>
                    </div>
                </Link>
                <div className='flex items-center w-1/3 text-gray-300 text-xs justify-around'>
                    <Link href="/dashboard">
                        <a >SUMMARY</a>
                    </Link>
                    <Link href="/scorecard/manage">
                        <a >SCORE CARDS</a>
                    </Link>
                    <Link href="/managescorecard">
                        <a className=''>REPORT</a>
                    </Link>
                    <Link href="/admin/manage">
                        <a className=''>ADMIN</a>
                    </Link>
                </div>
                <Link href="/edituser">
                    <a>
                        <div className='flex flex-col items-center text-white text-xs  text-right justify-end pt-2 pl-4 pb-1 border-l-2'>
                            <h3 className=' font-medium'>{`${values.firstname} ${values.lastname}`.toUpperCase()}</h3>
                            <h3 className='text-gray-200 text-xs'>{values.designation.charAt(0).toUpperCase() + values.designation.slice(1)}</h3>
                        </div>
                    </a >
                </Link>
            </div>

            <div>
                <a></a>
            </div>


        </div>
    )

}