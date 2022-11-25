import React from 'react';
import Card from "../components/Card/Card";

export default function Home({
  items,
  searchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorites,
  setSearchValue,
}) {


  const renderItems =() => {
    return items
      .filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((item, index) => (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorites(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          {...item}
        />
    ))
  }
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `Serach by : "${searchValue}"` : "All Sneakers"}</h1>
        <div className="search-block d-flex">
          <img width={18} height={18} src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="img/remove.svg"
              alt="Close"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">
      {renderItems()}
      </div>
    </div>
  );
}
