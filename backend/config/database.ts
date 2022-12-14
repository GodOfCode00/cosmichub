import { connect, ConnectOptions } from "mongoose";
import PlatformError from "../universe/errors/PlatformError";

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

export const connection = () => {
  const { MONGOURI } = process.env;
  if (!MONGOURI) throw new PlatformError(500, ["Environment Var not found"]);
  connect(MONGOURI, options)
    .then(() => console.log("dB connect successsfulllly"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

export const database = {
  user: "user",
  problem: "problem",
  tag: "tag",
  problem_tag: "problem_tag"
};
