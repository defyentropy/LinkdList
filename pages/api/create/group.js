import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import { getSession } from "@auth0/nextjs-auth0";

// API endpoint to allow a user to create a new group
const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const user = getSession(req, res).user;

      // Assign group owner on backend based on request data
      // so users can't create groups in others' accounts
      let groupData = req.body;
      groupData.owner = user.email;

      try {
        await dbConnect();
        const newGroup = new Group(groupData);

        await newGroup.save((err, response) => {
          if (err) {
            res.status(400).json({ error: err });
          } else {
            res.status(200).json({ message: response });
          }
        });
      } catch (err) {
        res.status(400).json({ error: err });
      }
      break;

    // If the request was not a post request, send back an error
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(403).json({ error: `Method ${req.method} not allowed` });
  }
};

export default handler;
