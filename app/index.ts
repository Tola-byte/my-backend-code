import express, { Request } from "express";
import cors from "cors";
import "./db";
import sectorModel from "./model/sectors.model";
import User from "./model/user.model";

const app = express();
const PORT =  process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "*" , "https://my-backend-code-production.up.railway.app" ],
  })
);

interface CustomRequest<B> extends Request {
  body: B;
}

app.get("/sectors", async (_, response) => {
  try {
    const sections = await sectorModel.find();
    response.send({
      data: sections,
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/user", async (request, response) => {
  try {
    if (!request.query.userId) throw new Error("Invalid User");
    const user = await User.findById(request.query.userId).populate("sectors");
    if (!user) {
      throw new Error("Invalid User");
    }
    response.send(user);
  } catch (error) {
    if (error instanceof Error)
      response.status(500).send({ error: error.message });
    else response.status(500).send("Unknown Error");
  }
});

app.post(
  "/create-user",
  async (
    request: CustomRequest<{
      name: string;
      agreement: boolean;
      sectors: string[];
    }>,
    response
  ) => {
    try {
      const newUser = new User(request.body);
      await newUser.save();
      response.status(200).send({
        message: "User Added Successfully",
        newUser,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

app.post(
  "/update-user",
  async (
    request: CustomRequest<{
      userID: string;
      name?: string;
      agreement?: boolean;
      sectors?: string[];
    }>,
    response
  ) => {
    try {
      const { userID, ...rest } = request.body;
      const user = await User.findByIdAndUpdate(userID, { $set: { ...rest } });
      if (!user) throw new Error("Invalid User");
      response.status(200).send({
        message: "User Updated Successfully",
      });
    } catch (error: any) {
      if (error instanceof Error)
        response.status(400).send({ error: error.message });
      else
        response
          .status(500)
          .send({ message: "Unknown Error " + error.toString() });
    }
  }
);

app.use("*", (_, response) => {
  response.status(404).send({ message: "Invalid Route" });
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT} 🚀`);
});
