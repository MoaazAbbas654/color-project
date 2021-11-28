import React from 'react'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {ChromePicker} from 'react-color'
import { withStyles } from '@mui/styles';
import styles from './Styles/ColorPickerFormStyles'
import Button from '@mui/material/Button';


function ColorPaletteForm (props) {
    const [color, setColor] = React.useState()
    const [name, setName] = React.useState('')
    const {handleSubmit, paletteIsFull, colors, classes} = props
    const handleSubmition = () => {
        handleSubmit(color, name, setName(''))
    }

    React.useEffect(() => { 
   
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
            colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
          ))
          ValidatorForm.addValidationRule('isColorUnique', (value) => (
            colors.every(
                (color) => color.color !== color
            )
          ))
         
      },[colors])
    
    return(
        <div style= {{width: '100%'}}>
            <ChromePicker 
            color = {color} 
            onChangeComplete={(newColor)=> setColor(newColor.hex)}
            className={classes.picker}
        />
        <ValidatorForm 
            instantValidate={false}
            onSubmit={handleSubmition}>
            <TextValidator 
                
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                validators={['required', 'isColorNameUnique', 'isColorUnique']} 
                errorMessages={['Enter color', 'Color name must be unique', 'Color already used']}
                className={classes.colorName}
                variant='filled'
                margin='normal'
                placeholder='Enter color name'
        />
            <Button 
                style={{backgroundColor: paletteIsFull? 'grey' : color}} 
                variant='contained' 
                color='primary' 
                type = 'submit'
                disabled= {paletteIsFull}
                className={classes.addColor}
                >
                Add Color
            </Button>
        </ValidatorForm>    
        </div>
    )
}


export default withStyles(styles)(ColorPaletteForm)