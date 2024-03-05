import Order from "../../domain/entity/order";

import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";

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
}
