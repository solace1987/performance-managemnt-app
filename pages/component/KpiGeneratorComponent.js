import { useState } from "react"
import { handleObjectChange, reFormatData, kpiTitleFormater } from '../../public/api/helper.js';

export default function KpiGenCompo(props) {
    const active = {
        bar: 'bg-blue-400',
        body: 'block'
    }

    const inactive = {
        bar: 'bg-indigo-50',
        body: 'hidden'
    }

    const [kpiDisplay, SetKpiDisplay] = useState({ bar: 'bg-blue-600', body: 'block' })
    const [kraDisplay, SetKraDisplay] = useState(inactive)
    const [kraAreaDisplay, SetKraAreaDisplay] = useState(inactive)
    const [kraInput, SetKraInput] = useState('');
    const [kraAreaInput, SetKraAreaInput] = useState('');
    const [isEdit, SetIsEdit] = useState({ status: false, id: [] })
    const [tempKra, setTempkra] = useState({});

    const handleKraInputChange = e => {
        const value = e.target.value
        SetKraInput(value)
    }

    const handlekraAreaInput = e => {
        const value = e.target.value
        SetKraAreaInput(value)
    }

    const KpiDiv = () => {
        const kpiProp = [];
        for (const property in props.kpiObject) {
            kpiProp.push(property)
        }
        return kpiProp
    }

    const createKra = () => {
        props.setKraAreaObject({ ...props.kraAreaObject, ['kras']: [...props.kraAreaObject.kras, { name: kraInput }] })
        SetKraInput("")

    }

    const onKpiEdit = (kpi, id) => {
        SetIsEdit({ status: true, id: id })
        props.setKpiObject(kpi)
        SetKpiDisplay(active); SetKraDisplay(inactive); SetKraAreaDisplay(inactive)
        console.log(id)
    }

    const onKpiCancel = (id) => {
        const index = id
        let newKraArea = { ...props.kraAreaObject };
        newKraArea['kras'][index[0]].kpis.splice(index[1], 1);
        props.setKraAreaObject(newKraArea)

    }
    const onNextKpi = () => {
        if (isEdit.status === false) {
            SetKpiDisplay(inactive); SetKraDisplay(active); SetKraAreaDisplay(inactive);
        }

        else if (isEdit.status) {
            const index = isEdit.id;
            let newKraArea = { ...props.kraAreaObject };
            newKraArea['kras'][index[0]].kpis.splice(index[1], 1, props.kpiObject)
            props.setKraAreaObject(newKraArea)

            SetKpiDisplay(inactive); SetKraDisplay(active); SetKraAreaDisplay(inactive);
            props.setKpiObject({
                name: "",
                target: "",
                completionPeriod: "",
                tracking: "",
                selfScore: 0,
                LineHeadScore: 0,
                thirdPartyScore: 0,
                weight: 0,
                Rating: 0,
                WeightbyRating: 0
            })
            SetIsEdit({ status: false, id: [] })
        }


    }
    const onKraSelect = (e) => {

        if (isEdit.status === false) {
            let KraName = e.target.innerText
            const kras = props.kraAreaObject.kras
            const index = props.kraAreaObject.kras.findIndex(kra => kra.name === KraName)
            const selectedkra = kras[index]
            selectedkra.kpis = selectedkra['kpis'] === undefined ? [props.kpiObject] : [...selectedkra.kpis, props.kpiObject]
            props.setKraAreaObject({ ...props.kraAreaObject, kras: kras })
            console.log(props.kraAreaObject)
            props.setKpiObject({
                name: "",
                target: "",
                completionPeriod: "",
                tracking: "",
                selfScore: 0,
                LineHeadScore: 0,
                thirdPartyScore: 0,
                weight: 0,
                Rating: 0,
                WeightbyRating: 0
            })
        }
        //  SetKpiDisplay(inactive); SetKraDisplay(inactive); SetKraAreaDisplay(active);

    }



    const createKraArea = () => {
        const kraArea = { name: kraAreaInput }
        //props.setKraAreaObject(kraArea)
        props.setScorecardObject({ ...props.scorecardObject, kraAreas: [...props.scorecardObject.kraAreas, kraArea] })
        SetKraAreaInput("")
        console.log(tempKra)
    }
    const objectSelecter = (keyName, objectArray) => {
        const index = objectArray.findIndex(ele => ele.name === keyName)
        const selectedObject = objectArray[index];
        return selectedObject
    }
    const onKraAreaSelect = (e) => {
        // console.log(e)
        // if(e.target.inScorecard===undefined||e.target.inKraAreas===false){

        const kraAreaName = e.target.attributes.area.nodeValue
        const kraName = e.target.innerText
        const kras = props.kraAreaObject.kras
        const krasIndex = kras.findIndex(ele => ele.name === kraName)
        const kraArea = kras[krasIndex]

        const kraAreas = props.scorecardObject.kraAreas
        const kraAreaIndex = kraAreas.findIndex(ele => ele.name === kraAreaName)
        let scorecardKraArea = kraAreas[kraAreaIndex]
        kras.splice(krasIndex, 1)
        scorecardKraArea = scorecardKraArea['kras'] === undefined ? { ...scorecardKraArea, kras: [kraArea] } : { ...scorecardKraArea, kras: [...scorecardKraArea.kras, kraArea] }
        kraAreas.splice(kraAreaIndex, 1, scorecardKraArea)
        props.setScorecardObject((prevState) => { return { ...prevState, kraAreas: kraAreas } })
        props.setKraAreaObject({ ...props.kraAreaObject, kras: kras })

    }

    const onKraAreaCancel = (kra, index) => {
        const kraAreas = props.scorecardObject.kraAreas[index[0]]['kras']
        const removedKra = kraAreas.splice(index[1], 1)
        const kraAreasPool = props.kraAreaObject.kras
        kraAreasPool.push(kra)
        props.setKraAreaObject({ ...props.kraAreaObject, kras: kraAreasPool })
        console.log(kra)

    }
    const removeTag = (object, name, index, setObject) => {

        const arrToModify = object[name]
        arrToModify.splice(index, 1)
        setObject({ ...object, [name]: arrToModify })
    }


    const convertData = () => {

        const data = reFormatData(props.scorecardObject)
        props.setData(data)
    }
    const onSplit = () => {
        SetKpiDisplay(inactive);
        SetKraDisplay(inactive);
        SetKraAreaDisplay(active);

    }



    return (
        <>

            <div>
                <div id="kpiheader" className={`${kpiDisplay.bar} mt-4 p-1 bg-blue-200`}>
                    <h2 className="text-white pl-4 ">KPI</h2>
                </div>
                <div className={`p-2 flex flex-col ${kpiDisplay.body}`}>
                    <button className={`bg-green-600 rounded-sm w-20 p-1 text-white ml-4 ${kpiDisplay == 'hidden' ? "block" : "hidden"}`} onClick={() => SetDisplay('flex flex-col m-2')}>Create</button>


                    <div className={kpiDisplay.body}>
                        {
                            KpiDiv().map((kpi, index) => {
                                return (
                                    <>
                                        <div className='pl-8' key={index}>
                                            <label className="text-xs  text-blue-700 pr-2 font-semibold antialiased">{kpiTitleFormater(kpi)}</label>
                                            <input className='mr-8 my-2 border-2 w-7/12 p-2 text-xs' onChange={handleObjectChange(kpi, props.kpiObject, props.setKpiObject)} placeholder={kpi} value={props.kpiObject[kpi]} />
                                        </div>
                                    </>

                                )
                            })
                        }
                        <button className={`bg-green-600 rounded-sm w-20 p-1 text-white m-4 ml-4 ${kpiDisplay == 'hidden' ? "hidden" : "block"}`} onClick={onNextKpi}>Next</button>
                    </div>

                </div>
            </div>

            {/* THIS IS KRA SECTION */}

            <div>
                <div id="kraheader" className={`mt-1 p-1 ${kraDisplay.bar}`}>
                    <h2 className="text-white pl-4 ">KRA</h2>
                </div>
                <div className={`p-2  ${kraDisplay.body}`}>
                    <h2 className='my-1 mb-2 text-sm text-gray-500 text-center p-2'>Select the KRA under which the defined KPI falls, Create if it does not exist</h2>
                    <div className='flex flex-row justify-center p-2'>
                        <input id='kraname2' value={kraInput} onChange={handleKraInputChange} className='w-4/12 border-blue-200 border-2 pl-4 text-sm' />
                        <button className={`bg-indigo-600 rounded-sm w-20 p-1 text-white ml-4 `} onClick={createKra}>Create</button>
                    </div>

                    <div className='flex flex-row flex-wrap justify-center '>
                        {
                            props.kraAreaObject !== undefined ? props.kraAreaObject['kras'].map((kra, index1) => {
                                return (

                                    <>
                                        <div key={index1} className="m-2 shadow w-80  " >
                                            <div className='bg-indigo-700 text-white  my-2 mr-1  p-1 flex flex-row'>
                                                <h3 className='flex-grow cursor-pointer hover:bg-red-200 text-sm' onClick={onKraSelect} >{kra.name}</h3>
                                                <h1 onClick={() => removeTag(props.kraAreaObject, 'kras', index1, props.setKraAreaObject)} className=' hover:bg-red-500  hover:text-white right text-base px-2 w-6 cursor-pointer'>x</h1>
                                            </div>
                                            <ul className="w-full p-2">{kra.kpis != undefined ? (kra.kpis.map((kpi, index) => {
                                                return (
                                                    <>

                                                        <li key={index} className='text-xs flex justify-between flex-row'>
                                                            <h1>- {kpi.name}</h1>
                                                            <div className='text-green-400 cursor-pointer' onClick={() => onKpiEdit(kpi, [index1, index])} >Edit</div>
                                                            <div className='text-red-400 px-2 cursor-pointer' onClick={() => onKpiCancel([index1, index])} >X</div>
                                                        </li>

                                                    </>)
                                            })) : (<></>)}</ul>
                                        </div>
                                    </>
                                )
                            }) : <></>
                        }



                    </div>
                    <div className="flex flex-row mt-1 justify-between">
                        <div className='bg-pink-600 p-2 px-4 text-sm text-white my-4  mt-8 mx-4 rounded-lg cursor-pointer' onClick={() => { SetKpiDisplay(active); SetKraDisplay(inactive); SetKraAreaDisplay(inactive); console.log(props.kraAreaObject) }}>Create More <strong>KPI</strong></div>
                        <div className='bg-pink-600 p-2 px-4 text-sm text-white my-4  mt-8 mx-4 rounded-lg cursor-pointer' onClick={onSplit}>Split Created KRA into different <strong>Areas</strong></div>
                    </div>
                    { // <button onClick={UpdateKra} className="bg-green-600 rounded-sm w-20 p-1  mt-4 text-white ml-4">Next</button> 
                    }
                </div>
            </div>

            {/* THIS IS KRA AREA SECTION */}

            <div>
                <div id="kraareaheader" className={` mt-1 p-1 ${kraAreaDisplay.bar}`}>
                    <h2 className="text-white pl-4 ">KRA Area</h2>
                </div>
                <div className={`p-2 ${kraAreaDisplay.body}`}>

                    <h2 className='my-1 mb-2 text-sm text-gray-500 text-center p-2'>Select the KRA Area under which the defined KPA falls, Create if it does not exist</h2>
                    <div className='flex flex-row justify-center'>
                        <input id='kraname1' value={kraAreaInput} onChange={handlekraAreaInput} className='w-4/12 border-blue-200 border-2' />
                        <button className={`bg-indigo-600 rounded-sm w-20 p-1 text-white ml-4 `} onClick={createKraArea} >Create</button>
                    </div>

                    <div className='flex flex-row flex-wrap justify-center'>
                        {

                            props.scorecardObject !== undefined ? props.scorecardObject.kraAreas.map((kraArea, index) => {
                                return (
                                    <>
                                        <div className='w-4/12 border-2 m-2'>
                                            <h2 className='bg-blue-800 text-white pl-4'>{kraArea.name}</h2>

                                            <div className=' p-4 border-b-2'>
                                                <ol>
                                                    {kraArea.kras != undefined ? kraArea.kras.map((kra, index1) => {
                                                        return (
                                                            <div className='flex flex-row justify-between bg-gray-50 p-1 shadow-inner mb-1'>
                                                                <li className='text-xs'>-{kra['name']}</li>
                                                                <div className='text-red-400 px-2 cursor-pointer' onClick={() => onKraAreaCancel(kra, [index, index1])}  >X</div>
                                                            </div>)
                                                    }) : <></>}
                                                </ol>
                                            </div>
                                            {
                                                props.kraAreaObject.kras.map((kra, index) => {
                                                    return (
                                                        <>
                                                            <div onClick={onKraAreaSelect} area={kraArea.name} className='p-2 bg-green-600 text-white m-2 text-sm'>
                                                                {kra['name']}
                                                            </div>
                                                        </>
                                                    )

                                                })
                                            }
                                        </div>
                                    </>
                                )
                            }) : <></>
                            /*                    props.scorecardObject.kraAreas.map((kraArea, index) => {
                                return (

                                    <>
                                    <div key={index}className='shadow flex flex-col w-64 mx-4 my-8'>
                                        <div  className='bg-indigo-700 text-white  w-60 my-4 mr-1  p-1 flex flex-row w-12/12'>
                                            <h3 className='flex-grow'>{kraArea.name}</h3>
                                            <h1 onClick={()=>removeTag(props.scorecardObject,'kraAreas',index,props.setScorecardObject)} className=' hover:bg-red-500  hover:text-white right text-base px-2 w-6 cursor-pointer'>x</h1>
                                        </div>
                                        <div className='p-4'>
                                            {
                                              kraArea.kras!=undefined? kraArea.kras.map( (kra,index)=><li key={index}>{kra.name}</li>):(<></>)
                                     
                                                
                                                
                                            
                                            }

                                        </div>
                                            <div className="flex flex-row  p-4">
                                            
                                            <select onChange={(e)=>{SetKraSelectedArea(e.target.value)}} className='w-60'>
                                            <option value="">Select KRA</option>
                                                {props.kraAreaObject.kras.map((kra,index)=>{

                                                    return(
                                                        <>
                                                            <option  key={index} value={kra.name}>{kra.name}</option>
                                                        </>
                                                    )
                                                })}
                                            </select>
                                            <div onClick={onKraAreaSelect} accessKey={kraArea.name} className="text-4xl p-1 ml-2 text-pink-600 cursor-pointer hover:text-green-600" >+</div>
                                        </div>
                                        </div>
                                    </>
                                )
                            })  */
                        }


                    </div>
                    <div className="flex flex-row mt-2 justify-between">
                        <div className='bg-pink-600 p-2 px-4 text-sm text-white my-4  mt-8 mx-4 rounded-lg cursor-pointer' onClick={() => { SetKpiDisplay(active); SetKraDisplay(inactive); SetKraAreaDisplay(inactive) }}>Create More <strong>KPI</strong></div>
                        <div className='bg-pink-600 p-2 px-4 text-sm text-white my-4  mt-8 mx-4 rounded-lg cursor-pointer' onClick={() => { convertData(); SetKpiDisplay(inactive); SetKraDisplay(inactive); SetKraAreaDisplay(inactive); props.onSetPreview(true) }}><strong>Preview Score Card</strong></div>
                    </div>

                </div>
            </div>

        </>
    )
}