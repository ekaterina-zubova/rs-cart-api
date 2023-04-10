export const GET_CART_LIST_QUERY = `select * from carts where user_id = $1`;
export const GET_CART_ITEMS_LIST_QUERY = `select * from cart_items where cart_id = $1`;
export const GET_CART_BY_ID_QUERY = `select * from cart_items where cart_id = $1 and user_id = $2`;

export const UPDATE_COUNT_CART_BY_ID_QUERY = `update cart_items set count = $2 where cart_id = $1 returning count`;

export const DELETE_CART_QUERY = `delete from carts where user_id = $1 returning *`;