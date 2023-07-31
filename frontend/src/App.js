import './App.css';
import CustomerListComponent from "./component/CustomerListComponent";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateCustomerComponent from "./component/CreateCustomerComponent";

function App() {
  return (
    <div>
        <BrowserRouter>
            <HeaderComponent/>
            <div className='container'>
                <Routes>
                    <Route exact path='/' element={<CustomerListComponent />}></Route>
                    <Route path='/customers' element={<CustomerListComponent />}></Route>
                    <Route path='/create-customer' element={<CreateCustomerComponent />}></Route>
                    <Route path='/update-customer/:id' element={<CreateCustomerComponent />}></Route>
                </Routes>
            </div>
            <FooterComponent/>
        </BrowserRouter>
    </div>
  );
}

export default App;
