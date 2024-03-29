import { v4 as uuid } from "uuid";

import OrderFactory from "./order.factory";

describe("Order factory tests", () => {
    it("should create an order", () => {
        const orderFactory = new OrderFactory();
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product",
                    productId: uuid(),
                    quantity: 1,
                    price: 100,
                },
            ],
        };
        const order = orderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });
});
