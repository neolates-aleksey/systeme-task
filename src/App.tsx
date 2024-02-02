import { useState } from "react";
import DataTable, { DataItem } from "./components/Table/Table";
import {
  testMock,
  pagesMock,
  pricePlansMock,
  productsMock,
} from "./consts/mockInfo";
import "./App.css";

type MockData = {
  label: string;
  data: DataItem[];
};

const mockDataList: MockData[] = [
  {
    label: "Test Table",
    data: testMock,
  },
  {
    label: "Pages Table",
    data: pagesMock,
  },
  {
    label: "Price Table",
    data: pricePlansMock,
  },
  {
    label: "Products Table",
    data: productsMock,
  },
];

function App() {
  const [currentData, setCurrentData] = useState<DataItem[]>(pagesMock);

  const handleEdit = (id: number, data: DataItem[], newData: DataItem) => {
    const index = data.findIndex((item) => item.id === id);

    if (index !== -1) {
      const updatedDataArray = [
        ...data.slice(0, index),
        newData,
        ...data.slice(index + 1),
      ];

      // Здесь можно отправить обновленные данные на API по индексу строки
      // если получаем 200, обновляем текущий массив для визуального изменения
      setCurrentData(updatedDataArray);
    }
  };

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const selectedMockData = mockDataList.find(
      (mockData) => mockData.label === value
    );

    if (selectedMockData) {
      setCurrentData(selectedMockData.data);
    }
  };

  return (
    <>
      <select onChange={handleTableChange}>
        {mockDataList.map((mockData, index) => (
          <option key={index} value={mockData.label}>
            {mockData.label}
          </option>
        ))}
      </select>
      <DataTable data={currentData} onEdit={handleEdit} />
    </>
  );
}

export default App;
