import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Stats />
                <About />
                <Services />
                <Process />
                <Portfolio />
                <TechStack />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default App;
