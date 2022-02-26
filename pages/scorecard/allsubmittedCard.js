import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Layout from "../component/Layout.js";
import Image from "next/dist/client/image";
import editImg from "../../public/image/edit.svg";
import React, { useState } from "react";
import { allSubmittedCard } from "../../public/api/scorecardApi";
import { localFetch } from "../../public/api/helper";
import {useRouter} from "next/router";
import AccessorCard from "./AcessorCard"

export default function AllsubmittedCard() {
  const currentPeriod = ()=>{
    const month=new Date().getMonth()
    const monthIndex = month==0?11:month-2;
    return monthIndex; 
  }

  const { query } = useRouter();
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
          <h2 className="font-black text-xl pl-8">Scorecards to Evaluate</h2>
          <table className="w-11/12 mt-4 ">
            <thead className="bg-blue-50 rounded-md  text-gray-600 ">
              <tr className="">
                <th className="pl-16 h-12">Staff Name</th>
                <th>Unit</th>
                <th>Evaluating Month</th>
                <th>Line-head Review</th>
                <th>HOD Review</th>
                <th>Thirdparty Review</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((card,index)=>{
                  return(
                    <>
                    <tr  className='text-center' key={index}>
                    <td >{card.staff.charAt(0).toUpperCase() + card.staff.slice(1)}</td>
                    <td>{card.unit}</td>
                    <td>{months[onMonth.value]}</td>
                    <td>{card.kraAreas[0].kras[0].kpis[0].LineHeadScore==0?"Not Done":"Done"}</td>
                    <td>{card.kraAreas[0].kras[0].kpis[0].hodScore==(0||undefined)?"Not Done":"Done"}</td>
                    <td>{card.kraAreas[0].kras[0].kpis[0].thirdPartyScore==0?"Not Done":"Done"}</td>
                    <td>
                    <div onClick={()=>editStaff(index)} className="cursor-pointer">
                      <Image src={editImg} height={17} width={17} />
                    </div>
                  </td>
                  </tr>
                    </>

                  )
                })
             
              }
            </tbody>
          </table>
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
        onEdit.status?(<AccessorCard accessor={query.name} scorecard={{...onEdit.card}} changeStatus={SetonEdit}></AccessorCard>):<></>
      }
    </div>
  </Layout>
    
  );
}
