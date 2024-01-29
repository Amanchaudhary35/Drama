import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "../src/utils/api";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Deatils from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResults from "./pages/searchResults/SearchResults";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)
  console.log("url", url)

  useEffect(() => {
    fetchApiConfig();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }

      dispatch(getApiConfiguration(url));
    })
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/:mediaType/:id"} element={<Deatils />} />
        <Route path={"/search/:query"} element={<SearchResults />} />
        <Route path={"/explore/:mediaType"} element={<Explore />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
