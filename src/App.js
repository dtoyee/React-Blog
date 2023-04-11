import { Route, Routes } from 'react-router';
import Home from './home'
import Post from './post'
import Category from './category'
import Members from './members'
import Profile from './profile'
import NewPost from './new-post'

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home />}></Route>
        <Route path={'/post/:id/:title'} element={<Post />}></Route>
        <Route path={'/category/:id/:name'} element={<Category />}></Route>
        <Route path={'/members'} element={<Members />}></Route>
        <Route path={'/user/:id/:username'} element={<Profile />}></Route>
        <Route path={'/post/new'} element={<NewPost />}></Route>
      </Routes>
    </>
  );
}

export default App;
