import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./components/Main";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import { useState, useEffect } from "react";
import Navbar from "./components/pages/Navbar";

function App() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="content-wrap">
        <Header />
        <Navbar />
        <Main />
      </div>
      <Footer />
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
          &#8682;
        </button>
      )}
    </div>
  );
}

export default App;
