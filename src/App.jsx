import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <ClientLogos />
                <About />
                <Services />
                <Process />
                <Portfolio />
                <TechStack />
                <Faq />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default App;
