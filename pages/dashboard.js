import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from "react-vis";

import { SubmittedSummary } from "../public/api/scorecardApi";
import { localFetch } from "../public/api/helper";
import Layout from "./component/Layout";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  let currentUser = "";
  let currentToken = "";
  const [summaryData, SetSummaryData] = useState([]);
  if (typeof window !== "undefined") {
    currentUser = localFetch("user");
    currentToken = localFetch("token");
  }
  
  useEffect(() => {
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

  return (
    <Layout>
      <div className="m-10">
        <XYPlot
          margin={{ bottom: 30 }}
          style={{ fontSize: 14 }}
          xType="ordinal"
          width={300}
          height={250}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={0} />
          <YAxis />
          <VerticalBarSeries
            data={summaryData}
            style={{
              width: 40,
              fill: "rgba(59, 130, 246, 0.7)",
              stroke: "rgba(59, 130, 246, 0.7)",
            }}
          />
        </XYPlot>
      </div>
      <div className="flex flex-row w-screen justify-between">
        <div className="w-2/4">
          <div>
            <h2 className="text-gray-500 font-black text-md m-8 mt-12">
              Performance Summary
            </h2>
          </div>
          <div>
            <table className="w-2/4 ml-10">
              <thead className="border-b-2">
                <tr>
                  <th className="text-left text-sm font-medium text-blue-600">
                    Period
                  </th>
                  <th className="font-medium text-sm text-blue-600">Score</th>
                </tr>
              </thead>

              {summaryData !== undefined ? (
                summaryData.map((data,index) => {
                  return (
                    <>
                      <tr>
                        <th className="text-gray-500 text-xs font-medium text-left">
                          {data.x}
                        </th>
                        <th className="text-gray-800 text-sm font-medium ">
                          {data.y}
                        </th>
                      </tr>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </table>
          </div>
        </div>
        <div className="w-2/4">
          <div>
            <h2 className="text-gray-500 font-black text-md m-10 mt-12">
              KRA Area Summary
            </h2>
          </div>
          <div>
            <table className="w-2/4 ml-10">
              <thead className="border-b-2">
                <tr>
                  <th className="text-left text-sm font-medium text-blue-600">
                    Area
                  </th>
                  <th className="font-medium text-sm text-blue-600">
                    Average Score
                  </th>
                </tr>
              </thead>

              {/* <tr>
                            <th className='text-gray-500 text-xs font-medium text-left'>Incident Management</th>
                            <th className='text-gray-800 text-sm font-medium '>67%</th>
                        </tr>
                        <tr >
                            <th className='text-gray-500 text-xs font-medium text-left'>Network Management</th>
                            <th className='text-gray-800 text-sm font-medium '>70%</th>
                        </tr>
                        <tr >
                            <th className='text-gray-500 text-xs font-medium text-left'>Maintenance</th>
                            <th className='text-gray-800 text-sm font-medium '>77%</th>
                        </tr> */}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
