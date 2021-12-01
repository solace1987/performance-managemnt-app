import KraArea from "./KraArea";

export default function KraAreas(props){
   
    return(
        <>
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
            {
                props.KraAreas.map((kraArea,index)=>{
                    
                    return(
                        <tr>
                        <td>
                            <KraArea kraArea={kraArea} node={index} ></KraArea>
                        </td>
                        </tr>
                    )
                })
            }

            </tbody>

            
            
        </table> 
        </>
    )

}