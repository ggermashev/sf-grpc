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
const UserService = grpc.loadPackageDefinition(definition).user.UserService
const client = new UserService(
  "user:80",
  grpc.credentials.createInsecure()
)

export default client;
