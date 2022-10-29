import { useQuery , gql } from "@apollo/client";

const GET_ACTIVE_ITEM = gql`
    {
        tipEvents(first: 5) {
            id
            tiptip
            message
        }
        tipreceiveds(first: 5) {
            id
            a
            addy
        }
    }
`


export default function graphExample() {
    const {loading , error , data } = useQuery(GET_ACTIVE_ITEM)
    console.log(data)
    return <div>hi</div>
}

