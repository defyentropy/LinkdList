import Link from "models/Link";
import Group from "models/Group";
import dbConnect from "lib/dbConnect";
import { getSession } from "@auth0/nextjs-auth0";

const handler = async (req, res) => {

    const user = getSession(req, res).user;
    const { id: linkId } = req.query;
    let link

    // Connect to database and fetch original data for this link
    try {
        await dbConnect()
        link = await Link.findById(linkId)

        if (!link) {
            res.status(401).json({ data: null, error: "Link does not exist" });
        }
    }
    catch (err) {
        res.status(403).json({ data: null, error: err })
    }

    // Handle DELETE requests
    if (req.method === "DELETE") {

        try {
            if (link.owner === user.email) {

                await Link.findByIdAndDelete(linkId);
                res.status(200).json({
                    data: {
                        message: "deleted"
                    },
                    error: null
                })
            }
            else {
                const group = await Group.findById(link.groupID);

                if (group.owner === user.email) {

                    await Link.findByIdAndDelete(linkId);
                    res.status(200).json({
                        data: {
                            message: "deleted"
                        },
                        error: null
                    })
                }
                else {
                    console.log(user.email, link.owner, group.owner);

                    res.status(402).json({
                        data: null,
                        error: "permission denied"
                    })
                }
            }
        }
        catch (err) {
            res.status(403).json({ data: null, error: err })
        }
    }

    // Handle PUT requests for link updates
    else if (req.method === "PUT") {

        try {
            if (link.owner === user.email) {

                let tags = req.body?.tags;
                if (tags) {
                    tags = tags.split(",");

                    tags = tags.map(tag => tag.toLowerCase())

                    tags = tags.filter((tag, index, array) => {
                        return array.indexOf(tag) === index;
                    })

                    req.body.tags = tags;
                }

                let linkUpdate = {
                    title: req.body.title,
                    description: req.body.description,
                    hyperlink: req.body.hyperlink,
                    type: req.body.type,
                    creator: req.body.creator,
                    tags: req.body.tags,
                    groupId: link.groupID,
                    owner: link.owner
                }

                await Link.findByIdAndUpdate(linkId, linkUpdate)

                res.status(200).json({
                    data: {
                        message: "updated"
                    }
                })
            }
        }
        catch (err) {
            res.status(403).json({
                data: null,
                error: err
            })
        }

    }
    // If request type is not allowed, send an error
    else {
        res.setHeader("Allow", ["DELETE", "PUT"]);
        res.status(400).json({ data: null, error: `Method ${req.method} not allowed` })
    }

}

export default handler;