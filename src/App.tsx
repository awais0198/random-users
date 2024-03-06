import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Nav from 'components/Nav'
import UserProfile from 'pages/User'
import UsersListing from 'pages/UsersListing'

import './App.css'

const App: React.FC = () => (
  <Router>
    <Nav />
    <Routes>
      <Route path='/user' element={<UserProfile />} />
      <Route path='/' element={<UsersListing />} />
    </Routes>
  </Router>
)

export default App
