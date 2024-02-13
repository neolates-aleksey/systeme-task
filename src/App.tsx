import DataTable from "./components/Table/Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { testMock, pagesMock, pricePlansMock, productsMock } from "./consts/mockInfo";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/systeme-task" element={<DataTable data={pagesMock} />} />
          <Route path="/systeme-task/prices" element={<DataTable data={pricePlansMock} />} />
          <Route path="/systeme-task/products" element={<DataTable data={productsMock} />} />
          <Route path="/systeme-task/my-own" element={<DataTable data={testMock} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
