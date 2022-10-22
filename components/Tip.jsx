import { useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react";
import { ethers } from "ethers";


export default function Tip(){
    //function to call the lotter

    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();
    const chainId = parseInt(chainIdHex)
    const tipAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [tipPerson,setTipPerson] = useState("0");

    // const {
    //     runContractFunction: calculate_tip,
    //     data: enterTxResponse,
    //     isLoading,
    //     isFetching,
    // } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: tipAddress,
    //     functionName: "calculate_tip",
    //     msgValue: entranceFee,
    //     params: {},
    // })


    const { runContractFunction: getTip } = useWeb3Contract({
        abi: abi,
        contractAddress: tipAddress, // specify the networkId
        functionName: "getTip",
        params: {},
    })

    async function updateUIValues() {
        
        const tipFeeFromCall = (await getTip()).toString()
        //const numPlayersFromCall = (await getPlayersNumber()).toString()
        //const recentWinnerFromCall = await getRecentWinner()
        setTipPerson(tipFeeFromCall)
        //setNumberOfPlayers(numPlayersFromCall)
        //setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <div>Tip Fee: {ethers.utils.formatUnits(tipPerson, "wei")} WEI</div>
    )
}