## Changelog – Part 3 (Final PoE)
[Click here to view](MAST5112-Part-3)

### 1. Added New Features

**Edit Menu Items**
- Added an Edit button to existing menu items.
- Users can now update a dish's name, description, course and price.
- Added a Save Changes button to save updated dish information.
- Added a Cancel Editing option to return to the original form.

**Delete Menu Items**
- Added a Delete button to menu items.
- Included a confirmation option before deleting a dish to prevent accidental removal.
- The menu automatically updates when an item is deleted.

**Search Functionality**
- Added a search feature that allows users to search for dishes by name.
- Search results update automatically as the user types.
- The search function works regardless of uppercase or lowercase letters.

**Filter Menu Items**
- Added a filtering feature to organise dishes according to their courses.
- Users can filter between Starters, Main Courses and Desserts.
- Added a Show All option to display the complete menu.
- Included a Clear Search & Filters button to reset the selected options.

### 2. Improved Menu Management

**Menu Statistics**
- Added a feature that displays the total number of dishes on the menu.
- Included an automatic calculation of the average dish price in South African Rand (R).
- Added individual dish counts for Starters, Main Courses and Desserts.
- Statistics automatically update when dishes are added, edited or deleted.

**Improved Input Validation**
- Improved validation when adding and editing menu items.
- Required fields must be completed before saving.
- Prices must be valid numbers greater than zero.
- Error messages appear when users enter incorrect or incomplete information.

### 3. User Interface Improvements

**Maintained the Original Design**
- Kept the original beige-and-black colour scheme.
- Preserved the existing menu layout and overall application design.
- Added new buttons and controls that match the original styling.
- Extended the existing interface instead of completely redesigning the application.

**Improved User Experience**
- Added feedback messages when menu items are successfully added, edited or deleted.
- Improved error messages to help users correct invalid information.
- Added a message when no dishes match the selected search or filter.
- Made it easier for users to manage and organise their menu items.

### 4. Code Improvements

- Updated the existing `src/app/index.tsx` file to include the new functionality.
- Expanded the original React Native and TypeScript code.
- Added functions for editing, deleting, searching and filtering menu items.
- Added automatic calculations for menu statistics.
- Reused the existing application structure and styling.
- Kept the original functionality while adding the new features.

### 5. Documentation Updates

- Added a `FINAL_POE_CHANGES.md` file to document the improvements made in Part 3.
- Updated the project documentation to explain the new features.
- Prepared the updated project files for submission through GitHub.

### 6. Summary

For Part 3 of the project, I focused on improving the functionality and user experience of Christoffel's Menu Manager. The main improvements include editing and deleting dishes, searching and filtering menu items, and displaying menu statistics.

I also improved input validation and added feedback messages to make the application easier to use.

