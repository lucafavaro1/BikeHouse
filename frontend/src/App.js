import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./components/Main";
import Header from "./components/pages/Header";
import Navbar from "./components/pages/Navbar";
import Sidebar from "./components/pages/Sidebar";
import Footer from "./components/pages/Footer";
import NavbarNew from "./components/pages/NavbarNew";

function App() {
  return (
    <div className="App">
      <div className="content-wrap">
        <Header />
        <NavbarNew />
        <Main />
      </div>
      {/* <Sideaìbar /> */}
      <Footer />
    </div>
  );
}

export default App;
