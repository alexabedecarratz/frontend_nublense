import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';  // Importa tu componente NavBar
import PaginaBienvenida from './components/PaginaBienvenida';
import OtraVista from './components/OtraVista';
// ... Importa otros componentes de vista

function App() {
  return (
    <Router>
      <div>
        <NavBar />  {/* Aquí va tu barra de navegación */}
        <Switch>
          <Route path="/" exact component={PaginaBienvenida} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
