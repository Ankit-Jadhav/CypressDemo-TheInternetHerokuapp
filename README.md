# Cypress Automation Tests for Demo Website

This repository contains Cypress test scripts for automating various functionalities of a demo website, available :  [The Internet Herokuapp](https://the-internet.herokuapp.com/).

## Topics Covered

The script covers the following topics:

### 1. **Add/Remove Elements**
   - Automates the process of adding and removing elements dynamically.
   - Verifies that the correct number of elements are added and removed.

### 2. **Basic Authentication**
   - Tests the basic authentication functionality using valid credentials.
   - Verifies that the correct success message is displayed upon successful login.

### 3. **Broken Images**
   - Checks all images on the page to verify if they are broken.
   - Makes HTTP requests to validate image statuses and logs results.

### 4. **Challenging DOM**
   - Interacts with dynamic buttons having different classes.
   - Verifies the correct interaction with these elements.

### 5. **Checkboxes**
   - Tests the functionality of checkboxes, ensuring the correct options are selected.

### 6. **Context Menu**
   - Right-clicks on an element to trigger the context menu.
   - Handles the alert that appears and verifies the expected alert text.

### 7. **Digest Authentication**
   - Uses a `curl` command to test digest authentication.
   - Verifies that the correct success message appears after authentication.

### 8. **Drag and Drop**
   - Simulates a drag-and-drop action between two columns.
   - Verifies that the content is swapped between the columns.
   - **Note:** Ensure to add necessary plugins, such as `cypress-real-events` or similar, for simulating drag-and-drop actions in `commands.js`.

### 9. **Dropdown List**
   - Interacts with a dropdown list, selecting different options.
   - Verifies that the correct option is selected.

### 10. **Dynamic Content**
   - Verifies that dynamic content on the page changes after a page reload.
   - Compares the initial and updated text to confirm content change.

### 11. **Disappearing Elements**
   - Verifies the presence or absence of specific elements (e.g., a "Gallery" button) after a page reload.
   - Confirms that elements are correctly disappearing and reappearing.

## Prerequisites

- Node.js
- Cypress

## Installation

1. Clone the repository:
2. Navigate to the project directory:   cd InternetHerokuappCypressProject
3. Install the required dependencies:   npm install
4. Open Cypress:                        npx cypress open

You can run the tests directly through Cypress. Once the Cypress test runner is open, select the tests you want to run.

Alternatively, you can run all tests in headless mode:
 



