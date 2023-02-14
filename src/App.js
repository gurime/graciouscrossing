
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Help from './Pages/Help'
import { ManageProperty } from "./Pages/ManageProperty";
import { Advertise } from "./Pages/Advertise";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import ScrollToTop from "./ScrollToTop";


function App() {
  return (
<>
<ScrollToTop>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/help" element={<Help/>}/>
<Route path="/manageproperty" element={<ManageProperty/>} />
<Route path="/advertise" element={<Advertise/>} />
<Route path="/signin" element={<SignIn/>} />
<Route path="/signup" element={<SignUp/>} />
</Routes>
</ScrollToTop>
</>
);
}

export default App;
