import EventHandlerInterface from "../../event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class ShowConsoleLog1Handler
    implements EventHandlerInterface<CustomerCreatedEvent>
{
    handle(event: CustomerCreatedEvent): void {
        console.log(
            "This is the first console.log from event: CustomerCreated"
        );
    }
}
