import React, {useEffect, useState} from "react"
const App = () => {

  const [count, setcount] = useState(0)

  const setUser = async () => {

    const name = document.getElementById("name").value
    debugger
    const meta = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: { username: `test-${count}-${name}`, displayname: `test-${count}`, password: `test-${count}`, imageurl: `test-${count}`}
    }

    const res = await fetch("https://localhost:5001/api/users", meta)
    const data = await res.json()

    // .then(data => {
    console.log(data)
    // })
  }

  useEffect(async () => {
    const res = await fetch("https://localhost:5001/api/users")
    const data = await res.json()
    console.log(data)
  }, [])

  return (
    <div className="App">
      <input type="text" id="name" name="name" size="10"/>
      <button onClick={() => setUser()}>
        set user
      </button>
    </div>
  );
}

export default App;
