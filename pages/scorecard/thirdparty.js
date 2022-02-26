import ThirdPatySubmitTable from "../component/ThirdPatySubmitTable";
import { reFormatData, localFetch,kpiValueMapper} from "../../public/api/helper";
import { updateSubmittedCard } from "../../public/api/scorecardApi";
import { useState } from "react";
import { useRouter } from "next/router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function HodSubmitScoreCard(props) {
  const router = useRouter();
  const [scoreCard, SetScorecard] = useState(props.scorecard);
  const currentToken = localFetch("token");

  const data = reFormatData(scoreCard);

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


 const weightbyValue= data != undefined?( data.data.map((datum) => {
    const weightVal = (
      (Number(datum[2].weight) / 100) *
      itemRating(Number(datum[2].thirdPartyScore))
    ).toFixed(2);
    return Number(weightVal);
  })):[0,0];

const rating = ((weightbyValue.reduce((prev,curr)=>prev+curr)/4)*100).toFixed(2);
const setRating =  (e)=>{
  SetScorecard({...scoreCard, rating:rating}); 
  console.log(scoreCard);
}
  const clickSubmit = (e) => {
    e.preventDefault();
    const kpiMap = kpiValueMapper(data.data)
    weightbyValue.map((eachWeight,index)=>{
      const path = kpiMap[index];
      scoreCard.kraAreas[path[0]].kras[path[1]].kpis[path[2]].WeightbyRating = eachWeight;
    })
    scoreCard.rating=rating
     updateSubmittedCard(scoreCard._id, currentToken, scoreCard).then((data) => {
      props.changeStatus({status:false,card:{}})
    }); 
    //console.log(scoreCard)
  };

  return (
    <>
      {
        data != undefined?(
          <div className="absolute top-0 ">
          <div className="bg-indigo-100 pl-20">
        <fieldset className="border-2 text-sm text-red-700 flex flex-col bg-white   w-4/12">
          <legend>Score Card Info</legend>
          <label className="ml-2 text-gray-800">Name</label>
          <input
            id="sName"
            value={scoreCard["staff"]}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-800">Version</label>
          <input
            id="sName"
            value={scoreCard["version"]}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-700 text-gray-800">Unit</label>
          <input
            value={scoreCard["unit"]}
            id="unit"
            className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-700">Department</label>
          <input
            value={scoreCard["department"]}
            id="dept"
            className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />

          <label className="ml-2 text-gray-700">Evaluation Period</label>

          <Dropdown
            onChange={(event) => {
              const month = event.value;
              SetScorecard({ ...scoreCard, evaluationPeriod: month });
            }}
            className=" text-gray-800 shadow-sm  mb-2 mr-6 pl-2"
            options={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
            value={scoreCard.evaluationPeriod}
            placeholder="Select Month"
          />

          <label className="ml-2 text-gray-800">Rating</label>
          <input
            id="sName"
        
            value={ rating }
            className="border-2 teixt-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
        </fieldset>
      </div>
      <div className="pl-20 pb-10 bg-indigo-100 h-full flex flex-row-reverse">
        <button
          type="button"
          className="m-4 h-10 w-24 self-center p-2 text-white border bg-green-800"
          onClick={clickSubmit}
        >
          Submit
        </button>

        <ThirdPatySubmitTable
          data={data.data}
          setScore={SetScorecard}
          score={scoreCard}
          weightbyValue={weightbyValue}
        />
      </div>
          </div>
        ):<></>
      }
    </>
  );
}
