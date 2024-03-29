import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Name", 10);
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 10);
        }).toThrow("Name is required");
    });

    it("should throw error when price is less than 0", () => {
        expect(() => {
            const product = new Product("123", "Name", -1);
        }).toThrow("Price must be greater than 0");
    });

    it("should change name", () => {
        const product = new Product("123", "Name", 10);

        product.changeName("New Name");

        expect(product.name).toEqual("New Name");
    });

    it("should change price", () => {
        const product = new Product("123", "Name", 10);

        product.changePrice(20);

        expect(product.price).toBe(20);
    });
});
