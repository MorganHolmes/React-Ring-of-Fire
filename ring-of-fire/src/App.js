import './App.css';
import {Button} from 'react-bootstrap/Button';
import {FaBeer, FaFire} from 'react-icons/fa';
//Boostrap CSS file - MWH
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';


function App() {
  return (
    <div className="App">
    <centre>
      <Header headerText='🍺 Ring of Fire 🔥'/>
    </centre>
    </div>
  );
}

export default App;
