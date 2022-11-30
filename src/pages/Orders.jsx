import React from 'react';
import Card from "../components/Card/Card";
import axios from 'axios';
import AppContext from '../context';

function Orders() {
const [orders, setOrders] = React.useState([])
const {onAddToCart, onAddToFavorites} = React.useContext(AppContext)

React.useEffect( () => {
    ( async () => {
const { data } = await axios.get('https://6374d5d408104a9c5f8aaee6.mockapi.io/orders')
setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
    })();
}, [])

    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
<h1>My orders</h1>
</div>
<div className="d-flex flex-wrap">
        {orders.map((item, index) => (
            <Card
          key={index}
          onFavorite={(obj) => onAddToFavorites(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          {...item}
        />
          ))}
      </div>
      </div>
    )
}
export default Orders;