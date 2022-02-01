import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../App.css';

function ModalWindow({
  isOpen,
  onClose,
  setFoodData,
  foodData,
  existingData = {
    name: '',
    date: '',
    calorie: '',
    price: ''
  },
  setExistingData,
  action
}) {
  const [formData, setFormData] = useState({ ...existingData });
  const [startDate, setStartDate] = useState(existingData.date);

  const toast = useToast();
  // console.log('form data in modal', formData);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.id) {
      const tempData = foodData.map((food) => {
        if (food.id === formData.id) {
          return formData;
        } else return food;
      });
      setFoodData(tempData);
      setFormData({
        name: '',
        date: '',
        calorie: '',
        price: ''
      });
      setExistingData({
        name: '',
        date: '',
        calorie: '',
        price: ''
      });
    } else setFoodData([...foodData, { ...formData, id: uuid() }]);
    onClose();
  };

  useEffect(() => {
    // console.log('existing data', existingData);
    setStartDate(existingData.date);
    setFormData(existingData);
  }, [existingData]);

  useEffect(() => {
    setFormData({ ...formData, date: startDate });
  }, [startDate]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
        <ModalOverlay />
        edit
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add food Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Item Name"
                  defaultValue={existingData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="date">Date</FormLabel>

                <DatePicker
                  className="date-picker"
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  id="date"
                  endDate={new Date()}
                  selected={startDate}
                  onChange={(value) => {
                    setStartDate(value);
                  }}
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="calorie">Calorie</FormLabel>
                <Input
                  id="calorie"
                  type="number"
                  placeholder="Calories"
                  defaultValue={existingData.calorie}
                  onChange={(event) =>
                    setFormData({ ...formData, calorie: event.target.value })
                  }
                  min={0}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  id="price"
                  type="number"
                  placeholder="Price"
                  defaultValue={existingData.price}
                  onChange={(event) =>
                    setFormData({ ...formData, price: event.target.value })
                  }
                  min={0}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                variant="ghost"
                type="submit"
                onClick={() =>
                  toast({
                    title: `Item ${action}ed.`,
                    description: `The item was successfully ${action}ed.`,
                    status: 'success',
                    position: 'bottom-right',
                    duration: 9000,
                    isClosable: true
                  })
                }
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalWindow;
