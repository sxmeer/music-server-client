import './App.css';
import Login from './components/Login/Login';
import Player from './components/Player/Player';

function App() {
  const code = new URLSearchParams(window.location.search).get("code")
  return (
    <div className="app ">
      {code ? <Player code={code} /> : <Login />}
    </div>
  );
}

export default App;