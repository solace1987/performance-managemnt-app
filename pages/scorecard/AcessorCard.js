import Linehead from './linehead'
import Thirdparty from "./thirdparty"
import HOD from "./hod"

export default function AccessorCard(props){


    const sheet = ()=>{
        if(props.accessor==="linehead"){
            return (<Linehead scorecard={props.scorecard} changeStatus={props.changeStatus}></Linehead>)
        }
        else if(props.accessor==="thirdparty")  {

            return ( <Thirdparty changeStatus={props.changeStatus} scorecard={props.scorecard}></Thirdparty>)
        }  
        else if(props.accessor==="HOD")  {

            return ( <HOD changeStatus={props.changeStatus} scorecard={props.scorecard}></HOD>)
        } 
    }
    return(

        <>
        {  
        
        sheet()

    }
        
        </>
    )
}