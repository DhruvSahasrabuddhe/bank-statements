/**
 * Example usage of DefaulterScreen component
 * 
 * This file demonstrates how to integrate the DefaulterScreen
 * into a React Navigation stack.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaulterScreen, { Defaulter } from './src/screens/resident/defaulter';

const Stack = createStackNavigator();

// Example defaulter data
const sampleDefaulters: Defaulter[] = [
  {
    id: 1,
    customerName: 'John Doe',
    amount: 5000.00,
    dueDate: '2024-01-15',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    amount: 3500.50,
    dueDate: '2024-01-20',
  },
  {
    id: 3,
    customerName: 'Bob Johnson',
    amount: 7200.75,
    dueDate: '2024-01-10',
  },
  {
    id: 4,
    customerName: 'Alice Williams',
    amount: 2100.25,
    dueDate: '2024-01-25',
  },
];

// Home screen component (placeholder)
const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="View Defaulters"
        onPress={() =>
          navigation.navigate('Defaulter List', { list: sampleDefaulters })
        }
      />
    </View>
  );
};

// App component with navigation
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="Defaulter List" 
          component={DefaulterScreen}
          options={{
            title: 'Defaulters',
            headerStyle: {
              backgroundColor: '#3B6FD6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/**
 * Usage Notes:
 * 
 * 1. Navigation:
 *    - Pass a list of Defaulter objects through route.params
 *    - Example: navigation.navigate('Defaulter List', { list: defaulters })
 * 
 * 2. Defaulter Data Structure:
 *    - id: Unique identifier (number)
 *    - customerName: Name of the defaulter (string)
 *    - amount: Outstanding amount (number)
 *    - dueDate: Due date in string format (e.g., '2024-01-15')
 * 
 * 3. Features:
 *    - Automatic sorting by most recent due date on load
 *    - Click rupee icon to sort by amount (toggle ascending/descending)
 *    - Click calendar icon to sort by due date (toggle ascending/descending)
 *    - Empty state message when no defaulters exist
 * 
 * 4. Styling:
 *    - Uses consistent color scheme (#3B6FD6 for primary color)
 *    - Card-based layout with shadows
 *    - Responsive design for mobile screens
 */
