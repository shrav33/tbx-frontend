import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home        from './pages/Home';
import Collections from './pages/Collections';
import About       from './pages/About';
import Contact     from './pages/Contact';
import AdminLogin     from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#1a1a1a',
            border: '1px solid #e0c46e',
            borderRadius: '12px',
            boxShadow: '0 4px 24px rgba(201,168,76,0.15)',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#c9a84c', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Routes>
        <Route path="/"            element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/collections" element={<PublicLayout><Collections /></PublicLayout>} />
        <Route path="/about"       element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact"     element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/admin"           element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
