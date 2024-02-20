import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import OrderItem from "./domain/entity/order_item";
import Order from "./domain/entity/order";

let customer = new Customer("123", "Customer");
const address = new Address("Rua", "Cidade", "Estado", "12345-678");

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 10);

const order = new Order("1", "123", [item1, item2]);
