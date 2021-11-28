import React from 'react'
import PaletteMetaForm from './PaletteMetaForm'
import {AppBar, styles} from './Styles/NewPaletteFormNavStyles'
import {Link} from 'react-router-dom'
import { ThemeProvider } from '@mui/private-theming';
import { withStyles } from '@mui/styles';
import {useTheme} from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';



function NewPaletteFormNav (props) {
    const theme = useTheme();
    const {open, handleDrawerOpen, savePalette, NewPaletteName, setNewPaletteName, classes, palettes} = props
    const [form, openForm] = React.useState(false)

    const handleClickForm = () => {
      openForm(true);
    };
    return(
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppBar position="fixed" open={open} color='default'>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <AddBoxIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Create a Palette
            </Typography>
          </Toolbar>
            <div className={classes.navBtns}>

            <Link to="/">
            <Button className={classes.button} variant='contained' color='secondary'>
                  Go Back
            </Button>
            </Link>
            <Button className={classes.button} variant="contained" onClick={handleClickForm}>
                Save
            </Button>
           {form? <PaletteMetaForm open={form} setOpen={openForm} palettes={palettes} savePalette={savePalette} NewPaletteName={NewPaletteName} setNewPaletteName={setNewPaletteName}/> : null } 
            </div>
        </AppBar>
        </ThemeProvider>
      )
}


export default withStyles(styles, {theme:true})(NewPaletteFormNav)