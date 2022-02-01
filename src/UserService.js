import Util from './utils';
import * as faker from 'faker';

const UserService = {
  fetchLoggedInUserDetails: async () => {
    await Util.sleep(2000);
    // 20% of the time the function will throw error
    if (Math.random() < 0.2)
      throw new Error('Unable to fetch logged in user details');

    // 50% of the time logged in user details would be admin and 50% of time his role will be regular
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      role: Math.random() > 0.5 ? 'regular' : 'admin'
    };
  }
};

export default UserService;
