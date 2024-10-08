// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import axios from 'axios'
import { useRouter } from 'next/router'
// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const VerifyCodePage = () => {
  // ** States
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })
  const [username, setUsername] = useState('')
  const [code, setVerificationCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  console.log(router.query)

  useEffect(() => {
    if (router.query.username) {
      setUsername(router.query.username as string)
    }
  }, [])
  const baseURL = process.env.NEXT_PUBLIC_AUTH_SERVICE
  // const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const verifyCode = () => {
    console.log('EMAIL ', username, 'Password ', code)

    const body = {
      username: username,
      token: code
    }
    axios.post(`${baseURL}/user/verify-email`, body).then(response => {
      console.log('res me ', response)
      if (response.data == 'SUCCESS') {
        router.push('/user/login')
      } else {
        console.log('INVALID USER ')
      }
    })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width={38} height={38} alt='paypal' src='/images/shelltunes-android-chrome-192x192.png' />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              We have sent a verification code to your email 🚀
            </Typography>
            <Typography variant='body2'>Enter the code we just emailed you</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              value={username}
              id='username'
              label='username'
              sx={{ marginBottom: 4 }}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label='Verify Code'
              sx={{ marginBottom: 4 }}
              onChange={e => setVerificationCode(e.target.value)}
            />
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => verifyCode()}
            >
              Verify
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/user/login'>
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
            {/* <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box> */}
          </form>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}

VerifyCodePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default VerifyCodePage
