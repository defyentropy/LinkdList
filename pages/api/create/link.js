import dbConnect from "lib/dbConnect";
import Link from "models/Link";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { tagsToArray } from "lib/tags";

// API endpoint to allow a user to create a new resource
const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const user = getSession(req, res).user;

      let linkData = req.body;

      // Assign link owner on backend so users can't create links in others' account
      linkData.owner = user.email;

      // Convert tags to an array for storage in DB
      if (linkData?.tags) {
        linkData.tags = tagsToArray(linkData.tags);
      }

      try {
        await dbConnect();
        const newLink = new Link(linkData);

        await newLink.save((err, response) => {
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

    // If the request is not a POST request, send an error
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(403).json({ error: `Method ${req.method} not allowed` });
  }
};

export default withApiAuthRequired(handler);
