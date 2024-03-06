import CustomerCreatedEvent from "../event/@shared/customer/customer-created.event";
import EventDispatcher from "../event/@shared/event-dispatcher";

import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string, eventDispatcher: EventDispatcher) {
        this._id = id;
        this._name = name;
        this.validate();

        eventDispatcher.notify(new CustomerCreatedEvent({}));
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get Address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    isActive(): boolean {
        return this._active;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}
