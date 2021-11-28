import * as React from 'react';
import seedColors from './seedColors'
import {  useTheme  } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import {arrayMoveImmutable} from 'array-move';
import { ThemeProvider } from '@mui/private-theming';
import {Main, DrawerHeader, styles} from './Styles/NewPaletteFormStyles'
import ColorPaletteForm from './ColorPaletteForm';
import DragableColorList from './DragableColorList';
import NewPaletteFormNav from './NewPaletteFormNav';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';


const drawerWidth = 400;

 function NewPaletteForm(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState(seedColors[0].colors)
  const [NewPaletteName, setNewPaletteName] = React.useState('')
  const maxColors = 20
  const paletteIsFull = colors.length >= maxColors
  const {classes} = props
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleSubmit = (color, name, func) => (
    setColors([...colors, {color, name}], func) 
  )

  const savePalette = (emoji) => {
      let paletteName = NewPaletteName
      const newPalette = {
            paletteName: paletteName,
            colors: colors,
            id: paletteName.toLowerCase().replace(/ /g, '-'),
            emoji: emoji
        }
      props.savePalette(newPalette)
      props.history.push('/')
  }

  const removeColor = (name) => {
   const newColors =  colors.filter(color => (
        color.name !== name
    ))
    setColors(newColors)
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMoveImmutable(colors, oldIndex, newIndex))
  };

  const clearColors = () => {
    setColors([])
  }

  const addRandomColors = () => {
    let allColors = props.palettes.map(palette => (
      palette.colors)).flat()
    let rand = Math.floor(Math.random() * allColors.length)
    let randomColor = allColors[rand]
    let isDuplicateColor = true
    while(isDuplicateColor){
       rand = Math.floor(Math.random() * allColors.length)
       randomColor = allColors[rand]
       let name = randomColor.name
       isDuplicateColor = colors.some(color => color.name === name)
    };
      setColors([...colors, randomColor])
  }

  return (
    <ThemeProvider theme = {theme}>
    <Box sx={{ display: 'flex' }}>
      <NewPaletteFormNav 
        handleDrawerOpen={handleDrawerOpen} 
        savePalette={savePalette} 
        NewPaletteName={NewPaletteName} 
        setNewPaletteName={setNewPaletteName}
        open={open}
        setOpen={setOpen}
        palettes= {props.palettes} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
          },
        }}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
             <ChevronLeftIcon /> 
          </IconButton>
        </DrawerHeader>
        <Typography gutterBottom variant='h4'>Design Your Palette</Typography>
        <Divider />
        <div className={classes.container}>
        <div className={classes.buttons}>
            <Button 
              className={classes.button} 
              variant='contained' 
              color='secondary' 
              onClick={clearColors}>
                Clear Palette
            </Button>
            <Button 
              className={classes.button} 
              disabled= {paletteIsFull} 
              variant='contained' 
              color='primary' 
              onClick={addRandomColors}
              >
                Random Color
            </Button>
        </div>
        <ColorPaletteForm 
              handleSubmit= {handleSubmit} 
              paletteIsFull={paletteIsFull} 
              colors={colors} 
              setColors={setColors}  />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
            <DragableColorList axis='xy' colors={colors} removeColor={removeColor} onSortEnd={onSortEnd} distance={20}/>
      </Main>
    </Box>
    </ThemeProvider>
  );
}


export default withStyles(styles, {withTheme:true})(NewPaletteForm)