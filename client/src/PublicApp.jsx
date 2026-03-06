import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactHub from './components/ContactHub';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import AppointmentSuccess from './pages/AppointmentSuccess';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
};

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/appointment/success" element={<AppointmentSuccess />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    {/* Fallback to home */}
                    <Route path="*" element={<Home />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

export default function PublicApp() {
    return (
        <>
            <Navbar />
            <AnimatedRoutes />
            <Footer />
            <ContactHub />
        </>
    );
}
