import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import Drawer from "./components/Drawers/Drawer";
import Header from "./components/Header";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {

      const cartResponse = await axios.get(
        "https://6374d5d408104a9c5f8aaee6.mockapi.io/Cart"
      );
      const favoritesResponce = await axios.get(
        "https://6374d5d408104a9c5f8aaee6.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://6374d5d408104a9c5f8aaee6.mockapi.io/items"
      );
      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponce.data);
    } catch (error) {
      alert ('Error')
    }
  }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://6374d5d408104a9c5f8aaee6.mockapi.io/Cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://6374d5d408104a9c5f8aaee6.mockapi.io/Cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6374d5d408104a9c5f8aaee6.mockapi.io/Cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://6374d5d408104a9c5f8aaee6.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://6374d5d408104a9c5f8aaee6.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("error to add to favorites");
    }
  };
  const isItemAdded = (id) => {
  return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{cartItems, favorites, items, isItemAdded, setCartOpened, onAddToCart}}>
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorites={onAddToFavorites}
              onAddToCart={onAddToCart}
              cartItems={cartItems}
            />
          }
        />
              <Route
          path="/favorites"
          exact
          element={
            <Favorites onAddToFavorites={onAddToFavorites} />
            }/>
                 <Route
          path="/orders"
          exact
          element={
            <Orders />
            }/>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
