import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/system';

const BackgroundContainer = styled(Box)({
  minHeight: '100vh',
  backgroundImage: 'url(./public/signUpbackgroun.jpg)', // Ensure this path is correct
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledPaper = styled(Paper)({
  padding: 20,
  maxWidth: 400,
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.29)', // Semi-transparent white
  borderRadius: 10,
  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(10px)',
});

const StyledAvatar = styled(Avatar)({
  margin: 10,
  backgroundColor: '#3f51b5',
  width: 60,
  height: 60,
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  transform: 'rotateY(0deg)',
  animation: 'spin 5s infinite linear',
  '@keyframes spin': {
    '0%': { transform: 'rotateY(0deg)' },
    '100%': { transform: 'rotateY(360deg)' },
  },
});

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <BackgroundContainer>
      <StyledPaper elevation={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StyledAvatar>
            <LockOutlinedIcon fontSize="large" />
          </StyledAvatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#3f51b5',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </StyledPaper>
    </BackgroundContainer>
  );
}

export default Login;
