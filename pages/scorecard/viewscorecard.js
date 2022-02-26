import { reFormatData } from "../../public/api/helper";
import Image from "next/image";
import { localFetch } from "../../public/api/helper.js";
import { listSubmitted } from "../../public/api/scorecardApi.js";
import { useState, useEffect } from "react";
import Layout from "../component/Layout.js";
import PrevImg from "../../public/image/eye.png";
import ScorecardTable from "../component/SorecardTable";

export default function ManageScorecard() {
  const [scoreCard, SetScorecard] = useState([]);
  const [convData, SetCovData] = useState([]);
  const [ispreview, SetIsPreview] = useState(false);
  useEffect(() => {
    let currentToken = "";
    let currentUser = "";
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (typeof window !== "undefined") {
      currentToken = localFetch("token");
      currentUser = localFetch("user");
    }
    listSubmitted(currentUser._id, currentToken, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        SetScorecard(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const previewCard = (index) => {
    const selected = scoreCard[index];
    const data = reFormatData(selected);
    data.department = selected.department;
    data.unit = selected.unit;
    data.evaluationPeriod= selected.evaluationPeriod;
    data.rating = selected.rating;
    data.staff = selected.staff;
    data.version = selected.version
    SetCovData(data);
    SetIsPreview(true);
  };

  return (
    <>
      <Layout>
        <div className="w-full mt-12">
          <h2 className="text-center mt-8 mb-16 text-gray-800 text-2xl font-black">
            All Submitted Score cards
          </h2>

          {ispreview === false ? (
            <div className="mt-8 p-4">
              <table className="w-full mt-4">
                <thead className="border-b-2 font-md  text-gray-600">
                  <tr className="">
                    <th>S/N</th>
                    <th>Department</th>
                    <th>Unit</th>
                    <th>Designation</th>
                    <th>Version</th>
                    <th>Created Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {scoreCard.map((data, index) => {
                    return (
                      <tr className="text-center py-4" key={index}>
                        <td>{index + 1}</td>
                        <td>{data.staff}</td>
                        <td>{data.unit}</td>
                        <td>{data.evaluationPeriod}</td>
                        <td>{data.rating}</td>
                        <td>
                          {new Date(data.dateSubmited).toLocaleDateString()}
                        </td>
                        <td
                          className="cursor-pointer"
                          onClick={() => previewCard(index)}
                        >
                          <Image src={PrevImg} width={20} height={20} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div className=" absolute inset-x-0 top-16 pb-8 bg-white m-8 border shadow-2xl">
                <div>
                  {

<fieldset className="border-2 text-sm text-red-700 flex flex-col bg-white   w-4/12">
          <legend>Score Card Info</legend>
          <label className="ml-2 text-gray-800">Name</label>
          <input
            id="sName"
            value={convData["staff"]}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-800">Version</label>
          <input
            id="sName"
            value={convData["version"]}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-700 text-gray-800">Unit</label>
          <input
            value={convData["unit"]}
            id="unit"
            className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
          <label className="ml-2 text-gray-700">Department</label>
          <input
            value={convData["department"]}
            id="dept"
            className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />

          <label className="ml-2 text-gray-700">Evaluation Period</label>

          <input
           
            value={convData.evaluationPeriod}
            className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />

          <label className="ml-2 text-gray-800">Rating</label>
          <input
            id="sName"
        
            value={ convData.rating }
            className="border-2 teixt-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2"
          />
        </fieldset>



                  }
                  <div
                    onClick={() => SetIsPreview(false)}
                    className="bg-red-400 text-center m-5  cursor-pointer text-white w-24"
                  >
                    Go back
                  </div>
                </div>
                <ScorecardTable data={convData["data"]} />
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
