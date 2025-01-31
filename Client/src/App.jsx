import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventPage from "./pages/EventPage";
import EventFormPage from "./pages/EventFormPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Importar ProtectedRoute

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/events" element={<EventPage />} />
                        <Route path="/create-event" element={<EventFormPage />} />
                        <Route path="/edit-event/:id" element={<EventFormPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
