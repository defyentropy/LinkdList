import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import Link from "models/Link";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

// API endpoint to allow users to fetch, update, and delete a specific group
const handler = async (req, res) => {
  const user = getSession(req, res).user;
  const { id: groupId } = req.query;
  let error = null;
  let groupDetails = null;

  try {
    await dbConnect();
    groupDetails = await Group.findById(groupId);
    groupDetails = JSON.parse(JSON.stringify(groupDetails));

    // If the group does not exist, send an error and halt the handler
    if (!groupDetails) {
      res.status(200).json({
        error: "GROUP_DOESNT_EXIST",
      });
      return;
    }

    // If the user requesting the data does not own the group, send an error and halt the handler
    if (groupDetails.owner !== user.email) {
      res.status(200).json({
        error: "ACCESS_DENIED",
      });
      return;
    }
  } catch (err) {
    error = JSON.parse(JSON.stringify(err));
    res.status(200).json({
      error: error,
    });
    return;
  }

  switch (req.method) {
    // Allow a user to fetch a group's links
    case "GET":
      let links = null;
      try {
        links = await Link.find({
          groupID: { $in: [groupDetails._id] },
        });
        links = JSON.parse(JSON.stringify(links));
      } catch (err) {
        error = JSON.parse(JSON.stringify(err));
      }

      res.status(200).json({
        groupDetails,
        links,
        error,
      });
      break;

    // Allow a user to update a group's name or description
    case "PUT":
      // Assign the owner from the existing data so users can't transfer ownership of a group
      let groupUpdate = {
        name: req.body.groupName,
        description: req.body.groupDesc,
        owner: groupDetails.owner,
      };

      try {
        await Group.findByIdAndUpdate(groupId, groupUpdate);

        res.status(200).json({
          message: "GROUP_UPDATED",
        });
      } catch (err) {
        res.status(200).json({
          error: err,
        });
      }

      break;

    // Allow a user to delete a group
    case "DELETE":
      try {
        // Delete all the links belonging to the group first
        await Link.deleteMany({
          groupID: { $in: [groupDetails["_id"]] },
        });

        // Then delete the group
        await Group.findByIdAndDelete(groupId);

        res.status(200).json({
          message: "GROUP_DELETED",
        });
      } catch (err) {
        res.status(200).json({
          error: err,
        });
      }
      break;

    // If the request is not a GET, PUT or DELETE request, send an error
    default:
      res
        .setHeader("Allow", ["DELETE", "PUT"])
        .status(403)
        .json({ error: "Method not allowed" });
  }
};

export default withApiAuthRequired(handler);
