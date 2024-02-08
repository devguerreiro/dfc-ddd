import Order from "../entity/order";

export default class OrderService {
    static total(orders: Order[]) {
        return orders.reduce((total, order) => total + order.total(), 0);
    }
}
