import React, {useState} from 'react';
import './App.css';
import BusinessList from './components/BusinessList';
import SearchBar from './components/SearchBar';
import Placeholder from './components/Placeholder';
import getBusinesses from '../src/utils/fetchData';

function App() {
  const [businesses, setBusinesses] = useState([]);
  // useEffect(() => {
  //     async function getToken() {
  //         const fetchedData = await getBusinesses('Korean', 'New York', 'rating');
  //         setBusinesses(fetchedData);
  //     }
  //     getToken();
  // }, [])

  const handleSubmit = async (searchTerm, location, sortBy) => {
    const businesses = await getBusinesses(searchTerm, location, sortBy);
    setBusinesses(businesses);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>ravenous</h2>
      </header>
      <SearchBar onSubmit={handleSubmit}/>
      {businesses.length === 0 ? <Placeholder /> : <BusinessList allBusinessDetails={businesses}/>}
    </div>
  );
}

export default App;
