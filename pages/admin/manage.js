import {reFormatData } from "../../public/api/helper";
import createImg from '../../public/image/createCircle.svg'
import manageImg from '../../public/image/Manage.svg'
import permitImg from '../../public/image/permission.svg'
import Image from 'next/image'
import { localFetch } from '../../public/api/helper.js';
import { listScorecard } from "../../public/api/scorecardApi.js"
import { useState, useEffect } from "react"
import Layout from "../component/Layout.js"
import Link from 'next/link'
import PrevImg from '../../public/image/eye.png'
import ScorecardTable from "../component/SorecardTable";

export default function ManageScorecard() {

    const [scoreCard, SetScorecard] = useState([])
    const [convData, SetCovData] = useState([])
    const [ispreview, SetIsPreview] = useState(false)
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

                SetScorecard(data)

            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const previewCard = (index) => {
        const selected = scoreCard[index];
        const data = reFormatData(selected)
        data.designation = selected.designation;
        data.unit= selected.unit;
        SetCovData(data)
        SetIsPreview(true)

    }

    return (

        <>
            <Layout>
                <div className='w-full mt-12'>
                    <h2 className='text-center mt-8 mb-16 text-gray-800 text-2xl font-black'>
                        Manage Users and Scorecards
                    </h2>

                    <div className='flex flex-row h-12/12  w-full mx-4 justify-center  gap-x-32'>
                        <Link href="/scorecard/create">
                            <div className='flex flex-col justify-center bg-yellow-300 w-32 h-36 rounded cursor-pointer'>
                                <Image src={createImg} width={70} height={70} />
                                <h2 className='text-center text-xs mt-4 font-black'>Create Scorecard</h2>

                            </div>
                        </Link>
                        <Link href="/admin/manageuser">
                            <div className='flex flex-col justify-center bg-indigo-300 w-32 h-36 rounded cursor-pointer'>
                                <Image src={manageImg} width={70} height={70} />
                                <h2 className='text-center mt-4 text-xs font-black'>Manage Users</h2>

                            </div>
                        </Link>
                        <Link href="/admin/manageuserPermision">
                            <div className='flex flex-col justify-center bg-green-200 w-32 h-36 rounded cursor-pointer'>
                                <Image src={permitImg} width={70} height={70} />
                                <h2 className='text-center mt-4 text-xs font-black'>Permissions</h2>
                            </div>
                        </Link>
                    </div>
                    {
                        ispreview === false ? (<div className='mt-8 p-4'>
                            <h2 className='font-black text-xl'>All Score Card Created</h2>
                            <table className='w-full mt-4'>
                                <thead className='border-b-2 font-md  text-gray-600'>
                                    <tr className=''>
                                        <th >Department</th>
                                        <th >Unit</th>
                                        <th >Designation</th>
                                        <th>Version</th>
                                        <th >Created Date</th>
                                        <th ></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {scoreCard.map((data, index) => {
                                        return (
                                            <tr className='text-center' key={index}>
                                                <td>{data.department}</td>
                                                <td>{data.unit}</td>
                                                <td>{data.designation}</td>
                                                <td >{data.version}</td>
                                                <td>{new Date(data.dateCreated).toLocaleDateString()}</td>
                                                <td className='cursor-pointer' onClick={() => previewCard(index)}><Image src={PrevImg} width={20} height={20} /></td>
                                            </tr>)

                                    })}
                                </tbody>

                            </table>
                        </div>) : (
                            <>
                            <div className=' absolute inset-x-0 top-16 pb-8 bg-white m-8 border shadow-2xl'>
                                <div >
                                    <h2 className='text-center mt-12 text-gray-800 bg-blue-300'>ScoreCard  for  <span className='font-bold'>{convData.designation.toUpperCase()}</span> in  <span className='font-bold'>{convData.unit.toUpperCase()}</span>   Unit</h2>
                                    <div  onClick={()=>SetIsPreview(false)} className='bg-red-400 text-center m-5  cursor-pointer text-white w-24'>Go back</div>
                                </div>
                                <ScorecardTable data={convData['data']} />

                            </div>
                            </>)

                    }
                </div>
            </Layout>
        </>
    )

}