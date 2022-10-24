import { useState } from "react";

export default function MyForm() {
    const [bill, setBill] = useState(0);
    const [people,setPeople] = useState(0);
    const [tippercent,setTippercent] = useState(0);
    
    // const content = [];
    // for(let i =0;i<people;i++)
    // {
    //   content.push(
    //     <lablel>Enter Address {i+1}  
    //       <input
    //         type="text"
    //         // value={theArray}
    //         // onChange={ (e) => setTheArray(oldArray => [...oldArray, e.target.value])}
    //         >
    //       </input>
    //     </lablel>
    //   );
    // }
  
    return (
      <div>
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
            <label>Enter # of people:
            <br></br>
              <input class="inputbar"
                type="text" 
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                />
            </label>
          <br></br>
          <label>Enter Tip %:
          <br></br>
            <input class="inputbar"
              type="text" 
              value={tippercent}
              onChange={(e) => setTippercent(e.target.value)}
              />
          </label>
        </form>
        <br></br>
        <button id="button1" class="buttons">
          5%
        </button>
        <button id="button2" class="buttons">
          10%
        </button>
        <button id="button3" class="buttons">
          15%
        </button>
        <button id="button4" class="buttons">
          25%
        </button>
        <button id="button5" class="buttons">
          50%
        </button>
        <div class="results">
        <p>The tip total amount is : {bill * (tippercent/100)}</p>
        <br></br>
        <p>The Tip to be given is  : {(bill/people) * (tippercent/100)}</p>
        </div>
        </div>
      </div>
    )
}