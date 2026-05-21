import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/customButton";
import Toast from "react-native-toast-message";

const ListScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const data = await AsyncStorage.getItem("people");

      if (data) {
        setPeople(JSON.parse(data));
      } else {
        setPeople([]);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const deletePerson = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this person?"
  );

  if (!confirmed) return;

  const updated = people.filter(
    (p) => String(p.key) !== String(id)
  );

  await AsyncStorage.setItem("people", JSON.stringify(updated));

  setPeople(updated);

  Toast.show({
    type: "error",
    position: "bottom",
    visibilityTime: 2000,
    text1: "Person deleted",
  });
};

  return (
    <View style={styles.container}>
      <CustomButton
        text="Add Person"
        onPress={() => navigation.navigate("PeopleAdd")}
      />

      <FlatList
        data={people}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.personItem}>
            <Text style={styles.text}>
              {item.firstname} {item.lastname}
            </Text>

            <CustomButton
              text="Delete"
              onPress={() => deletePerson(item.key)}
              buttonStyle={styles.deleteButton}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  personItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  text: {
    fontSize: 18,
  },

  deleteButton: {
    backgroundColor: "red",
  },
});

export default ListScreen;