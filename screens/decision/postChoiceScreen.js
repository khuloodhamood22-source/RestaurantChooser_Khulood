import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const PostChoiceScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { chosenRestaurant } = route.params;

  if (!chosenRestaurant) {
    return (
      <View style={styles.postChoiceScreenContainer}>
        <Text style={styles.postChoiceHeadline}>No restaurant selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.postChoiceScreenContainer}>
      <View>
        <Text style={styles.postChoiceHeadline}>Enjoy your meal!</Text>
      </View>

      <View style={styles.postChoiceDetailsContainer}>
        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Name:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.name}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Cuisine:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.cuisine}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Price:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {"$".repeat(chosenRestaurant.price)}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Rating:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {"*".repeat(chosenRestaurant.rating)}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Phone:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.phone}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Address:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.address}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Website:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.website}
          </Text>
        </View>

        <View style={styles.postChoiceDetailsRowContainer}>
          <Text style={styles.postChoiceDetailsLabel}>Delivery:</Text>
          <Text style={styles.postChoiceDetailsValue}>
            {chosenRestaurant.delivery ? "Yes" : "No"}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 80 }}>
        <Button
          title="All Done"
          onPress={() => navigation.navigate("DecisionTimeScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postChoiceScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  postChoiceHeadline: {
    fontSize: 32,
    paddingBottom: 80,
  },
  postChoiceDetailsContainer: {
    borderWidth: 2,
    borderColor: "#000000",
    padding: 10,
    width: "96%",
  },
  postChoiceDetailsRowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginBottom: 12,
  },
  postChoiceDetailsLabel: {
    width: 70,
    fontWeight: "bold",
    color: "#ff0000",
  },
  postChoiceDetailsValue: {
    width: 300,
  },
});

export default PostChoiceScreen;