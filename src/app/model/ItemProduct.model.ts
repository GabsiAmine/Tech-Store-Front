import { Product } from './Product.model';

export class ItemProduct {
    // c'est la table d'assosiation entre product et caddy,entre le produit et le panier

    product: Product
    price: number;
    quantity: number;
}