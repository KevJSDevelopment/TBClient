import React, { useEffect, useState } from "react"
import './styles/app.css';
import MainContainer from "./containers/MainContainer"
import Login from "./components/Login";


const App = () => {
  
  const [background, setBackground] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("white")
  const [user, setUser] = useState(false)


  // const meta = {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify({ username: `${name}-${count}`, displayname: `test-${count}`, password: `test-${count}`, imageurl: `test-${count}`})
  // }
  
  const [textColor, setTextColor] = useState("#000000")

  useEffect(() => { 
      if(!background) setTextColor("#000000")
      else setTextColor("secondary")
  }, [background])

  useEffect(() => {
    const body = document.body
    if(!background){
      body.style.backgroundColor = "white"
      setBackgroundColor("white")
    }
    else {
      body.style.backgroundColor = "#141d26"
      setBackgroundColor("#141d26")
    }      
  }, [background])

  useEffect(() => {
    if(sessionStorage.getItem("user")){
      setUser(JSON.parse(sessionStorage.getItem("user")))
    }
  }, [])

  return (
    <div className="App">
      {user ? <MainContainer user={user} textColor={textColor} background={background} setBackground={setBackground} backgroundColor={backgroundColor}/> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
