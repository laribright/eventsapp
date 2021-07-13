import { connectDatabase, insertDocument } from "../../../helpers/db-util";

async function newsLetterHandler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }
    //Send the response and save in the database

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      return res.status(500).json({
        message: "Connection failed",
      });
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      return res.status(500).json({
        status: "Fail",
        message: "Sign up failed",
      });
    }

    res.status(201).json({ message: "You've successfully signed up" });
  } else {
    return res.status(400).json({
      message: "Invalid request method. Only supports POST requests",
    });
  }
}

export default newsLetterHandler;
