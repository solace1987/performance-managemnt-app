import KraAreas from "../component/KraAreas";
import SubmitTable from "../component/submitTable";
import {
  reFormatData,
  localFetch
} from "../../public/api/helper";
import { readScorecard, SubmitScore } from "../../public/api/scorecardApi";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function SubmitScoreCard(props) {
    const router = useRouter()
    const [scoreCard, SetScorecard] = useState({});
    let currentToken = "";
    let currentUser = {};

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
            data ={...data,owner:currentUser._id}
          SetScorecard(data);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, []);
console.log(scoreCard)
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
          <label className="ml-2 text-gray-800">Owner Designation</label>
          <input
            id="sName"
            value={scoreCard["designation"]}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />

          <label className="ml-2 text-gray-700">Evaluation Period</label>
          <input
            type="date"
            value={scoreCard["evaluationPeriod"]}
            id="EDate"
            className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-800">Rating</label>
          <input
            id="sName"
            value={scoreCard["rating"]}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
        </fieldset>
      </div>
      <div className="pl-20 pb-10 bg-indigo-100 h-full flex flex-row-reverse">
        <button
          type="button"
          className="m-4 h-10 w-24 self-center p-2 text-white border bg-green-400"
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
