// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function Navbar({ username }) {

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             calendar
//           </Typography><div>
//             {username ? (
//               <>
//                 Welcome, {username}
//                 <Button color="inherit" onClick={handleLogout}>Logout</Button>
//               </>
//             ) : null}
//           </div>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
