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
import { LocalMall, Logout } from '@mui/icons-material';

export default function Header({
  logged,
  setLogged,
}: {
  logged: boolean;
  setLogged: (logged: boolean) => void;
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
          {logged ? (
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
                      U
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
                    // removeCookie('user');
                    // router.push('/login');
                    setLogged(false);
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
