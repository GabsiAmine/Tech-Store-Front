import { ItemProduct } from './ItemProduct.model';
import { Client } from './Client.model';

export class Caddy {

    // le Panier
    public name: string;
    public items: Map<number, ItemProduct> = new Map();
    public client: Client;
    constructor(name: string) {
        this.name = name;
    }
    // ou bien on peut ecrire le constructeur come suit avec public ou private:
    //
    //constructor (pubic name: string) {}
}   