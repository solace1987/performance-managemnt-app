import config from "./config.js"

const createScorecard = async (scorecard,credentials) => {
    
    try {
  
        let response = await fetch(`${config.server}/api/scorecard`, {
  
            method: 'POST',
  
            headers: {
  
                'Accept': 'application/json',
  
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
  
  
            },
  
            body: JSON.stringify(scorecard)

        })
  
        return await response.json()
  
    } catch (err) {
  
        console.log(err)
  
    }
  
  }
  


const getScorecard = async (query, credentials, signal) => {
  
    try {
  
        let response = await fetch(`${config.server}/api/scorecard/` + query, {
          
            method: 'GET',
  
            signal: signal,
  
            headers: {
  
                'Accept': 'application/json',
  
                'Content-Type': 'application/json',
  
                'Authorization': 'Bearer ' + credentials
  
            }
  
        })
  
        return await response.json()
  
    } catch (err) {
  
        console.log(err)
  
    }
  
  }
  
  const listScorecard = async (credentials, signal) => {
  
    try {
  
        let response = await fetch(`${config.server}/api/scorecard/`, {
          
            method: 'GET',
  
            signal: signal,
  
            headers: {
  
                'Accept': 'application/json',
  
                'Content-Type': 'application/json',
  
                'Authorization': 'Bearer ' + credentials
  
            }
  
        })
  
        return await response.json()
  
    } catch (err) {
  
        console.log(err)
  
    }
  
  }

  const allSubmittedCard = async (credentials, month) => {
 
    try {
  
        let response = await fetch(`${config.server}/api/submittedcard?month=${month}`, {
          
            method: 'GET',
  
            headers: {
  
                'Accept': 'application/json',
  
                'Content-Type': 'application/json',
  
                'Authorization': 'Bearer ' + credentials
  
            }
  
        })
  
        return await response.json()
  
    } catch (err) {
  
        console.log(err)
  
    }
  
  }

  const listSubmitted = async (id,credentials, signal) => {
  
    try {
  
        let response = await fetch(`${config.server}/api/allsubmitted?owner=${id}`, {
          
            method: 'GET',
  
            signal: signal,
  
            headers: {
  
                'Accept': 'application/json',
  
                'Content-Type': 'application/json',
  
                'Authorization': 'Bearer ' + credentials
  
            }
  
        })
  
        return await response.json()
  
    } catch (err) {
  
        console.log(err)
  
    }
  
  }
  const SubmittedSummary = async (id,signal) => {
  
    try {
  
        let response = await fetch(`${config.server}/api/submitted-summary?owner=${id}`, {
          
            method: 'GET',
  
            signal: signal,
  
            headers: {
  
                'Accept': 'application/json',
  
                'Content-Type': 'application/json',
  
            }
  
        })
  
        return await response.json()
  
    } catch (err) {
  
        console.log(err)
  
    }
  
  }
  
  const listSubCard = async (month, email,role,credentials, signal) => {
  
    try {
  
        let response = await fetch(`${config.server}/api/staffcard?month=${month}&acessor=${email}&role=${role}`, {
          
            method: 'GET',
  
            signal: signal,
  
            headers: {
  
                'Accept': 'application/json',
  
                'Content-Type': 'application/json',
  
                'Authorization': 'Bearer ' + credentials
  
            }
  
        })
  
        return await response.json()
  
    } catch (err) {
  
        console.log(err)
  
    }
  
  }

  const readScorecard = async (params, credentials, signal) => {

    try {
  
      let response = await fetch(`${config.server}/api/scorecard/` + params, {
  
        method: 'GET',
  
        signal: signal,
  
        headers: {
  
          'Accept': 'application/json',
  
          'Content-Type': 'application/json',
  
          'Authorization': 'Bearer ' + credentials
  
        }
  
      })
  
      return await response.json()
  
    } catch (err) {
  
      console.log(err)
  
    }
  
  }

  const SubmitScore = async (scorecard,credentials) => {
    
    try {
  
        let response = await fetch(`${config.server}/api/submittedcard`, {
  
            method: 'POST',
  
            headers: {
  
                'Accept': 'application/json',
  
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials
  
  
            },
  
            body: JSON.stringify(scorecard)

        })
  
        return await response.json()
  
    } catch (err) {
  
        console.log(err)
  
    }
  
  }

  const updateSubmittedCard = async (params, credentials, Scorecard) => {
    
    try {
  
      let response = await fetch(`${config.server}/api/submittedcard/` + params, {
  
        method: 'PUT',
  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials
  
        },
        
        body: JSON.stringify(Scorecard)
  
      })
  
      return await response.json()
  
    } catch (err) {
  
      console.log(err)
  
    }
  
  }
  
  


  export{
    createScorecard,
    getScorecard,
    listScorecard,
    readScorecard,
    SubmitScore,
    listSubmitted,
    listSubCard,
    updateSubmittedCard,
    allSubmittedCard,
    SubmittedSummary
  }