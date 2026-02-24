function hasDuplicates(arr, num){
    let duplicates = arr.filter(value => num === value && arr.indexOf(value) !== arr.lastIndexOf(value))
    
    return duplicates.length > 0
}

export const isRowValid = (row, grid, value) =>  !hasDuplicates(grid[row],value) 

export const isColValid = (col, grid, value) => {
    let column = []
    for(let r of grid){
    column.push(r[col])
    }
    
    return !hasDuplicates(column,value) 
}

export const isBoxValid = (row, col, grid, value) => {
    const r = Math.floor(row / 3) * 3
    const c =  Math.floor(col / 3) * 3

    let box = []
    for(let i=0; i<3; i++){
    for(let j=0; j<3; j++){
        box.push(grid[r+i][c+j])
    }
    }
    
    return !hasDuplicates(box,value) 
    }
  
export const isValid = (row, col, grid, value) => {
    const validRow= isRowValid(row, grid, value)
    const validCol = isColValid(col, grid, value)
    const validBox = isBoxValid(row, col, grid, value)
    
    return validRow && validCol && validBox
}