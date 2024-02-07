import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("", "123", []);
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            const order = new Order("123", "", []);
        }).toThrow("CustomerId is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            const order = new Order("123", "123", []);
        }).toThrow("Items must contain at least one item");
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("123", "Item 1", 10);
        const item2 = new OrderItem("1234", "Item 2", 10);

        const order1 = new Order("123", "123", [item1]);

        let total = order1.total();

        expect(total).toBe(10);

        const order2 = new Order("1234", "1234", [item1, item2]);

        total = order2.total();

        expect(total).toBe(20);
    });
});
