import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";
import Toast from "react-native-toast-message";

const AddScreen = ({ navigation }) => {
  const [person, setPerson] = useState({
    firstname: "",
    lastname: "",
    relationship: "",
    key: `p_${new Date().getTime()}`,
    errors: {},
  });

  const setField = (field, value) => {
    setPerson((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const validateAllFields = () => {
    const { firstname, lastname, relationship } = person;

    const errors = {
      firstname: !firstname ? "First name is required" : null,
      lastname: !lastname ? "Last name is required" : null,
      relationship: !relationship ? "Relationship is required" : null,
    };

    setPerson((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((error) => error !== null);
  };

  const savePerson = async () => {
    if (!validateAllFields()) {
      const firstErrorField = Object.keys(person.errors).find(
        (key) => person.errors[key]
      );

      if (firstErrorField) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Validation Error",
          text2: person.errors[firstErrorField],
          visibilityTime: 3000,
        });
      }
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("people");
      const people = existingData ? JSON.parse(existingData) : [];
      people.push(person);
      await AsyncStorage.setItem("people", JSON.stringify(people));

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Person saved successfully",
        visibilityTime: 2000,
      });

      navigation.navigate("PeopleList");
    } catch (error) {
      console.error("Failed to save person:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error saving person",
        text2: "Please try again",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomTextInput
          label="First Name"
          value={person.firstname}
          onChangeText={(text) => setField("firstname", text)}
          error={person.errors.firstname}
        />

        <CustomTextInput
          label="Last Name"
          value={person.lastname}
          onChangeText={(text) => setField("lastname", text)}
          error={person.errors.lastname}
        />

        <Text style={styles.label}>Relationship</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={person.relationship}
            onValueChange={(value) => setField("relationship", value)}
            style={[
              styles.picker,
              person.errors.relationship ? { borderColor: "red" } : {},
            ]}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Me" value="Me" />
            <Picker.Item label="Family" value="Family" />
            <Picker.Item label="Friend" value="Friend" />
            <Picker.Item label="Coworker" value="Coworker" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {person.errors.relationship && (
          <Text style={{ color: "red", marginLeft: 10 }}>
            {person.errors.relationship}
          </Text>
        )}

        <View style={styles.buttons}>
          <CustomButton
            text="Cancel"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.cancel}
          />
          <CustomButton
            text="Save"
            onPress={savePerson}
            buttonStyle={styles.save}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginLeft: 10,
  },
  pickerContainer: {
    ...Platform.select({
      android: {
        borderWidth: 2,
        marginBottom: 20,
      },
    }),
  },
  picker: {},
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  cancel: { backgroundColor: "gray", width: "44%" },
  save: { backgroundColor: "green", width: "44%" },
});

export default AddScreen;