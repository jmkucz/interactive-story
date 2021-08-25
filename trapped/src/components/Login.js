import React from 'react'
import { Box, Flex, Button, SimpleGrid } from "@chakra-ui/react"
import generalReducer, { loginActionTypes } from '../reducers/general.reducer'
import Client from './Client'
import Home from './Home'

const loginStyle = {
  align: "center",
  spacing: 20,
  bg: "gray",
  mb: 250,
  mt: 250,
  ml: 550,
  mr: 550,
  p: 10,
  rounded: "lg"
}

const upperBox = {
  boxShadow: "lg",
  borderWidth: 1,
  borderRadius: 8,
  p: 8,
  rounded: "md",
  bg: "white",
}

const initialState = {
  loginInfo: {
      usernameInput: '',
      newUsernameInput: '',
      alreadyExists: false,
      baseState: 0,
      fullName: sessionStorage.getItem('fullname') || '',
      username: sessionStorage.getItem('username') || '',
      authentic: sessionStorage.getItem('authentic') || false,
      fallen: sessionStorage.getItem('fallen') || false,
      unClicked: sessionStorage.getItem('unClicked') || true}
}

const fallButtonStyle = {
  align: "center",
  spacing: 20,
  bg: "black",
  mb: 500,
  mt: 400,
  ml: 850,
  mr: 550,
  p: 10,
  rounded: "lg"
}


const Login = () => {

  const [{usernameInput,
    newUsernameInput,
    alreadyExists,
    baseState = sessionStorage.getItem('state') || '',
    fullName = sessionStorage.getItem('fullname') || '',
    username = sessionStorage.getItem('username') || '',
    authentic = sessionStorage.getItem('authentic') || false,
    fallen = sessionStorage.getItem('fallen') || false,
    unClicked = sessionStorage.getItem('unClicked') || true}, dispatch] = React.useReducer(generalReducer, initialState)


  const loginExisting = () => {
      Client.get("PlayerData?username=" + usernameInput)
      .then((res) => {
          sessionStorage.setItem('username', usernameInput)
          sessionStorage.setItem('authentic', res.data.authentic)
          sessionStorage.setItem('fullname', res.data.fullname)
          sessionStorage.setItem('state', res.data.currentLevel)

          dispatch({
          type: loginActionTypes.loginExisting,
          baseState: res.data.currentLevel,
          fullName: res.data.fullname,
          authentic: res.data.authentic,
          username: usernameInput
          })
      },
      (error) => {
          console.log(error)
      })
  }

  const loginNew = () => {
      Client.post("PlayerData?username=" + newUsernameInput)
      .then((res) => {
          dispatch({
          type: loginActionTypes.loginNew,
          alreadyExists: res.data,
          username: newUsernameInput
          })
      },
      (error) => {
          console.log(error)
      })
  }

  const isNew = () => {
    dispatch({type: loginActionTypes.isNew,
      username: newUsernameInput})
  }

  function handleChange (e) {
    sessionStorage.setItem("onLoad", "0")
    dispatch({type: loginActionTypes.typingExisting,
          input: e.target.value})
  }

  function handleSubmit (e) {
    if( e.key === 'Enter') {
      loginExisting()
    }
  }

  function handleClick (e) {
    loginExisting()
    console.log(sessionStorage)
  }

  function handleChangeNew (e) {
    sessionStorage.setItem("onLoad", "0")
    dispatch({type: loginActionTypes.typingNew,
        input: e.target.value})
    console.log(sessionStorage)
    console.log(username)
  }

  function handleSubmitNew (e) {
    if( e.key === 'Enter') {
      loginNew()
    }
  }

  function handleClickNew (e) {
    loginNew()
  }

  function handleJumpNew (e) {
    if(!alreadyExists) {
      isNew()
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('authentic', authentic)
      sessionStorage.setItem('state', baseState)
      sessionStorage.setItem('fullname', fullName)
    }
    console.log(sessionStorage)
    console.log(username)
    console.log(alreadyExists)
  }

  function fall (e) {
    dispatch({type: loginActionTypes.falling})
    sessionStorage.setItem('unClicked', false)
    sessionStorage.setItem('fallen', true)
  }
  
    return (
      <>
       {authentic ? null : <Flex bg="lightblue" height="max-content" >
        <SimpleGrid {...loginStyle} fontFamily="sans-serif" fontSize="xx-large">
          <Box {...upperBox} rounded="md">
            <header className="Login-header">
              Hey there! Why don't you put your username below?
            </header>
            <input type="text"
              value={usernameInput}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onKeyDown={handleSubmit} />
            <Button onClick={handleClick} mt="7" ml="5">Press Me!</Button>     
          </Box>
          <Box {...upperBox}>
            <header className="Login-header">
              New here? Enter a username!
            </header>
            <input type="text"
              value={newUsernameInput}
              onChange={handleChangeNew}
              onSubmit={handleSubmitNew}
              onKeyDown={handleSubmitNew} />
            <Button onClick={handleClickNew} mt="7" ml="5">
              No, don't listen to the button above me. Press me.
            </Button>
            {alreadyExists ? <Box>Someone beat you to it. Enter a new username!</Box> : null}
            {alreadyExists != null && !alreadyExists ? <Button onClick={handleJumpNew} mt="7" ml="5">Jump In.</Button> : null}
          </Box>
        </SimpleGrid>
      </Flex> }
      {authentic && unClicked ?
      <Flex bg="black">
        <SimpleGrid {...fallButtonStyle}>
          <Button onClick={fall}>Enjoy your fall</Button>
          <Box color="white" fontSize="7">Click above</Box>
        </SimpleGrid>
      </Flex> : null}
      {fallen ? <Home /> : null}
      </>
    );
}

export default Login;
