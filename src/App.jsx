import "./App.css";
import Pet from "./components/Pet.jsx";

const App = () => (
  <div>
    <h1>Adopt Me!</h1>
    <Pet name="Luna" animal="Dog" breed="Havanese" />
    <Pet name="Pepper" animal="Bird" breed="Cockatiel" />
    <Pet name="Doink" animal="Cat" breed="Mixed" />
  </div>
);

export default App;
