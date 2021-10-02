import dbConnect from "lib/dbConnect";
import Group from "models/Group";
import Link from "models/Link";
import { getSession } from "@auth0/nextjs-auth0";

const handler = async (req, res) => {

    const method = req.method;

    switch (method) {

        case "GET":
            const user = getSession(req, res).user;
            const { id: groupId } = req.query;
            let error = null;
            let groupDetails = null;
            let links = null;

            // Fetch the group data
            try {
                await dbConnect();
                groupDetails = await Group.findById(groupId);

                groupDetails = JSON.parse(JSON.stringify(groupDetails));
            } catch (err) {
                error = JSON.parse(JSON.stringify(err));
            }
            
            // If the group does not exist, return an error
            if (!groupDetails) {
                error = "GROUP_DOESNT_EXIST";

                res.status(400).json({
                    data: {
                        groupDetails,
                        links
                    },
                    error
                })

                return;
            }

            // If the group exists but the user isn't part of it, return an error
            if (!groupDetails.participants.includes(user.email)) {
                error = "ACCESS_DENIED";
                groupDetails = null;

                res.status(403).json({
                    data: {
                        groupDetails,
                        links
                    },
                    error
                })

                return;
            }

            // If the group exists and the user is part of it, fetch its links
            try {
                links = await Link.find({
                    groupID: {$in: [groupDetails["_id"]]}
                });

                links = JSON.parse(JSON.stringify(links));
            } catch (err) {
                error = JSON.parse(JSON.stringify(err));
            }

            // Return the page props
            res.status(200).json({
                data: {
                    groupDetails,
                    links
                },
                error
            })
            break;

        default:
            res.status(400).json({groupDetails: null, links: null, error: "Method not allowed"})

    }
}

export default handler;