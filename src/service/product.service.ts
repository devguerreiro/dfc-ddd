import Product from "../entity/product";

export default class ProductService {
    static increasePrice(products: Product[], percentage: number) {
        for (const product of products) {
            product.changePrice(product.price * (1 + percentage / 100));
        }
    }
}
