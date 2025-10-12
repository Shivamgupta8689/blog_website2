import React, { useState, useContext } from 'react'
import { Box, TextField, Button, styled, Typography, MenuItem, useMediaQuery, useTheme } from '@mui/material'
import API from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

// Responsive Component Container
const Component = styled(Box)(({ theme }) => `
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
    border-radius: 4px;
    background: white;
    
    // Large Devices (1200px and above)
    ${theme.breakpoints.up('lg')} {
        width: 450px;
        margin: 40px auto;
    }
    
    // Medium Devices (600px to 1199px)
    ${theme.breakpoints.between('sm', 'lg')} {
        width: 380px;
        margin: 30px auto;
    }
    
    // Small Devices (below 600px)
    ${theme.breakpoints.down('sm')} {
        width: 90%;
        max-width: 350px;
        margin: 20px auto;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    // Extra Small Devices (below 400px)
    @media (max-width: 400px) {
        width: 95%;
        max-width: 320px;
        margin: 15px auto;
    }
`);

// Responsive Image
const Image = styled('img')(({ theme }) => `
    width: 100px;
    height: auto;
    display: block;
    margin: 0 auto;
    padding: 50px 0 0;
    
    // Large Devices
    ${theme.breakpoints.up('lg')} {
        width: 120px;
        padding: 60px 0 0;
    }
    
    // Medium Devices
    ${theme.breakpoints.between('sm', 'lg')} {
        width: 100px;
        padding: 40px 0 0;
    }
    
    // Small Devices
    ${theme.breakpoints.down('sm')} {
        width: 80px;
        padding: 30px 0 0;
    }
    
    // Extra Small Devices
    @media (max-width: 400px) {
        width: 70px;
        padding: 25px 0 0;
    }
`);

// Responsive Wrapper
const Wrapper = styled(Box)(({ theme }) => `
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    // Large Devices
    ${theme.breakpoints.up('lg')} {
        padding: 30px 40px;
        gap: 22px;
    }
    
    // Medium Devices
    ${theme.breakpoints.between('sm', 'lg')} {
        padding: 25px 30px;
        gap: 18px;
    }
    
    // Small Devices
    ${theme.breakpoints.down('sm')} {
        padding: 20px 20px;
        gap: 16px;
    }
    
    // Extra Small Devices
    @media (max-width: 400px) {
        padding: 16px 16px;
        gap: 14px;
    }
`);

// Responsive Login Button
const LoginButton = styled(Button)(({ theme }) => `
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
        background: #E85A0C;
    }
    
    // Large Devices
    ${theme.breakpoints.up('lg')} {
        height: 52px;
        font-size: 17px;
    }
    
    // Medium Devices
    ${theme.breakpoints.between('sm', 'lg')} {
        height: 48px;
        font-size: 16px;
    }
    
    // Small Devices
    ${theme.breakpoints.down('sm')} {
        height: 44px;
        font-size: 14px;
    }
    
    // Extra Small Devices
    @media (max-width: 400px) {
        height: 40px;
        font-size: 13px;
    }
`);

// Responsive Signup Button
const SignupButton = styled(Button)(({ theme }) => `
    text-transform: none;
    background: #fff;
    color: #287400;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
        background: #f5f5f5;
    }
    
    // Large Devices
    ${theme.breakpoints.up('lg')} {
        height: 52px;
        font-size: 17px;
    }
    
    // Medium Devices
    ${theme.breakpoints.between('sm', 'lg')} {
        height: 48px;
        font-size: 16px;
    }
    
    // Small Devices
    ${theme.breakpoints.down('sm')} {
        height: 44px;
        font-size: 14px;
    }
    
    // Extra Small Devices
    @media (max-width: 400px) {
        height: 40px;
        font-size: 13px;
    }
`);

// Error Message
const Error = styled(Typography)(({ theme }) => `
    font-size: 12px;
    color: #ff6161;
    line-height: 1.2;
    font-weight: 600;
    text-align: center;
    
    ${theme.breakpoints.down('sm')} {
        font-size: 11px;
    }
    
    @media (max-width: 400px) {
        font-size: 10px;
    }
`);

// Divider Text
const Text = styled(Typography)(({ theme }) => `
    color: #878787;
    font-size: 16px;
    text-align: center;
    font-weight: 500;
    
    ${theme.breakpoints.up('lg')} {
        font-size: 17px;
    }
    
    ${theme.breakpoints.down('sm')} {
        font-size: 14px;
    }
    
    @media (max-width: 400px) {
        font-size: 12px;
    }
`);

// Responsive TextField styles
const StyledTextField = styled(TextField)(({ theme }) => `
    & .MuiInput-root {
        font-size: 15px;
    }
    
    & .MuiInputBase-input {
        padding: 8px 0;
    }
    
    ${theme.breakpoints.down('sm')} {
        & .MuiInput-root {
            font-size: 14px;
        }
        
        & .MuiInputBase-input {
            padding: 6px 0;
        }
    }
    
    @media (max-width: 400px) {
        & .MuiInput-root {
            font-size: 13px;
        }
    }
`);

const signupInitialValues = {
    user_type: '',
    name: '',
    username: '',
    password: '',
}

const loginInitialValues = {
    user_type: '',
    username: '',
    password: '',
}

const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues)
    const [error, setError] = useState('')
    const {setAccount} = useContext(DataContext)
    const navigate = useNavigate();

    const onInputChange = (e) =>{
        setSignup({...signup, [e.target.name]: e.target.value})
    }
    
    const onValueChange = (e) =>{
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const signupUser = async () => {
        const { user_type, name, username, password } = signup;
      
        if (!user_type || !name || !username || !password) {
          setError("Please fill all fields");
          return;
        }
      
        let response = await API.userSignup({ user_type, name, username, password });
      
        if(response.isSuccess) {
          setError('');
          setSignup(signupInitialValues);
          setLogin(loginInitialValues);
          toggleAccount('login');
        } else {
          setError('Something went wrong, please try again later');
        }
      }

      const loginUser = async () => {
        const {user_type, username, password } = login;
      
        if (!user_type || !username || !password) {
          setError("Please fill all fields");
          return;
        }
      
        console.log("Sending login data:", {user_type, username, password });
      
        let response = await API.userLogin({ user_type, username, password });
        console.log(response.data)
        if(response.isSuccess) {
          setError('');
          setLogin(loginInitialValues);
          sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
          sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);

          setAccount({user_type: response.data.user_type, username: response.data.username, name: response.data.name});
          isUserAuthenticated(true);
          navigate('/')
        } else {
          setError('Something went wrong, please try again later');
        }
      }
      
  return (
    <Component>
        <Box>
            <Image src={imageURL} alt="login"/>
            {
                account === 'login' ? 
             <Wrapper>
             <StyledTextField
                 select
                 variant="standard"
                 name="user_type"
                 onChange={(e)=>onValueChange(e)}
                 label="Select User Type"
                 value={login.user_type}
                 fullWidth
             >
                 <MenuItem value="Student">Student</MenuItem>
                 <MenuItem value="Teacher">Teacher</MenuItem>
             </StyledTextField>
             <StyledTextField 
                 variant='standard' 
                 onChange={(e)=>onValueChange(e)} 
                 name='username' 
                 label="Enter Username"
                 value={login.username}
                 fullWidth
             />
             <StyledTextField 
                 variant='standard' 
                 label="Enter Password" 
                 onChange={(e)=>onValueChange(e)} 
                 name='password'
                 type='password'
                 value={login.password}
                 fullWidth
             />
             {error && <Error>{error}</Error>}
             <LoginButton variant='contained' onClick={()=>loginUser()}>Login</LoginButton>
             <Text>OR</Text>
             <SignupButton onClick={()=>{
                 setError('');
                 toggleAccount('signup')
             }}>Create an account</SignupButton>
             </Wrapper> 

            :

            <Wrapper>
            <StyledTextField
                 select
                 variant="standard"
                 name="user_type"
                 onChange={(e)=>onInputChange(e)}
                 label="Select User Type"
                 value={signup.user_type}
                 fullWidth
             >
                 <MenuItem value="Student">Student</MenuItem>
                 <MenuItem value="Teacher">Teacher</MenuItem>
             </StyledTextField>
            <StyledTextField 
                 variant='standard' 
                 onChange={(e)=>onInputChange(e)} 
                 name='name' 
                 label="Enter your name"
                 value={signup.name}
                 fullWidth
             />
            <StyledTextField 
                 variant='standard' 
                 onChange={(e)=>onInputChange(e)} 
                 name='username' 
                 label="Enter Username"
                 value={signup.username}
                 fullWidth
             />
            <StyledTextField 
                 variant='standard' 
                 onChange={(e)=>onInputChange(e)} 
                 name='password' 
                 label="Enter Password"
                 type='password'
                 value={signup.password}
                 fullWidth
             />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={()=>signupUser()}>Signup</SignupButton>
            <Text>OR</Text>
            <LoginButton onClick={()=>{
                 setError('');
                 toggleAccount('login')
            }} variant='contained'>Already have an account</LoginButton>
            </Wrapper>
            }
        </Box>
    </Component>
  )
}

export default Login
