import Twitter from "twitter-lite";
import { setFailed } from "@actions/core";

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY as string,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});

export const following = async () => {
  const following: { users: Array<{ id_str: string; screen_name: string }> } = await client.get(
    "/followers/list"
  );
  for await (const user of following.users) {
    console.log(`Adding @${user.screen_name}`);
    await client.post("/lists/members/create", {
      list_id: process.env.FOLLOWING_LIST,
      user_id: user.id_str,
    });
    if (process.env.REMOVE_AFTER_ADDING) {
      await client.post("/friendships/destroy", {
        user_id: user.id_str,
      });
    }
  }
};

export const run = async () => {
  await following();
};

run()
  .then(() => {})
  .catch((error) => {
    console.error("ERROR", error);
    setFailed(error.message);
  });
