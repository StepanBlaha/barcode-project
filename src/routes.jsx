import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Barcode from './pages/Barcode/Barcode';
import History from './pages/History/History';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="*" element={<Barcode />} />
            <Route path="/barcode" element={<Barcode />} />
            <Route path="/history" element={<History />} />
        </Routes>
    )
}
export default AppRoutes