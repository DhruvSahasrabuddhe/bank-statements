# DefaulterScreen Component Documentation

## Overview

The `DefaulterScreen` is a React Native component that displays a list of defaulters (customers with outstanding payments) with sorting capabilities.

## Component Features

### 1. **Sorting Functionality**

The screen provides two sorting options:

#### Amount Sorting (₹ Icon)
- Click the rupee icon to sort defaulters by amount
- Toggle between ascending (lowest first) and descending (highest first)
- Visual indicator shows current sort direction with arrow (↑ or ↓)

#### Date Sorting (📅 Icon)
- Click the calendar icon to sort by due date
- Toggle between ascending (earliest first) and descending (latest first)
- Visual indicator shows current sort direction with arrow (↑ or ↓)

### 2. **Default Behavior**

On initial load, the list is automatically sorted by **most recent due date first** (descending order).

### 3. **Data Display**

Each defaulter card shows:
- **User Icon** (👤): Visual identifier
- **Customer Name**: Full name of the defaulter
- **Amount**: Outstanding amount in Indian Rupees (₹) formatted to 2 decimal places
- **Due Date**: Formatted date showing when payment was/is due

### 4. **Empty State**

When there are no defaulters in the list, a centered message displays:
> "No defaulters to show"

## Visual Design

### Color Scheme
- **Primary Color**: #3B6FD6 (Blue)
- **Text Color**: #333 (Dark Gray)
- **Secondary Text**: #888 (Medium Gray)
- **Background**: #f5f5f5 (Light Gray)

### Card Styling
- **Shadow**: Subtle elevation effect
- **Border Radius**: 12px for cards, 8px for filter container
- **Padding**: Generous spacing for comfortable reading
- **Margin**: Adequate spacing between cards

### Layout
```
┌─────────────────────────────────────────┐
│  Filter Container                       │
│  [ ₹ ↑ ]        [ 📅 ↓ ]              │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ 👤 John Doe    ₹ 5000.00 | Due: ...│ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ 👤 Jane Smith  ₹ 3500.50 | Due: ...│ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ 👤 Bob Johnson ₹ 7200.75 | Due: ...│ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## Props Interface

```typescript
type Props = {
  navigation: any;
  route: any;
};

// Route params
type RouteParams = {
  list: Defaulter[];
};

// Defaulter type
type Defaulter = {
  id: number;
  customerName: string;
  amount: number;
  dueDate: string; // ISO date string
};
```

## Usage Example

```typescript
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

const defaulters = [
  {
    id: 1,
    customerName: 'John Doe',
    amount: 5000.00,
    dueDate: '2024-01-15',
  },
  // ... more defaulters
];

navigation.navigate('Defaulter List', { list: defaulters });
```

## Implementation Details

### State Management

- `sortedList`: Array of defaulters currently being displayed
- `amountAscending`: Boolean flag for amount sort direction
- `dateAscending`: Boolean flag for date sort direction

### Sorting Logic

1. **Amount Sort**: Direct numeric comparison
   ```typescript
   amountAscending ? a.amount - b.amount : b.amount - a.amount
   ```

2. **Date Sort**: Converts string dates to timestamps for comparison
   ```typescript
   dateAscending
     ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
     : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
   ```

### Rendering

- Uses `ScrollView` for scrollable list
- Maps over `sortedList` to create individual cards
- Each card has unique key based on `item.id`
- Conditional rendering for empty state

## Dependencies

- **React Native**: Core framework
- **@react-navigation**: Navigation handling
- **@fortawesome/react-native-fontawesome**: Icon library
- **@fortawesome/free-solid-svg-icons**: Icon set

## Accessibility

The component uses semantic icons and readable text to ensure good user experience:
- Clear visual indicators for sorting state
- Adequate contrast ratios for text
- Touch-friendly button sizes (minimum 44x44 pts)
- Scrollable content for any list size

## Performance Considerations

- Efficient sorting with native array methods
- Minimal re-renders through state management
- Key props on list items for React optimization
- Virtualization could be added for very large lists (future enhancement)
