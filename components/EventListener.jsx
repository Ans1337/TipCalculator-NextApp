import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import { contractAddresses, abi } from "../constants"
import { useNotification } from "web3uikit"
import { ethers } from 'ethers';
import { useEffect, useState } from "react";
import Web3 from 'web3';

export default function EventListener() {

    const [peeps,setPeeps] = useState("")
    const {isWeb3Enabled} = useMoralis();

    const dispatch = useNotification()
    const providerUrl = process.env.NEXT_PUBLIC_RPC_URL
    const web3 = new Web3(providerUrl)
    const tipAddress = "0x864E42a7e22AF84327BE625157ed2510BCfF5807"
    const Contract = new web3.eth.Contract(abi,tipAddress);

    const { runContractFunction: getNoofPeople } = useWeb3Contract({
        abi: abi,
        contractAddress: tipAddress, // specify the networkId
        functionName: "getNoofPeople",
        params: {},
    })

    async function updateUIValues() {
        const getPeopleCall = (await getNoofPeople()).toString()
        
        setPeeps(getPeopleCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        listen()
    },[peeps])

    const handleNewEvent = (message) => {
        dispatch({
            type: "Success",
            message: message,
            title: "Tip Paid",
            position: "bottomR",
        })
    }

    let options = {
        fromBlock: 7860869,
        toBlock: 'latest'
    }

    const listen = async () => {
        Contract.getPastEvents("Tipreceived" , options)
        .then (result => {
            let acc = result["0"]["returnValues"]["addy"].slice(0, 6)
            acc = acc.concat("...", (result["0"]["returnValues"]["addy"].slice(result["0"]["returnValues"]["addy"].length - 4)))
            const eth = ethers.utils.formatUnits(result["0"]["returnValues"]["a"].toString(), "ether")
            const str = acc.concat(" Paid ", eth , " ETH");
            handleNewEvent(str)
        })
        .then ('error' , (error) => { console.error("error" + error)})
    }
    

    return(
        <div>
            Hello World
            <p>{peeps}</p>
            <button onClick={() => { setPeeps(peeps * 2); }}>Button</button>
        </div>
    )

}




   





