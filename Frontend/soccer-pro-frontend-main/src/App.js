import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";


import Home from './Pages/Home'
import Login from './Components/Logreg/Login'
import Register from './Components/Logreg/Register'
import Userupcomingevents from './Pages/Userupcomingevents'
import AboutUs from "./Pages/AboutUs";




const queryClient = new QueryClient()
function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upcomingevents" element={<Userupcomingevents />} />
          <Route path="/about" element={<AboutUs></AboutUs>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
