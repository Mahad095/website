import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Layout from "./Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import GameOfLife from './pages/Projects/GameOfLife'
import WizChat from './pages/Projects/WizChat'
function App() {
  return (
      <Router>
        <Layout>
            <Routes>
              <Route path='/' element = {<Home/>} />
              <Route path='/Projects' element = {<Projects/>} />
              <Route path='/Projects/GameOfLife' element = {<GameOfLife/>} />
              <Route path='/Projects/WizChat' element = {<WizChat/>} />
              <Route path= "*" element={<Navigate to ="/" />}/>
            </Routes>
        </Layout>
      </Router>
  );
}

export default App;