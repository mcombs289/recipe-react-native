import React from "react";
import { ScrollView, Text, View, Image } from "react-native";

export default function Details({ route }) {
  const { recipe } = route.params;

  return (
    <ScrollView>
      <View className="m-3">
        <Text className="mb-4 text-xl underline text-cyan-700 font-black">
          {recipe.label}
        </Text>
        <Image
          className="w-max h-[200px] rounded-lg "
          source={{ uri: `${recipe.image}` }}
        />
        <View>
          <Text className="text-cyan-700 font-black bg-white">Ingredients</Text>
          <Text className="bg-slate-200 p-1 mb-2 ">{`${recipe.ingredients.map(
            (item) => item["food"]
          )}`}</Text>
        </View>

        <View>
          <Text className="text-cyan-700 font-black bg-white">
            Calories:
            <Text className="text-black font-normal"> {recipe.calories}</Text>
          </Text>
        </View>
        <View>
          <Text className="text-cyan-700 mt-3 font-black bg-white">
            Cook Time:{" "}
            <Text className="text-black font-normal"> {recipe.totalTime}</Text>
          </Text>
        </View>
        <View>
          <Text className="text-cyan-700 font-black bg-white">Description</Text>
          <Text>{recipe.ingredientLines}</Text>
        </View>
        <View>
          <Text className="text-cyan-700 font-black bg-white">
            Cusine Type:{" "}
            <Text className="text-black font-normal">
              {" "}
              {recipe.cuisineType}
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
