import './loader.css'
import Home from './pages/home/home'
import {Switch, Route} from "wouter"
import Preview from './pages/preview/preview'

function App() {

  return (
  <Switch>
    <Route path="/" component={Home}/>
    
    <Route path="/Preview" component={Preview}/>
  </Switch>
  )
}

export default App
