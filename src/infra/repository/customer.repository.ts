import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            city: entity.address.city,
            state: entity.address.state,
            zipCode: entity.address.zipCode,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                city: entity.address.city,
                state: entity.address.state,
                zipCode: entity.address.zipCode,
            },
            { where: { id: entity.id } }
        );
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({ where: { id } });

        const address = new Address(
            customerModel.street,
            customerModel.city,
            customerModel.state,
            customerModel.zipCode
        );
        const customer = new Customer(customerModel.id, customerModel.name);

        customer.changeAddress(address);
        if (customerModel.active) customer.activate();

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll();

        return customers.map((customerModel) => {
            const address = new Address(
                customerModel.street,
                customerModel.city,
                customerModel.state,
                customerModel.zipCode
            );
            const customer = new Customer(customerModel.id, customerModel.name);

            customer.changeAddress(address);
            if (customerModel.active) customer.activate();

            return customer;
        });
    }
}
