import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Layout from "./Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import About from "./pages/About";
function App() {
  return (
      <Router>
        <Layout>
            <Routes>
              <Route path='/' element = {<Home/>} />
              <Route path='/Projects' element = {<Projects/>} />
              <Route path='/Contact' element = {<Contact/>} />
              <Route path='/About' element = {<About/>} />
              <Route path= "*" element={<Navigate to ="/" />}/>
            </Routes>
        </Layout>
      </Router>
  );
}

export default App;