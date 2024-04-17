import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to="/registerAndLogin">Регистрация</Link>
                <Link to="/privateOffice">Личный кабинет</Link>
            </div>
        </div>
    );
};

export default Navbar;
