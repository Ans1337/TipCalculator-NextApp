// import { contractAddresses, abi ,abiwbtc } from "../constants"
// import { useNotification } from "web3uikit"
// import { ethers } from 'ethers';
// import { useEffect, useState } from "react";

// import Web3 from 'web3';

// export default function EventUsingWeb3() {

//     const dispatch = useNotification()
//     const [events, setEvents] = useState([])

//     const providerUrl = process.env.NEXT_PUBLIC_RPC_URL
//     const contractaddy = "0xD46BddEAdbf7f982b3C04669Dfa9D4721c1f3c96";
//     //const contractaddy = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"


//     const web3 = new Web3(providerUrl)
    

//     useEffect(() => {
//         const event = async () => {
//             const contract = await new web3.eth.Contract(abi,contractaddy);
//             contract.events.Transfer()
//             .on('connected' , (id) => {console.log(id)})
//             .on('data' , (event) => {
//                 console.log(event)
//                 setEvents((events) => [...events ,{blockNumber: event.blockNumber , returnValues: event.returnValues} ])

//                 let acc = event.returnValues["addy"].slice(0, 6)
//                 acc = acc.concat("...", (event.returnValues["addy"].slice(event.returnValues["addy"].length - 4)))
//                 const eth = ethers.utils.formatUnits(event.returnValues["a"].toString(), "ether")
//                 const str = acc.concat(" Paid ", eth , " ETH");
//                 handleNewEvent(str)
//             })
//             .on('error' , (error) => {console.error(error)})   
//         }
//         event()
//     },[])
    

//     const handleNewEvent = (message) => {
//         dispatch({
//             type: "Success",
//             message: message,
//             title: "Tip Paid",
//             position: "bottomR",
//         })
//     }


//       return(
//         <div>
//             {/* {events.map((e,idx) => (
//                 <div>
//                     <h4>{e['returnValues']['value']}</h4>
//                     <p> {e['returnValues']['from']} </p>
//                     <p> {e['returnValues']['to']}    </p>
//                     <small>  {e['blockNumber']} </small>
//                 </div>
//             ))}
//             <p>Hello World</p> */}
//         </div>
//       )
//     }





