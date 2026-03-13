import { Outlet } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className=''>
      <ToastContainer />
      <Navigation />
      <main className="py-[6rem]">
        <Outlet />
        <hr />
      <Footer/>
      </main>
    </div>
  )
}

export default App