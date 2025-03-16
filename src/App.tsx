import { NavLink, Outlet } from 'react-router';
import './App.css';
import { selectUncontrolledData } from './store/sliceFormData';
import { useAppSelector } from './store/hooks';

function App() {
  const data = useAppSelector(selectUncontrolledData);
  console.log(data);
  return (
    <>
      <nav>
        <NavLink to="/">Main</NavLink>
        <NavLink to="/uncontrolled">uncontrolled</NavLink>
        <NavLink to="/controlled">controlled</NavLink>
      </nav>
      <main>
        {data.map((user) => {
          return <h2 key={user.email}>{user.name}</h2>;
        })}
        <Outlet />
      </main>
    </>
  );
}

export default App;
