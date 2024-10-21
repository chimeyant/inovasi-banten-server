import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from "App/Models/User"

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        name:"Administrator",
        email:"admin@ants.loc",
        authent: "superadmin",
        password:"!!Ants2023!!",
        tingkat:"0",
      },
      {
        name:"Fadel",
        email:"fadelmuhammad06@gmail.com",
        authent: "superadmin",
        password:"abcdefg",
        tingkat:"0",
      }

    ])
  }
}
