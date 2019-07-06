import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import { Route } from 'react-router-dom';

function App() {
    return (
        <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Footer />
        </div>
    );
}

export default App;
