import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Layout from './Components/Layout/Layout';
import Home from "./Components/Homepage/Home";
import Profile from './Components/Homepage/Newscard/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id' element={<Profile/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
