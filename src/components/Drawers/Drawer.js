

function Drawer({ onClose, onRemove, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Basket <img onClick={onClose} className="cu-p" src="img/remove.svg" height={12} width={12} alt="Close"  />
        </h2>
        <div className="Items">
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} EU.</b>
                  </div>
                  <img
                  onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/remove.svg"
                    alt="Remove"
                    height={12} width={12}
                  />
                </div>
              ))}
            </div>
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
              <button className="greenButton">Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Drawer;