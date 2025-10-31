import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  faUser,
  faCalendar,
  faArrowUp,
  faArrowDown,
  faIndianRupee,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import commonStyles from '../../../commonStyles/commonStyles';
import { RouteProp } from '@react-navigation/native';
import { ResidentTabParamList } from '../../../requests/role-based-home-landing/navigation/ResidentHomeStack';

type DefaulterScreenRouteProp = RouteProp<ResidentTabParamList, 'Defaulter List'>;

export type Defaulter = {
  id: number;
  customerName: string;
  amount: number;
  dueDate: string;
};

type Props = {
  navigation: any;
  route: any;
};

const DefaulterScreen: React.FC<Props> = ({ navigation, route }) => {
  const { list } = route.params as { list: Defaulter[] };

  const [sortedList, setSortedList] = useState<Defaulter[]>([]);
  const [amountAscending, setAmountAscending] = useState(true);
  const [dateAscending, setDateAscending] = useState(false);

  useEffect(() => {
    // Default sort by most recent dueDate first
    const initial = [...list].sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
    setSortedList(initial);
  }, [list]);

  const sortByAmount = () => {
    const sorted = [...sortedList].sort((a, b) =>
      amountAscending ? a.amount - b.amount : b.amount - a.amount
    );
    setSortedList(sorted);
    setAmountAscending(!amountAscending);
  };

  const sortByDueDate = () => {
    const sorted = [...sortedList].sort((a, b) =>
      dateAscending
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
    setSortedList(sorted);
    setDateAscending(!dateAscending);
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={sortByAmount}>
          <FontAwesomeIcon icon={faIndianRupee} style={styles.filterIcon} />
          <FontAwesomeIcon
            icon={amountAscending ? faArrowUp : faArrowDown}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={sortByDueDate}>
          <FontAwesomeIcon icon={faCalendar} style={styles.filterIcon} />
          <FontAwesomeIcon
            icon={dateAscending ? faArrowUp : faArrowDown}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {sortedList.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <FontAwesomeIcon icon={faUser} style={styles.icon} />
              <Text style={commonStyles.descriptionText}>{item.customerName}</Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={commonStyles.descriptionText}>₹ {item.amount.toFixed(2)}</Text>
              <Text style={styles.dueDateText}>
                {' '}
                | Due: {new Date(item.dueDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}

        {sortedList.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 16 }}>
            No defaulters to show
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  filterIcon: {
    fontSize: 18,
    color: '#3B6FD6',
    marginRight: 5,
  },
  arrowIcon: {
    fontSize: 14,
    color: '#3B6FD6',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#3B6FD6',
    marginRight: 5,
  },
  dueDateText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
});

export default DefaulterScreen;
