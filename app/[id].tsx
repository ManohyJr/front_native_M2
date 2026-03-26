import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function EditTeacher() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const BASE_URL = "http://192.168.2.146:3000";
  const [num, setNum] = useState('');
  const [nom, setNom] = useState('');
  const [volHoraire, setVolHoraire] = useState('');
  const [taux, setTaux] = useState('');

  // ✅ Pré-remplissage (UNE seule fois)
  useEffect(() => {
    if (params.nom) {
      setNum(params.num as string);
      setNom(params.nom as string);
      setVolHoraire((params.volHoraire as string) || '');
      setTaux((params.taux as string) || '');
    }
  }, []);

  // ✅ Calcul salaire en live
  

  const handleSave = async () => {
  try {
    const res = await fetch(`${BASE_URL}/enseignants/modifier/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        num: num,
        nom: nom,
        vol_horaire: parseInt(volHoraire),
        taux: parseInt(taux)
      })
    });

    const data = await res.json();

    console.log("Réponse update:", data);

    router.replace('/pages/teacherCRUD');

  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier enseignant</Text>

      {/* ✅ ID */}
      <Text style={styles.id}>ID: {params.id}</Text>

      <TextInput
        placeholder="matricule"
        value={num}
        onChangeText={setNum}
        style={styles.input}
        placeholderTextColor="#999"
      />
      {/* NOM */}
      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
        placeholderTextColor="#999"
      />

      {/* VOLUME */}
      <TextInput
        placeholder="Volume horaire"
        value={volHoraire}
        onChangeText={setVolHoraire}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      {/* TAUX */}
      <TextInput
        placeholder="Taux"
        value={taux}
        onChangeText={setTaux}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />


      {/* ✅ BOUTON PRO */}
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>ENREGISTRER</Text>
      </Pressable>
    </View>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontFamily:'Montserrat_700Bold',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#222',
  },

  id: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },

  input: {
    fontFamily:'Montserrat_300Light',
    backgroundColor: '#fff',
    color:'#777',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },

  salary: {
    fontFamily:'Montserrat_300Light',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },

  button: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },

  buttonText: {
    fontFamily:'Montserrat_300Light',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});