import React from 'react'
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'



 

 function PaletteMetaForm(props) {
  const {savePalette, NewPaletteName, setNewPaletteName, setOpen}  = props
  const [stage, setStage] = React.useState('form')

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
        props.palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
      ))

}, [props.paletteName, props.palettes])

const handleOnSelect = (emoji) => {
    savePalette(emoji.native)
}
  return (
    <div>
    <Dialog open = {stage === 'emoji'} onClose={handleClose}>
    <Picker onSelect={handleOnSelect} title='Pick a palette emoji'/>
    </Dialog>
      <Dialog open={stage === 'form'} onClose={handleClose}>
      <ValidatorForm onSubmit={()=>setStage('emoji')}>
        <DialogTitle>Choose a palette Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make sure it's unique
          </DialogContentText>
           
              <TextValidator 
                  label = 'Palette Name' 
                  value ={NewPaletteName} 
                  onChange={(e) => setNewPaletteName(e.target.value)}
                  validators={['required', 'isPaletteNameUnique']}
                  errorMessages={['Enter palette name', 'Palette name already taken']}
                  fullWidth
                  margin='normal'
              />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
                  variant='contained' 
                  color='secondary' 
                  type='submit'> Save Palette
              </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}


export default PaletteMetaForm