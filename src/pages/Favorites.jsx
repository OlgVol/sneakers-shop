import Card from "../components/Card/Card";

export default function Favorites({items, onAddtoFarorites}) {
    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
<h1>My favorite Sneakers</h1>
</div>
<div className="d-flex flex-wrap">
        {items
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