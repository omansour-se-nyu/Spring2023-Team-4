import SellIcon from '@mui/icons-material/Sell';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LocalMall, Logout, PostAdd } from '@mui/icons-material';

import { User } from '../types';

export default function Header({
  loggedUser,
  setLoggedUser,
}: {
  loggedUser: User | null;
  setLoggedUser: (loggedUser: User | null) => void;
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate('/');
            }}
          >
            <LocalMall />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NYUsed
          </Typography>
          {loggedUser ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    size="large"
                    sx={{ ml: 2 }}
                    aria-controls={isMenuOpen ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen ? 'true' : undefined}
                    color="primary"
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget as any);
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#4B0082' }}>
                      {loggedUser.username[0]}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={() => {
                  setAnchorEl(null);
                }}
              >
                <MenuItem
                  onClick={async (e) => {
                    e.preventDefault();
                    navigate('/product/post');
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <PostAdd fontSize="small" />
                  </ListItemIcon>
                  Post a product
                </MenuItem>
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> 81133e0efc6a515e44a8d56f2882df7afeb87758

                <MenuItem
                  onClick={async (e) => {
                    e.preventDefault();
                    navigate('/seller/main.tsx');
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <SellIcon fontSize="small" />
                  </ListItemIcon>
<<<<<<< HEAD
                  My products
=======
                  Edit/Delete a product
>>>>>>> 81133e0efc6a515e44a8d56f2882df7afeb87758
                </MenuItem>

                <MenuItem
                  onClick={async (e) => {
                    e.preventDefault();
                    navigate('/');
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <ShoppingBagIcon fontSize="small" />
                  </ListItemIcon>
                  Front Page
                </MenuItem>

<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> 81133e0efc6a515e44a8d56f2882df7afeb87758
                <MenuItem
                  onClick={async (e) => {
                    e.preventDefault();
                    setLoggedUser(null);
                    setAnchorEl(null);
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
