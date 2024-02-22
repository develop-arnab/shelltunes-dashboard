// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardWithCollapse from 'src/views/cards/CardWithCollapse'
import CardUser from 'src/views/cards/CardUser'
import Typography from '@mui/material/Typography'
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import axios from 'axios'
import { useState, useEffect } from 'react'
const Dashboard = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 
  const [savedProjects, setSavedProjects] = useState([])
  const getSavedProject = async () => {
    const headers = {
      Authorization: localStorage.getItem('accessToken'),
      'Content-Type': 'application/json'
    }

    try {
      const response = await axios.get(BASE_URL + '/api/retrieveCanvas', { headers })
      const data = response?.data
      console.log('DATA ', data)
      setSavedProjects(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getSavedProject()
  }, [])
  const handleClick = option => {
    const url = process.env.NEXT_PUBLIC_BASE_URL

    const accessToken = localStorage.getItem('accessToken') // Replace with your actual storage key

    let fullUrl = url + "/studio/"
    if (option === 'Memes') {
      fullUrl += 'memes'
    } else if (option === 'Presentation') {
      fullUrl += `?token=${encodeURIComponent(accessToken)}&search=business`
    } else if (option === 'advertisement') {
      fullUrl += `?token=${encodeURIComponent(accessToken)}&search=advertise`
    } else {
      fullUrl += '?id=' + option
      fullUrl += `&token=${encodeURIComponent(accessToken)}`
    }

    // Append the JWT token as a query parameter

    // window.open(fullUrl, '_blank', 'noopener,noreferrer')

    // Open the new window
    const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer')
    // Check if the new window is not blocked
    if (newWindow) {
      // Send the access token to the new window
      newWindow.postMessage({ type: 'SET_ACCESS_TOKEN', token: accessToken }, '*')
    } else {
      // Handle the case where the new window is blocked
      console.error('The new window was blocked by the browser.')
    }
  }
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant='h5'>Create</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardUser
            cta={'Create'}
            title={'Social Media'}
            description={'16:9'}
            handleClick={() => handleClick('advertisement')}
            image={'/images/templates/landscape.jpg'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardUser
            cta={'Create'}
            title={'Presentation'}
            description={'16:9'}
            handleClick={() => handleClick('Presentation')}
            image={'/images/templates/potrait.avif'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardUser
            cta={'Create'}
            title={'Memes'}
            description={'16:9'}
            handleClick={() => handleClick('Memes')}
            image={'/images/templates/meme_template.jpg'}
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant='h5'>Saved Projects</Typography>
        </Grid>
        {savedProjects?.map(project => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <CardUser
                cta={'Resume'}
                title={'Project'}
                description={'16:9'}
                handleClick={() => handleClick(project._id)}
                image={project.thumbnail}
              />
            </Grid>
          )
        })}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
