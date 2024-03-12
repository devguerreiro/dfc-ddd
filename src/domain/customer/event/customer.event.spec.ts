
import EventDispatcher from "../../@shared/event/event-dispatcher";

import Customer from "../entity/customer";
import Address from "../value-object/address";

import CustomerAddressChangedEvent from "./customer-address-changed.event";
import ShowConsoleLog1Handler from "./handler/show-console-log-1.handler";
import ShowConsoleLog2Handler from "./handler/show-console-log-2.handler";
import ShowConsoleLogHandler from "./handler/show-console-log.handler";

describe("Customer event tests", () => {
    it("should run both ShowConsoleLog1Handler and ShowConsoleLog2Handler when customer is created", () => {
        const eventDispatcher = new EventDispatcher();

        const firstHandler = new ShowConsoleLog1Handler();
        const spyShowConsoleLog1Handler = jest.spyOn(firstHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", firstHandler);

        const secondHandler = new ShowConsoleLog2Handler();
        const spyShowConsoleLog2Handler = jest.spyOn(secondHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", secondHandler);

        new Customer("123", "Name", eventDispatcher);

        expect(spyShowConsoleLog1Handler).toHaveBeenCalledTimes(1);
        expect(spyShowConsoleLog2Handler).toHaveBeenCalledTimes(1);
    });

    it("should run ShowConsoleLogHandler when customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();

        const handler = new ShowConsoleLogHandler();
        const spyHandler = jest.spyOn(handler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", handler);

        jest.useFakeTimers().setSystemTime(new Date());

        const customer = new Customer("123", "Customer", eventDispatcher);

        const address = new Address("street", "city", "state", "zipCode");
        customer.changeAddress(address);

        expect(spyHandler).toHaveBeenCalledTimes(1);
        expect(spyHandler).toHaveBeenCalledWith(
            new CustomerAddressChangedEvent({
                id: customer.id,
                name: customer.name,
                address: address,
            })
        );
    });
});
