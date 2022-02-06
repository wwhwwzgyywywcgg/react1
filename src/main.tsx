import ReactDOM from 'react-dom'
import {HashRouter as Router} from "react-router-dom";
import "antd/dist/antd.dark.min.css"
import './index.css'
import App from './App'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
