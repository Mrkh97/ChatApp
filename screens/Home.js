import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { auth, database } from "../config/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
const catImageUrl = `https://i.pravatar.cc/300?u=${auth?.currentUser?.email}`;
export let collectionRef = collection(database, "rooms", "deneme", "chats");

const Home = () => {
  const navigation = useNavigation();
  const [grups, setGrups] = useState([]);

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

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  useLayoutEffect(() => {
    const collectionRef = collection(database, "rooms");
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      querySnapshot.docs.map((doc) => console.log(doc.id));
      setGrups(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const Item = ({ title }) => (
    <TouchableOpacity
      onPress={() => {
        collectionRef = collection(database, "rooms", title, "chats");
        navigation.navigate("Chat");
      }}
      style={styles.item}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={grups}
        renderItem={({ item }) => <Item title={item.id} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddChat")}
        style={styles.chatButton}
      >
        <Entypo name="plus" size={24} color={colors.lightGray} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
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
  item: {
    backgroundColor: "#F6F7FB",
    padding: 20,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});
