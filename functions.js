// Function to evaluate formulas like SUM, MIN, MAX, AVG, and COUNT
function evaluateFormula(formula) {
    try {
        // Check for valid functions (SUM, MIN, MAX, AVG, COUNT)
        let match = formula.match(/(SUM|MIN|MAX|AVG|COUNT)\(([^)]+)\)/i);
        if (!match) {
            return "Invalid formula";
        }

        let func = match[1].toUpperCase(); // Function name
        let range = match[2]; // Cell range (e.g., A1:A5)

        // Extract start and end cells from range
        let [start, end] = range.split(":");
        if (!start || !end) {
            return "Invalid range";
        }

        let startRow = parseInt(start.slice(1));
        let startCol = start.charCodeAt(0) - 65; // Convert column letter to index
        let endRow = parseInt(end.slice(1));
        let endCol = end.charCodeAt(0) - 65;

        let values = [];

        // Iterate over the range and collect cell values
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                let cellId = String.fromCharCode(65 + col) + row; // Generate cell ID (e.g., A1, B2)
                let cellValue = activeSheetObject[cellId]?.content || "0"; // Default to 0 if cell is empty
                if (!isNaN(cellValue)) {
                    values.push(parseFloat(cellValue));
                }
            }
        }

        // Perform the function on collected values
        switch (func) {
            case "SUM":
                return values.reduce((a, b) => a + b, 0);
            case "MIN":
                return Math.min(...values);
            case "MAX":
                return Math.max(...values);
            case "AVG":
                return values.reduce((a, b) => a + b, 0) / values.length;
            case "COUNT":
                return values.length;
            default:
                return "Invalid function";
        }
    } catch (error) {
        console.error("Error evaluating formula:", error);
        return "Error";
    }
}

// Attach formula evaluation to the formula bar
document.getElementById("formula-bar").addEventListener("change", (event) => {
    let formula = event.target.value.trim();
    if (activeCell) {
        let result = evaluateFormula(formula);
        activeCell.innerText = result;
        activeSheetObject[activeCell.id].content = result;
    }
});








// Function to handle formula input
document.getElementById("formula-bar").addEventListener('input', function() {
    let formula = this.value;

    // Check for supported formulas and execute
    if (formula.startsWith("=")) {
        let formulaType = formula.substring(1, formula.indexOf("("));
        let cellRef = formula.substring(formula.indexOf("(") + 1, formula.indexOf(")"));
        let cell = document.getElementById(cellRef);

        if (formulaType === "TRIM") {
            // Apply TRIM function
            if (cell) {
                let value = cell.innerText.trim();
                this.value = value;
            }
        } else if (formulaType === "UPPER") {
            // Apply UPPER function
            if (cell) {
                let value = cell.innerText.toUpperCase();
                this.value = value;
            }
        } else if (formulaType === "LOWER") {
            // Apply LOWER function
            if (cell) {
                let value = cell.innerText.toLowerCase();
                this.value = value;
            }
        } else if (formulaType === "REMOVE_DUPLICATES") {
            // Implement REMOVE_DUPLICATES
            removeDuplicates();
        } else if (formulaType === "FIND_AND_REPLACE") {
            // Implement FIND_AND_REPLACE
            findAndReplace();
        }
    }
});

// Function to remove duplicates from a selected range
function removeDuplicates() {
    let selectedCells = document.querySelectorAll('.grid-cell.selected');
    let uniqueCells = [];
    selectedCells.forEach(cell => {
        if (!uniqueCells.includes(cell.innerText)) {
            uniqueCells.push(cell.innerText);
        }
    });
    selectedCells.forEach((cell, index) => {
        cell.innerText = uniqueCells[index] || '';
    });
}

// Function to find and replace text in the selected range
function findAndReplace() {
    let findText = prompt("Enter the text you want to find:");
    let replaceText = prompt("Enter the text you want to replace it with:");
    let selectedCells = document.querySelectorAll('.grid-cell.selected');

    selectedCells.forEach(cell => {
        if (cell.innerText.includes(findText)) {
            cell.innerText = cell.innerText.replace(findText, replaceText);
        }
    });
}


























// Attach drag events to each cell
document.querySelectorAll('.grid-cell').forEach(cell => {
    cell.addEventListener('mousedown', handleDragStart);
    cell.addEventListener('dragover', handleDragOver);
    cell.addEventListener('drop', handleDrop);
});

let draggedCell = null;

// Function to start drag event
function handleDragStart(event) {
    draggedCell = event.target;
    draggedCell.style.opacity = '0.5'; // Visually indicate drag
    event.dataTransfer.setData('text/plain', draggedCell.id); // Store cell ID in drag data
}

// Function to handle drag over event (to allow drop)
function handleDragOver(event) {
    event.preventDefault(); // Allow drop to happen
}

// Function to handle drop event (when a cell is dropped onto another)
function handleDrop(event) {
    event.preventDefault();
    let targetCell = event.target;

    if (targetCell.classList.contains('grid-cell') && targetCell !== draggedCell) {
        // Swap content between the dragged cell and target cell
        let tempContent = targetCell.innerText;
        let tempFormula = targetCell.getAttribute('data-formula'); // For formulas
        targetCell.innerText = draggedCell.innerText;
        draggedCell.innerText = tempContent;

        // Update formula reference if the dragged cell contains a formula
        updateFormulaReferences(draggedCell, targetCell, tempFormula);

        // Update sheet data
        let targetCellId = targetCell.id;
        let draggedCellId = draggedCell.id;

        activeSheetObject[targetCellId].content = targetCell.innerText;
        activeSheetObject[draggedCellId].content = draggedCell.innerText;
    }

    draggedCell.style.opacity = '1'; // Restore appearance after drop
    draggedCell = null; // Reset dragged cell state
}

// Function to update formula references after drag
function updateFormulaReferences(draggedCell, targetCell, formula) {
    if (formula) {
        let draggedFormulaRegex = /([A-Z]+)(\d+)/g; // Match references like A1, B2
        let rowOffset = targetCell.id.charAt(1) - draggedCell.id.charAt(1);
        let colOffset = targetCell.id.charCodeAt(0) - draggedCell.id.charCodeAt(0);

        // Adjust the formula by replacing the cell references
        let updatedFormula = formula.replace(draggedFormulaRegex, (match, column, row) => {
            let newRow = parseInt(row) + rowOffset; // Update row based on rowOffset
            let newCol = String.fromCharCode(column.charCodeAt(0) + colOffset); // Update column based on colOffset
            return `${newCol}${newRow}`;
        });

        // After dragging, update formula in the target cell
        targetCell.setAttribute('data-formula', updatedFormula);
        targetCell.innerText = evaluateFormula(updatedFormula); // Recalculate formula result
    }
}
