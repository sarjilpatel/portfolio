import "./App.css";
import About from "./app/components/About/About";
import Experience from "./app/components/Experience/Experience";
import Header from "./app/components/Header";
import Nav from "./app/components/Nav";
import Portfolio from "./app/components/Portfolio/Portfolio";
import Services from "./app/components/Services/Services";
import Contact from "./app/components/Contact/Contact";
import Footer from "./app/components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <About />
      <Experience/>
      <Services/>
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
