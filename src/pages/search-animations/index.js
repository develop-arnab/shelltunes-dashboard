import { useState, useEffect } from 'react'
import Navigation from '../../navigation/Nav'
import Animation from '../../animation/Animation'
import Recommended from '../../Recommended/Recommended'
import Sidebar from '../../Sidebar/Sidebar'
import Card from '../../components/search/Card'
import axios from 'axios'
import { AiFillStar } from 'react-icons/ai'
// import './index.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('wedding')
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 200)

    return () => clearTimeout(handler)
  }, [query])

  // Updated useEffect hook to call fetchData with either the selected category or the search query
  useEffect(() => {
    const searchParameter = selectedCategory || debouncedQuery
    fetchData(searchParameter)
  }, [debouncedQuery, selectedCategory])

  const fetchData = async searchQuery => {
    let data = JSON.stringify({
      search: searchQuery?.toLowerCase() // searchQuery will now be either the selected category or the debounced user query
    })

    let config = {
      method: 'post',
      url: 'https://canvas.shelltunes.com/api/search',
      headers: { 'Content-Type': 'application/json' },
      data: data
    }

    try {
      const response = await axios.request(config)
      setProducts(response.data.result) // Assuming `result` contains the data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleInputChange = event => {
    setQuery(event.target.value)
    if (selectedCategory) {
      setSelectedCategory(null) // Reset category selection when user starts typing
    }
  }

  const handleChange = event => setSelectedCategory(event.target.value)
  const handleClick = event => {
    setSelectedCategory(event.target.value)
    setQuery('') // Reset search query when category is selected
  }

  const filteredData = products?.map(product => (
    <Card
      key={product._id}
      img={product.url}
      title={product.fileName} // Make sure this aligns with your data structure
      star={<AiFillStar className='rating-star' />}
      searchQuery={query}
    />
  ))

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Animation result={filteredData} />
    </>
  )
}

export async function getStaticProps({params = {}}) {
    // const res = await axios.get(...);

    return {
      // will be passed to the page component as props
      props: {
        posts: 'hello'
      }
    }
  }
export default App
