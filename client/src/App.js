import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';
import  {ActivityCreate}  from './components/ActivityCreate';
import {Detail} from './components/Details';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
            <Route exact path ='/' element={<LandingPage/>}/>
            <Route exact path ='/home' element={<Home/>}/>
            <Route exact path='/activities' element={<ActivityCreate/>}/>
            <Route path='/home/:id' element={<Detail/>}/>
          </Routes>
      </BrowserRouter>
    </div> 
      );
}

export default App;
