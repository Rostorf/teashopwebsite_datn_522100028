import { Outlet } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <div className=''>
      <ToastContainer />
      <Navigation />
      <main className="py-[6rem]">
        <Outlet />
        <hr className='mt-[3rem]'/>
      <Footer/>
      </main>
      <Chatbot />
    </div>
  )
}

export default App