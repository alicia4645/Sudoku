import React from 'react'
import  Cells  from './cells'
import { isValid } from '../validation'

const Grid = ({ grid, onChange, initialGrid, complete}) => {

    return(
        <div id='grid'>
            {
                grid.map( (row, i) => (
                    row.map( (col, j) => {
                        const isFixed = initialGrid[i][j] > 0 
                        const valid = isValid(i, j , grid, col)

                        return (
                            <Cells
                                key={`${i}-${j}`}
                                value={col}
                                onChange={(e) => {
                                    onChange(i, j, e.key, isFixed)
                                }}
                                isFixed={isFixed}
                                isValid={valid}
                                complete={complete}
                            /> 
                        )
                    })
                )) 
            }
        </div>
    )
}

export default Grid;