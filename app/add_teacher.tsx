import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddTeacher() {
  const router = useRouter();
  const BASE_URL = "http://192.168.2.146:3000";
  const [nom, setNom] = useState('');
  const [volHoraire, setVolHoraire] = useState('');
  const [taux, setTaux] = useState('');
  const [matricule, setMatricule]= useState('');
  

 const handleAdd = async () => {
  if (!nom || !volHoraire || !taux || !matricule) {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/enseignants/inserer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        num: matricule, // ⚠️ correspond au backend
        nom: nom,
        vol_horaire: parseInt(volHoraire),
        taux: parseInt(taux)
      })
    });

    const data = await res.json();

    console.log("Réponse backend:", data);

    Alert.alert("Succès", "Enseignant ajouté");

    router.replace('./pages/teacherCRUD');

  } catch (error) {
    console.log(error);
    Alert.alert("Erreur", "Impossible d'ajouter");
  }
};
    const handleBack = () => {
    router.push('./pages/teacherCRUD');
    return;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Ajouter un enseignant</Text>
      
      <TextInput
        placeholder="matricule"
        value={matricule}
        onChangeText={setMatricule}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Volume horaire"
        value={volHoraire}
        onChangeText={setVolHoraire}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Taux"
        value={taux}
        onChangeText={setTaux}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="#999"
      />

      {/* 🔥 Bouton stylé */}
     
      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </Pressable>

       <Pressable style={styles.buttonReset} onPress={handleBack}>
        <Text style={styles.buttonText}>Retour</Text>
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
    fontSize: 24,
    fontFamily:'Montserrat_700Bold',
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#222',
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonReset: {
    backgroundColor: '#777',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
 
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});