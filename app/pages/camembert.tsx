import { useLocalSearchParams } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function Camembert() {
  const params = useLocalSearchParams();

  const total = Number(params.total) || 0;
  const max = Number(params.max) || 0;
  const min = Number(params.min) || 0;

  const screenWidth = Dimensions.get('window').width;

  const pieData = [
    {
      name: 'Total',
      population: total,
      color: '#4A90E2',
      legendFontColor: '#555',
      legendFontSize: 12,
    },
    {
      name: 'Max',
      population: max,
      color: '#2ECC71',
      legendFontColor: '#555',
      legendFontSize: 12,
    },
    {
      name: 'Min',
      population: min,
      color: '#E74C3C',
      legendFontColor: '#555',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Analyse des salaires</Text>

      {/* CARD GRAPH */}
      <View style={styles.chartCard}>
        <PieChart
          data={pieData}
          width={screenWidth - 60}
          height={220}
          chartConfig={{
            color: () => '#000',
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* STATS CARD */}
      <View style={styles.statsCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={[styles.value, { color: '#4A90E2' }]}>
            {total} Ar
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Max</Text>
          <Text style={[styles.value, { color: '#2ECC71' }]}>
            {max} Ar
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Min</Text>
          <Text style={[styles.value, { color: '#E74C3C' }]}>
            {min} Ar
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },

  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    marginBottom: 20,
  },

  statsCard: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    color: '#666',
  },

  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});