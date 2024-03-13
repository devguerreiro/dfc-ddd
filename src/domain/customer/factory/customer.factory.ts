import Customer from "../entity/customer";

import { v4 as uuid } from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {
    create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    createWithAddress(name: string, address: Address) {
        const customer = new Customer(uuid(), name);
        customer.changeAddress(address);
        return customer;
    }
}
