import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import LoginForm from '../Components/forms/LoginForm';
import Register from '../Components/forms/Register';
import AddFirm from '../Components/forms/AddFirm';
import AddProducts from '../Components/AddProducts';
import Welcome from '../Components/Welcome';
import AllProducts from '../Components/AllProducts';

const LandingPage = () => {
    const [activeComponent, setActiveComponent] = useState('welcome'); // Track active component
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasFirm, setHasFirm] = useState(false);

    useEffect(() => {
        const loginToken = localStorage.getItem('loginToken');
        setIsLoggedIn(!!loginToken); // Convert to boolean

        const firmName = localStorage.getItem('firmName');
        setHasFirm(!!firmName);
    }, []);

   
    const logoutHandler = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('loginToken');
            localStorage.removeItem('firmId');
            localStorage.removeItem('firmName');
            setIsLoggedIn(false);
            setHasFirm(false);
            setActiveComponent('welcome'); // Redirect to welcome after logout
        }
    };

  
    const showComponent = (component) => {
        if (!isLoggedIn && (component === 'addProduct' || component === 'allProducts')) {
            alert('Please login first');
            setActiveComponent('login');
        } else {
            setActiveComponent(component);
        }
    };

    return (
        <>
            <section className="landingSection">
                <NavBar
                    showLoginHandler={() => showComponent('login')}
                    showRegisterHandler={() => showComponent('register')}
                    showLogout={isLoggedIn}
                    logoutHandler={logoutHandler}
                />

                <div className="collectionSection">
                    <SideBar
                        showFirmHandler={() => showComponent('addFirm')}
                        showProductHandler={() => showComponent('addProduct')}
                        showAllProductsHandler={() => showComponent('allProducts')}
                        showFirmName={hasFirm}
                    />

                    {activeComponent === 'login' && <LoginForm showWelcomeHandler={() => showComponent('welcome')} />}
                    {activeComponent === 'register' && <Register showLoginHandler={() => showComponent('login')} />}
                    {!isLoggedIn && activeComponent === 'addFirm' && <AddFirm />} 
                    {isLoggedIn && activeComponent === 'addProduct' && <AddProducts />}
                    {activeComponent === 'welcome' && <Welcome />}
                    {isLoggedIn && activeComponent === 'allProducts' && <AllProducts />}
                </div>
            </section>
        </>
    );
};

export default LandingPage;
