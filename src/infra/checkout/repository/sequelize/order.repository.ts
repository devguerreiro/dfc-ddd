import Order from "../../../../domain/checkout/entity/order";

import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            { include: [{ model: OrderItemModel }] }
        );
    }

    async update(entity: Order): Promise<void> {
        await Promise.all(
            entity.items.map(async (item): Promise<void> => {
                await OrderItemModel.update(
                    {
                        product_id: item.productId,
                        order_id: entity.id,
                        quantity: item.quantity,
                        name: item.name,
                        price: item.price,
                    },
                    { where: { id: item.id } }
                );
            })
        );

        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
            },
            { where: { id: entity.id } }
        );
    }

    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({
                where: { id },
                rejectOnEmpty: true,
                include: { model: OrderItemModel },
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        return new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map(
                (item) =>
                    new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.product_id,
                        item.quantity
                    )
            )
        );
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({
            include: { model: OrderItemModel },
        });

        return orders.map((order) => {
            return new Order(
                order.id,
                order.customer_id,
                order.items.map(
                    (item) =>
                        new OrderItem(
                            item.id,
                            item.name,
                            item.price,
                            item.product_id,
                            item.quantity
                        )
                )
            );
        });
    }
}
