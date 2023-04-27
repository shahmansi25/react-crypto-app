
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Coins from './component/Coins';
import Exchange from './component/Exchange';
import CoinsDetail from './component/CoinsDetail';
import Footer from './component/Footer';

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path = "/coins"  element= {<Coins />}></Route>
        <Route path="/exchange" element={<Exchange />}></Route>
        <Route path = "/coins/:id"  element= {<CoinsDetail />}></Route>
      </Routes>
      <Footer></Footer>
   </Router>
  );
}

export default App;
