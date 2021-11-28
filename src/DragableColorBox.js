import React from 'react'
import styles from './Styles/DragbaleColorBoxStyles'
import DeleteIcon from '@mui/icons-material/Delete';
import { withStyles } from '@material-ui/styles'
import { SortableElement } from 'react-sortable-hoc';


function DragableColorBox ({classes, name, color, handleClick}){
    
    return(
        <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span> {name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick}/>
      </div>
    </div>
    )
}
 
export default SortableElement(withStyles(styles)(DragableColorBox))