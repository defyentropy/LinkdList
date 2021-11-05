import Link from "models/Link";
import dbConnect from "lib/dbConnect";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { tagsToArray } from "lib/tags";

// API enpoint to allow users to upadte and delete links
const handler = async (req, res) => {
  const user = getSession(req, res).user;
  const { id: linkId } = req.query;
  let linkDetails;

  try {
    await dbConnect();
    linkDetails = await Link.findById(linkId);

    // If the link does not exist, send an error and halt the handler
    if (!linkDetails) {
      res.status(401).json({
        error: "LINK_DOESNT_EXIST",
      });
      return;
    }

    // If the user requesting the data does not own the link, send an error and halt the handler
    if (linkDetails.owner !== user.email) {
      res.status(401).json({
        error: "ACCESS_DENIED",
      });
      return;
    }
  } catch (err) {
    res.status(403).json({
      error: err,
    });
    return;
  }

  switch (req.method) {
    // Allow users to delete links
    case "DELETE":
      try {
        await Link.findByIdAndDelete(linkId);
        res.status(200).json({
          message: "DELETED",
        });
      } catch (err) {
        res.status(403).json({
          error: err,
        });
      }
      break;

    // Allow users to update links
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
          message: "UPDATED",
        });
      } catch (err) {
        res.status(403).json({
          error: err,
        });
      }
      break;

    // If the request was not a PUT or DELETE request, send an error
    default:
      res.setHeader("Allow", ["DELETE", "PUT"]);
      res.status(400).json({
        error: `Method ${req.method} not allowed`,
      });
  }
};

export default withApiAuthRequired(handler);
