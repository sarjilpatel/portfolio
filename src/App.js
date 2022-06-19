import About from "./app/components/About/About";
import Contact from "./app/components/Contact/Contact";
import Experience from "./app/components/Experience/Experience";
import Footer from "./app/components/Footer/Footer";
import Header from "./app/components/Header";
import Nav from "./app/components/Nav";
import Portfolio from "./app/components/Portfolio/Portfolio";
import Services from "./app/components/Services/Services";
import { SiteContext } from "./app/utils/SiteContext";
import api from "./app/api/HandleApi";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("site")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(data);

  if (data == null) return null;

  return (
    <SiteContext.Provider value={{ data: data }}>
      <div className="App">
        <Header />
        <Nav />
        <About />
        <Experience />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </SiteContext.Provider>
  );
}

export default App;
