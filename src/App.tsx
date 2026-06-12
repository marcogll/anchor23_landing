import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Historia from './pages/Historia'
import Servicios from './pages/Servicios'
import Membresias from './pages/Membresias'
import Contacto from './pages/Contacto'
import Franchises from './pages/Franchises'
import Legal from './pages/Legal'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Cancellation from './pages/Cancellation'
import Collabs from './pages/Collabs'
import JoinUs from './pages/JoinUs'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/membresias" element={<Membresias />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/franchises" element={<Franchises />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/cancellation" element={<Cancellation />} />
      <Route path="/collabs" element={<Collabs />} />
      <Route path="/join-us" element={<JoinUs />} />
    </Routes>
  )
}
