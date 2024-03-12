import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            city: entity.Address.city,
            state: entity.Address.state,
            zipCode: entity.Address.zipCode,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.Address.street,
                city: entity.Address.city,
                state: entity.Address.state,
                zipCode: entity.Address.zipCode,
            },
            { where: { id: entity.id } }
        );
    }

    async find(id: string): Promise<Customer> {
        let customerModel;

        try {
            customerModel = await CustomerModel.findOne({
                where: { id },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        const address = new Address(
            customerModel.street,
            customerModel.city,
            customerModel.state,
            customerModel.zipCode
        );
        const customer = new Customer(customerModel.id, customerModel.name);

        customer.changeAddress(address);
        if (customerModel.active) customer.activate();
        customer.addRewardPoints(customerModel.rewardPoints);

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
            customer.addRewardPoints(customerModel.rewardPoints);

            return customer;
        });
    }
}
