import moment from "moment";

const PopUpThread = ({user, popUpFeedThread}) => {
  const timePassed = moment().startOf('day').fromNow(popUpFeedThread.timestamp) 
  return (
      <article className="feed-card">
        <div className="text-container">
          <div>
            <div className="img-container">
              <img src={user.img} alt="profile avatar"/>
            </div>
            <div>
            <p><strong>{user.handle}</strong></p>
            <p>{popUpFeedThread.text}</p>
          </div>
          </div>
          <p className="sub-text">{timePassed}</p>
        </div>
      </article>
    );
  }
  
  export default PopUpThread;