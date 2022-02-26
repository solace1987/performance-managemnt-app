import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Layout from "../component/Layout.js";
import React, { useState } from "react";
import { allSubmittedCard } from "../../public/api/scorecardApi";
import { localFetch,reFormatData } from "../../public/api/helper";
import ScorecardTable from "../component/SorecardTable";

export default function AllsubmittedCard() {
  const currentPeriod = ()=>{
    const month=new Date().getMonth()
    const monthIndex = month==0?11:month-2;
    return monthIndex; 
  }


  const currentToken = localFetch("token");
  const [onMonth, SetOnMonth] = useState({ change: false, value: currentPeriod() });
  const [data, SetData] = useState([]);
 

  const months = [
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
  ];

 
  const search = () => {

    
    allSubmittedCard(currentToken,onMonth.value)
    .then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        SetData(data);
        
        SetOnMonth({...onMonth, change: true });
    };
  })

}
 
  return (
    <Layout>
     <div className="flex flex-row m-8 items-center">
      <Dropdown
        onChange={(event) => {
          const month = months.indexOf(event.value);
          SetOnMonth({...onMonth, value: month });
        }}
        className=" text-gray-800  w-2/6 shadow-sm  mb-2 mr-6 pl-2"
        value ={ months[currentPeriod()]}
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
        placeholder="Select Evaluating Month"
      />
      <button onClick={search} className="bg-red-500 h-10 text-white w-24 ">
        Search
      </button>
    </div>
    <div className="border-t border-2 border-grey-200">
      {onMonth.change ? (
        <div>
          
              {
                data.map((card,index)=>{
                    const selected = card;
                    const data = reFormatData(selected);
                    data.department = selected.department;
                    data.unit = selected.unit;
                    data.evaluationPeriod= selected.evaluationPeriod;
                    data.rating = selected.rating;
                    data.staff = selected.staff;
                    data.version = selected.version
    
                  return(
                    <>
                              <div className=" inset-x-0 top-16 pb-8 bg-indigo-100 m-8 border shadow-2xl">
                <div>
                  {

<fieldset className="border-2 text-sm text-red-700 flex flex-col    w-4/12">
          <legend>Score Card Info</legend>
          <label className="ml-2 text-gray-800">Name</label>
          <input
            id="sName"
            value={data["staff"]}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-800">Version</label>
          <input
            id="sName"
            value={data["version"]}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-700 text-gray-800">Unit</label>
          <input
            value={data["unit"]}
            id="unit"
            className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-700">Department</label>
          <input
            value={data["department"]}
            id="dept"
            className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />

          <label className="ml-2 text-gray-700">Evaluation Period</label>

          <input
           
            value={data.evaluationPeriod}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />

          <label className="ml-2 text-gray-800">Rating</label>
          <input
            id="sName"
        
            value={ data.rating }
            className="border-2 teixt-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
        </fieldset>



                  }
                  
                </div>
                <ScorecardTable data={data["data"]} />
              </div>
                    </>

                  )
                })
             
              }
            
        </div>
      ) : (
        <div className="p-28">
          <h1 className="text-5xl text-gray-300 font-black">
            Select an Evaluation Period
          </h1>
        </div>
      )}
    </div>
    <div>
      {
    
      }
    </div>
  </Layout>
    
  );
}
