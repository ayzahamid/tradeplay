// src/scripts/insertDummyData.ts

import User from '../models/User';

async function insertDummyData() {
  try {
    await User.bulkCreate([
      { email: 'user1@example.com', password: 'password1' },
      { email: 'user2@example.com', password: 'password2' },
    ]);
    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
}

insertDummyData();
