import React, { Component } from 'react'
import {withStyles} from '@material-ui/styles'
import { Link } from 'react-router-dom'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFotter from './PaletteFooter'
import styles from './Styles/SingleColorPaletteStyles'


class SingleColorPalette extends Component {
    constructor(props){
        super(props)
        this.state= {
            format: 'hex'
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this)
    }
    gatherShades(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors){
          shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1)
    }
    changeFormat(val){
        this.setState({
            format:val
        })
    }
    render(){
        const {format} = this.state
        const {classes} = this.props
        const {paletteName, emoji, id} = this.props.palette
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                name={color.name} 
                id = {color.id} 
                key = {color.name} 
                background ={color[format]} 
                showFullPalette = {false}/>
               
        ))
        return(
            <div className={`SingleColorPalette ${classes.Palette}`}>
                <Navbar changeFormat={this.changeFormat} showingAllColors = {false}/>
                <div className={classes.Colors}>
                    {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${id}`} className='back-button'>Go Back</Link>
                </div>
                </div>
                <PaletteFotter paletteName={paletteName} emoji = {emoji}/>
            </div>
        )
    }
}       

export default withStyles(styles) (SingleColorPalette)