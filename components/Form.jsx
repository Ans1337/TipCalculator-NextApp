import { useState } from "react";

export default function MyForm() {
    const [bill, setBill] = useState(0);
    const [people,setPeople] = useState(0);
    const [tippercent,setTippercent] = useState(0);
    //const [theArray, setTheArray] = useState<string>([]);
    //const [theArray, setTheArray] = useState<string[]>([]);



    
    const content = [];
    for(let i =0;i<people;i++)
    {
      content.push(
        <lablel>Enter Address {i+1}  
          <input
            type="text"
            // value={theArray}
            // onChange={ (e) => setTheArray(oldArray => [...oldArray, e.target.value])}
            >
          </input>
        </lablel>
      );
    }
  
    return (
      <div>
        <form>
          <label>Enter your Bill:
            <input
              type="text" 
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              />
          </label>
          <br></br>
          <div>
            <label>Enter # of people:
              <input
                type="text" 
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                />
            </label>
            {content}
          </div>
          <br></br>
          <label>Enter Tip %:
            <input
              type="text" 
              value={tippercent}
              onChange={(e) => setTippercent(e.target.value)}
              />
          </label>
        </form>
        <br></br>
        <p>The tip total amount is : {bill * (tippercent/100)}</p>
        <p>The Tip to be given is  : {(bill/people) * (tippercent/100)}</p>
      </div>
    )
}