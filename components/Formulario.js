import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import shortid from 'shortid';



const Formulario = ({ citas, setCitas, saveShowForm }) => {

  const [patient, savePatient] = useState('');
  const [owner, saveOwner] = useState('');
  const [phone, savePhone] = useState('');
  const [symptom, saveSymptom] = useState('');
  const [date, saveDate] = useState('');
  const [time, saveTime] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // DatePicker

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmDate = date => {
    saveDate(format(date, "dd 'de' MMMM 'de' Y", { locale: es }));
    hideDatePicker();
  };

  // TimePicker

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmTime = time => {
    saveTime(format(time, 'HH:mm', { locale: es }));
    hideTimePicker();
  };

  // Created New Cita

  const createdNewCita = () => {

    if (patient.trim() === '' ||
      owner.trim() === '' ||
      phone.trim() === '' ||
      date.trim() === '' ||
      time.trim() === '' ||
      symptom.trim() === '') {
      showAlert();
      return;
    }

    const cita = { patient, owner, phone, date, time, symptom };

    cita.id = shortid.generate();

    // Agregar la nueva Cita al State 

    const newCitas = [...citas, cita];

    setCitas(newCitas);

    // Ocultar formulario

    saveShowForm(false);

    // Limpiar el formulario

  }

  // Show alert if validation fails

  const showAlert = () => {
    Alert.alert(
      'Error', // Titulo del alert
      'Todos los campos son obligatorios', // Cuerpot del alert
      [{
        text: 'OK'  //Arreglo de botones
      }]
    )
  }

  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => savePatient(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => saveOwner(text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Télefono</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => savePhone(text)}
            keyboardType='numeric'
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmDate}
            onCancel={hideDatePicker}
            locale='es_ES'
          />
          <Text>{date}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmTime}
            onCancel={hideTimePicker}
            locale='es_ES'
          />
          <Text>{time}</Text>
        </View>

        <View>
          <Text style={styles.label}>Síntomas</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={text => saveSymptom(text)}
          />
        </View>

        <View>
          <TouchableHighlight onPress={() => createdNewCita()} style={styles.buttonAdd}>
            <Text style={styles.textButtonAdd}>Agregar Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
  },

  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
  },

  buttonAdd: {
    padding: 10,
    backgroundColor: 'green',
    marginVertical: 10
  },

  textButtonAdd: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default Formulario;