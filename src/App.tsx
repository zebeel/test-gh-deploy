import React from 'react'
import Layout from './layouts/Layout'
import MainScreen from './screens/MainScreen'
import 'bootstrap/dist/css/bootstrap.min.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <MainScreen />
      </Layout>
    </div>
  )
}

export default App
