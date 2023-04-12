import { Injectable } from '@nestjs/common';
import { createDBConnection } from '../../db/db-client';
import {
  GET_CART_LIST_QUERY,
  GET_CART_ITEMS_LIST_QUERY,
  UPDATE_COUNT_CART_BY_ID_QUERY,
  DELETE_CART_ITEMS_QUERY,
} from '../../db/db-queries';

import { Cart } from '../models';

@Injectable()
export class CartService {
  private dbClient;

  async findByUserId(userId: string): Promise<Cart> {
    try {
      this.dbClient = await createDBConnection();
      const cart = await this.dbClient.query(GET_CART_LIST_QUERY, [userId]);

      if (!cart) {
        throw new Error(`Cart not found`);
      }

      console.log(cart, 'cart');
      const items = await this.dbClient.query(GET_CART_ITEMS_LIST_QUERY, [
        cart.rows[0]?.id,
      ]);

      return { id: cart.rows[0]?.id, items: items.rows };
    } catch (err) {
      console.log('Error on service getCarts: ', err);
      return err;
    }
  }

  async updateByUserId(userId: string, { id: cart_id }: Cart): Promise<Cart> {
    try {
      this.dbClient = await createDBConnection();

      const updated = await this.dbClient.query(UPDATE_COUNT_CART_BY_ID_QUERY, [
        cart_id,
        30,
      ]);

      return updated;
    } catch (err) {
      console.log('Error on service updateCartItem: ', err);
      return err;
    }
  }

  async removeByUserId(userId): Promise<void> {
    try {
      this.dbClient = await createDBConnection();
      const cart_item = await this.dbClient.query(DELETE_CART_ITEMS_QUERY, [userId]);
      return cart_item.rows[0];
    } catch (err) {
      console.log('Error on service removeCartItem: ', err);
      return err;
    }
  }
}
