import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const body = JSON.parse(req.body);

    if (!body.createdBy || !body.start.from || !body.start.to) {
      res.status(422).end();
      return;
    }

    const token = process.env.YANDEX_TRACKER_TOKEN;
    const orgid = process.env.YANDEX_TRACKER_ORGID;

    if (!token || !orgid) {
      res.status(418).end();
      return;
    }

    const response = await fetch("https://api.tracker.yandex.net/v2/worklog/_search?perPage=10000", {
      method: "POST",
      headers: {
        Authorization: token,
        "X-Org-ID": orgid,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: body.createdBy,
        start: {
          from: body.start.from,
          to: body.start.to,
        },
      }),
    });

    const json = await response.json();

    res.status(200).json(json);
  } catch (e) {
    res.status(500).end();
  }
};

export default handler;
