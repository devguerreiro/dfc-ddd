describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        const handlers = eventDispatcher.eventHandlers["ProductCreatedEvent"];

        expect(handlers).toBeDefined();
        expect(handlers.length).toBe(1);
    });
});
