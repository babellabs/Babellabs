import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './components/navbar';
import Lipsync from './pages/Lipsync';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Switch>
          <Route exact path='/'>
              <App />
          </Route>
          <Route path='/lip-sync'>
              <Lipsync />
          </Route>
          {/* <Route path='/voice-clone'>
              <App />
          </Route> */}
        </Switch>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
