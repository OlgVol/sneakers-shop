import Info from '../Info'
import React from 'react'
import AppContext from '../../context'
import axios from 'axios'

function Drawer({ onClose, onRemove, items = [] }) {
const {cartItems, setCartItems} = React.useContext(AppContext)
const [orderId, setOrderId] = React.useState(null)
const [isOrderComplied, setIsOrderComplited] = React.useState(false)

const onClickOrder = async () => {
  try {
  const {data} = await axios.post('https://6374d5d408104a9c5f8aaee6.mockapi.io/orders', {items: cartItems});
  setOrderId(data.id)
  setIsOrderComplited(true)
  setCartItems([])
  for (let i =0 ;i < Array.length; i++) {
    const item = cartItems [i];
    await axios.delete('https://6374d5d408104a9c5f8aaee6.mockapi.io/cart' + item.id)
  }
  } catch(e) {
    console.log(e)
  }
}
 
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Basket{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src="img/remove.svg"
            height={12}
            width={12}
            alt="Close"
          />
        </h2>
        <div className="Items">
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} EU.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/remove.svg"
                    alt="Remove"
                    height={12}
                    width={12}
                  />
                </div>
              ))}
            </div>
            <Info title={isOrderComplied ? "Order Confirmed" : "Basket is empty"}
            description={isOrderComplied? `Your order Nr ${orderId}` : "please add Items to bascet"}/>
            <div className="cartTotalBlock">
              <ul className="cartTotalBlock">
                <li>
                  <span>Sum:</span>
                  <div></div>
                  <b>200 EU</b>
                </li>
                <li>
                  <span>VAT 21%:</span>
                  <div></div>
                  <b>40 EU</b>
                </li>
              </ul>
              <button className="greenButton" onClick={onClickOrder}>Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Drawer;
