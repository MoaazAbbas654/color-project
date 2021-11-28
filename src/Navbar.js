import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/styles'
import { MenuItem, Select, Snackbar, IconButton } from '@mui/material';
import styles from './Styles/NavBarStyles'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import CloseIcon from '@mui/icons-material/Close';


class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            format: 'hex',
            open: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.closeSnackBar = this.closeSnackBar.bind(this)
    }
    handleFormatChange(e){
        this.setState({
            [e.target.name]:e.target.value,
            open: true
        })
        this.props.changeFormat(e.target.value)
    }

    closeSnackBar(){
        this.setState({open:false})
    }
    render(){
        const {level, changeLevel, showingAllColors, classes} = this.props
        const {format, open} = this.state
        return(
            <nav className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>reactcolorpicker</Link>
                </div>
               {showingAllColors && <div>
                    <span>level: {level}</span>
                    <div className={classes.slider}>
                        <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={changeLevel}
                        />
                    </div>
                </div>
        }
                <div className={classes.selectContainer}>
                    <Select 
                        name='format' 
                        value={format} 
                        onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX - #FFFF</MenuItem>
                        <MenuItem value='rgb'>rgb - rgb(255,255,255)</MenuItem>
                        <MenuItem value='rgba'>rgba - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                    open={open}
                    autoHideDuration={3000}
                    message={<span>Format change to: {format.toUpperCase()}</span>}
                    ContentProps={{
                        'aria-describedby':'message-id'
                }}
                onClose={this.closeSnackBar}
                action={[
                    <IconButton 
                        onClick={this.closeSnackBar} 
                        color='inherit' 
                        key='close' 
                        aria-label='close'>
                        <CloseIcon />
                    </IconButton>
                ]}
                ></Snackbar>
            </nav> 
        )
    }
}

export default withStyles(styles)(Navbar)