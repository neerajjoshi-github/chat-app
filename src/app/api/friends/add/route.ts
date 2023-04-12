import { fetchRedis } from "<@>/helpers/redis";
import { authOptions } from "<@>/libs/auth";
import { addFriendValidator } from "<@>/libs/validations";
import { getServerSession } from "next-auth";
import { db } from "<@>/libs/db";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { email: emailToAdd } = addFriendValidator.parse(body.email);
    const idToAdd = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;

    if (!idToAdd) {
      return new Response("This email does not exist on the app!!", {
        status: 400,
      });
    }
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    // Check if user is already added
    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response("Already sent request to the user", { status: 400 });
    }

    // Check if user is already freind
    const isAlreadyfreind = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:freinds`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyfreind) {
      return new Response("Already added this user to your freind", {
        status: 400,
      });
    }
    // Valid request

    db.sadd(`user:${idToAdd}:incoming_friend_request`, session.user.id);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invaild request", { status: 400 });
  }
}
