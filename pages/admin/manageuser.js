import Link from 'next/link'
import { listUsers, updateUser } from '../../public/api/userApi'
import { localFetch } from '../../public/api/helper'
import React, { useState, useEffect } from 'react';
import Image from 'next/dist/client/image';
import editImg from '../../public/image/edit.svg'
import cancelImg from '../../public/image/error.svg'
import saveImg from '../../public/image/floppy-disk.svg'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function ManageUser() {
    const [values, setValues] = useState([])
    const [selectedNum, SetSelectedNum] = useState(undefined);
    const [isDisplay, SetIsdisplay] = useState(false);

    const handleChange = (name, index) => event => {
        const user = values[index];
        user[name] = event.target.value;
        const users = values;
        users[index] = user
        setValues([...users])
    }
    const role=["Staff", "Reviewer", "Admin"]
    const onEdit = (e) => {
        SetSelectedNum(Number(e.target.id))
        SetIsdisplay(!isDisplay)
        if (isDisplay) {
            const selectedUser = values[selectedNum]
            console.log(selectedNum)
            let currentToken = ''
            if (typeof window !== "undefined") {

                currentToken = localFetch('token')
            }
            updateUser(selectedUser._id, currentToken, selectedUser).then((data) => {
                if (data && data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                }
            })

        }


    }
const input='bg-white'
    useEffect(() => {
        let currentUser = '';
        let currentToken = ''
        const abortController = new AbortController()
        const signal = abortController.signal

        if (typeof window !== "undefined") {
            currentUser = localFetch('user');
            currentToken = localFetch('token')
        }

        listUsers(signal, currentUser._id, currentToken).then((data) => {

            if (data && data.error) {
                console.log(data.error)
            } else {

                setValues(data)

            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])


    return (
        <>

            <div>
            <div className="bg-indigo-500 h-12 pl-2 pt-2">
                    <Link href='/admin/manage'>
                        <div className='text-center text-white cursor-pointer border-2 w-20'>BACK</div>

                    </Link>
                </div>
                <div className='p-4 text-right'>
                    <Link href="/createuser">
                        <button className='bg-blue-400 text-white p-1 rounded ' >Create user</button>
                    </Link>
                </div>

                <div className=' p-4'>


                    <table className='w-full mt-4'>
                        <thead className='border-b-2 font-md  text-gray-600'>
                            <tr >
                                <th className='text-left' >Name</th>
                                <th className="text-left">Unit</th>
                                <th >Designation</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.map((data, index) => {
                                return (
                                    <tr className={index === selectedNum && isDisplay ? "text-center border-b-2 h-14 bg-purple-100" : "text-center border-b-2 h-14"}>
                                        <td className="text-left"> <input className={input} type='text' disabled="disabled" value={`${data.firstname} ${data.lastname}`} /> </td>

                                        <td onChange={handleChange('unit', index)} className="text-left"><input className={input} type='text' disabled={index === selectedNum && isDisplay ? "" : "disabled"} value={data.unit} /></td>
                                        <td onChange={handleChange('designation', index)}  ><input className={input} type='text' disabled={index === selectedNum && isDisplay ? "" : "disabled"} value={data.designation} /></td>
                                        <td onChange={handleChange('email', index)} ><input className={input} type='text' disabled={index === selectedNum && isDisplay ? "" : "disabled"} value={data.email} /> </td>
                                        <td className='text-xs'>
                                            
                                            <Dropdown onChange={(event)=>{
                                                const user = values[index];
                                                user['role']=event.value
                                                const users = values;
                                                users[index] = user
                                                setValues([...users])
                                                                                           
                                            
                                            }} 
                                            disabled={index === selectedNum && isDisplay ? "" : "disabled"} className="mr-4" options={role}  value={values[index].role} placeholder="Select Role" />

                                            
                                            
                                        </td>
                                        <div className='flex flex-row items-center pt-4 gap-y-4 justify-between'>
                                            <div className='cursor-pointer' onClick={onEdit}> <Image id={index} src={index === selectedNum && isDisplay ? saveImg : editImg} height={17} width={17} /></div>
                                            <div className='cursor-pointer'><Image src={cancelImg} height={17} width={17} /></div>
                                        </div>


                                    </tr>)

                            })}

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    )
}