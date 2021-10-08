import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import { getSession } from "@auth0/nextjs-auth0";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const user = getSession(req, res).user;

      let groupData = req.body;
      groupData.owner = user.email;

      try {
        await dbConnect();
        const newGroup = new Group(groupData);

        await newGroup.save((err, response) => {
          if (err) {
            res.status(400).json({ data: null, error: err });
          } else {
            res.status(200).json({ data: response, error: null });
          }
        });
      } catch (err) {
        res.status(400).json({ data: null, error: err });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res
        .status(403)
        .json({ data: null, error: `Method ${req.method} not allowed` });
  }
};

export default handler;
