import { contractAddresses, abi } from "../constants"
import { useQuery } from "@apollo/client"
import { useNotification } from "web3uikit"

export default function Event() {
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "5"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]

    const dispath = useNotification()

}