import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

export default function Index() {
  const router = useRouter();

  const goToHome = () => {
    router.push('/pages/teacherCRUD');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenue
      </Text>

      <Text style={styles.subtitle}>
        Application de gestion des enseignants
      </Text>

      <Text style={styles.description}>
        Cliquez sur le bouton ci-dessous pour accéder à la gestion CRUD
      </Text>

      <Pressable style={styles.button} onPress={goToHome}>
        <Text style={styles.buttonText}>Accéder à l'application</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Montserrat_400Regular',
    flex: 1,
    backgroundColor: '#f4f6f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
    textAlign: 'center',
  },

  subtitle: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },

  description: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },

  button: {
    fontFamily: 'Montserrat_400Regular',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3, // Android shadow
  },

  buttonText: {
    fontFamily: 'Montserrat_400Regular',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});