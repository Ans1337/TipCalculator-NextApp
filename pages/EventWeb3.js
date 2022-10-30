import { contractAddresses, abi } from "../constants"
import { useNotification } from "web3uikit"
import { ethers } from 'ethers';
import { useEffect, useState } from "react";

import Web3 from 'web3';

export default function EventUsingWeb3() {

    const dispatch = useNotification()

    const providerUrl = "wss://eth-goerli.g.alchemy.com/v2/y61shKnhVla0I_3g-a2632fMQHncqpgb"
    const contractaddy = "0x864E42a7e22AF84327BE625157ed2510BCfF5807";
    const web3 = new Web3(providerUrl)

    const Contract = new web3.eth.Contract(abi,contractaddy);

    const handleNewEvent = (message) => {
        dispatch({
            type: "Success",
            message: message,
            title: "Tip Paid",
            position: "bottomR",
        })
    }

    let options = {
        fromBlock: 'latest',
        toBlock: 'latest'
    }

    Contract.getPastEvents("Tipreceived" , options)
        .then (result => {
            console.log(result)
            handleNewEvent(result["0"]["returnValues"]["addy"])
        })



    return(
        <div>
            Hello World
        </div>
    )

}




   





