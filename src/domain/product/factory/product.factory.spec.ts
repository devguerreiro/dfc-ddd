import ProductFactory from "./product.factory";

describe("Product factory tests", () => {
    it("should create a product", () => {
        const productFactory = new ProductFactory();
        const product = productFactory.create("A", "Name", 10);

        expect(product.constructor.name).toBe("Product");
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Name");
        expect(product.price).toBe(10);
    });

    it("should create a product b", () => {
        const productFactory = new ProductFactory();
        const product = productFactory.create("B", "Name", 10);

        expect(product.constructor.name).toBe("ProductB");
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Name");
        expect(product.price).toBe(20);
    });

    it("should throw an error when product type is invalid", () => {
        const productFactory = new ProductFactory();

        expect(() => {
            // @ts-expect-error
            productFactory.create("C", "Name", 10);
        }).toThrow("Invalid product type");
    });
});
