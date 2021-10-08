import dbConnect from "lib/dbConnect";
import Link from "models/Link";
import { getSession } from "@auth0/nextjs-auth0";
import { tagsToArray } from "lib/tags";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const user = getSession(req, res).user;

      let linkData = req.body;
      linkData.owner = user.email;
      if (linkData?.tags) {
        linkData.tags = tagsToArray(linkData.tags);
      }

      try {
        await dbConnect();
        const newLink = new Link(linkData);

        await newLink.save((err, response) => {
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
