import React, {/*useEffect, useState*/} from "react"
import Grid from '@material-ui/core/Grid'
import Discover from "./components/Discover";

const App = () => {

  const URL = "https://localhost:5001/api/users"

  // const meta = {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify({ username: `${name}-${count}`, displayname: `test-${count}`, password: `test-${count}`, imageurl: `test-${count}`})
  // }

  return (
    <div className="App">
      <Grid container className={classes.root} spacing={2}>
        <Nav />
        <Home />
        <Discover />
      </Grid>
    </div>
  );
}

export default App;
