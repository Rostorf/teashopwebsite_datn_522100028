// export const addDecimals = num => {
//     return (Math.round(num * 100) / 100).toFixed(2);
// };

export const updateCart = state => {
    state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    state.shippingPrice = state.itemsPrice > 300000 ? 30000 : 0;
    // state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice)
    );

    localStorage.setItem('cart', JSON.stringify(state));
    return state;
}