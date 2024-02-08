import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const customer = new Customer("", "Name");
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const customer = new Customer("123", "");
        }).toThrow("Name is required");
    });

    it("should change name", () => {
        // arrange
        const customer = new Customer("123", "Name");

        // act
        customer.changeName("New Name");

        // assert
        expect(customer.name).toEqual("New Name");
    });

    it("should activate customer", () => {
        // arrange
        const customer = new Customer("123", "Name");
        const address = new Address("Rua", "Cidade", "Estado", "12345-678");
        customer.changeAddress(address);

        // act
        customer.activate();

        // assert
        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined", () => {
        // arrange
        const customer = new Customer("123", "Name");

        // assert
        expect(() => {
            // act
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });

    it("should deactivate customer", () => {
        // arrange
        const customer = new Customer("123", "Name");

        // act
        customer.deactivate();

        // assert
        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("123", "Customer");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});
