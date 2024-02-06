import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='*' element={<ErrorPage />} />

      </Routes>
    </>
  );
}

export default App;
