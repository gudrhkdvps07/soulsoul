import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../style/detaildiary.css'

const Diary = () => {
  const [diaries, setDiaries] = useState([]) // 더미 데이터 제거

  useEffect(() => {
    fetchDiaries()
  }, [])

  const fetchDiaries = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/diaries')
      const data = await response.json()
      setDiaries(data)
    } catch (error) {
      console.error('Error fetching diaries:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/delete-diary/${id}`, {
        method: 'DELETE',
      })
      setDiaries(diaries.filter((diary) => diary.id !== id))
    } catch (error) {
      console.error('Error deleting diary:', error)
    }
  }

  return (
    <div>
      <br />
      <div className="container mt-5 text-center">
        <h1 className="display-4 mt-4 fw-bold">
          <i className="bi bi-book"></i>
          오늘의<span className="spantag"> 일기</span>
        </h1>
        <br />
        <br />
        <div className="d-grid gap-2">
          <Link
            to="/add-diary"
            className="text-white fw-bold text-decoration-none btn mb-2"
          >
            글쓰기
          </Link>
        </div>
        <table className="table table-striped mt-4 mb-5">
          <thead className="custom-thead">
            <tr>
              <th className="text-center">제목</th>
              <th className="text-center">날짜</th>
              <th className="text-center">수정</th>
              <th className="text-center">삭제</th>
            </tr>
          </thead>
          <tbody className="custom-tbody">
            {diaries.map((diary) => (
              <tr key={diary.id}>
                <td className="text-center align-middle">
                  <Link
                    to={`/detail-diary/${diary.id}`}
                    className="text-dark fw-bold text-decoration-none"
                  >
                    {diary.title}
                  </Link>
                </td>
                <td className="text-center align-middle">{diary.date}</td>
                <td className="text-center align-middle">
                  <Link
                    to={`/edit-diary/${diary.id}`}
                    className="btn-su btn btn-sm delete text-white fw-bold"
                  >
                    수정
                  </Link>
                </td>
                <td className="text-center align-middle">
                  <button
                    className="btn-del btn btn-sm delete text-white fw-bold"
                    onClick={() => handleDelete(diary.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Diary
