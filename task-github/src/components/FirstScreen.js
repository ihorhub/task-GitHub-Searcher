import React, { useState, useContext } from 'react'

import FirstScrList from './FirstScrList'
import style from './screen.css'

import { UserContext } from '../UserContext'

export default function FirstScreen() {
  // eslint-disable-next-line no-use-before-define
  const { value, setValue } = useContext(UserContext)
  const [searchName, setSearchName] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [searchData, setSearchData] = useState([])

  //   todo тут не робив пошук ,як пошук по репозиторію(secondScreen), що підтягує зразу по кожній букві,  тому що багато  раз запит на сервак і пілся декілька запитів і спроб він мене блокував, Прийняв рішення банально написати правильне імя і тоді аж робити запит

  const changeHandler = (event) => {
    setSearchName(event.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    findUsers(e)
  }

  // todo запити  маю виненсти в окремий сервіс, але можливо через якісь синиаксичеі помилки переставало давати запит,  я все стер ... і зробив просто в компоненті.. оскільки обмежений в часі .

  const findUsers = async () => {
    try {
      setIsLoading(true)
      await fetch(`https://api.github.com/search/users?q=${searchName}`)
        .then((res) => res.json())
        .then(({ items }) => [setSearchData(items), setValue(items)])
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   findUser()
  // }, [])

  const LoadingIndicator = () => <div className={style.loading}>Loading...</div>

  return (
    <div>
      <h1>GitHub Searcher</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search name..."
            onChange={changeHandler}
          ></input>
        </form>
      </div>

      {isLoading || isLoading === null ? (
        LoadingIndicator()
      ) : (
        <FirstScrList items={searchData} />
      )}
    </div>
  )
}
