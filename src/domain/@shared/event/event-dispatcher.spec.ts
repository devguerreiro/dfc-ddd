import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

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

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        let handlers = eventDispatcher.eventHandlers["ProductCreatedEvent"];

        expect(handlers).toBeDefined();
        expect(handlers.length).toBe(1);
        expect(handlers[0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        handlers = eventDispatcher.eventHandlers["ProductCreatedEvent"];

        expect(handlers).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        let handlers = eventDispatcher.eventHandlers["ProductCreatedEvent"];

        expect(handlers).toBeDefined();
        expect(handlers.length).toBe(1);
        expect(handlers[0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Produto",
            description: "Descricao",
            price: 10.0,
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });
});
