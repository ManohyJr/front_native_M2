import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddTeacher() {
  const router = useRouter();

  const [nom, setNom] = useState('');
  const [volHoraire, setVolHoraire] = useState('');
  const [taux, setTaux] = useState('');

  const handleAdd = () => {
    if (!nom || !volHoraire || !taux) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const salaire = parseFloat(volHoraire) * parseFloat(taux);

    console.log('Nouvel enseignant:', { nom, volHoraire, taux, salaire });

    router.replace('/pages/teacherCRUD'); // 🔥 mieux que push
  };

    const handleBack = () => {
    router.push('./pages/teacherCRUD');
    return;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Ajouter un enseignant</Text>
      
      
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