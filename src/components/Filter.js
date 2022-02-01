import { Button, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';

function Filter({
  setFilteredData,
  foodData,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setFilter
}) {
  const handleFilter = () => {
    setFilter(true);
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
        popperPlacement="bottom"
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
        popperPlacement="bottom"
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
      <ButtonGroup spacing="6">
        <Button onClick={handleFilter}>Filter</Button>
        <Button onClick={() => setFilter(false)}>Clear</Button>
      </ButtonGroup>
    </>
  );
}

export default Filter;
