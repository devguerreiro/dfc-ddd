import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
    it("should get total of all orders", () => {
        const item1 = new OrderItem("1", "1", 100, "1", 1);
        const item2 = new OrderItem("2", "2", 200, "2", 2);

        const order1 = new Order("1", "1", [item1]);
        const order2 = new Order("2", "1", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });

    it("should place an order", () => {
        const customer = new Customer("123", "Customer");
        const item = new OrderItem("123", "Item", 10, "123", 1);

        const order = OrderService.placeOrder(customer, [item]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toEqual(10);
    });
});
