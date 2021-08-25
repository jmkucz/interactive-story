import React from 'react'
import generalReducer, { homeActionTypes } from '../reducers/general.reducer'
import { Button } from '@chakra-ui/button'
import { Box, Flex, Input, SimpleGrid } from '@chakra-ui/react'

const dialogueDict = {
    0: ["Oh wow, you took quite a fall there... Are you alright?",
     "Very impressive. To think you would jump from all the way up there and you're not hurt! Very impressive. What's your name brave soul?",
    "Ah, we got another complainer... What's your name kid?"],
}

const homeState = {
    baseState: 0,
    fullName: sessionStorage.getItem('fullname'),
    username: sessionStorage.getItem('username'),
    dialogue: dialogueDict[sessionStorage.getItem('state')],
    index: 0,
    click1: 0,
    nameEnter: false
}

const Home = () => {
    const [{baseState = sessionStorage.getItem('state'),
        fullName = sessionStorage.getItem('fullname'),
        username = sessionStorage.getItem('username'),
        dialogue = dialogueDict[sessionStorage.getItem('state')],
        index = 0,
        click1 = 0,
        nameEnter = false}, dispatch] = React.useReducer(generalReducer, homeState)

    function brave(e) {
        dispatch({type: homeActionTypes.dialogueClick1,
            click: 1})
    }

    function coward(e) {
        dispatch({type: homeActionTypes.dialogueClick1,
            click: 2})
    }

    function confused(e) {
        dispatch({type: homeActionTypes.dialogueClick1,
            click: 3})
    }

    function typingName(e) {
        dispatch({type: homeActionTypes.typingName,
            name: e.target.value})
    }

    function nameSubmitted(e) {
        if( e.key === 'Enter') {
            dispatch({type: homeActionTypes.nameEntered})
          }
    }
    
        
    return (
        <>  
            {/* {sessionStorage.getItem("onLoad") === "0" ?
                (sessionStorage.setItem("onLoad", "1"), window.location.reload()) : null}
                {console.log(dialogueDict)} */}
            { baseState === 0 ?
            <SimpleGrid bg="black" position="relative">
                {console.log(sessionStorage)}
                <Box color="white">*You open your eyes to a purely dark surrounding. A voice comfortably infront of you begins speaking*</Box>
                <Box color="yellow">{dialogue[0]}</Box>
                <Box color="white" ml="4">Response:</Box>
                {click1 === 0 ? 
                <Box>
                    <Button onClick={brave} ml="4">Yes</Button>
                    <Button onClick={coward} ml="4">No, I think I broke my leg</Button>
                    <Button onClick={confused} ml="4">Where am I?</Button>
                </Box>: null}
                {click1 === 1 ? 
                <Box>
                    <Box color="white">Yes</Box>
                    <Box color="yellow">{dialogue[1]}</Box>
                    <Box color="white">Response:</Box>
                    {nameEnter ? <Box color="white">{fullName}</Box> :
                    <Input onChange={typingName} onKeyDown={nameSubmitted} size="sm"/> }
                </Box>: null}
                {click1 === 2 ?
                <Box>
                    <Box color="white">No, I think I broke my leg</Box>
                    <Box color="yellow">{dialogue[2]}</Box>
                    <Box color="white">Response:</Box>
                    {nameEnter ? <Box color="white">{fullName}</Box> :
                    <Input onChange={typingName} onKeyDown={nameSubmitted} size="sm"/> }
                </Box>: null}                
                {console.log(click1)}
            </SimpleGrid> : null}
        </>
    )
}

export default Home;