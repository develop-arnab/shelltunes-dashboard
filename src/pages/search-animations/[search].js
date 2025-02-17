import { useState, useEffect } from 'react'
import Navigation from '../../navigation/Nav'
import Animation from '../../animation/Animation'
import Recommended from '../../Recommended/Recommended'
import Sidebar from '../../Sidebar/Sidebar'
import Card from '../../components/search/Card'
import axios from 'axios'
import { AiFillStar } from 'react-icons/ai'
import Head from 'next/head'
// import './index.css'

function App({ title, searchData }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState(title)
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
      <Head>
        <title>{title.toUpperCase()} Text Animations</title>
        <meta
          name='description'
          content={`Elevate your message with customizable text animations. Tailor the text to fit your brand’s voice and style, ensuring your message not only reaches but resonates with your audience.`}
        />
        <meta name='og:title' content='Create your own Text Animations' />
      </Head>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Animation result={filteredData} />
    </>
  )
}

async function fetchSearchData(searchTerm) {

  const placeholderData = [
    { id: 1, title: 'Wedding Animation 1' },
    { id: 2, title: 'Wedding Animation 2' }
  ]

  return placeholderData // Replace with actual fetched data
}

export async function getStaticProps({ params = {} }) {
  const { search } = params // Change searchTerm to search
//   const searchData = await fetchSearchData(search)

  return {
    props: {
      title: search, // Change searchTerm to search
    //   searchData
    },
    revalidate: 60
  }
}

export const getStaticPaths = async () => {
  const paths = [
    // { params: { search: 'featured' } },
    // { params: { search: 'alphabets' } },
    // { params: { search: 'tech' } },
    // { params: { search: 'wedding' } },
    // { params: { search: 'food' } }
  ]

  return { paths, fallback: 'blocking' }
}
export default App
