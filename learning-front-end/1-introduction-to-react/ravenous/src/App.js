// import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>ravenous</h2>
      </header>
      <SearchBar />
      <BusinessList />
    </div>
  );
}

export default App;
