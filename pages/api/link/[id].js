import Link from "models/Link";
import dbConnect from "lib/dbConnect";
import { getSession } from "@auth0/nextjs-auth0";
import { tagsToArray } from "lib/tags";

const handler = async (req, res) => {
  const user = getSession(req, res).user;
  const { id: linkId } = req.query;
  let linkDetails;

  // Connect to database and fetch original data for this link
  try {
    await dbConnect();
    linkDetails = await Link.findById(linkId);

    if (!linkDetails) {
      res.status(401).json({
        data: null,
        error: "LINK_DOESNT_EXIST",
      });
      return;
    }

    if (linkDetails.owner !== user.email) {
      res.status(401).json({
        data: null,
        error: "ACCESS_DENIED",
      });
      return;
    }
  } catch (err) {
    res.status(403).json({
      data: null,
      error: err,
    });
    return;
  }

  switch (req.method) {
    case "DELETE":
      try {
        await Link.findByIdAndDelete(linkId);
        res.status(200).json({
          data: {
            message: "DELETED",
          },
          error: null,
        });
      } catch (err) {
        res.status(403).json({
          data: null,
          error: err,
        });
      }
      break;

    case "PUT":
      try {
        if (req.body?.tags) {
          req.body.tags = tagsToArray(req.body.tags);
        }

        let linkUpdate = {
          title: req.body.title,
          description: req.body.description,
          hyperlink: req.body.hyperlink,
          type: req.body.type,
          creator: req.body.creator,
          tags: req.body.tags,
          groupId: linkDetails.groupID,
          owner: linkDetails.owner,
        };

        await Link.findByIdAndUpdate(linkId, linkUpdate);

        res.status(200).json({
          data: {
            message: "UPDATED",
          },
        });
      } catch (err) {
        res.status(403).json({
          data: null,
          error: err,
        });
      }
      break;

    default:
      res.setHeader("Allow", ["DELETE", "PUT"]);
      res.status(400).json({
        data: null,
        error: `Method ${req.method} not allowed`,
      });
  }
};

export default handler;
