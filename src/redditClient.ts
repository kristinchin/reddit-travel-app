import axios from "axios";

// returns object with thread data and comments
export async function fetchRedditThreadComments(url: string): Promise<any> {
  try {
    const jsonUrl = url;
    const response = await axios.get(jsonUrl);
    const threadData = response.data[0];
    const commentsData = response.data[1];

    // console.log("response", commentsData);
    // console.log("commentsData: ", commentsData);
    const comments = commentsData.data.children.map(
      (child: any) => child.data.body,
    );

    // return {
    //   thread: threadData,
    //   comments,
    // };
    return comments;
  } catch (error) {
    console.error("Error fetching Reddit thread:", error);
    return null;
  }
}
