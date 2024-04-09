export const generateTable = (rows: number, columns: number): number[][] => {
    const table: number[][] = []; 
    for (let i = 0; i < rows; i++) { 
      const row: number[] = [];
      for (let j = 0; j < columns; j++) {
        row.push(0); 
      } 
      table.push(row);
    } 
    return table;
  };