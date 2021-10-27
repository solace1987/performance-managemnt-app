// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import config from "./config.js";


const signin = async (user) => {
  try {

    let response = fetch(`${config.server}/api/signin`, {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    return (await response).json()
  }
  catch (err) {
    return err
  }
}

const signout = async () => {

  try {

    let response = await fetch(`${config.server}/api/signout`, { method: 'GET' })

    return await response.json()

  } catch (err) {

    return err

  }

}

const create = async (user) => {

  try {

    let response = await fetch(`${config.server}/api/users`, {

      method: 'POST',

      headers: {

        'Accept': 'application/json',

        'Content-Type': 'application/json'

      },

      body: JSON.stringify(user)

    })

    return await response.json()

  } catch (err) {

    console.log(err)

  }

}


const updateUser = async (params, credentials, user) => {
  console.log(user)
  try {

    let response = await fetch(`${config.server}/api/user/` + params, {

      method: 'PUT',

      headers: {

        'Accept': 'application/json',

        'Content-Type': 'application/json',

        'Authorization': 'Bearer ' + credentials

      },

      body: JSON.stringify(user)

    })

    return await response.json()

  } catch (err) {

    console.log(err)

  }

}

const removeUser = async (params, credentials) => {

  try {

    let response = await fetch(`${config.server}/api/user/` + params, {

      method: 'DELETE',

      headers: {

        'Accept': 'application/json',

        'Content-Type': 'application/json',

        'Authorization': 'Bearer ' + credentials.t

      }

    })

    return await response.json()

  } catch (err) {

    console.log(err)

  }

}

const listUsers = async (signal, params, credentials) => {

  try {

    let response = await fetch(`${config.server}/api/staffs/` + params, {

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

const readUser = async (params, credentials, signal) => {

  try {

    let response = await fetch(`${config.server}/api/user/` + params, {

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



export {
  signin,
  signout,
  updateUser,
  create,
  removeUser,
  listUsers,
  readUser
}