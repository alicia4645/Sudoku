import React from 'react'

const Cells = ({ value, onChange,  isFixed, isValid, complete }) => {
 
  return (
    <input 
        type="string"
        value={value > 0 ? value : ""}
        onKeyDown={onChange}
        readOnly={complete ? true : isFixed}
        className={
            isFixed ? 'cell fixed' 
            : 
            isValid ? 'cell' 
            : 
            'cell invalid'
        }
        name='cell'
    >
    </input>
  )
}

export default Cells;