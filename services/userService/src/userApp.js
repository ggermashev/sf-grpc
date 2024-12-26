import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"

const PROTO_PATH = "./src/user.proto"

const definition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)
const userProto = grpc.loadPackageDefinition(definition).user

const server = new grpc.Server()

server.addService(userProto.UserService.service, {
  createAccaunt: (req, res) => {},
  login: (req, res) => {},
  editProfile: (req, res) => {},
  getUser: (req, res) => {res(null, {name: "username", id: "0"})},
  getFriends: (req, res) => {},
  getUsers: (req, res) => {},
  addFriend: (req, res) => {},
})

server.bindAsync(
  "user:80",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("User service is running");
    server.start();
  }
)
