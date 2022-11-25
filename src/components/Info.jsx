import React from 'react'
import AppContext from '../context'

const Info = ({title, description}) => {
    const { setCartOpened } = React.useContext(AppContext)
  return (
    <div>
    Order confirmed 
    <button onClick={() => setCartOpened(false)} className="greenButton">Return</button>
    </div>
  )
}
export default Info;
