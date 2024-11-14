import useSWR from "swr";
import fetcher from "./fetcher";

type ResponseData = {
  data: {
    userID: number;
    id: number;
    title: string;
    body: string;
  };
};

export default function GetFakePosts() {
  const { data, error, isLoading } = useSWR<ResponseData>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher,
  );

  const posts = data?.data ?? [];

  return { posts, error, isLoading };
}
