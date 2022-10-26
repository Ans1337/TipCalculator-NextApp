import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <nav>
            <h1 class="Header">S P L I<br></br>T T E R</h1>
            <div>
                <ConnectButton moralisAuth={false}/>
            </div>
        </nav>  
    )
}