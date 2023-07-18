import  Axios  from "axios"
import Env from "@ioc:Adonis/Core/Env"

class Whatsapp {
  public async sendMessage(recieveNumber, message){

    const data = {
      apiKey: Env.get("WA_API_KEY"),
      recieveNumber: recieveNumber,
      message: message
    }
    await Axios.post("https://api.senderwa.com/api/v2/send-message", data);

    //kirim pesan ke petugas

    return true;
  }


}

export default new Whatsapp
