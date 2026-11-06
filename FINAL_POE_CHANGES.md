# Final PoE – Changes from Part 2

This builds on the original `src/app/index.tsx` instead of replacing the Part 2 design.

- **Edit and update:** Tap Edit on a dish, update the original fields, then Save Changes. Cancel Editing restores add mode.
- **Delete:** Tap Delete and then Confirm Delete (or Cancel). Changes display immediately.
- **Search:** Case-insensitive dish-name search updates as you type.
- **Filter:** Show All, Starter, Main Course or Dessert; use Clear Search & Filters to reset both.
- **Statistics:** Total dishes, average price (ZAR), and per-course counts update after adding, updating or deleting. The statistics use all menu items regardless of search/filter.
- **User experience:** Existing beige/black UI is preserved, with matching controls, error messages, success feedback, and empty search result messages.
- **Validation:** Required fields and positive numeric prices; both adding and editing validate.

## How to run

1. Extract the ZIP.
2. Open the extracted project folder in VS Code.
3. Run `npm install` (dependencies are intentionally excluded from the ZIP).
4. Run `npx expo start` and open it on your target device or web.

**Note:** Menu items are stored in React state while the app runs, just as in Part 2; they reset if the app reloads. Persistent storage was not a stated Part 3 requirement.
