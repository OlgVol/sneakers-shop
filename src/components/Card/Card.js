import React from "react";
import styles from "./Card.module.scss";

function Card({ onFavorite, title, imageUrl, price, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img src="/img/heartWhite.svg" alt="Unliked" />
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
            src={isAdded ? "/img/checked.svg" : "/img/plus.svg"}
            alt="Plus"
            onClick={onClickPlus}
          />
        </button>
      </div>
    </div>
  );
}
export default Card;
