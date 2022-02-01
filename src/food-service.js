import * as faker from 'faker';
import Util from './utils';
import uuid from 'react-uuid';
export default class FoodService {
  static fetchFoods = async ({ minCalorie = 0, maxCalorie = 1000 }) => {
    if (minCalorie <= 0 || maxCalorie >= 1000 || minCalorie > maxCalorie)
      throw new Error('No Foods found');
    const foods = [];
    await Util.sleep(2000);
    for (let i = 0; i < 10; i++) {
      const food = {
        id: uuid(),
        date: faker.date.between('2015-01-01', '2023-01-05'),
        name: faker.commerce.productName(),
        calorie: Number(faker.commerce.price(minCalorie, maxCalorie)),
        price: Number(faker.commerce.price(minCalorie, maxCalorie))
      };
      foods.push(food);
      await Util.sleep(0.01);
    }
    return foods;
  };
}
