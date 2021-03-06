import React, { Component } from 'react'
import {withStyles} from '@material-ui/styles'
import styles from './Styles/SingleColorPaletteStyles'
import ColorBox from './ColorBox'
import Navbar from './Navbar';
import PaletteFotter from './PaletteFooter';


class Palette extends Component {
    constructor(props){
        super(props)
        this.state= {
            level:400,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeLevel(level){
        this.setState({level})
    }
    changeFormat(val){
        this.setState({
            format:val
        })
    }
    render(){
        const {colors, paletteName, emoji, id} = this.props.palette
        const {classes} = this.props
        const {level, format} = this.state
        const colorBoxes = colors[level].map(color => (
            <ColorBox 
            background = {color[format]} 
            name={color.name} 
            key={color.id} 
            paletteId={id} 
            colorId={color.id}
            showFullPalette = {true}
            />
        ))
        return(
            <div 
                    className={classes.Palette}>
               <Navbar 
                    level = {level} 
                    changeLevel= {this.changeLevel} 
                    changeFormat={this.changeFormat} 
                    showingAllColors
                />
               <div className={classes.Colors}>
                {colorBoxes}
               </div>
               <PaletteFotter  
                    paletteName={paletteName} 
                    emoji={emoji}/>
            </div>
        )
    }
}


export default withStyles(styles)(Palette)