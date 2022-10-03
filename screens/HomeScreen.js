import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
    });
  });

  const [recipes, setRecipes] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const apiId = "ef4c7ce2";
  const apiKey = "7da7ce77a873445736ccfe5139f08ba7";
  const apiUrl = `https://api.edamam.com/search?q=mac&app_id=${apiId}&app_key=${apiKey}&from=1&to=20&calories=591-722&health=alcohol-free`;

  //function
  async function apiCall() {
    setLoading(true);
    let resp = await fetch(apiUrl);
    let respJson = await resp.json();
    setRecipes(respJson.hits);
    setLoading(false);
    Keyboard.dismiss();
    setSearchQuery("");
  }

  useEffect(() => {
    setLoading(true);
    apiCall();
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-slate-200 p-2">
      <Text className="text-[23px] font-extrabold text-cyan-700 w-11/12">
        What recipe would you like to search?
      </Text>

      <View className="flex flex-row">
        <TextInput
          placeholder="Search Recipe..."
          className="h-full w-5/6 bg-slate-100 border-2 border-slate-100 rounded-full mt-2 p-1"
          onchangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <TouchableOpacity
        className="flex flex-row justify-center  border-2 border-cyan-700 w-2/5 bg-cyan-700 items-center rounded-full mt-5"
        onPress={apiCall}
        title="submit"
      >
        <Text className=" text-white p-1 font-black text-base">Search</Text>
      </TouchableOpacity>
      <SafeAreaView className="flex-1">
        {loading ? (
          <ActivityIndicator size="large" color="#0097A7" />
        ) : (
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <View className=" bg-slate-300 shadow-cyan-500/50 p-2 m-2 rounded-lg ">
                <Image
                  className="w-max h-[200px] rounded-lg "
                  source={{ uri: `${item.recipe.image}` }}
                />
                <View className="p-3  flex-row  ">
                  <Text className=" pt-2 font-black text-cyan-700">
                    {item.recipe.label}
                  </Text>
                  <TouchableOpacity
                    className="ml-2 bg-cyan-700  rounded-full"
                    onPress={() => {
                      navigation.navigate("Details", { recipe: item.recipe });
                    }}
                  >
                    <Text className="m-1 p-1 text-white">Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
}
