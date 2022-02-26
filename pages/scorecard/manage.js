import { useState, useEffect } from "react";
import Layout from "../component/Layout.js";
import Link from "next/link";
import { localFetch } from "../../public/api/helper.js";
import { listSubmitted } from "../../public/api/scorecardApi.js";
import viewImg from "../../public/image/View.svg";
import submitImg from "../../public/image/Submit.svg";
import Image from "next/image";
import evaluation from "../../public/image/evaluation.svg";
import AccessLink from "../component/AccessLink.js";
import Access from "../component/Access.js";
import { readUser } from "../../public/api/userApi.js";

export default function Manage() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    unit: "",
    designation: "",
    scorecardId: "",
  });
  const [scoreCard, SetScorecard] = useState([]);
  let currentToken = "";
  let currentUser = "";

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (typeof window !== "undefined") {
      currentToken = localFetch("token");
      currentUser = localFetch("user");
    }
    readUser(currentUser._id, currentToken, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        data.staff= currentUser.lastname
        setValues((prevState) => {
          return { ...prevState, ...data };
        });
      }
    });

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

  return (
    <>
      <div className="overflow-x-hidden">
        <Layout>
          <div className="text-md pt-16 ">
            <div className="flex flex-row h-12/12  w-full mx-4 justify-center  gap-x-32 ">
              <Link href="/scorecard/submit">
                <div className="flex flex-col justify-center bg-yellow-300 w-36 h-36 cursor-pointer rounded">
                  <Image src={submitImg} width={70} height={70} />
                  <h2 className="text-center text-xs font-black text-gray-800 mt-4">
                    Submit Scorecard
                  </h2>
                </div>
              </Link>
              <Link href="/scorecard/viewscorecard">
                <div className="flex flex-col justify-center bg-blue-400 w-36 h-36 rounded cursor-pointer">
                  <Image src={viewImg} width={70} height={70} />
                  <h2 className="text-center text-xs font-black text-gray-800 mt-4">
                    View Scorecard
                  </h2>
                </div>
              </Link>
              <Access>
                <AccessLink
                  role={values.role}
                  link={"/scorecard/userlist?name=linehead"}
                  heading={"Evaluate as Linehead"}
                  image={evaluation}
                  color="bg-green-400 "
                />
                <AccessLink
                  role={values.role}
                  link={"/scorecard/userlist?name=HOD"}
                  heading={"Evaluate as HOD"}
                  image={evaluation}
                  color={"bg-indigo-400"}
                />
              </Access>
            </div>

            <div className="mt-8 p-4 ">
              <h2 className="font-black text-xl">Submited Scorecards</h2>
              <table className="w-11/12 mt-4 ">
                <thead className="bg-blue-50 rounded-md  text-gray-600 ">
                  <tr className="">
                    <th>S/N</th>
                    <th className="pl-16 h-12 text-left">Month</th>
                    <th>Submited Date</th>
                    <th>Score</th>
                    <th>Version</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreCard.map((data, index) => {
                    return (
                      <tr className="text-center border-b-2 h-14 border-gray-100">
                        <td>{index+1}</td>
                        <td className="pl-16 text-left">{data.evaluationPeriod}</td>
                        <td>
                          {new Date(data.dateSubmited).toLocaleDateString()}
                        </td>
                        <td>{data.rating}</td>
                        <td>{data.version}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
