import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';

function Filter({ filteredData, setFilteredData, foodData }) {
  const [startDate, setStartDate] = useState(new Date('2020/01/01'));
  const [endDate, setEndDate] = useState(new Date());

  const handleFilter = () => {
    const tempData = foodData.filter((food) => {
      if (food.date > startDate && food.date < endDate) {
        return food;
      }
    });
    setFilteredData(tempData);
  };

  return (
    <>
      <DatePicker
        className="date-picker range-picker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <DatePicker
        className="date-picker range-picker"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <Button onClick={handleFilter}>Filter</Button>
    </>
  );
}

export default Filter;
