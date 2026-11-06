# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## Changelog – Part 3 (Final PoE)


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

