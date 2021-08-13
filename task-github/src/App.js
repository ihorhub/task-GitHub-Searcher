import './App.css'
import React, { useState, useMemo } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import FirstScreen from './components/FirstScreen'
import SecondScreen from './components/SecondScreen'
import { UserContext } from './UserContext'

function App() {
  const [value, setValue] = useState()
  // const providerValue = useMemo(() => ({ value, setValue }), [value, setValue])

  return (
    <div className="App">
      <Switch>
        <UserContext.Provider value={{ value, setValue }}>
          <Route path="/" exact={true}>
            <div>FirstScreen</div>
            <FirstScreen />
          </Route>
          <Route path="/user">
            <div>user details page</div>
            <SecondScreen />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </UserContext.Provider>
      </Switch>
    </div>
  )
}

export default App
