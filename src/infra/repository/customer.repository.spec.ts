import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/entity/address";

describe("Customer repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer");
        const address = new Address("rua", "cidade", "estado", "12345-678");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({
            where: { id: "1" },
        });

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer");
        const address = new Address("rua", "cidade", "estado", "12345-678");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const address2 = new Address(
            "rua 2",
            "cidade 2",
            "estado 2",
            "12345-876"
        );

        customer.changeName("Customer Atualizado");
        customer.changeAddress(address2);

        await customerRepository.update(customer);

        const customerModelUpdated = await CustomerModel.findOne({
            where: { id: "1" },
        });

        expect(customerModelUpdated.toJSON()).toStrictEqual({
            id: customer.id,
            name: "Customer Atualizado",
            street: address2.street,
            city: address2.city,
            state: address2.state,
            zipCode: address2.zipCode,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should find a customer by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer");
        const address = new Address("rua", "cidade", "estado", "12345-678");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({
            where: { id: "1" },
        });

        const foundCustomer = await customerRepository.find("1");

        expect(customerModel.toJSON()).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
            street: foundCustomer.Address.street,
            city: foundCustomer.Address.city,
            state: foundCustomer.Address.state,
            zipCode: foundCustomer.Address.zipCode,
            active: foundCustomer.isActive(),
            rewardPoints: foundCustomer.rewardPoints,
        });
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer");
        const address = new Address("rua", "cidade", "estado", "12345-678");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address(
            "rua 2",
            "cidade 2",
            "estado 2",
            "12345-876"
        );

        customer2.changeAddress(address2);

        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [customer, customer2];

        expect(foundCustomers).toEqual(customers);
    });
});
