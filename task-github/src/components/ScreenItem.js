import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { NavLink } from 'react-router-dom'
import './screen.css'

export function ScreenItem({ item }) {
  const { value, setValue } = useContext(UserContext)

  const getUserById = (id) => {
    let res = value.find((el) => el.id === id)
    setValue(res)
  }

  return (
    <div>
      <div className="firstScreen">
        <div>
          <img src={item.avatar_url} alt="avatar" width="40px" height="30px" />
        </div>
        <h5> UserName: {item.login}</h5>
        <NavLink to={'/user'}>
          <button className="c-button" onClick={() => getUserById(item.id)}>
            details
          </button>
        </NavLink>
      </div>
      <hr></hr>
    </div>
  )
}
