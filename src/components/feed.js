import Thread from "./Thread"

const Feed = ({user, setOpenPopUp,filteredThreads, getThreads,setFilteredThread}) => {
    return (
      <div className="feed">
        {filteredThreads.map(filteredThread =>
        <Thread 
        key={filteredThread.id} 
        setOpenPopUp={setOpenPopUp}
        user={user} 
        filteredThread={filteredThread}
        getThreads={getThreads}
        setFilteredThread={setFilteredThread}
        />)}
      </div>
    )
  }
  
  export default Feed;