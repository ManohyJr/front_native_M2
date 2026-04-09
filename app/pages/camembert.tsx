import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type PieDataItem = {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

export default function Camembert() {
  const params = useLocalSearchParams();
  const BASE_URL = "http://192.168.2.146:3000";

  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [total, setTotal] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    if (params.max) {
      const t = Number(params.total) || 0;
      const m = Number(params.max) || 0;
      const n = Number(params.min) || 0;

      setTotal(t);
      setMax(m);
      setMin(n);

      setPieData([
        { name: 'Total', population: t, color: '#4A90E2', legendFontColor: '#555', legendFontSize: 12 },
        { name: 'Max', population: m, color: '#2ECC71', legendFontColor: '#555', legendFontSize: 12 },
        { name: 'Min', population: n, color: '#E74C3C', legendFontColor: '#555', legendFontSize: 12 },
      ]);
    } else {
      try {
        const res = await fetch(`${BASE_URL}/enseignants/stats/salaires`);
        const data = await res.json();

        const t = data.salaire_total || 0;
        const m = data.salaire_max || 0;
        const n = data.salaire_min || 0;

        setTotal(t);
        setMax(m);
        setMin(n);

        setPieData([
          { name: 'Total', population: t, color: '#4A90E2', legendFontColor: '#555', legendFontSize: 12 },
          { name: 'Max', population: m, color: '#2ECC71', legendFontColor: '#555', legendFontSize: 12 },
          { name: 'Min', population: n, color: '#E74C3C', legendFontColor: '#555', legendFontSize: 12 },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Analyse des salaires</Text>

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

      <View style={styles.statsCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={[styles.value, { color: '#4A90E2' }]}>{total} Ar</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Max</Text>
          <Text style={[styles.value, { color: '#2ECC71' }]}>{max} Ar</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Min</Text>
          <Text style={[styles.value, { color: '#E74C3C' }]}>{min} Ar</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#222' },
  chartCard: { backgroundColor: '#fff', borderRadius: 20, padding: 10, elevation: 5, marginBottom: 20 },
  statsCard: { backgroundColor: '#fff', width: '100%', borderRadius: 15, padding: 15, elevation: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 16, color: '#666' },
  value: { fontSize: 16, fontWeight: 'bold' },
});