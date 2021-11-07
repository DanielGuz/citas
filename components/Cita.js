import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const Cita = ({ cita, deletePatient }) => {

  const dialogDelete = id => {
    console.log('Eliminado cita...', id)
    deletePatient(id)
  }

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.text}>{cita.patient}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario</Text>
        <Text style={styles.text}>{cita.owner}</Text>
      </View>
      <View>
        <Text style={styles.label}>Síntomas</Text>
        <Text style={styles.text}>{cita.symptom}</Text>
      </View>
      <View>
        <TouchableHighlight onPress={() => dialogDelete(cita.id)} style={styles.buttonDelete}>
          <Text style={styles.textButtonDelete}> Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 10,   // Propiedad exclusiva de Reac Native
    paddingHorizontal: 10  // Propiedad exclusiva de Reac Native
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
  },

  text: {
    fontSize: 18
  },

  buttonDelete: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10
  },

  textButtonDelete: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default Cita;