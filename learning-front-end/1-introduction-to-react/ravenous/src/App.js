// import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList';
import SearchBar from './components/SearchBar';
import { businessDetails } from './businessDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>ravenous</h2>
      </header>
      <SearchBar />
      <BusinessList allBusinessDetails={businessDetails}/>
    </div>
  );
}

export default App;
