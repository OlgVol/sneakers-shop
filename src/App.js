import React from "react";
import "./App.scss";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawers/Drawer";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
      axios.get('https://6374d5d408104a9c5f8aaee6.mockapi.io/items').then(res => {
        setItems(res.data);
      })
      axios.get('https://6374d5d408104a9c5f8aaee6.mockapi.io/Cart').then(res => {
        setCartItems(res.data);
      })

  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://6374d5d408104a9c5f8aaee6.mockapi.io/Cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };
  
  const onRemoveItem =(id) => {
axios.delete(`https://6374d5d408104a9c5f8aaee6.mockapi.io/Cart/${id}`);
setCartItems((prev) => prev.filter(item => item.id !== id))
  }

const onChangeSearchInput = (event) => {
  setSearchValue(event.target.value)
}

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Serach by : "${searchValue}"` : 'All Sneakers'}</h1>
          <div className="search-block d-flex">
            <img width={18} height={18} src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick={()=> setSearchValue('')} className="clear cu-p" src="img/remove.svg" alt="Close" />}
            <input onChange={onChangeSearchInput} value= {searchValue} placeholder="Search..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.
          filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log("added to favorites")}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
