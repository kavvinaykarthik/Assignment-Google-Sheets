Experience live website:  https://sheetsbyvinaykarthik-c6fa10.netlify.app/






Google Sheets Clone

Overview

This project is a functional clone of Google Sheets, offering a lightweight and user-friendly spreadsheet application. It replicates essential spreadsheet functionalities and introduces advanced features such as drag-and-drop operations, formula handling, data validation, and formatting, making it a powerful tool for data management and analysis.

Features




1. Spreadsheet Interface
Google Sheets-Like UI: A visual design that closely mirrors Google Sheets, including a toolbar, formula bar, and structured grid layout.
Drag-and-Drop Support: Allows dragging content, formulas, and cell selections to replicate Google Sheets' interactive behavior.
Cell Dependencies: Accurate formula updates when changes are made to related cells, ensuring real-time data coherence.
Basic Formatting Options:
Bold, italics, underline.
Font size and color customization.
Background color adjustments.
Row and Column Management:
Add, delete, and resize rows and columns dynamically.





2. Mathematical Functions
Support for core mathematical operations:

SUM: Calculates the sum of a range of cells.
AVERAGE: Computes the average value of a range.
MAX: Retrieves the maximum value in a range.
MIN: Retrieves the minimum value in a range.
COUNT: Counts the number of numerical values in a range.
3. Data Quality Functions
TRIM: Removes leading and trailing whitespace from text in a cell.
UPPER: Converts text to uppercase.
LOWER: Converts text to lowercase.
REMOVE_DUPLICATES: Identifies and removes duplicate rows from a selected range.
FIND_AND_REPLACE: Enables users to search and replace specific text within a range of cells.
4. Data Entry and Validation
Data Entry: Supports various data types, including numbers, text, and dates.
Validation Checks: Ensures that numeric cells contain only numbers and applies constraints for better data quality.




Technologies Used

Frontend
HTML: Structures the web application.
CSS: Enhances the application's visual design and layout, ensuring responsiveness.
JavaScript: Implements interactivity, spreadsheet logic, and dynamic updates.
Data Management
JavaScript Objects: Used to manage cell states, including formatting, content, and cell dependencies.
Libraries
Material Icons: For an intuitive and visually appealing UI.
Google Fonts: Ensures professional and readable text rendering.





Data Structures

Cell State
Each cell's state is stored as an object containing properties like formatting, content, and alignment.
Example:

{  
  fontFamily_data: 'monospace',  
  fontSize_data: '14',  
  isBold: false,  
  isItalic: false,  
  textAlign: 'start',  
  isUnderlined: false,  
  color: '#000000',  
  backgroundColor: '#ffffff',  
  content: ''  
}  
Sheet Array
A central array stores the states of all cells in each sheet. Each array entry corresponds to a specific sheet.

Example:

sheetsArray = [  
    { 'A1': {...}, 'A2': {...}, ... }, // Sheet 1  
    { 'A1': {...}, 'A2': {...}, ... }  // Sheet 2  
];  
Active Sheet Management
activeSheetIndex: Tracks the currently active sheet.
activeSheetObject: References the active sheet's data for seamless interaction.
Why These Technologies and Structures?

JavaScript Objects: Provide flexibility in managing individual cell properties dynamically.
Event Listeners: Enable responsive user interactions like click, drag, and input changes.
Array for Sheets: Facilitates efficient and scalable management of multiple sheets.
HTML & CSS: Ensure compatibility and adaptability across various browsers.
