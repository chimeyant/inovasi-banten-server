import  Axios  from "axios"
import Env from "@ioc:Adonis/Core/Env"

class Whatsapp {
  public async sendMessage(phone, message){

    const msg = {
      apiKey: Env.get("WA_API_KEY"),
      recieveNumber: phone,
      message:  "*OPENDATA PROV. BANTEN* \r\n\r\n\*PEMBERITAHUAN..!!* \r\n\r\n" + message
    };

    await Axios.post("http://api.senderwa.com/api/v2/send-message", msg);


    //kirim pesan ke petugas

    return true;
  }


}

export default new Whatsapp
