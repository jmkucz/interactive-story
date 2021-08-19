import React from 'react'
import generalReducer, { homeActionTypes } from '../reducers/general.reducer'
import { Button } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/react'

const dialogueDict = {
    0: "Oh wow, you took quite a fall there... Are you alright?",
}

const homeState = {
    baseState: 0,
    fullName: sessionStorage.getItem('fullname'),
    username: sessionStorage.getItem('username'),
    dialogue: dialogueDict[sessionStorage.getItem('state')],
    index: 0,
    click1: 0
}

const Home = () => {
    const [{baseState = sessionStorage.getItem('state'),
        fullName = sessionStorage.getItem('fullname'),
        username = sessionStorage.getItem('username'),
        dialogue = dialogueDict[sessionStorage.getItem('state')],
        index = 0,
        click1 = 0}, dispatch] = React.useReducer(generalReducer, homeState)

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
        
    return (
        <>  
            {sessionStorage.getItem("onLoad") === "0" ?
                (sessionStorage.setItem("onLoad", "1"), window.location.reload()) : null}
            { baseState === 0 ?
            <Flex>    
            <Box>{dialogue}</Box>
            {click1 === 0 ? <Box>
                <Button onClick={brave} ml="4">Yes</Button>
                <Button onClick={coward} ml="4">No, I think I broke my leg</Button>
                <Button onClick={confused} ml="4">Where am I?</Button>
            </Box>: null}
            {console.log(click1)}
            </Flex> : null}
        </>
    )
}

export default Home;