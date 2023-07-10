import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GroupDatum from 'App/Models/GroupDatum'
import GroupDatumValidator from 'App/Validators/MasterData/GroupDatumValidator';
import GroupData from 'Database/migrations/1676889365175_group_data';

export default class GroupDataController {
  public async index({}: HttpContextContract) {
    const groups = await GroupDatum.query().orderBy("id",'asc')

    const datas:{}[] = []
    groups.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name}= request.all()

    await request.validate(GroupDatumValidator)

    try {
      const group  = new GroupDatum
      group.name = name
      await group.save()

      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses tambah data group berhasil..!",
        data: group.dataview
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan ",
        errors: error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const group = await GroupDatum.findBy("uuid",id)

    return group?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const {name}= request.all()

    await request.validate(GroupDatumValidator)

    try {
      const group = await GroupDatum.findBy("uuid",id)
      group?.merge({name})

      await group?.save()

      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses ubah data berhasil..!",
        data:group?.dataview
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan ",
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const group = await GroupDatum.findBy("uuid", id)
      await group?.delete()
      return response.status(200).json({
        success:true,
        code:200,
        message:"Proses hapus data berhasil..!",
        data:{
          data:id
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        message:"Opps..., terjadi kesalahan ",
        errors:error
      })
    }
  }

  public async combo({}:HttpContextContract){
    const groups = await GroupDatum.query().orderBy("id",'asc')

    const datas:{}[]=[]
    groups.forEach(element => {
      const row ={}
      row['text']= element.name
      row['value']= element.uuid
      datas.push(row)
    });

    return datas;
  }
}
