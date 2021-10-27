
const localSave = (name, data) => {

    sessionStorage.setItem(name, JSON.stringify(data));

};

const localFetch = (itemName) => {
    let data = sessionStorage.getItem(itemName);
    return JSON.parse(data)
}

const localRemove = () => {

    sessionStorage.clear();
}

const handleObjectChange = (name, object, setObject) => e => {

    setObject({ ...object, [name]: e.target.value })

}

const getObjectValue = (object, name) => object[name]

const kpiTitleFormater = (kpi) => {
    switch (kpi) {
        case "name": return "KPI Detail";
        case "target": return "Target";
        case "selfScore": return "Self Score";
        case "completionPeriod": return "Completion Period";
        case "tracking": return "Tracking";
        case "LineHeadScore": return "Line Head Score";
        case "thirdPartyScore": return "Third Party Score";
        case "weight": return "Weight";
        case "Rating": return "Rating";
        case "WeightbyRating": return "Weight by Rating";

    }
}


const reFormatData = (scorecard) => {
    //function for extracting name from array of object
    const objectEstractor = (objectArr) => {
        const arr = []
        objectArr.map(obj => {
            arr.push(obj['name'])

        })
        return arr
    }
     //Get list of kraarea
    const kraAreaList = objectEstractor(scorecard.kraAreas)

     //Get list of Kra in each kraArea
    let kraList = [];

    //filter through all kraArea while extrating kra names from each
    kraAreaList.map(kraAreaName => {
        const spec = scorecard.kraAreas.filter(kraArea1 => kraArea1.name === kraAreaName)

        const kraAreaObj = { kraArea: kraAreaName, kras: objectEstractor(spec[0].kras) }
        // created object containing kraArea with their respective kras in an array
        kraList.push(kraAreaObj)

    })

    //Get the different KPI
    const kpiList = []
    //iterate over kraList using the properties of the object element
    kraList.map((kraObj, mainIndex) => {
        let tempkpi = []
        kraList[mainIndex]['kras'].map((kraArea, kraIndex) => {

            const kpi = scorecard.kraAreas[mainIndex]['kras'][kraIndex]['kpis']
            tempkpi.push(kpi)

        })
        kpiList.push(tempkpi)

    })

    const show = { kpiList: kpiList, kraList: kraList }


    const dataArray = []

    show.kraList.map((kra, index) => {

        kra.kras.map((kpis, index2) => {
                
            show.kpiList[index][index2].map((kpi,index3) => {
            
               const kraAreaValue=index2===0&&index3===0?kra.kraArea:"";

                const kraValue= index3===0?kpis:"";
               
           dataArray.push([kraAreaValue, kraValue, kpi])
 
           //dataArray.push([kra.kraArea, kpis, kpi])
            })

        })

    })

    let kraAreaSpan=0;
let kraSpan=0;




    return ({data:dataArray,span:[kraAreaSpan, kraSpan] })
}


const Unit = [
    {
        name: 'stitchmaster',
        dept: 'post-press'
    },
    {
        name: 'Folding',
        dept: 'post-press'

    },
    {
        name: 'Binding',
        dept: 'post-press'
    },
    {
        name: 'CD102',
        dept: 'press'
    },
    {
        name: 'SM102',
        dept: 'press'
    },
    {
        name: 'Cityline',
        dept: 'press'
    },
    {
        name: 'Goss',
        dept: 'press'
    },
    {
        name: 'ICT',
        dept: 'HR/Admin'
    },
    {
        name: 'Finance',
        dept: 'Finance'
    },
    {
        name: 'OFMD',
        dept: 'OFMD'
    },
    {
        name: 'Marketing',
        dept: 'Marketing'
    },


]

export {
    localSave,
    localFetch,
    localRemove,
    handleObjectChange,
    getObjectValue,
    kpiTitleFormater,
    reFormatData,
    Unit
}