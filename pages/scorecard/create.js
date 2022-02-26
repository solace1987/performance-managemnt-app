import { useState } from "react"
import KpiGen from "../component/KpiGeneratorComponent"
import ScorecardTable from "../component/SorecardTable";
import { createScorecard } from '../../public/api/scorecardApi.js'
import { localFetch } from '../../public/api/helper.js';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Manage() {
     
    const router = useRouter()
    let currentToken = ''

    const [kpi, SetKpi] = useState({
        name: "",
        target: "",
        completionPeriod: "",
        tracking: "",
        selfScore: 0,
        LineHeadScore: 0,
        hodScore:0,
        thirdPartyScore: 0,
        weight: 0,
        Rating: 0,
        WeightbyRating: 0,
        comment:"",
    })

    const [kra, setKra] = useState({
        name: "",
        kpis: []
    })
    const [saveButton, isSaveButton]= useState(false)
    const [kraArea, setKraArea] = useState({
        name: "",
        kras: []
    })

    const [scoreCard, SetScorecard] = useState({
        kraAreas: [],
        rating: 0,
        version: "",
        unit: "",
        department: '',
        designation:'',
        dateCreated: Date.now()
    })
    const [preview, SetPreview] = useState(false)
    const [tableData, SetTableData] = useState([])


    const handleChange = name => event => {
        SetScorecard({ ...scoreCard, [name]: event.target.value })

    }


    if (typeof window !== "undefined") {
        currentToken = localFetch('token')
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        createScorecard(scoreCard, currentToken).then((data) => {
            
        })
        router.push('/admin/manage')
    }
    return (
        <div>
            <div className='w-full' >
            <div className="bg-indigo-500 h-12 pl-2 pt-2">
                    <Link href='/admin/manage'>
                        <div className='text-center text-white cursor-pointer border-2 w-20'>BACK</div>

                    </Link>
                </div>

                <div>
                    <fieldset className="border-2 text-blue-700 flex flex-col mt-2 ml-4 w-4/12">
                        <legend>Score Card Info</legend>
                        <label className="ml-2 text-gray-800" >Version</label>
                        <input id='sName' value={scoreCard["version"]} onChange={handleChange('version')} className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2" />
                        <label className="ml-2 text-gray-700 text-gray-800" >Unit</label>
                        <input value={scoreCard["unit"]} onChange={handleChange('unit')} id="unit" className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2" />
                        <label className="ml-2 text-gray-700" >Department</label>
                        <input value={scoreCard["department"]} onChange={handleChange('department')} id="dept" className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2" />
                        <label className="ml-2 text-gray-800" >Owner Designation</label>
                        <input id='sName' value={scoreCard["designation"]} onChange={handleChange('designation')} className="border-2 text-gray-800 shadow-sm ml-2 mb-2 mr-6 pl-2" />
                        <label className="ml-2 text-gray-700" >Creation Date</label>
                        <input type='date' value={scoreCard["dateCreated"]} onChange={handleChange('dateCreated')} id="cDate" className="border-2 shadow-sm ml-2 mb-2 mr-6 pl-2" />

                    </fieldset>
                </div>

                <KpiGen setKpiObject={SetKpi} kpiObject={kpi} kraObject={kra} setKraObject={setKra} onSetPreview={SetPreview}
                    kraAreaObject={kraArea} setKraAreaObject={setKraArea} scorecardObject={scoreCard} setScorecardObject={SetScorecard} setData={SetTableData} />


                {
                    preview ? <> <ScorecardTable data={tableData['data']} ></ScorecardTable> <button className=' px-8 m-2 p-2 bg-red-600 text-white' onClick={clickSubmit}>Save</button></> : <></>

                }
                

            </div>

        </div>
    )
}