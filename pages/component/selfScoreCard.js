import { useState, useEffect } from "react"
import { localFetch } from '../../public/api/helper.js';
import { getScorecard } from "../../public/api/scorecardApi.js"

export default function SelfScoreTable(props){
    const [card, setCard]= useState(undefined)
    useEffect(() => {
        let currentToken = ''
        const abortController = new AbortController()
        const signal = abortController.signal
        if (typeof window !== "undefined") {
            currentToken = localFetch('token')
        }
              
        getScorecard('61308b48d763a809d47b43c0',currentToken, signal).then((data) => {

            if (data && data.error) {
                console.log(data.error)
            } else {

              setCard(data)
              console.log(card)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])


    const kraAreas= card!=undefined? (card.kraAreas.map(kraAreas=> kraAreas.name)):undefined;
    const kras  = card!=undefined? (card.kraAreas.kras.map(kpis=> kpis.name)):undefined;
console.log(kras)
   
    return (
<>
        <div className='mt-8 text-xs w-11/12'>
        <table>
            <thead className='border-b-2'>
                <tr>
                    <th>KRA AREAS</th>
                    <th >KRA</th>
                    <th >KPIs</th>
                    <th >Target</th>
                    <th >COMPLETION DATE</th>
                    <th >TRACKING</th>                    
                    <th >SELF SCORE %</th>
                    <th > LINE HEAD SCORE</th> 
                    <th >3RD PARTY SCORE/H.O.D</th>
                    <th >WEIGHT</th>
                    <th >RATING (1-4)</th>
                    <th >WEIGHT X RATING</th>

                </tr>
            </thead>
            <tbody>
                
                {card!==undefined?card['kraAreas'].map((kras,index)=>{
                    return(
                    <tr className='text-center border-b-2'>
                    <td >{kras['name']}</td>
                 
                    </tr>)

                }):<></>}
            </tbody>
        </table>

    </div>
</>
    )
}