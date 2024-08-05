import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext' // LoginContext에서 훅을 가져옵니다.
import '../style/navbar.css'

const Navbar = () => {
  const { user, logout } = useLogin() // useLogin 훅을 사용하여 로그인 상태와 로그아웃 기능을 가져옵니다.
  const navigate = useNavigate() // 페이지 이동을 위한 navigate 훅

  const handleLogout = () => {
    logout() // 로그아웃 함수 호출
    navigate('/') // 홈 페이지로 리디렉션
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 mx-1" to="/introduce">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="writer"
            className="logo-img"
          />
          마음챙기기
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/diary">
                    Diary
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/calendar">
                    Mood Tracker
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mypage">
                    My Page
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/stickershop">
                    쇼핑몰
                  </Link>
                </li>
                <li className="nav-button-item">
                  <button
                    className="nav-btn btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
