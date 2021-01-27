import './App.css';
//Boostrap CSS file - MWH
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Game from './components/game';



function App() {
  return (
    <div className="App">
      <Header headerText='🍺 Ring of Fire 🔥'/>
      <Game />
    </div>
  );
}

export default App;
