import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import "./fonts/Bangela.ttf";
import Main from "./components/Main";
import Header from "./components/pages/Header";
import Sidebar from "./components/pages/Sidebar";
import Footer from "./components/pages/Footer";
import Navbar from "./components/pages/Navbar";

function App() {
  return (
    <div className="App">
      <div className="content-wrap">
        <Header />
        <Navbar />
        <Main />
      </div>
      {/* <Sideaìbar /> */}
      <Footer />
    </div>
  );
}

export default App;
