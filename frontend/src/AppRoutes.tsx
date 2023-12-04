import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Customization from "./components/Customization";
import RegistForm from "./components/RegistForm";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/customizationrequest" element={<Customization />} />
            <Route path="/register" element={<RegistForm />} />
        </Routes>
    );
}
