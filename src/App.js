import React, { useEffect, useState } from "react"
import './styles/app.css';
import MainContainer from "./containers/MainContainer"
import Login from "./components/Login";

const App = () => {
  
  const [background, setBackground] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("white")
  const [loggedInUser, setUser] = useState(false)
  const [NFTArray, setNFTArray] = useState([])
  const [profilePicture, setProfilePicture] = useState('')
  const [textColor, setTextColor] = useState("black")

  useEffect(() => { 
    const body = document.body
    if(!background){
      body.style.backgroundColor = "white"
      setBackgroundColor("white")
      setTextColor("black")
    }
    else {
      body.style.backgroundColor = "#141d26"
      setBackgroundColor("#141d26")
      setTextColor("white")
    }      
  }, [background])
  
  useEffect(() => {
    if(sessionStorage.getItem("user")){
      setUser(JSON.parse(sessionStorage.getItem("user")))
    }
  }, [])

  return (
    <div className="App">
      {loggedInUser ? <MainContainer setNFTArray={setNFTArray} loggedInUser={loggedInUser} textColor={textColor} background={background} setBackground={setBackground} backgroundColor={backgroundColor}/> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
