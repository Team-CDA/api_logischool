require('dotenv').config();
const db = require("../models/index");
const alertsController = require("./alerts-controller");

// Mock des modèles de Sequelize et de sequelize.transaction
jest.mock('../models/index', () => ({
  alerts: { findAll: jest.fn(), create: jest.fn(), },
  alertsGroups: { create: jest.fn(), },
  alertsUsers: { create: jest.fn(),  },
  sequelize: { transaction: jest.fn(), }
}));

describe("Alerts Controller", () => {
  let alertsCtrl;
  const mockTransaction = { commit: jest.fn(), rollback: jest.fn() };
  const req = {
    body: {
      message: "Alerte Test",
      groups: [1, 2],
      users: [1, 2],
    },
  };

  beforeAll(() => {
    alertsCtrl = alertsController();
  });

  describe("getAll", () => {
    it("should return all alerts", async () => {
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res),
      };

      db.alerts.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      await alertsCtrl.getAll(req, res);

      expect(db.alerts.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }, { id: 2 }]);
    });
  });

  describe("createOne", () => {
    it("should create a new alert", async () => {
      const mockIo = { emit: jest.fn() };
      const req = {
        body: {
          message: "Alerte Test",
          groups: [1, 2],
          users: [1, 2],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      // Ici on mocke la transaction de sequelize
      db.sequelize.transaction.mockResolvedValue(mockTransaction);
      db.alerts.create.mockResolvedValue({ id: 3 });
      db.alertsGroups.create.mockResolvedValue(true);
      db.alertsUsers.create.mockResolvedValue(true);

      try {
        await alertsCtrl.createOne(mockIo, req, res);
        expect(mockTransaction.commit).toHaveBeenCalled();
        expect(mockIo.emit).toHaveBeenCalledWith("newAlert", { id: 3 }, [1, 2], [1, 2]);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
          message: "Une alerte est ajoutée à la base de données.",
          data: { alert: { id: 3 }, groups: [1, 2], users: [1, 2] },
          success: true,
        });
      } catch (error) {
        console.log('Error caught:', error);
        if (mockTransaction) {
          expect(mockTransaction.rollback).toHaveBeenCalled();
        }
      }
    });
  });
});
