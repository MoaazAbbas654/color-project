import {styled} from '@mui/material/styles';
import sizes from './sizes'
import MuiAppBar from '@mui/material/AppBar';
import { DRAWR_WIDTH } from '../Constants';
const drawerWidth = DRAWR_WIDTH;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
      flexDirection :'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height:'64px',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const styles = {
  navBtns: {
    marginRight: '1rem',
    '& button': {
      margin: '0 0.5rem',
      [sizes.down('sm')]: {
        marginRight: '0 '
      }
    },
    "& a": {
      textDecoration: 'none'
    },
    
  }
}

export {AppBar, styles}
