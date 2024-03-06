import Customer from "../../../entity/customer";

import EventDispatcher from "../event-dispatcher";
import ShowConsoleLog1Handler from "./handler/show-console-log-1.handler";
import ShowConsoleLog2Handler from "./handler/show-console-log-2.handler";

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
});
