import dbConnect from "lib/dbConnect";
import Link from "models/Link";
import { getSession } from "@auth0/nextjs-auth0";

const handler = async (req, res) => {

    if (req.method === "POST") {
        const user = getSession(req, res).user;

        let linkData = req.body;
        linkData.owner = user.email;
        let tags = linkData?.tags;

        if (tags) {
            tags = tags.split(",");

            tags = tags.map(tag => tag.toLowerCase())

            tags = tags.filter((tag, index, array) => {
                return array.indexOf(tag) === index;
            })

            linkData.tags = tags;
        }

        try {
            await dbConnect();
            const newLink = new Link(linkData);

            await newLink.save((err, response) => {
                if (err) {
                    res.status(400).json({data: null, error: err});
                }
                else {
                    res.status(200).json({data: response, error: null});
                }
            });

        } catch (err) {
            res.status(400).json({data: null, error: err})
        }
    }
    else {
        res.setHeader("Allow", ["POST"])
        res.status(403).json({data: null, error: `Method ${req.method} not allowed`})
    }
}

export default handler;