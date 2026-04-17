import { getPostComments, getPostDetail, getUserDetail } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const [user, setUser] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      getPostDetailData();
      getUserData();
      getPostCommentsData();
    }
  }, []);

  const getUserData = () => {
    getUserDetail(Number(userId)).then((res) => {
      if (res.status == 200) {
        setUser(res.data);
        console.log(res.data);
      } else {
        console.log("error");
      }
    });
  };

  const getPostDetailData = () => {
    getPostDetail(Number(id)).then((res) => {
      if (res.status == 200) {
        setPost(res.data);
        console.log(res.data);
      } else {
        console.log("error");
      }
    });
  };

  const getPostCommentsData = () => {
    getPostComments(Number(id)).then((res) => {
      if (res.status == 200) {
        setComments(res.data);
        console.log(res.data);
      } else {
        console.log("error");
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 12,
      }}
    >
      <ScrollView>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {post?.title}
        </Text>
        <Text style={{ textAlign: "center" }}>{post?.body}</Text>
        <br></br>
        <Text>Post Created By:</Text>
        <Text>Name: {user?.name}</Text>
        <Text>Email: {user?.email}</Text>
        <br></br>
        <Text>Comments:</Text>
        <View>
          {comments.map((comment) => (
            <View style={{ padding: 10, borderWidth: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Email: {comment.email}</Text>
              <Text>Title: {comment.name}</Text>
              <br></br>
              <Text>Body: {comment.body}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
