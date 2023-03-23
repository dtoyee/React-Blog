import { Route, Routes } from 'react-router';
import Home from './home'

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
