import { NavLink, Outlet } from 'react-router';
import './App.css';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/uncontrolled">Uncontrolled</NavLink>
        <NavLink to="/controlled">Controlled</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
