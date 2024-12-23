import { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Footer from './components/Footer';
import Signup from './routes/Signup';
import Signin from './routes/Signin';
import CoinPage from './routes/CoinPage';
import Account from './routes/Account';

function App() {
  const [coins, setCoins] = useState();
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=true";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
    });
  }, [url]);

  return (
      <ThemeProvider>
        <AuthContextProvider>
          <Navbar/>
          <Routes>
            <Route path="/"element={<Home coins={coins} />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/coin/:coinId" element={<CoinPage />}>
              <Route path=":coinId" />
            </Route>
          </Routes>
          <Footer/>
        </AuthContextProvider>
      </ThemeProvider>
  );
}

export default App;
