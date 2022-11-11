import React from "react";
import {Routes,Route, BrowserRouter } from "react-router-dom";
import Pokedex from "./Routes/Pokedex";
import Pokemon from "./Routes/Pokemon";

const Routes1 = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Pokedex/>}/>
        <Route path='/details/:id' element={<Pokemon/>}/>
        <Route path="*" element={<Pokedex/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default Routes1;
