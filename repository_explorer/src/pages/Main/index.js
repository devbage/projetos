import React, { useState } from 'react'
import axios from 'axios'
import { FaGithub, FaSearch, FaStar, FaCode, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import './styles.css'

export default function Main() {
    const [query, setQuery] = useState('')
    const [repositories, setRepositories] = useState([])
    const [pageNo, setPageNo] = useState(1)

    function handleInputChange(e) {
        setQuery(e.target.value)
    }

    async function loadRepositories(query, pageNo) {
        try {
            const response = await axios.get(`https://api.github.com/search/repositories`, {
                params: {
                    q: query,
                    sort: 'stars',
                    order: 'desc',
                    per_page: 10,
                    page: pageNo
                }
            })
            const items = response.data.items
            setRepositories(items)
            document.getElementById('input').blur()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } catch (error) {
            alert(error.message)
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        loadRepositories(query, pageNo)
    }

    function handlePagination(option) {
        const updatedPageNo = option === 'next' ? pageNo + 1 : pageNo - 1
        setPageNo(updatedPageNo)
        loadRepositories(query, updatedPageNo)
    }

    return (
        <div className="container">
            <div id="search">
                <FaGithub size={120} />
                <form onSubmit={handleFormSubmit}>
                    <input type="text" id="input" placeholder={"Pesquisar"} value={query} onChange={handleInputChange} />
                    <button className="button" type="submit">
                        <FaSearch size={18} />
                    </button>
                </form>
            </div>
            <div id="list">
                <ul>
                    {
                        repositories.map((repository, index) => (
                            <li key={index}>
                                <h3 id="repository-full_name">
                                    <a id="repository-link" href={repository.html_url}>
                                        {repository.full_name}
                                    </a>
                                    <FaStar id="repository-stars_count" size={18} />
                                    {repository.stargazers_count}
                                </h3>
                                <p id="repository-description">{repository.description}</p>
                                {repository.language !== null ? (
                                    <p id="repository-language">
                                        <FaCode size={14} />
                                        {repository.language}
                                    </p>
                                ) : (
                                        <></>
                                    )}
                            </li>
                        ))}
                </ul>
                {repositories.length > 0 ? (
                    <div id="pagination-buttons">
                        <button className="button" type="button" disabled={pageNo < 2} onClick={() => handlePagination('previous')}>
                            <FaArrowLeft size={18} />
                        </button>
                        <button className="button" type="button" onClick={() => handlePagination('next')}>
                            <FaArrowRight size={18} />
                        </button>
                    </div>
                ) : (
                        <></>
                    )}
            </div>
        </div >
    )
}