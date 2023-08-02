import React from "react"
import {useState, useEffect} from "react"
import Nav from "./components/nav"
import Header from "./components/header"
import Feed from "./components/feed"
import WriteIcon from "./components/writeIcon"
import PopUp from "./components/PopUp"
const App = () => {
  const [user, setUser] = useState(null)
  const [threads, setThreads] = useState([])
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true)
  const [filteredThreads, setFilteredThreads] = useState(null)
  const [openPopUp, setOpenPopUp]= useState(false)
  const [interactingThread, setFilteredThread] = useState(null)
  const [popUPFeedThreads, setPopUpFeedThreads] = useState(null)
  const userId = "2635c4d3-0769-49f0-b3d4-2435bbb04dec"

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?users_uuid=${userId}`)
      const data = await response.json()
      setUser(data[0])
    } catch (error) {
      console.error(error)
    }
  }

  const getThreads = async () => {

    try {
      const response = await fetch(`http://localhost:3000/threads?threads_from=${userId}`)
      const data = await response.json()
      setThreads(data)

    } catch (error) {
      console.error(error)
    }
  }

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
     const standAloneThreads = threads?.filter(thread => thread.reply_to === null)
     setFilteredThreads(standAloneThreads)
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(thread => thread.reply_to!== null)
      setFilteredThreads(replyThreads)
    }
  }

  const getReplies = async  () => {

    try {
      const response = await fetch (`http://localhost:3000/threads?reply_to=${interactingThread?.id}`)
    const data = await response.json()
    setPopUpFeedThreads(data)
    
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getReplies()
  }, [interactingThread])
  useEffect (() => {
    getUser()
    getThreads()
  }, [])

  useEffect (() => {
    getThreadsFeed()
  },[user, threads, viewThreadsFeed])

  // console.log(user)
  // console.log(threads)

  // console.log(viewThreadsFeed)
  // console.log('interactingThread', interactingThread)
  console.log('popUpFeedThreads', popUPFeedThreads)
  return (

    <>
    {user && <div className="app">
      <Nav url={user.instagram_url}/>
      <Header
        user={user}
        viewThreadsFeed={viewThreadsFeed}
        setViewThreadsFeed={setViewThreadsFeed}
      />
      <Feed
          user={user}
          setOpenPopUp={setOpenPopUp}
          filteredThreads={filteredThreads}
          getThreads={getThreads}
          setFilteredThread ={setFilteredThread}
      />
      {openPopUp && 
      <PopUp
        user={user}
        setOpenPopUp={setOpenPopUp}
        popUPFeedThreads={popUPFeedThreads}
      />}
      <div onClick={() => setOpenPopUp(true)}>
      <WriteIcon/>
    </div>
    </div>}
   
    </>
   
  )
}

export default App;
