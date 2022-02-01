import React, { useEffect, useState } from 'react';
import FoodService from '../food-service';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  ButtonGroup,
  toast,
  useToast,
  Spinner
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';

import moment from 'moment';
import ModalWindow from './ModalWindow';
import uuid from 'react-uuid';
import Filter from './Filter';

function FoodEntries() {
  const toast = useToast();
  const [variable, setVariable] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [existingData, setExistingData] = useState({
    name: '',
    date: '',
    calorie: '',
    price: ''
  });
  const [action, setAction] = useState('add');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    FoodService.fetchFoods({ minCalorie: 20, maxCalorie: 500 }).then((data) => {
      setFoodData(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (id) => {
    const tempData = foodData.filter((food) => food.id !== id);
    setFoodData(tempData);
  };

  const handleEdit = (food) => {
    setExistingData({ ...existingData, ...food });
    // console.log('exisiting data in food entries', existingData);
    onOpen();
  };

  useEffect(() => {
    if (filteredData.length > 0) setVariable(filteredData);
    else setVariable(foodData);
  }, [filteredData, filteredData.length, foodData]);

  return (
    <>
      <Filter
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        foodData={foodData}
      />

      <Table variant="striped" colorScheme="blackAlpha" size="md">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Name</Th>
            <Th>Calories</Th>
            <Th>Price</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            ml="46vw"
          />
        ) : null}
        <Tbody>
          {variable.map((food) => {
            return (
              <Tr key={food.id}>
                <Td>{moment(food.date).format('DD/MM/YYYY, h:mm:ss a')}</Td>
                <Td>{food.name}</Td>
                <Td>
                  {food.calorie}
                  {Math.random() > 0.7 ? (
                    <WarningTwoIcon color="red.500" pb="4px" pl="3px" />
                  ) : null}
                </Td>
                <Td>
                  {food.price}
                  {Math.random() > 0.7 ? (
                    <WarningTwoIcon color="red.500" pb="4px" pl="3px" />
                  ) : null}
                </Td>
                <Td>
                  <ButtonGroup spacing="3">
                    <Button
                      size="xs"
                      colorScheme="pink"
                      onClick={() => {
                        handleEdit(food);
                        setAction('edit');
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => {
                        handleDelete(food.id);
                        toast({
                          title: 'Item Deleted.',
                          description: 'The item was successfully deleted.',
                          status: 'success',
                          position: 'bottom-right',
                          duration: 9000,
                          isClosable: true
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Button
        colorScheme="blue"
        onClick={() => {
          onOpen();
          setAction('add');
        }}
      >
        Add Food
      </Button>
      <ModalWindow
        isOpen={isOpen}
        onClose={onClose}
        setFoodData={setFoodData}
        foodData={foodData}
        existingData={existingData}
        setExistingData={setExistingData}
        action={action}
      />
    </>
  );
}

export default FoodEntries;
