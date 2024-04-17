import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import AuthForm from "./components/AuthForm";
import PrivateOffice from "./components/PrivateOffice";
import Modal from "react-modal";

Modal.setAppElement('#root');

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="registerAndLogin" element={<AuthForm/>}/>
                <Route path="privateOffice" element={<PrivateOffice/>}/>
            </Routes>
        </BrowserRouter>
    )
};