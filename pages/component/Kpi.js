


export default function Kpi(props){
    
    return(
        <>
        <tr>
           
            {
                props.kpis.map((kpi,index)=>{
                    return(
                    <>    
                    <td >{kpi.name}</td>
                    <td>{kpi.target}</td>
                    <td>{kpi.completionPeriod}</td>
                    <td>{kpi.tracking}</td>
                    <td>{kpi.selfScore}</td>
                    <td>{kpi.LineHeadScore}</td>
                    <td>{kpi.thirdPartyScore}</td>
                    <td>{kpi.weight}</td>
                    <td>{kpi.Rating}</td>
                    <td>{kpi.WeightbyRating}</td>
                     </> 
                    )
                })
            }
        </tr> 
        </>
    )

}