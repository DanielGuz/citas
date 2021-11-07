import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';


const App = () => {

  const [citas, setCitas] = useState([])

  const [showForm, saveShowForm] = useState(false)

  const deletePatient = id => {
    setCitas((citasCurrent) => {
      return citasCurrent.filter(cita => cita.id !== id)
    })
  }

  const closeKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => closeKeyboard()}>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador de citas</Text>

        <View>
          <TouchableHighlight onPress={() => saveShowForm(!showForm)} style={styles.btnShowForm}>
            <Text style={styles.textBtnShowForm}>Mostrar Formulario</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.content}>
          {showForm ? (
            <>
              <Text style={styles.title}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                saveShowForm={saveShowForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'}</Text>
              <FlatList
                style={styles.list}
                data={citas}
                renderItem={({ item }) => (<Cita cita={item} deletePatient={deletePatient} />)}

                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18c78d',
    flex: 1
  },

  content: {
    flex: 1,
    marginHorizontal: '2.5%'
  },

  title: {
    color: '#FFF',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  list: {
    flex: 1
  },

  btnShowForm: {
    padding: 10,
    backgroundColor: '#0e9669',
    marginVertical: 10
  },

  textBtnShowForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default App;

