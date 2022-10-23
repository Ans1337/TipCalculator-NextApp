import { useWeb3Contract } from "react-moralis"
import { contractAddresses, abi } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Tipp() {
    const [bill, setBill] = useState(0);
    const [people,setPeople] = useState(0);
    const [tippercent,setTippercent] = useState(0);

    //function to call the lotter

    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();
    const chainId = parseInt(chainIdHex)
    const tipAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [tipPerson,setTipPerson] = useState("0");
    const [tipAccumulated,setTipAccumulated] = useState("0");

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
            _bill_price: bill,
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
        //const recentWinnerFromCall = await getRecentWinner()
        setTipPerson(tipFeeFromCall)
        setTipAccumulated(tipAccumulatedCall)
        //setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])
    
   
    return (

        <div>
            {tipAddress 
            ? 
            (
                <div>
                    <div class="tip">
                            <button
                                onClick={async () =>
                                    await Pay_Tip({
                                        onError: (error) => console.log(error),
                                    })
                                }>
                                Pay Tip
                            </button>

                            <button
                                onClick={async () =>
                                    await Transfer_to_Manager({
                                        onError: (error) => console.log(error),
                                    })
                                }>
                                Transfer To Owner
                            </button>

                            <button
                                onClick={async () =>
                                    await calculate_tip({
                                        onError: (error) => console.log(error),
                                    })
                                }>
                                Generate Tip
                            </button>

                            <p>Tip Fee             : {ethers.utils.formatUnits(tipPerson, "wei")} WEI</p>
                            <p>Total Tip Collected : {ethers.utils.formatUnits(tipAccumulated, "wei")} WEI</p>
                        </div>
                        <div class="innerbody">
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
                                <label>Enter Tip %:
                                <br></br>
                                    <input class="inputbar"
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

                            
                            <button id="button1" class="buttons">5%</button>
                            <button id="button2" class="buttons">10%</button>
                            <button id="button3" class="buttons">15%</button>
                            <button id="button4" class="buttons">25%</button>
                            <button id="button5" class="buttons">50%</button>
                        
                            <div class="results">
                                <p>The tip total amount is : {bill * ((tippercent/100)/100)}</p>
                                <br></br>
                                <p>The Tip to be given is  : {(bill/people) * ((tippercent/100)/100)}</p>
                            </div>
                        </div>
                </div>
            )
            :
            (
              <div>No Tip Address Exist</div>
            )
            
            
            }    
            
            
        </div>
    )
}