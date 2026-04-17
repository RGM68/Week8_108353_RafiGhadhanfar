import axios from "axios";

const ENV = process.env.EXPO_PUBLIC_API_URL;

export const getPosts = () => {
  return axios.get(ENV + "Posts");
};

export const getUserDetail = (id: number) => {
  return axios.get(ENV + "users/" + id);
};

export const getPostDetail = (id: number) => {
  return axios.get(ENV + "posts/" + id);
};

export const getPostComments = (id: number) => {
  return axios.get(ENV + "comments?postId=" + id);
};

export const postData = (data: {
  title: string;
  body: string;
  userId: number;
}) => {
  return axios.post(ENV + "posts", data);
};
