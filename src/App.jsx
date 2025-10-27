import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './page/NotFound'
import HomePage from './page/Homepage'
import MaintenancePage from './page/MaintenancePage'



function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
