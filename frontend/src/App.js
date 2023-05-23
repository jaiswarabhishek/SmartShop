import './App.css';
import Header from './components/Layout/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
function App() {
  return (
    <div classname="">
       <Router>
         <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>
          </Routes>
        <Footer/>
       </Router>

    </div>
  );
}

export default App