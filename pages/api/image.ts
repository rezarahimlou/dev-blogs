import formidable from "formidable";
import { NextApiHandler } from "next";
import cloudinary from "@/lib/cloudinary";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (request, response) => {
  const { method } = request;

  switch (method) {
    case "POST":
      return uploadNewImage(request, response);

    case "GET":
      return readAllImages(request, response);

    default:
      return response.status(404).send("Not found!");
  }
};

const uploadNewImage: NextApiHandler = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const imageFile = files.image[0] as formidable.File;
    const { secure_url, url } = await cloudinary.uploader.upload(
      imageFile.filepath,
      {
        folder: "dev-blogs",
      }
    );

    res.json({ src: secure_url });
  });
};

const readAllImages: NextApiHandler = async (req, res) => {
  try {
    const { resources } = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "dev-blogs",
    });

    const images = resources.map(({ secure_url }: any) => {
      return { src: secure_url };
    });

    res.json({ images });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
