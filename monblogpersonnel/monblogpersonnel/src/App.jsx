import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import Login from '../Login.jsx'
import Register from '../Register.jsx'
import Dashboard from '../Dashboard.jsx'
import ArticlePage from '../ArticlePage.jsx'
import ArticleView from '../ArticleView.jsx' // Assurez-vous que ArticleView est importé
import ArticleCreate from './pages/ArticleCreate.jsx' // This is now the create page
import ArticleEdit from './pages/ArticleEdit.jsx' // New edit page

import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/articles/:id/edit" element={<ArticleEdit />} /> {/* New edit route */}
            <Route path="/dashboard/create-article" element={<ArticleCreate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
