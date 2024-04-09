import React, { useState } from 'react';
import { CustomButton, InputIcon } from '.';
import { TableProps } from '../../types';
import { generateTable } from '../../core/utils';
import { FaSortAmountUpAlt } from "react-icons/fa";
import * as yup from 'yup'

const Table: React.FC<TableProps>= ({ rows, columns }) => {
  const [data, setData] = useState<number[][]>(generateTable(parseInt(rows), parseInt(columns)));
  const [sortedData, setSortedData] = useState<number[][]>(data);
  const [errorsList, setErrorsList] = useState<Array<any>>([]);
  const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      const newValue = parseInt(event.target.value, 10);
      if (!isNaN(newValue)) {
        newData[rowIndex][columnIndex] = parseInt(event.target.value, 10);
      }
      else {
        newData[rowIndex][columnIndex] = 0;
      }
      return newData
      
    });
  };
  const handleSortClick = () => {
      const sortedArray = data.map((row, index) => {
        if (index % 2 === 0) {
          return row.sort((a, b) => b - a); 
        } else {
          return row.sort((a, b) => a - b); 
        }
      });
      setSortedData(sortedArray);
  };
  return (
    <div className='table-container'>
      <table className='table'>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex}>
                  <InputIcon type="text" containerStyle='margin-b-0' value={cell} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCellChange(event, rowIndex, columnIndex)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span className='error-text'> {errorsList?.filter((obj: any) => obj.path.includes(`data`))[0]?.message}</span>
      <CustomButton icon={<FaSortAmountUpAlt />} title="مرتب‌سازی" onClick={handleSortClick} />
    </div>
  );
};

export default Table;