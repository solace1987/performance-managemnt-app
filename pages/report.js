import Layout from "./component/Layout.js";
import { localFetch } from "../public/api/helper";
import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import { updateSubmittedCard } from "../public/api/scorecardApi";
import "react-dropdown/style.css";

export default function MainReport(){
 const [users, SetUsers]= useState([])
 const [submittedCard, SetSubmittedCard]= useState([])
 const currentPeriod = ()=>{
    const month=new Date().getMonth()
    const monthIndex = month==0?11:month-2;
    return monthIndex; 
  }

  
  const currentToken = localFetch("token");
  const [onMonth, SetOnMonth] = useState({ change: false, value: currentPeriod() });
  const [data, SetData] = useState([]);
  const [onEdit, SetonEdit] = useState({status:false,card:{}})

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

  const editStaff = (index)=>{
    let match = {}
    const card = data[index];
    Object.assign(match, card);
    SetonEdit({status:true, card:match})
    
  }

  

/*  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    SubmittedSummary(currentUser._id, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data)
        const graph = data.map((dat) => {
          
          return dat.graph;
        });
        SetSummaryData(graph);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
 */
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
    <div>
          <h2 className="font-black text-xl pl-8">Scorecards to Evaluate</h2>
          <table className="w-11/12 mt-4 ">
            <thead className="bg-blue-50 rounded-md  text-gray-600 ">
              <tr className="">
                <th className="pl-16 h-12">Staff Name</th>
                <th>Unit</th>
                <th>Evaluating Month</th>
                <th>Line-head Review</th>
                <th>Thirdparty/HOD Review</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>
        </div>
    </Layout>)
}