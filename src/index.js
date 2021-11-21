import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@mui/material"
import { BrowserRouter } from "react-router-dom";


const theme = createTheme({
  overrides: {
    MuiTypography: {
      alignLeft: {
        paddingRight: "10px", 
        marginLeft: "4%"
      }
    }
  },
  typography: {
    tweetInteractions: {
      fontSize: "12px"
    },
    button: {
      fontSize: "1rem",
      fontWeight: 400,
    }
  },
  palette: {
    primary: {
      main: "#1DA1F2",
      disabled: "#1DA1F2"
    },
    secondary: {
      main: "#FFFFFF"
    }
  }
})

ReactDOM.render(
  <BrowserRouter >
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
