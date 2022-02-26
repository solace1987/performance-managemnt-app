
import SubmitTable from "../component/submitTable";
import { reFormatData, localFetch,getMonth } from "../../public/api/helper";
import { readScorecard, SubmitScore } from "../../public/api/scorecardApi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function SubmitScoreCard(props) {
  const router = useRouter();
  const [scoreCard, SetScorecard] = useState({});
  let currentToken = "";
  let currentUser = {};

  const handleChange = name => event => {
    SetScorecard({ ...scoreCard, [name]: event.target.value })

}
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (typeof window !== "undefined") {
      currentToken = localFetch("token");
      currentUser = localFetch("user");
    }

    readScorecard(currentUser.scorecardId, currentToken, signal).then(
      (data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          data = { ...data, owner: currentUser._id, evaluationPeriod:`${getMonth(new Date().getUTCMonth()-1)} ${new Date().getFullYear()}`, staff:`${currentUser.lastName} ${currentUser.firstName}` };
          SetScorecard(data);
          
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const data = reFormatData(scoreCard);

  const clickSubmit = (e) => {
    if (typeof window !== "undefined") {
      currentToken = localFetch("token");
    }
    e.preventDefault();
    SubmitScore(scoreCard, currentToken).then((data) => {});
    router.push("/scorecard/manage");
  };
 
  return (
    <>
      <div className="bg-indigo-100 pl-20">
        <fieldset className="border-2 text-sm text-red-700 flex flex-col bg-white   w-4/12">
          <legend>Score Card Info</legend>
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

          <Dropdown onChange={(event)=>{
                      const month = event.value;
                      SetScorecard({...scoreCard,evaluationPeriod:`${month} ${new Date().getFullYear()}`})
                      }} 
                      className=" text-gray-800 shadow-sm  mb-2 mr-6 pl-2" 
                      options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}  
                      value={scoreCard.evaluationPeriod} 
                      placeholder="Select Month" 
                      />
                      
          <label className="ml-2 text-gray-700" >Submision Date</label>
          <input type='date' value={new Date().now} onChange={handleChange('dateSubmited')} className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2"  />
          <label className="ml-2 text-gray-800">Rating</label>
          <input
            id="sName"
            value={scoreCard["rating"]}
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

        <SubmitTable
          data={data.data}
          setScore={SetScorecard}
          score={scoreCard}
        />
      </div>
    </>
  );
}
