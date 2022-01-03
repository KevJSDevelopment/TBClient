import React, { useEffect, useState } from "react"
import './styles/app.css';
import MainContainer from "./MainContainer"
import Login from "./containers/Login";

const App = () => {
  
  const [background, setBackground] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("white")
  const [loggedInUser, setUser] = useState(null)
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

    return () => {
      setBackgroundColor('white')
      setTextColor('black')
    }
  }, [background])
  
  useEffect(() => {
    if(sessionStorage.getItem("user")){
      setUser(JSON.parse(sessionStorage.getItem("user")))
    }

    return () => {
      setUser(null)
    }
  }, [])

  return (
    <div className="App">
      {loggedInUser ? <MainContainer loggedInUser={loggedInUser} textColor={textColor} background={background} setBackground={setBackground} backgroundColor={backgroundColor} setUser={setUser} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
