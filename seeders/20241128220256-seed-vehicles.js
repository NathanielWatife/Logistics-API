'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vehicles', [
      {
        type: 'Van',
        model: 'Toyota HiAce',
        license_plate: 'VAN-2023',
        capacity: JSON.stringify({ weight: 1000, volume: { length: 300, width: 150, height: 200 } }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Truck',
        model: 'Isuzu Elf',
        license_plate: 'TRK-2023',
        capacity: JSON.stringify({ weight: 5000, volume: { length: 400, width: 250, height: 300 } }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
  },
};
