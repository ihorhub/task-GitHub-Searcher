import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'

import './screen.css'

import SecondScrList from './SecondScrList'

export default function SecondScreen() {
  const { value } = useContext(UserContext)
  const history = useHistory()
  const [repo, setRepo] = useState([])
  const [repoData, setRepoData] = useState([])
  const [search, setSearch] = useState([])
  const [isLoading, setIsLoading] = useState(null)

  const back = () => {
    history.push('/')
  }

  const findUser = async () => {
    try {
      setIsLoading(true)
      await fetch(`${value.url}`)
        .then((res) => res.json())
        .then((items) => setRepo(items))
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const findRepo = async () => {
    try {
      setIsLoading(true)
      await fetch(`${value.repos_url}`)
        .then((res) => res.json())
        .then((items) => setRepoData(items))
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    findUser()
  }, [])

  useEffect(() => {
    findRepo()
  }, [])

  const repoSearch = (e) => {
    setSearch(e.target.value)

    const res = repoData.filter((value) =>
      value.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setSearch(res)
   
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const LoadingIndicator = () => <div className="loading">Loading...</div>

  return (
    <div>
      <span className="span">hello!!! Click on the image !!!!</span>

      {isLoading || isLoading === null || value === undefined ? (
        LoadingIndicator()
      ) : (
        <div className="secondPage">
          <div className="image">
            <a href={value.html_url} target="_blank" rel="noreferrer">
              <img
                src={value.avatar_url}
                alt="avatar"
                width="160px"
                height="120px"
              />
            </a>
          </div>
          <div className="lisEl">
            <ul>
              <li>UserName:{value.login}</li>
              <li>Email:{repo?.email}</li>
              <li>Location:{repo?.location}</li>
              <li> Join Date:{repo?.created_at}</li>
              <li> Followers:{repo?.followers}</li>
              <li> Following :{repo?.following}</li>
            </ul>
          </div>
        </div>
      )}

      <div>
        <button className="c-button" onClick={back}>
          back
        </button>
      </div>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>search repository</label>
          <input
            type="text"
            placeholder="Search Repositories..."
            onChange={repoSearch}
          />
        </form>
      </div>

      {search?.map((item) => (
        <SecondScrList item={item} key={item.id} />
      ))}
    </div>
  )
}
