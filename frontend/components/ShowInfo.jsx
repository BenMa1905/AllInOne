import React from 'react'
import {Text, HStack } from '@chakra-ui/react'

const ShowInfo=({tag,data,color})=>{
    return(
        <HStack>
            <Text color={color} fontWeight="bold">{tag}:</Text>
            <Text>{data}</Text>
        </HStack>
    )
}
export default ShowInfo