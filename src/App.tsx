import { NavLink, Outlet } from 'react-router';
import './App.css';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/uncontrolled">uncontrolled</NavLink>
        <NavLink to="/controlled">controlled</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
