import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory tests", () => {
    it("should create a customer", () => {
        const customerFactory = new CustomerFactory();
        const customer = customerFactory.create("Customer");

        expect(customer.constructor.name).toBe("Customer");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a costumer with an address", () => {
        const customerFactory = new CustomerFactory();
        const address = new Address("Rua", "Cidade", "Estado", "12345-678");
        const customer = customerFactory.createWithAddress("Customer", address);

        expect(customer.constructor.name).toBe("Customer");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer");
        expect(customer.Address.constructor.name).toBe("Address");
        expect(customer.Address.street).toBe("Rua");
        expect(customer.Address.city).toBe("Cidade");
        expect(customer.Address.state).toBe("Estado");
        expect(customer.Address.zipCode).toBe("12345-678");
    });
});
