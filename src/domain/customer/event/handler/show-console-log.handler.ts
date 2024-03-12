import EventHandlerInterface from "../../event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class ShowConsoleLogHandler
    implements EventHandlerInterface<CustomerAddressChangedEvent>
{
    handle(event: CustomerAddressChangedEvent): void {
        const { id, name, address } = event.eventData;
        console.log(`Customer ${id}, ${name} address changed to: ${address}`);
    }
}
