import { useState } from "react";

export default function MyForm() {
    const [bill, setBill] = useState(0);
    const [people,setPeople] = useState(0);
    const [tippercent,setTippercent] = useState(0);
  
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
          <label>Enter # of people:
            <input
              type="text" 
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              />
          </label>
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