import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPosts } from "../services/api";

export default function Index() {
  const [posts, setPosts] = useState<any[]>([]);

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getAllPosts();
    }, []),
  );

  const getAllPosts = () => {
    getPosts().then((res) => {
      if (res.status == 200) {
        setPosts(res.data);
        // Check data model from the response on the console log or network tab in the browser or the docs in the api link
        console.log(res.data);
      } else {
        console.log("errorr");
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <TouchableOpacity
          style={{
            padding: 10,
            margin: 8,
            backgroundColor: "#aaaaaa",
            width: "20%",
          }}
          onPress={() =>
            router.push({
              pathname: "/postForm",
              params: {},
            })
          }
        >
          <Text style={{ textAlign: "center" }}>Add New Post</Text>
        </TouchableOpacity>
        {posts.map((post) => (
          <Pressable
            key={post.id}
            style={{ padding: 10, borderWidth: 1 }}
            onPress={() =>
              router.push({
                pathname: "/postDetail",
                params: { id: post.id, userId: post.userId },
              })
            }
          >
            <Text>Post Number: {post.id}</Text>
            <Text>Title: {post.title}</Text>
            <Text>Body: {post.body}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
