import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import Link from "models/Link";
import { getSession } from "@auth0/nextjs-auth0";

const handler = async (req, res) => {
  const user = getSession(req, res).user;
  const { id: groupId } = req.query;
  let error = null;
  let groupDetails = null;

  try {
    await dbConnect();
    groupDetails = await Group.findById(groupId);
    groupDetails = JSON.parse(JSON.stringify(groupDetails));

    if (!groupDetails) {
      res.status(403).json({
        data: null,
        error: "GROUP_DOESNT_EXIST",
      });
      return;
    }

    if (groupDetails.owner !== user.email) {
      res.status(403).json({
        data: null,
        error: "ACCESS_DENIED",
      });
      return;
    }
  } catch (err) {
    error = JSON.parse(JSON.stringify(err));
    res.status(403).json({
      data: null,
      error: error,
    });
    return;
  }

  switch (req.method) {
    case "GET":
      let links = null;
      // If the group exists and the user is part of it, fetch its links
      try {
        links = await Link.find({
          groupID: { $in: [groupDetails["_id"]] },
        });
        links = JSON.parse(JSON.stringify(links));
      } catch (err) {
        error = JSON.parse(JSON.stringify(err));
      }

      // Return the page props
      res.status(200).json({
        data: {
          groupDetails,
          links,
        },
        error,
      });
      break;

    case "PUT":
      let groupUpdate = {
        name: req.body.groupName,
        description: req.body.groupDesc,
        owner: groupDetails.owner,
      };

      try {
        await Group.findByIdAndUpdate(groupId, groupUpdate);

        res.status(200).json({
          data: {
            message: "Updated group",
          },
        });
      } catch (err) {
        res.status(403).json({
          data: null,
          error: err,
        });
      }

      break;

    case "DELETE":
      try {
        await Link.deleteMany({
          groupID: { $in: [groupDetails["_id"]] },
        });

        await Group.findByIdAndDelete(groupId);

        res.status(200).json({
          data: {
            message: "DELETED",
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
      res
        .setHeader("Allow", ["DELETE", "PUT"])
        .status(400)
        .json({ groupDetails: null, links: null, error: "Method not allowed" });
  }
};

export default handler;
