import chroma from 'chroma-js';
import sizes from './sizes'
const styles = {
    colorBox: {
        width: '20%',
        height: props => props.showFullPalette? '25%' : '50%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        '&:hover button': {
            opacity: 1
        },
        [sizes.down('lg')]: {
            width: '50%',
            height: props => props.showFullPalette? '20%' : '33.3333%' 
        },
        [sizes.down('md')]: {
            width: '50%',
            height: props => props.showFullPalette? '10%' : '20%' 
        },
       [sizes.down('xs')]: {
           width: '100%',
           height: props => props.showFullPalette? '5%' : '10%' 
       }
    },
    copyText : { 
        color: props => chroma(props.background).luminance() <= 0.6 ? 'white' : 'rgba(0, 0, 0, 0.6)'
    },
    colorName : {
        color: props => chroma(props.background).luminance() >= 0.4 ? 'rgba(0, 0, 0, 0.6)' : 'white'
    },
    seeMore: {
        color: props => chroma(props.background).luminance() <= 0.6 ? 'white' : 'rgba(0, 0, 0, 0.6)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
	    position: 'absolute',
	    border: 'none',
	    right: '0px',
	    bottom: '0px',
	    width: '60px',
	    height: '30px',
	    textAlign: 'center',
	    lineHeight: '30px',
	    textTransform: 'uppercase'
    },
    copyButton : {
            width: '100px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            top: '50%',
            left: '50%',
            marginLeft: '-50px',
            marginTop: '-15px',
            textAlign: 'center',
            outline: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            fontSize: '1rem',
            lineHeight: '30px',
            color: 'white',
            textTransform: 'uppercase',
            border: 'none',
            textDecoration: 'none',
            opacity: '0',
            transition: '0.5s',
    },
    boxContent: {
            position: 'absolute',
            width: '100%',
            left: '0px',
            bottom: '0px',
            padding: '10px',
            color: 'black',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontSize: '12px',
    },
    copyOvelay: {
        opacity: '0',
        zIndex: '0',
        width: '100%',
        height: '100%',
        transition: 'transform 0.6s ease-in-out'
    },
    showOverlay: {
        opacity: '1',
        transform: 'scale(50)',
        zIndex: '10',
        position: 'absolute',
    },
    copyMsg: {
        position: 'fixed',
	    left: '0',
	    right: '0',
	    top: '0',
	    bottom: '0',
	    flexDirection: 'column',
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
	    fontSize: '4rem',
	    transform: 'scale(0.1)',
	    opacity: '0',
	    color: 'white',
        '& h1':{
                fontWeight: '400px',
                textShadow: '1px 2px black',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                width: '100%',
                textAlign: 'center',
                padding: '1rem',
                marginBottom: '0',
                textTransform: 'uppercase',
                [sizes.down('xs')]: {
                    fontSize: '6rem'
                }
        },
        '& p':{
            fontSize: '2rem',
	        fontWeight: '100'
        }
    },
    showMsg: {
        opacity: '1',
        transform: 'scale(1)',
        zIndex: '25',
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.3s',
    }
}

export default styles