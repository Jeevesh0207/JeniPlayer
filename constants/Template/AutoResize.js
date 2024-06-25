export const calcNumColumns = (width,track_width,track_margin,minCols) => {
    const cols = width / track_width;
    const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
    const colsMinusMargin = cols - 2 * colsFloor * track_margin;
    if (colsMinusMargin < colsFloor && colsFloor > minCols) return colsFloor - 1;
    else return colsFloor;
};

export const formatData = (data, numColumns) => {
    const amountFullRows = Math.floor(data.length / numColumns);
    let amountItemsLastRow = data.length - amountFullRows * numColumns;
    console.log(amountItemsLastRow)
    while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
        data.push({ key: `empty-${amountItemsLastRow}`, empty: true });
        amountItemsLastRow++;
    }
    return data;
};