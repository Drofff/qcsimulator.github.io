const inputs = [
    [0, 0, 0, 0],
	[0, 0, 0, 1],
	[0, 0, 1, 0],
	[0, 0, 1, 1],
	[0, 1, 0, 0],
	[0, 1, 0, 1],
	[0, 1, 1, 0],
	[0, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
	[1, 0, 1, 0],
	[1, 0, 1, 1],
	[1, 1, 0, 0],
	[1, 1, 0, 1],
	[1, 1, 1, 0],
	[1, 1, 1, 1],
];

export function renderInput(linesCount) {
    let tableContent = '<tr>';

    for (let lc = 0; lc < linesCount; lc++) {
        tableContent += `<th>x${lc+1}</th>`;
    }
    for (let lc = 0; lc < linesCount; lc++) {
        tableContent += `<th>y${lc+1}</th>`;
    }
    tableContent += '</tr>';

    const rows = Math.pow(2, linesCount);

    for (let inRow = 0; inRow < rows; inRow++) {
        tableContent += '<tr>';

        for (let inColumn = inputs[0].length - linesCount; inColumn < inputs[0].length; inColumn++) {
            tableContent += `<td>${inputs[inRow][inColumn]}</td>`;
        }

        for (let inColumn = inputs[0].length - linesCount; inColumn < inputs[0].length; inColumn++) {
            tableContent += `<td><input type="number" class="tt-input-cell-${linesCount}"></td>`;
        }

        tableContent += '</tr>';
    }

    return tableContent;
}
