import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

export async function postEventCommentHandler(req, res) {
  const eventId = req.query.id;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Connection to database failed",
    });
  }

  if (req.method === "POST") {
    // Add validation
    const { name, email, text } = req.body;
    if (
      !name ||
      !name.trim() === "" ||
      !text.trim() === "" ||
      !email ||
      !email.includes("@") ||
      !text
    ) {
      res.status(422).json({
        message: "invalid input data sent",
      });
      client.close();
      return;
    }

    const comment = { eventId, name, email, text };

    let result;

    try {
      result = await insertDocument(client, "comments", comment);
      comment._id = result.insertedId;

      res.status(201).json({
        status: "Posted successfully added",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "Posting comments failed",
      });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({
        message: "Successful",
        data: documents,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "fetching comments failed",
      });
    }
  }

  client.close(); //always call client close
}

export default postEventCommentHandler;
