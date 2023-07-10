import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/MasterData/CategoryValidator';

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const categories = await Category.query().orderBy("id",'asc')

    const datas:{}[]=[]
    categories.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['code']= element.code
      row['name']= element.name
      row['description']= element.description
      row['status']= element.status ? {color:'green',text:'Aktif'}:{color:'red',text:"Tidak Aktif"}
      datas.push(row)

    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {code, name, description,status}= request.all()

    await request.validate(CategoryValidator)

    try {
      const category = new Category
      category.code = code
      category.name = name
      category.description= description
      category.status = status
      await category.save()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses tambah kategori berhasil..!",
        data: category.dataview
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., tergadi kesalahan",
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params

    const category = await Category.findBy("uuid",id)

    return category?.datarecord
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const{code, name, description,status}= request.all()

    await request.validate(CategoryValidator)

    try {
      const category = await Category.findBy("uuid",id)
      category?.merge({
        code:code,
        name:name,
        description:description,
        status:status,
      })
      await category?.save()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses ubah data berhasik..!",
        data: category?.dataview
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success:false,
        message:"Opps..., terjadi kesalahan..! ",
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const category = await Category.findBy("uuid",id)
      await category?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        message:"Proses hapus data kategori berhasil",
        data:{
          id:id
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:200,
        success:false,
        message:'Opps..., terjadi kesalahan',
        errors:error
      })
    }
  }

  public async combo(){
    const model = await Category.query().orderBy("code",'asc')

    const datas:{}[]=[]

    model.forEach(element => {
      const row = {}
      row['value']= element.uuid,
      row['text'] = element.name
      datas.push(row)
    });

    return datas;
  }
}
