import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { auth, database } from "../config/firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";
const catImageUrl = `https://i.pravatar.cc/300?u=${auth?.currentUser?.email}`;

const AddChat = () => {
  const navigation = useNavigation();
  const [grupAdi, setGrupAdi] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Image
          source={{ uri: catImageUrl }}
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
            borderRadius: 20,
          }}
        />
      ),
    });
  }, [navigation, auth]);

  const addGrup = async () => {
    try {
      const chatRef = doc(database, "rooms", grupAdi);
      await setDoc(chatRef, {});
      console.log("Collection added successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding collection: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Grup Adı Giriniz"
        autoCapitalize="none"
        keyboardType="default"
        autoFocus={true}
        value={grupAdi}
        onChangeText={(text) => setGrupAdi(text)}
      />
      <TouchableOpacity onPress={() => addGrup()} style={styles.chatButton}>
        <Text style={{ color: "white", fontSize: 18 }}>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    margin: 16,
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 80,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 12,
    right: 12,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
