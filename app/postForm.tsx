import { postData } from "@/services/api";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const postFormData = async () => {
    try {
      const payload = {
        title,
        body,
        userId: Number(userId),
      };
      const res = await postData(payload);

      if (res.status === 201 || res.status === 200) {
        setTitle("");
        setBody("");
        setUserId("");
        alert("Post 'created' (faked) with ID: " + res.data.id);
        // router.back();
      }
    } catch (error) {
      setError("Failed to submit post, try again.");
      console.error(error);
    }
  };
  const handleSubmit = () => {
    if (title == "" || body == "" || userId == "") {
      setError("Please fill all data before submitting");
    } else {
      setError("");
      postFormData();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>{" "}
      <ScrollView>
        <View style={{ alignItems: "flex-start", marginVertical: 8 }}>
          <Text>Title:</Text>
          <TextInput
            placeholder="Type title here..."
            onChangeText={(text) => setTitle(text)}
            style={{ backgroundColor: "white", padding: 8, marginTop: 4 }}
          ></TextInput>
        </View>
        <View style={{ alignItems: "flex-start", marginVertical: 8 }}>
          <Text>Body:</Text>
          <TextInput
            placeholder="Type body here..."
            onChangeText={(text) => setBody(text)}
            style={{ backgroundColor: "white", padding: 8, marginTop: 4 }}
          ></TextInput>
        </View>
        <View style={{ alignItems: "flex-start", marginVertical: 8 }}>
          <Text>User ID:</Text>
          <TextInput
            placeholder="User ID..."
            onChangeText={(text) => setUserId(text)}
            keyboardType="numeric"
            style={{ backgroundColor: "white", padding: 8, marginTop: 4 }}
          ></TextInput>
        </View>
        <View style={{}}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              padding: 8,
              backgroundColor: "#52f48b",
              borderRadius: 8,
              marginVertical: 8,
            }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              padding: 8,
              backgroundColor: "#a2a2a2",
              borderRadius: 8,
              marginVertical: 8,
            }}
          >
            <Text>Back to Home Page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
