import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function ManualHeader()
{

    const {enableWeb3 , account, isWeb3Enabled} = useMoralis()

    useEffect(() => {
        console.log("HI" + isWeb3Enabled)
    },[isWeb3Enabled])
    return(
        <div>
            {
                account 
                ? (<div>connected to {account}</div>) 
                : (<button onClick={async() => {await enableWeb3()}}>Connect</button>)
            }
        </div>
    )
}