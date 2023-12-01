import User from "../../database/models/User.js";
import Admin from "../../database/models/Admin.js";
import Post from "../../database/models/Post.js";

export const post_ad = async (req, res) => {
  const id = req.user._id.toString();

  const {
    title,
    description,
    age,
    email,
    number,
    postType,
    images,
    category,
    section,
    location,
    placed,
    preminum,
    highlighted,
    cost,
  } = req.body;

  try {
    if (cost == 0) {
      location.map((item) => {
        item.cities.map(async (city) => {
          const post = await Post.create({
            title,
            description,
            age,
            email,
            number,
            postType,
            images,
            category,
            section,
            country:item.country,
            state: item.state,
            city: city,
            placed,
            preminum,
            highlighted,
            user: id,
            renewedAt: new Date()
          });
          const user = await User.findById({ _id: id });
          user.posts.push(post._id);
          await user.save();
        });
      });
      return res.status(200).json({ success: "success" });
    }

    const user = await User.findById({ _id: id });
    if (user.credit < cost) {
      return res.status(400).json({ error: "low balance" });
    }
    user.credit = user.credit - cost;
    await user.save();
    location.map((item) => {
      item.cities.map(async (city) => {
        const post = await Post.create({
          title,
          description,
          age,
          email,
          number,
          postType,
          images,
          category,
          section,
          country:item.country,
          state: item.state,
          city: city,
          placed,
          preminum,
          highlighted,
          user: id,
          renewedAt: new Date()
        });
        const user = await User.findById({ _id: id });
        user.posts.push(post._id);
        await user.save();
      });
    });
    return res.status(200).json({ success: "success" });
  } catch (e) {
    return res.status(400).json({ error: "something wrong" });
  }
};

export default post_ad;
