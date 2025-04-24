import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Product from './Pages/Product'
import FileSend from './Components/FileSend'
import FileReceive from './Components/FileReceive'
import About from './Pages/About'


function App() {
 

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/api/product' element={<Product/>} />
        <Route path='/send' element={<FileSend/>} />
        <Route path='/receive' element={<FileReceive/>} />
        <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
    </Router>
    
    </>
  )
}

export default App
