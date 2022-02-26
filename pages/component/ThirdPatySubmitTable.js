import {kpiValueMapper} from '../../public/api/helper.js'
import { useState } from "react";

export default function ThirdPatySubmitTable(props){
    const kpiMap = kpiValueMapper(props.data)
    const [showNote,SetShowNote] = useState({status:false,value:null,tempText:null})
    const itemRating =  (value)=>{
        if(value>=86){
            return 4;
        }
        else if(value>=66){
            return 3
        }
        else if(value>=51){
            return 2
        }
        else if(value>=1){
            return 1
        }
        else if(value<=0){
            return 0
        }
    }

    const handleChange = (index) => e => {
        const path = kpiMap[index];
        props.score.kraAreas[path[0]].kras[path[1]].kpis[path[2]].thirdPartyScore = e.target.value;
        props.score.kraAreas[path[0]].kras[path[1]].kpis[path[2]].Rating = itemRating(e.target.value)
        props.setScore({...props.score});
    }

    const addNote =(index) =>e => {
        
        const path = kpiMap[index];
        
        props.score.kraAreas[path[0]].kras[path[1]].kpis[path[2]].comment=== undefined?
         props.score.kraAreas[path[0]].kras[path[1]].kpis[path[2]].comment="":console.log("note") 
        const show = !showNote.status;
        SetShowNote({status:show, value:index})
        
    }
    const display= (isShow,index)=>{
     return   !isShow&index==showNote.value?"hidden":""
    }
    

    const handleTextChange = e => {
        showNote.tempText= e.target.value;
        SetShowNote({...showNote});
        console.log(showNote.tempText);
    }

    const SaveNote =()=>{
        const path = kpiMap[showNote.value];
        const prevComment= props.score.kraAreas[path[0]].kras[path[1]].kpis[path[2]].comment +"\n"
      const comment = prevComment.concat("\n",showNote.tempText) 
      props.score.kraAreas[path[0]].kras[path[1]].kpis[path[2]].comment = comment;
      props.setScore({...props.score});
      SetShowNote({status:false, value:"", tempText:""})
        console.log(props.score)
    }
   
    return (
<>
        <div className='mt-8 bg-white p-8 rounded-md shadow-md  text-xs w-12/12'>
        <table className = "table-auto">
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
                    <th>H.O.D</th>
                    <th >3RD PARTY SCORE</th>
                    <th >WEIGHT</th>
                    <th >RATING (1-4)</th>
                    <th >WEIGHT X RATING</th>
                    <th >COMMENT</th>

                </tr>
            </thead>
            <tbody>
                
                {props.data!==undefined?props.data.map((data,index)=>{
                    return(
                    <tr className='text-center border-b-2' key={index}>
                    <td >{data[0]}</td>
                    <td>{data[1]}</td>
                    <td>{data[2].name}</td>
                    <td>{data[2].target}</td>
                    <td>{data[2].completionPeriod}</td>
                    <td>{data[2].tracking}</td>
                    <td>{data[2].selfScore}</td>
                    <td>{data[2].LineHeadScore}</td>
                    <td >{data[2].hodScore}</td>
                    <td ><input className="border text-center h-6" type ="number" onChange={handleChange(index)} value={data[2].thirdPartyScore}/></td>
                    <td >{data[2].weight}</td>
                    <td >{data[2].Rating}</td>
                    <td zz>{props.weightbyValue[index]}</td>
                    <td className="px-2">{data[2].comment}</td>
                    <td onClick={addNote(index)} className={`bg-blue-200 text-xs cursor-pointer text-white ${display(!showNote.status,index)} `}>Add/View Note</td>
                    
                    </tr>)

                }):<></>}
            </tbody>
        </table>

        

    </div>
    {showNote.status?
    (<div className='absolute h-screen w-screen flex justify-center items-center bg-gray-800 flex-col top-0 opacity-95'>
        <h3 className='text-gray-100 text-lg'>Enter your comment</h3>
        <textarea onChange={handleTextChange}  className='w-3/6 h-1/12 m-10'></textarea>
        <button onClick={SaveNote } className='text-white bg-red-300 p-2 w-20'>Save</button>
        <button onClick= {()=>SetShowNote({showNote:false})} className="absolute left-10 top-6 text-red-300 text-2xl">Close</button>
    </div>):<></>}
</>
    )
}