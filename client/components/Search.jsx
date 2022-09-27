import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getItemByName } from '../apis/search'
import { getList } from '../actions/list'

const initialData = {
  search: '',
}

function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

function Search() {
  const [form, setForm] = useState(initialData)
  const [item, setItem] = useState({})
  const list = useSelector((state) => {
    return state.list
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getList())
    console.log('render')
  }, [item])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const thing = list.find((el) => el.item_name == titleCase(form.search))
    if (typeof thing === 'object' && thing !== null) {
      console.log(thing)
      setItem(thing)
      getItemByName(thing.item_name)
      console.log(thing.id)
      setForm(initialData)
      navigate(`/item/${thing.id}`)
    } else {
      setForm(initialData)
      navigate(`/items`)
    }
  }

  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input
            id="search"
            placeholder="Search"
            value={form.search}
            name="search"
            type="text"
            onChange={handleChange}
            className="searchForm"
          />
          <button className="searchButton">Search</button>
        </label>
      </form>
    </div>
  )
}

export default Search
