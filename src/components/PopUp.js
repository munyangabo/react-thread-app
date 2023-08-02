import React from "react";
import PopUpThread from "./PopUpThread"
import ThreadInput from "./ThreadInput"

const PopUp = ({user, setOpenPopUp,popUPFeedThreads}) => {
    return (
      <div className="popup">
        <p onClick={() => setOpenPopUp(false)}>X</p>
        {popUPFeedThreads?.map(popUPFeedThread => 
        <PopUpThread
          user={user}
          key={popUPFeedThread.id}
          popUPFeedThread={popUPFeedThread}
        
        />)}
        <ThreadInput/>
      </div>
    );
  }
  
  export default PopUp;