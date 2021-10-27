import { useState , useEffect} from "react"
import Layout from "../component/Layout.js"
import Link from 'next/link'
import { localFetch } from '../../public/api/helper.js';
import { listScorecard } from "../../public/api/scorecardApi.js"
import viewImg from '../../public/image/View.svg'
import submitImg from '../../public/image/Submit.svg'
import Image from 'next/image'



export default function Manage(){
    const [scoreCard, SetScorecard]= useState([])

    useEffect(() => {
       let currentToken=''
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

console.log(scoreCard)
    return(
            <>
            <div className='overflow-x-hidden'>
            <Layout>
            <div className='text-md pt-16 '>
            <div className='flex flex-row h-12/12  w-full mx-4 justify-center  gap-x-32 ' >
           {/*  <Link href="/scorecard/create">
            <div className='w-44 m-4 h-32 flex items-center justify-center shadow-inner rounded cursor-pointer bg-gradient-to-r from-blue-400 to-indigo-500 bg-opacity-75'>
                <h2 className='text-white font-black text-md font-medium'>Create</h2>
            </div>
            </Link> */}
            <Link href="/scorecard/submit">
            <div className= 'flex flex-col justify-center bg-yellow-300 w-36 h-36 cursor-pointer rounded'>
                    <Image src={submitImg} width={70} height={70} />
                    <h2 className='text-center text-xs font-black text-gray-800 mt-4'>Submit Scorecard</h2>

                </div>
            </Link>
            <Link href="/scorecard/create">
            <div className= 'flex flex-col justify-center bg-blue-400 w-36 h-36 rounded cursor-pointer'>
                    <Image src={viewImg} width={70} height={70} />
                    <h2 className='text-center text-xs font-black text-gray-800 mt-4'>View Scorecard</h2>

                </div>
            </Link>
            </div>
            
            <div className='mt-8 p-4 '>
            <h2 className='font-black text-xl'>Submited Scorecards</h2>
            <table className='w-11/12 mt-4 '>
            <thead className='bg-blue-50 rounded-md  text-gray-600 '>
                <tr className=''>
                    <th className='pl-16 h-12 text-left'>Month</th>
                    <th>Submited Date</th>
                    <th>Score</th>
                    <th>Version</th>
                                   
                </tr>
                </thead>
                <tbody>
                
                {scoreCard.map((data,index)=>{
                    return(
                    <tr className='text-center border-b-2 h-14 border-gray-100'>
                    <td className='pl-16 text-left' >{data.name}</td>
                    <td>{new Date(data.dateCreated).toLocaleDateString()}</td>
                    <td>{data.unit}</td>
                   
                    
                   
                  </tr>)

                })}
            </tbody>
           
            </table>
            </div>
            </div>

            </Layout>
            </div>
            </>
    )
}