import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ContentProvider from "./components/context/ContentProvider";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <div className="HTMLContainer">
        <ContentProvider>
          <Navbar />
          <Main />
        </ContentProvider>
    </div>
  );
};

export default App;
