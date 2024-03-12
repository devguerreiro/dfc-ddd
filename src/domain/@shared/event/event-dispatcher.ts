import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private _eventHandlers: { [eventName: string]: EventHandlerInterface[] } =
        {};

    get eventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this._eventHandlers;
    }

    notify(event: EventInterface): void {
        const eventHandlers = this._eventHandlers[event.constructor.name];

        if (eventHandlers) {
            eventHandlers.forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }

    register(
        eventName: string,
        eventHandler: EventHandlerInterface<EventInterface>
    ): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(
        eventName: string,
        eventHandler: EventHandlerInterface<EventInterface>
    ): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this._eventHandlers = {};
    }
}
