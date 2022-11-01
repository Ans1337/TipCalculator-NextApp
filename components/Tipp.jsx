import { useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification , ChainSelector } from "web3uikit";
import {Eth} from '@web3uikit/icons'


export default function Tipp() {
    const [bill, setBill] = useState("0");
    const [people,setPeople] = useState("0");
    const [tippercent,setTippercent] = useState("0");
    //function to call the lotter

    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();
    const chainId = parseInt(chainIdHex)
    const tipAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [tipPerson,setTipPerson] = useState("0");
    const [tipAccumulated,setTipAccumulated] = useState("0");

    const dispatch = useNotification()

    //functions
    const {runContractFunction: Pay_Tip,} = useWeb3Contract({
        abi: abi,
        contractAddress: tipAddress,
        functionName: "Pay_Tip",
        msgValue: tipPerson,
        params: {},
    })

    const {runContractFunction: Transfer_to_Manager,} = useWeb3Contract({
        abi: abi,
        contractAddress: tipAddress,
        functionName: "Transfer_to_Manager",
        params: {},
    })

    const {runContractFunction: calculate_tip,} = useWeb3Contract({
        abi: abi,
        contractAddress: tipAddress,
        functionName: "calculate_tip",
        params: {
            _bill_price: ethers.utils.parseEther(bill || "0"),
            _tip_per: tippercent,
            _no_of_people: people,
        },
    })

    //getter functions
    const { runContractFunction: getTip } = useWeb3Contract({
        abi: abi,
        contractAddress: tipAddress, // specify the networkId
        functionName: "getTip",
        params: {},
    })

    const { runContractFunction: getTotalTip } = useWeb3Contract({
        abi: abi,
        contractAddress: tipAddress, // specify the networkId
        functionName: "getTotalTip",
        params: {},
    })

    async function updateUIValues() {
        const tipFeeFromCall = (await getTip()).toString()
        const tipAccumulatedCall = (await getTotalTip()).toString()
        
        setTipPerson(tipFeeFromCall)
        setTipAccumulated(tipAccumulatedCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])


    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSuccessTip = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotificationTip("Funds Transfered")
        } catch (error) {
            console.log(error)
        }
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
        })
    }

    const handleNewNotificationTip = (message) => {
        dispatch({
            type: "info",
            message: message,
            title: "Transaction Notification",
            position: "topL",
        })
    }

    const handleErrorOwner = (message) => {
        dispatch({
            type: "error",
            message: message,
            title: "Error!",
            position: "topR",
        })
    }
   
    return (

        <div>
            {tipAddress 
            ? 
            (
                <div>
                    <div class="tip">
                            <button class="buttonPay"
                                onClick={async () =>
                                    await Pay_Tip({
                                        onSuccess: handleSuccessTip,
                                        onError: (error) => {
                                            handleErrorOwner("Already Paid")
                                            console.log(error)
                                        },
                                    })
                                }>
                                Pay Tip
                            </button>

                            <button class="buttonPay"
                                onClick={async () =>
                                    await Transfer_to_Manager({
                                        onSuccess: (success) => {
                                            handleSuccessTip
                                        },
                                        onError: (error) => {
                                            console.log(error)
                                            handleErrorOwner("Only Owner can transfer funds")
                                        },
                                    })
                                }>
                                Transfer To Owner
                            </button>
                                
                        </div>
                        <div class="innerbody">
                        <button id="generate" class="buttonPay"
                                onClick={async () =>
                                    await calculate_tip({
                                        onSuccess: handleSuccess,
                                        onError: (error) => {
                                            console.log(error)
                                            handleErrorOwner("Cannot be called by user")
                                        },
                                    })
                                }>
                                Generate Tip
                            </button>
                            
                            <form class="innertext">
                                <label>Enter your Bill:
                                <br></br>
                                    <input class="inputbar"
                                    type="text" 
                                    value={bill}
                                    onChange={(e) => setBill(e.target.value)}
                                    />
                                </label>
                                <br></br>
                                <label>
                                <br></br>
                                    <input id="custom" class="inputbar"
                                    type="text" 
                                    value={tippercent/100}
                                    onChange={(e) => setTippercent(e.target.value * 100)}
                                    />
                                </label>
                                <br></br>
                                <label>Enter # of people:
                                    <br></br>
                                    <input class="inputbar"
                                        type="text" 
                                        value={people}
                                        onChange={(e) => setPeople(e.target.value)}
                                        />
                                </label>
                            </form>
                            <br></br>

                            <button id="button1" class="buttons" onClick={() => { setTippercent(5  * 100); }}>5%</button>
                            <button id="button2" class="buttons" onClick={() => { setTippercent(10 * 100); }}>10</button>
                            <button id="button3" class="buttons" onClick={() => { setTippercent(15 * 100); }}>15</button>
                            <button id="button4" class="buttons" onClick={() => { setTippercent(25 * 100); }}>25</button>
                            <button id="button5" class="buttons" onClick={() => { setTippercent(50 * 100); }}>50</button>
                        
                            <div class="results">
                                <p>Total Tip FrontEnd  : {(bill * ((tippercent/100)/100)).toFixed(5)}</p>
                                <p>Tip Person FrontEnd : {(((bill/people) * ((tippercent/100)/100))).toFixed(5)}</p>
                                <p>Tip Fee       :{ethers.utils.formatUnits(tipPerson, "ether")} Ξ</p>
                                <p>Tip Collected :{ethers.utils.formatUnits(tipAccumulated, "ether")} Ξ</p>
                            </div>
                        </div>
                </div>
            )
            :
            (
              <div>
                
                <div className="errordiv">
                    <h3>Connect to Goerli Chain</h3>
                    <a><Eth fontSize='50px'/></a>
                </div>
            </div>
            )
            }
        </div>
    )
}