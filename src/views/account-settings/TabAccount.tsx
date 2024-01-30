// ** React Imports
import { useState, useEffect, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'
import axios from 'axios'
import Close from 'mdi-material-ui/Close'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

// const baseURL = "http://localhost:4000";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')


  useEffect(() => {
    retrieveChatbot()
  },[])
  const [chatbot, setChatbot] = useState({
    name: '',
    room: '',
    email: '',
    company: '',
    info: '',
    gender: 'male',
    role: 'admin',
    status: 'active'
  })

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const saveChatBot = (fieldName: any, value: any) => {
    setChatbot({
      ...chatbot,
      [fieldName]: value
    })
  }

  const retrieveChatbot = () => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      const config = {
        headers: {
          Authorization: token
        }
      }
      axios.get(`${baseURL}/api/chatbot-info`, config).then(response => {
        console.log('res me ', response)
        if (response) {
          console.log('chatbot-info ', response)
          setChatbot(response.data.Chatbot)
        } else {
          console.log('INVALID USER ')
        }
      })
    }
  }

  const saveAndUpdateChatBot = () => {
    console.log('MY CHATBOT ', chatbot)

    const token = localStorage.getItem('accessToken')
    console.log('TOKEN ', token)
    const config = {
      headers: {
        Authorization: token
      }
    }

    const body = {
      chatbot: chatbot
    }
    axios.post(`${baseURL}/api/create-chatbot`, body, config).then(response => {
      console.log('res me ', response)
      if (response) {
        console.log('UPDATED ', response)
      } else {
        console.log('INVALID USER ')
      }
    })
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Chatbot Name'
              placeholder='Name your Chatbot'
              defaultValue={chatbot.name}
              value={chatbot.name}
              onChange={e => saveChatBot('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name your Chatroom'
              placeholder='ChatRoom Name'
              defaultValue={chatbot.room}
              onChange={e => saveChatBot('room', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='An email address to get in touch with you!'
              defaultValue={chatbot.email}
              value={chatbot.email}
              onChange={e => saveChatBot('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select onChange={e => saveChatBot('role', e.target.value)} label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select onChange={e => saveChatBot('status', e.target.value)} label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Company'
              placeholder='Name of your organization'
              defaultValue={chatbot.company}
              value={chatbot.company}
              onChange={e => saveChatBot('company', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup
                onChange={e => saveChatBot('gender', e.target.value)}
                row
                defaultValue='male'
                aria-label='gender'
                name='account-settings-info-radio'
              >
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              onChange={e => saveChatBot('info', e.target.value)}
              defaultValue={chatbot.info}
            />
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => saveAndUpdateChatBot()}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
