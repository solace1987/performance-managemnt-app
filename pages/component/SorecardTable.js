

export default function ScorecardTable(props){
    
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
                
                {props.data!==undefined?props.data.map((data,index)=>{
                    return(
                    <tr className='text-center border-b-2'>
                    <td >{data[0]}</td>
                    <td>{data[1]}</td>
                    <td>{data[2].name}</td>
                    <td>{data[2].target}</td>
                    <td>{data[2].completionPeriod}</td>
                    <td>{data[2].tracking}</td>
                    <td>{data[2].selfScore}</td>
                    <td>{data[2].LineHeadScore}</td>
                    <td>{data[2].thirdPartyScore}</td>
                    <td>{data[2].weight}</td>
                    <td>{data[2].Rating}</td>
                    <td>{data[2].WeightbyRating}</td>
                    </tr>)

                }):<></>}
            </tbody>
        </table>

    </div>
</>
    )
}