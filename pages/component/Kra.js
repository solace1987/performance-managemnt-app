
import Kra from "./Kra"

export default function KraArea(props){
    
    return(
        <>
        <tr>
            <td>
                {props.kraArea.name}
            </td>
            {
                props.KraArea.kras.map((kra,index)=>{
                    return(
                        
                            <Kra kra={kra} node={index} ></Kra>
                       
                    )
                })
            }
        </tr> 
        </>
    )

}