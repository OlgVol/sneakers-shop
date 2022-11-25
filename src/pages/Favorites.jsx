import React from 'react';
import Card from "../components/Card/Card";
import  AppContext  from "../context";

export default function Favorites({onAddtoFarorites}) {
const {favorites}= React.useContext(AppContext)


    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
<h1>My favorite Sneakers</h1>
</div>
<div className="d-flex flex-wrap">
        {favorites
          .map((item, index) => (
            <Card
              key={index}
              imageUrl={item.imageUrl}
              favorited={true}
              onFavorite={onAddtoFarorites}
              {...item}
            />
          ))}
      </div>
      </div>
    )
}