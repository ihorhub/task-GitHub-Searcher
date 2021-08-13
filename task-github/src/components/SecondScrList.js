import React from 'react'
import './screen.css'

export default function SecondScrList({ item }) {
  //todo render repo

  return (
    <div>
      {' '}
      <div className="repoList">
        <div className="RepoName"> RepoName:----{item.name}---</div>
        <div className="list">
          <div className="forks"> Forks:{item.forks}</div>
          <div className="star"> Stars:{item.stargazers_count}</div>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
