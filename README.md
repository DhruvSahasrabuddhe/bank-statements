# Bank Statements App

A React Native application for managing bank statements with a defaulter list screen.

## Features

### DefaulterScreen Component

The DefaulterScreen is a React Native component that displays a list of defaulters with the following features:

- **Sorting capabilities:**
  - Sort by amount (ascending/descending)
  - Sort by due date (ascending/descending)
- **Visual indicators:** FontAwesome icons for user, calendar, and currency
- **Responsive design:** Cards with shadow effects and proper spacing
- **Default sorting:** Items are sorted by most recent due date first on load

#### Props

- `navigation`: Navigation object from React Navigation
- `route`: Route object containing the defaulter list

#### Route Parameters

- `list`: Array of `Defaulter` objects

#### Defaulter Type

```typescript
type Defaulter = {
  id: number;
  customerName: string;
  amount: number;
  dueDate: string;
};
```

## Project Structure

```
src/
├── screens/
│   └── resident/
│       └── defaulter/
│           ├── DefaulterScreen.tsx
│           └── index.ts
├── commonStyles/
│   └── commonStyles.ts
├── types/
│   └── common.ts
└── requests/
    └── role-based-home-landing/
        └── navigation/
            └── ResidentHomeStack.ts
```

## Installation

```bash
npm install
```

## Usage

Import and use the DefaulterScreen in your navigation stack:

```typescript
import DefaulterScreen from './src/screens/resident/defaulter';

// In your navigation stack
<Stack.Screen 
  name="Defaulter List" 
  component={DefaulterScreen} 
/>
```

## Dependencies

- React Native
- @react-navigation/native
- @react-navigation/stack
- @fortawesome/react-native-fontawesome
- @fortawesome/free-solid-svg-icons
