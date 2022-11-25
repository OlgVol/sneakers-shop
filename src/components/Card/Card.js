import React from "react";
import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({ id, onFavorite, title, imageUrl, price, onPlus, 
  favorited=false, added = false}) {
 const {isItemAdded} = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };
  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/heartWhite.svg" : "/img/heartBlack.svg"}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Price:</span>
          <b>{price}</b>
        </div>
        <button className="button">
          <img
            width={13}
            height={13}
            src={isItemAdded(id) ? "/img/checked.svg" : "/img/plus.svg"}
            alt="Plus"
            onClick={onClickPlus}
          />
        </button>
      </div>
    </div>
  );
}
export default Card;
