import React, { Component } from 'react'
import {withStyles} from '@material-ui/styles'
import {Link} from 'react-router-dom'
import styles from './Styles/ColorBox'
import {CopyToClipboard} from 'react-copy-to-clipboard';


class ColorBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this)
    }

    changeCopyState(){
        this.setState({copied: true, }, () => {
            setTimeout(() => this.setState({copied: false}), 1500)
        })
    }

    render(){
        const {background, name, colorId, paletteId, showFullPalette, classes} = this.props
        const {copied} = this.state

        return(
        <CopyToClipboard text={background} onCopy= {this.changeCopyState}>
            <div className={classes.colorBox} style={{background}}>
            <div className={copied? `${classes.copyOvelay} ${classes.showOverlay}` : `${classes.copyOvelay}`} style={{background}}/>
            <div className={copied? `${classes.copyMsg} ${classes.showMsg}` : `${classes.copyMsg}`}>
                <h1>copied!</h1>
                <p className={classes.copyText}>{background}</p>
            </div>
                <div>
                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button className={classes.copyButton}>COPY</button>
                </div>
                {showFullPalette && 
                <Link to={`/palette/${paletteId}/${colorId}`} onClick={(evt) => evt.stopPropagation()}>
                <span className={classes.seeMore}>MORE</span>
                </Link>}
            </div>
        </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox)