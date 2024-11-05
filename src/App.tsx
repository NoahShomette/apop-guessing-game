import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import ColorsProvider from "./context/colorsContext";
import FourOhFour from "./pages/404";
import { CookiesProvider } from "react-cookie";
import ManageAuthenticate from "./pages/Authenticate";
import { SupabaseProvider } from "./context/supabaseContext";
import Play from "./pages/play/Play";
import Index from "./pages/index/Index";
import { GameProvider } from "./game/gameContext";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <CookiesProvider>
      <ColorsProvider>
        <SupabaseProvider>
          <GameProvider>
            <BrowserRouter basename="/apop-guessing-game">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />}></Route>
                  {/* <Route path="projects" element={<Projects />}></Route> */}
                  <Route path="play" element={<Play />}></Route>
                  <Route path="account" element={<ManageAuthenticate />}></Route>
                  <Route path="admin" element={<Admin />}></Route>
                  <Route path="/*" element={<FourOhFour />}></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </GameProvider>
        </SupabaseProvider>
      </ColorsProvider>
    </CookiesProvider>
  );
}

export default App;
