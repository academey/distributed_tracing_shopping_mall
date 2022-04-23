import logo from './logo.svg';
import './App.css';
import { SearchAPI } from './searchApi';
import {useEffect, useState} from "react";

function App() {
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await SearchAPI.loadSearchListData();
        console.log('result is ', result);
        setSearchList(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [purchaseItemList, setPurchaseItemList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await SearchAPI.loadPurchaseItemList();
        console.log('result is ', result);
        setPurchaseItemList(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{color: 'red'}}>
          {searchList.map(search => {
            return search.title
          })}
        </div>
        <div style={{color: 'blue'}}>
          {purchaseItemList.map(purchaseItem => {
            return purchaseItem
          })}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
