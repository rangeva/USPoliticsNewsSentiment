
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from "./Components/Homepage/Home";  
import Profile from './Components/Homepage/Newscard/Profile';
import Faqs from './Components/Homepage/Faqs/Faqs';
import AccessToken from './Components/Homepage/Acceesstoken/Accesstoken';
import Howitworks from './Components/Homepage/Howitworks/Howitworks';

function App() {
  return (
    
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path="/faq" element={<Faqs />} />
          <Route path="/accesstoken" element={<AccessToken />} />
          <Route path="/howitworks" element={<Howitworks />} />
        </Routes>
      </Layout>
    </Router>
    
  );
}

export default App;
