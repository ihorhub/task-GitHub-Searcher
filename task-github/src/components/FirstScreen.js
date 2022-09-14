import React, { useState, useContext, useEffect } from 'react'

import FirstScrList from './FirstScrList'
import './screen.css'

import { UserContext } from '../UserContext'

export default function FirstScreen() {
  // eslint-disable-next-line no-use-before-define
  const { value, setValue } = useContext(UserContext)
  const [searchName, setSearchName] = useState('')
  const [isLoading, setIsLoading] = useState(null)
  const [searchData, setSearchData] = useState([])

  const changeHandler = (event) => {
    setSearchName(event.target.value)
  }

  console.log(value, 'value')
  const handleSubmit = (e) => {
    e.preventDefault()
    findUsers()
    setSearchName('')
  }

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

  const LoadingIndicator = () => <div className="loading">Loading...</div>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataIndicator = () => (
    <div className="loading">server error... try egain later</div>
  )


  return (
    <div>
      <h1>GitHub Searcher</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search name..."
            onChange={changeHandler}
            value={searchName}
          ></input>
        </form>
      </div>

      {isLoading ? (
        LoadingIndicator()
      ) : searchData === undefined ? (
        dataIndicator()
      ) : (
        <FirstScrList items={searchData} />
      )}
    </div>
  )
}
