import React from "react";
import DragableColorBox from './DragableColorBox'
import {SortableContainer} from 'react-sortable-hoc'

const DragableColorList =  ({colors, removeColor}) => {
    return(
        <div style={{height:'100%'}}>
            {colors.map((color,i) => (
                <DragableColorBox 
                    index={i} 
                    color={color.color} 
                    name={color.name} 
                    key={color.name}  
                    handleClick={() => removeColor(color.name)}/>
            ))}
        </div>
    )
}


export default SortableContainer(DragableColorList)