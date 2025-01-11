Experience live website:  https://sheetsbyvinaykarthik-c6fa10.netlify.app/


Google Sheets Clone

Overview

This project is a clone of Google Sheets, offering a simple yet functional spreadsheet application built with web technologies. It supports essential spreadsheet functionalities, such as editing cells, styling text, applying formulas, and managing multiple sheets. The project is designed to be lightweight and user-friendly, providing a rich experience akin to the Google Sheets interface.

Features

Cell Formatting: Customize font family, size, bold, italic, underline, text alignment, and text/background colors.
Formula Support: Apply formulas like SUM, COUNT, TRIM, and UPPER directly in the formula bar.
Multi-Sheet Management: Add and switch between multiple sheets seamlessly.
Grid Navigation: Interactive headers and rows for easy reference and navigation.
Save and Open: Options to download and upload sheets.
Responsive Design: Optimized layout for various screen sizes.
Preloader Animation: A sleek loading animation during page load.
Technologies Used

Frontend
HTML: To structure the web application.
CSS: For styling, including custom layouts and responsive designs.
JavaScript: Handles interactivity, dynamic DOM manipulation, and spreadsheet logic.
Data Management
JavaScript Objects: The project uses objects to represent cell states, active sheet states, and sheet data. The initialCellState object is utilized as a template for all cells, ensuring consistency across sheets.
Libraries
Material Icons: Provides icons for UI elements like bold, italic, and alignment controls.
Google Fonts: Ensures visually appealing text rendering.
Data Structures

Cell State
Each cell's state is stored as an object with properties like fontFamily, fontSize, isBold, isItalic, and content.
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
Sheets are managed using an array where each entry is an object representing the grid's cell states.
Example:
sheetsArray = [
    { 'A1': {...}, 'A2': {...}, ... }, // Sheet 1
    { 'A1': {...}, 'A2': {...}, ... }  // Sheet 2
];
Active Sheet Management
The activeSheetIndex keeps track of the currently active sheet, enabling seamless navigation and updates.
Why These Technologies and Structures?

JavaScript Objects: Allow fine-grained control over each cell's state, making it easy to update properties dynamically.
Event Listeners: Provide a responsive and interactive user experience by handling user actions like clicks and inputs.
HTML & CSS: These standard web technologies ensure broad browser compatibility and flexibility in design.
Array for Sheets: Offers a simple yet efficient way to manage multiple sheets, allowing scalability.
