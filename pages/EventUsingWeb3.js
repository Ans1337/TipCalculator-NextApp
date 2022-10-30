import { contractAddresses, abi } from "../constants"
import { useNotification } from "web3uikit"
import { ethers } from 'ethers';
import { useEffect, useState } from "react";

import Web3 from 'web3';

export default function EventUsingWeb3() {

    const dispatch = useNotification()
    const [events, setEvents] = useState([])

    const providerUrl = "wss://eth-goerli.g.alchemy.com/v2/y61shKnhVla0I_3g-a2632fMQHncqpgb"
    const contractaddy = "0x864E42a7e22AF84327BE625157ed2510BCfF5807";


    const web3 = new Web3(providerUrl)

    useEffect(() => {
        const init = async () => {
            const Contract = await new web3.eth.Contract(abi,contractaddy);

            // Contract.events.TipEvent()
            //     .on("connected" , (id) =>{
            //         console.log(id)
            //     } )
            //     .on('data' , (event) => {
            //         console.log(event);
            //         setEvents( (events) => [...events, {blockNumber: event.blockNumber, returnValues: event.returnValues}])
            //         handleNewEvent(event["returnValues"]["message"])
            //     })
            //     .on("error" , (error) => {
            //         console.log(error)
            //     })

            // Contract.events.Tipreceived()
            //     .on("connected" , (id) =>{
            //         console.log(id)
            //     } )
            //     .on('data' , (event) => {
            //         console.log(event);
            //         setEvents( (events) => [...events, {blockNumber: event.blockNumber, returnValues: event.returnValues}])
            //         handleNewEvent(event["returnValues"][""])
            //     })
            //     .on("error" , (error) => {
            //         console.log(error)
            //     })


        }
        init()
    }, [])


    // const handleNewEvent = (message) => {
    //     dispatch({
    //         type: "Success",
    //         message: message,
    //         title: "Transaction Notification",
    //         position: "bottomR",
    //     })
    // }

      return(
        <div>
            {events.map((e,idx) => (
                <div>

                    <h4>{e['returnValues']['message']}</h4>
                    <p> {e['returnValues']['tiptip']} </p>
                    <small>  {e['blockNumber']} </small>
                </div>
            ))}
        </div>
      )
    }





