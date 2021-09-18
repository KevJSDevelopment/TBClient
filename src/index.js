import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from "@material-ui/core"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
    button: {
      fontSize: "1rem",
      fontWeight: 400,
    }
  },
  palette: {
    primary: {
      main: "#1DA1F2",
    },
    secondary: {
      main: "#FFFFFF"
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
