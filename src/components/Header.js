import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
export default function Header(){
  const navigate = useNavigate();
    const navItems = ['Dashboard', 'TaskList'];
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    };
    const userdata = JSON.parse(localStorage.getItem('user')) || "";

    return(
        <>
    <AppBar component="nav">
      <Toolbar>
        {/* Left side: Dashboard and TaskList */}
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/user/dashboard"
            sx={{ paddingRight: 6 , color: 'white', textDecoration: 'none'}}
          >
            Dashboard
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/tasklist"
            sx={{ paddingRight: 6 , color: 'white', textDecoration: 'none'}}
          >
            Task list
          </Typography>
        </Box>

        {/* Right side: Sign out button */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {userdata && (
            <Button variant="contained" color="white" onClick={logout}>
              Sign out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
        </>
    )
}