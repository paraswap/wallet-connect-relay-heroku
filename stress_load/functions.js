const { generateConnectionMessages } = require("./helpers/connection");

let userIndex = 0

const messagesMap = []

function assignUserInfo(userContext, events, done) {
  const index = userIndex++
  const userInfo = index % 2 === 0 ? {index, role: "dapp"} : {index, role: "wallet"}
  const isDapp = userInfo.role === "dapp"
  userContext.vars.userInfo = userInfo

  if (isDapp) {
    messagesMap[index] = generateConnectionMessages()
  } else {
    messagesMap[index] = messagesMap[index - 1]
  }


  return done();
}

function getNextMessage(userContext, events, done) {
  const {userInfo} = userContext.vars


  const getNextMessage = messagesMap[userInfo.index]
  const message = getNextMessage(userInfo)
  
  userContext.vars.message = JSON.stringify(message)
  userContext.vars.needAwait = message?.type === "ack"

  return done();
}

function shouldContinue(userContext, next) {
  const {message} = userContext.vars
  return next(!!message)
}

function logUserContext(userContext, events, done) {
  console.log("user index", userIndex++)

  return done();
}



function logResponse(userContext, events, done) {
  console.log("response", userContext.vars.WSresponse)

  return done();
}



module.exports = { logUserContext, logResponse, assignUserInfo, getNextMessage, shouldContinue };
