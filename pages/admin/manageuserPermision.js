import Link from 'next/link'
import { listUsers, updateUser } from '../../public/api/userApi'
import { localFetch } from '../../public/api/helper'
import React, { useState, useEffect } from 'react';
import Image from 'next/dist/client/image';
import editImg from '../../public/image/edit.svg'
import saveImg from '../../public/image/floppy-disk.svg'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { listScorecard } from "../../public/api/scorecardApi.js"



export default function ManageUser() {
    const [values, setValues] = useState([])
    const [selectedNum, SetSelectedNum] = useState(undefined);
    const [isDisplay, SetIsdisplay] = useState(false);
    const [scoreCard, SetScorecard] = useState([]);
    const [userList, SetUserList] = useState([])

    const handleChange = (name, index) => event => {
        const user = values[index];
        user[name] = event.target.value;
        const users = values;
        users[index] = user
        setValues([...users])

    }

    const onEdit = (e) => {
        SetSelectedNum(Number(e.target.id))
        SetIsdisplay(!isDisplay)
        if (isDisplay) {
            const selectedUser = values[selectedNum]

            let currentToken = ''
            if (typeof window !== "undefined") {

                currentToken = localFetch('token')
            }
            updateUser(selectedUser._id, currentToken, selectedUser).then((data) => {
                console.log(selectedUser)
                if (data && data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                }
            })

        }


    }
    useEffect(() => {
        let currentToken = ''
        const abortController = new AbortController()
        const signal = abortController.signal
        if (typeof window !== "undefined") {
            currentToken = localFetch('token')
        }

        listScorecard(currentToken, signal).then((data) => {

            if (data && data.error) {
                console.log(data.error)
            } else {
                const tempArr = []
                data.forEach(element => {
                    tempArr.push({ label: `${element.department}: ${element.unit}| ${element.designation}-${element.version} `, value: element._id })
                    SetScorecard(tempArr)
                    console.log(tempArr)
                });


            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

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


                const tempArr = []
                data.forEach(element => {
                    if (element.role === "Reviewer") {
                        tempArr.push({ label: `${element.firstname} ${element.lastname}`, value: element.email })
                        SetUserList(tempArr)
                    }
                });

                setValues(data)
                console.log(data)
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
                <div className='p-8'>

                    <h2 className='text-gray-700' >MANAGE PERMISSION</h2>
                </div>

                <div className='p-4 bg-gray-100'>


                    <table className='w-full mt-4'>
                        <thead className='border-b-2 font-xs  text-gray-600'>
                            <tr >
                                <th className='text-left' >Name</th>
                                <th className="text-left">Unit</th>
                                <th >Scorecard</th>
                                <th>Line Head</th>
                                <th>HOD/Third-Party</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.map((data, index) => {
                                return (
                                    <tr className={index === selectedNum && isDisplay ? "text-center border-b-2 h-14 bg-indigo-100" : "text-center border-b-2 h-14"}>
                                        <td className="text-base text-left"> <input className="pl-2 bg-white" type='text' disabled="disabled" value={`${data.firstname} ${data.lastname}`} /> </td>

                                        <td onChange={handleChange('unit', index)} className="text-base text-left"><input className=" pl-2 bg-white" type='text' disabled="disabled" value={data.unit} /></td>
                                        <td className='text-xs'>

                                            <Dropdown onChange={(event) => {
                                                const user = values[index];
                                                user['scorecardId'] = event.value
                                                const users = values;
                                                users[index] = user
                                                setValues([...users])


                                            }}
                                                disabled={index === selectedNum && isDisplay ? "" : "disabled"} className="mr-4" options={scoreCard} value={values[index].scorecardId} placeholder="Select Score Card" />



                                        </td>
                                        <td className='text-xs'>

                                            <Dropdown onChange={(event) => {
                                                const user = values[index];
                                                user['lineHead'] = event.value
                                                const users = values;
                                                users[index] = user
                                                setValues([...users])


                                            }}
                                                disabled={index === selectedNum && isDisplay ? "" : "disabled"} className="mr-4" options={userList} value={values[index].lineHead} placeholder="Select Line-Head" />



                                        </td>
                                        <td className='text-xs'>

                                            <Dropdown onChange={(event) => {
                                                const user = values[index];
                                                user['HOD'] = event.value
                                                const users = values;
                                                users[index] = user
                                                setValues([...users])


                                            }}
                                                disabled={index === selectedNum && isDisplay ? "" : "disabled"} className="mr-4" options={userList} value={values[index].HOD} placeholder="Select HOD" />



                                        </td>
                                        <div className='flex flex-row items-center pt-4 gap-y-4 justify-between'>
                                            <div className='cursor-pointer' onClick={onEdit}> <Image id={index} src={index === selectedNum && isDisplay ? saveImg : editImg} height={17} width={17} /></div>

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