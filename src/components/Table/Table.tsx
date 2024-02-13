import React, { useState, useEffect } from "react";
import { parseDate } from "../../helpers/parseDate";
import Input from "../Input/Input";
import "./Table.scss";

export type DataItem = {
  id: number;
  [key: string]: string | Date | boolean | number | Array<any> | Record<string, unknown> | null | undefined;
};

type DataTableProps = {
  data: DataItem[];
};

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [initialData, setInitialData] = useState<DataItem[]>(data);
  const [filteredData, setFilteredData] = useState<DataItem[]>(initialData);
  const [filterValue, setFilterValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editedRow, setEditedRow] = useState<DataItem | null>(null);

  useEffect(() => {
    setFilteredData(data);
    setFilterValue("");
    setSearchTerm("");
  }, [data]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleEditClick = (row: DataItem) => {
    editedRow === null ? setEditedRow(row) : setEditedRow(null);
  };

  const handleEdit = (id: number, data: DataItem[], newData: DataItem) => {
    const index = data.findIndex((item) => item.id === id);

    if (index !== -1) {
      const updatedDataArray = [...data.slice(0, index), newData, ...data.slice(index + 1)];

      // Здесь можно отправить обновленные данные на API по индексу строки
      // если получаем 200, обновляем текущий массив для визуального изменения
      setInitialData(updatedDataArray);
    }
  };

  const handleSave = () => {
    if (editedRow) {
      handleEdit(editedRow.id, data, editedRow);
      setEditedRow(null);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilterValue(value);
  };

  const options = Object.keys(data[0]).filter((key) => typeof data[0][key as keyof DataItem] === "boolean");

  useEffect(() => {
    let filteredArray = initialData;

    if (searchTerm) {
      const searchFilter = (item: DataItem) =>
        Object.values(item)
          .filter((value) => typeof value === "string")
          .some((value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()));
      filteredArray = filteredArray.filter(searchFilter);
    }

    if (filterValue) {
      const filterByBoolean = (item: DataItem) =>
        typeof item[filterValue as keyof DataItem] === "boolean" ? item[filterValue as keyof DataItem] === true : false;
      filteredArray = filteredArray.filter(filterByBoolean);
    }

    setFilteredData(filteredArray);
  }, [searchTerm, filterValue, initialData]);

  return (
    <div className="table">
      <div className="table__actions">
        <Input value={searchTerm} setValue={setSearchTerm} placeholder="Search..." className="table__search" />

        <select onChange={handleFilterChange}>
          <option value="">All</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <table className="table__main">
        <thead className="table__header">
          <tr className="table__header-row">
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th className="table__header-cell" key={key}>
                  {key}
                </th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="table__body">
          {filteredData.map((item) => (
            <tr className="table__row" key={item.id}>
              {Object.values(item).map((value, index) => (
                <td className="table__cell" key={index}>
                  {typeof value === "string" && parseDate(value)}
                  {typeof value === "object" && JSON.stringify(value)}
                  {typeof value === "boolean" && value.toString()}
                  {typeof value === "number" && value.toString()}
                </td>
              ))}

              <td className="table__edit-cell">
                <button className="table__edit-button" onClick={() => handleEditClick(item)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length === 0 && <div className="table__unluck">There is no data with such filters :(</div>}

      {editedRow && (
        <div className="table__modal">
          <div className="table__modal-bg" onClick={() => setEditedRow(null)}></div>
          <div className="table__modal-content">
            {Object.entries(editedRow).map(([key, value]) => {
              if (typeof value === "string") {
                return (
                  <div className="table__modal-item" key={key}>
                    <p>{key}</p>

                    <input
                      type="text"
                      className="input__field"
                      value={value}
                      onChange={(e) =>
                        setEditedRow({
                          ...editedRow,
                          [key]: e.target.value,
                        })
                      }
                    />
                  </div>
                );
              }
            })}
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
