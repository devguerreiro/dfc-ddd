import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        const handlers = eventDispatcher.eventHandlers["ProductCreatedEvent"];

        expect(handlers).toBeDefined();
        expect(handlers.length).toBe(1);
        expect(handlers[0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        let handlers = eventDispatcher.eventHandlers["ProductCreatedEvent"];

        expect(handlers).toBeDefined();
        expect(handlers.length).toBe(1);
        expect(handlers[0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        handlers = eventDispatcher.eventHandlers["ProductCreatedEvent"];

        expect(handlers).toBeDefined();
        expect(handlers.length).toBe(0);
    });
});
