import { connect, ConnectOptions } from "mongoose";

const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;

export const connection = () => {
  const { MONGOURI } = process.env;
  if (!MONGOURI) throw new Error("Environment Var not found");
  connect(MONGOURI, options)
    .then(() => console.log("dB connect successsfulllly"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

export const database = {
    user:'user'
}
