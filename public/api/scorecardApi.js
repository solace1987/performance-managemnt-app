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
  
  export{
    createScorecard,
    getScorecard,
    listScorecard
  }