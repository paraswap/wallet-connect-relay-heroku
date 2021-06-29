const { genertePubSubMessages } = require("./message");
const { generateRandomTopic } = require("./topic");

const CONNECTION_PAYLOAD = "{\"data\":\"b399147345c3097381aa84a1ca8e59d034a6a3be32c78e38d9dd5460466c09c0babaea864ff8b624870d2c140bd200d09e2dac77499ddd3d5a53177af6e356f26d7be5315997e220a3278308d6ed88a8bb2b213b83be547f79e388cabb0b975a4e4549402c11e41eaa4297e6759a2a2d82bbdda05b8546b46d08610d68ec1b2b6f628495a826cae0ad461301c6902e3fc5fb38a9ef700d139459593f9066b3d299b7a96988e31d2a15fb69cf6169fea6ccd6c9c847a823227da10eed67897bfcedeb491457f5777ef70630679a7335c0135ec9fc52f94432a973bf7c92d78e43d922b834f171b5cac0903e005c649df02b28f6cb3db5034a70d44a4722c2e584b1c8fb3e6421ea4a56d858392050342bb7c464f1b81e812f55126bde027197adbaa70d20dc756bde3d7fa556b3dafaec750ca9c6dbfef43936ac8c3eaebaf033\",\"hmac\":\"53d56d3bcd5d8ef2b67b2c8c3efba88edd4d227b3d401a568793502f943a27b4\",\"iv\":\"2c808cbf99020864f4a4ff36bf13dd6e\"}";
const CONFIRM_CONNECTION_PAYLOAD = "{\"data\":\"bd96dec8f2b3d5bb958b95e77c94777187a5c8eac49210184e258143d901453647b511032187e7988354b326f10d39caf3999c12dbf8090cbd4195e28aa1640d63e4a35d5da15f250070b5752ddf57f1980420a9fff4c176887e88b07275637406e14465792013e24b818295485ed3b128ec2ba686f984389ccf8de8dab103ce37acbab78b94033e58de6f7f1058282834ff8a8fe0ddff5eb33f8eaa1adb65242236d9049a311490a4b4379b51898bbcc026daefef1906b48ac6e62cc0ba6a49b8af04c4269a0eca65c572c256c33b11176976721289ca514948386b60963324eadddc05ccfcd1771bf0ef551c454efcf58d9a8d2114f93a97c00a5eedef0febcb06eb6425fa2ce1cf0d2fa23d1cac0fe924d87c30fa766bbbbd325052517c82e62390bb66f0315684d22583c6474508b32a7cd007360e97d8a9bfaf696ea68b8c9cb01123bbefbfb294db4926e92cf1f7298cbea228af5cdeb7bb18b359d8df4e7d9bdb754ece06b4ad1d3a3bc7cef7f153a69af47d79851495c395211fb7cdc7047947143f762937e36826d2681f33793111774d9aaaa6582a9bcbc5394f3fe40cebe4ce0a263f8f54c0901d84d355\",\"hmac\":\"58eb8ed1e67c19c334d45f4e32f7601ed55da8c8f21ba954f82a01cf30594705\",\"iv\":\"7ed238a4dc623c49ce3112fb8a973cba\"}";

const SEND_TX_PAYLOAD = "{\"data\":\"4a65e4bb49565bdcc326365d5c0e2db5dceb37ab29f9f423eeaf7e0ded0b92e0ea2adb5c75692b644c9072f3fea0a1657351986678faadfbbd55ef6c6d74d3268ae83769c94e0ac6e77425930dee7951e727ba70afdb091894ed85f41168025dd512e857fa9d8c589bb4ead030cb3734453f42404f2fea17d49d1327ed5a274c0ea0bc30e761c62708bc14ef2c6fe960fc31763cf1e356ffead744bb5fdbd2f9785a85b8b2a01f3ec62756f0c8bf1ec000de8aaf7d09720d252c2a0a5492693638feb99d4a9924178cc224448c298c67c0822f184e61e398b9397847893d5423907a9409fcac4faec427cd67c0c023ae5bb41c3802935a8120cab7f1d521cfd27669ebce7b1401dacba76575eb95c7c4\",\"hmac\":\"9f535249351da6323104d97e680c5df259768aff718f8952810eb34407c96bc7\",\"iv\":\"8ee50886706bd88f8106fecc93c855e3\"}";
const SENT_TX_PAYLOAD = "{\"data\":\"1826e47e22eb933f5beed0796d62137be6200f18fa278314ed8090cfc9c4fbe063bc079fcd406dd4c1b72821fa1e0efdc4a4776bceea279f1b9cc4b019a8fd2f1dff18e4a3f74a1d281b42bc94aba187f8dfdfbd964edf9c96d738192a68dd69f9fa430dc2cd57ae392e53ba0fe6958e\",\"hmac\":\"ab86d6953ef1a70996dc6ffeaa1ac10f6f3fc98a1eed4784d6837607ed6688a6\",\"iv\":\"cba85757305f520a02a58fccdee3fd81\"}";

const generateConnectionMessages = () => {
  const topic1 = generateRandomTopic()
  const topic2 = generateRandomTopic()
  const topic3 = generateRandomTopic()

  const {pub: pub1, sub: sub1, ack: ack1} = genertePubSubMessages(topic1, CONNECTION_PAYLOAD)
  const {pub: pub2, sub: sub2, ack: ack2} = genertePubSubMessages(topic2)
  const {pub: pub3, sub: sub3, ack: ack3} = genertePubSubMessages(topic3, CONFIRM_CONNECTION_PAYLOAD)

 function * generateDAPPConnectionMessages () {
  //  publish to topic 1
  yield pub1

  // subscribe to topic 2
  yield sub2

  // in response to approve connection
  yield ack2
 }

 function * generateWalletConnectionMessages () {
  //  subscribe to topic 1
  yield sub1

  // subscribe to topic 3
  yield sub3

  // in response to request connection
  yield ack1

  // confirm connection
  yield pub2;
 }

 function * generateDAPPSendTxMessages () {
   // publish to topic 3
   yield ({...pub3, payload: SEND_TX_PAYLOAD})

   // in response to Confirm TX from wallet
   yield ack2
 }

 function * generateWalletSendTxMessages () {
   // in response to Send TX from dapp
   yield ack3

   // in response to Confirm TX from wallet
   yield ({...pub2, payload: SENT_TX_PAYLOAD})
 }

 const DAPConnectionGen = generateDAPPConnectionMessages()
 const WalletConnectionGen = generateWalletConnectionMessages()
 const DAPPTxGen = generateDAPPSendTxMessages()
 const WalletTxGen = generateWalletSendTxMessages()

 let dappGenS = [DAPConnectionGen, DAPPTxGen]
 let walletGenS = [WalletConnectionGen, WalletTxGen]

 const getNextMessage = (userInfo) => {
    const isDapp = userInfo.role === "dapp"
    const message = isDapp ? dappGenS[0]?.next() : walletGenS[0]?.next()

    if (!message) return null

    if (message.done) {
      if (isDapp) dappGenS.shift()
      else walletGenS.shift()
    }

    return message.value
 }

 return getNextMessage
}

module.exports = { generateConnectionMessages }