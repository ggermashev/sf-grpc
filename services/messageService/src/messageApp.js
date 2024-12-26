import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import userClient from './userClient.js'

const PROTO_PATH = "./src/message.proto"


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
const messageProto = grpc.loadPackageDefinition(definition).message

const server = new grpc.Server()

server.addService(messageProto.MessageService.service, {
  sendMessage: (req, res) => {
    const {token, message, chatId} = req.request
    console.log(`${JSON.stringify({message, chatId, token})} recieved`)
    userClient.getUser({token}, (error, user) => {
      const userName = user.name
      console.log(`${JSON.stringify({message, chatId, userName})} will be sent`)
      res(null, {
        message, chatId, userName
      })
    })
  },
  getMessages: (req, res) => {},
  createChat: (req, res) => {},
  getChats: (req, res) => {},
})

server.bindAsync(
  "message:80",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Message service is running");
    server.start();
  }
)
