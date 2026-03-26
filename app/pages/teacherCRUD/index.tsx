import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Teacher = {
  id: string;
  num : string;
  nom: string;
  volHoraire: number;
  taux: number;
  salaire: number;
};

export default function TeacherCRUD() {
  const router = useRouter();
 const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [stats, setStats] = useState({total: 0,max: 0,min: 0});
  useEffect(() => {
    fetchTeachers();
    fetchStats();
  }, []);

  const fetchTeachers = async () => {
  try {
    const res = await fetch("http://localhost:3000/enseignants/listes"); // Android emulator
    const data = await res.json();

    // adapter les noms (backend → frontend)
    const formatted = data.map((item:any) => ({
      id: item.id.toString(),
      num: item.num,
      nom: item.nom,
      volHoraire: item.vol_horaire,
      taux: item.taux,
      salaire: item.salaire
    }));

    setTeachers(formatted);
  } catch (error) {
    console.log("Erreur fetch:", error);
  }
};

  // 🔥 STATISTIQUES
  
const fetchStats = async () => {
  try {
    const res = await fetch("http://localhost:3000/enseignants/stats/salaires");
    const data = await res.json();
    setStats({
      total: data.salaire_total,
      max: data.salaire_max,
      min: data.salaire_min
    });
  } catch (error) {
    console.log(error);
  }
};

 const deleteTeacher = async (id: string) => {
  // confirmation simple pour web
  if (!window.confirm("Voulez-vous supprimer cet enseignant ?")) return;

  try {
    await fetch(`http://localhost:3000/enseignants/supprimer/${id}`, {
      method: "DELETE",
    });

    fetchTeachers();
    fetchStats();
  } catch (error) {
    console.log(error);
  }
};
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}> LISTES DES ENSEIGNANTS</Text>

      {/* 🔥 STATS */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total</Text>
          <Text style={[styles.statValue, { color: '#2196F3' }]}>
            {stats.total} Ar
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Max</Text>
          <Text style={[styles.statValue, { color: '#4CAF50' }]}>
            {stats.max} Ar
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Min</Text>
          <Text style={[styles.statValue, { color: '#f44336' }]}>
            {stats.min} Ar
          </Text>
        </View>
      </View>

      {/* 🔥 BOUTON AJOUT */}
      <Pressable
        style={styles.addButton}
        onPress={() => router.push('../../add_teacher')}
      >
        <Text style={styles.addButtonText}>+ Ajouter un enseignant</Text>
      </Pressable>

      <Pressable
        style={styles.addButton}
        onPress={() =>
        router.push(
        `/pages/camembert?total=${stats.total}&max=${stats.max}&min=${stats.min}`
        )
        }
        > 
        <Text style={styles.addButtonText}> Statistiques</Text>
      </Pressable>

      {/* 🔥 LISTE */}
      <FlatList
        data={teachers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nom}</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>matricule :</Text>
              <Text style={styles.value}>{item.num}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Volume :</Text>
              <Text style={styles.value}>{item.volHoraire}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Taux :</Text>
              <Text style={styles.value}>{item.taux}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Salaire :</Text>
              <Text style={styles.salary}>{item.salaire} Ar</Text>
            </View>

            <View style={styles.buttons}>
              <Pressable
                style={styles.editBtn}
                onPress={() =>
                  router.push(
                    `../../${item.id}?num=${item.num}&nom=${item.nom}&volHoraire=${item.volHoraire}&taux=${item.taux}`
                  )
                }
              >
                <Text style={styles.btnText}>Modifier</Text>
              </Pressable>

              <Pressable
                style={styles.deleteBtn}
                onPress={() => deleteTeacher(item.id)}
              >
                <Text style={styles.btnText}>Supprimer</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  
  
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
  },

  title: {
    fontFamily: 'Montserrat_800ExtraBold',
    fontWeight:'bold',
    fontSize: 20,
    marginBottom: 20,
    color: '#222',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  statCard: {
    fontFamily:'Montserrat_300Light',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    elevation: 2,
    color: '#555'
  },

  statTitle: {
    fontFamily:'Montserrat_300Light',
    fontSize: 12,
    color: '#777',
  },

  statValue: {
    fontFamily:'Montserrat_300Light',
    color:'#777',
    fontSize: 16,
    fontWeight: 'bold',
  },

  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily:'Montserrat_400Medium',
  },

  card: {
    backgroundColor: '#fff',
    color:'#555',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  name: {
    fontFamily:'Montserrat_700Bold',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  label: {
    fontFamily:'Montserrat_700Bold',
    color:'#777',
    fontWeight: 'bold',
  },
  value: {
  color: '#777',
  fontFamily:'Montserrat_300Light',

  },
  salary: {
    fontFamily:'Montserrat_300Light',
    color: '#4CAF50',
    fontWeight: 'bold',
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 15,
  },

  editBtn: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },

  deleteBtn: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },

  btnText: {
    fontFamily:'Montserrat_700Bold',
    color: '#fff',
    fontWeight: 'bold',
  },
});