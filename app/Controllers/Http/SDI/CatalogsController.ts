import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from "@ioc:Adonis/Core/Env"
import Catalog from 'App/Models/Catalog'
import { DateTime } from 'luxon'

export default class CatalogsController {
  public async index({response}: HttpContextContract) {

    const data=  {}

    data['@context']='https://project-open-data.cio.gov/v1.1/schema/catalog.jsonld'
    data['@id']= Env.get("BASE_URL")+ "/api/v2/sdi/data.json"
    data['@type']= "dcat:Catalog"
    data['conformsTo']= "https://project-open-data.cio.gov/v1.1/schema",
    data['describedBy']="https://project-open-data.cio.gov/v1.1/schema/catalog.json"

    //generate catalog
    const catalogs = await Catalog.query().preload('organization').orderBy("id",'asc')

    const datasets:{}[]=[]

    catalogs.forEach(element => {
      const row = {}
      row['@type']= "dcat:Dataset"
      row['accessLevel']= "public"
      row['contactPoint']= {
        fn: "Dinas Komunikasi dan Informatika Bidang Statistik Sektoral Provinsi Banten",
        hasMail: "mailto:statistikkominfo@bantenprov.go.id"
      }
      row['distribution'] = [
        {
          '@type': "dcat:Distribution",
          'downloadUrl':element.tablename=='dataset' ? Env.get("BASE_URL")+"/dataset-download-csv/"+ element.refUuid :'' ,
          'mediaType':'text/csv',
          'format':'csv',
          'title': element.title
        },
        {
          '@type': "dcat:Distribution",
          'downloadUrl':element.tablename=='dataset' ? Env.get("BASE_URL")+"/dataset-download-json/"+ element.refUuid :'' ,
          'mediaType':'text/json',
          'format':'json',
          'title': element.title
        }
      ]

      row['indentifier']= element.refUuid
      row['issued']= DateTime.fromISO(element.updatedAt).toFormat('yyyy-mm-dd')

      const keyword = element.tag
      row['keyword']= keyword ? keyword.split(","):''
      row['landingPage']= element.tablename=='dataset'?  Env.get('FRONT_URL')+ "/dataset-detail/"+ element.refUuid : element.tablename=='visualisasi' ? Env.get('FRONT_URL') + "/visualisasi-detail/"+ element.refUuid :element.tablename=='infografik' ? Env.get("FRONT_URL")+ "/infografis-detail/"+ element.refUuid : element.tablename=='videografis' ? Env.get("FRONT_URL")+ "/videografis": element.tablename=='document' ? Env.get('FRONT_URL')+"/dokumen":""
      row['modified']= DateTime.fromISO(element.updatedAt).toFormat('yyyy-mm-dd')
      row['publisher'] = {
        '@type': "org:Organization",
        'name':element.organization.name
      },
      row['title']= element.title,
      row['description']= 'No description provided'

      datasets.push(row)
    });

    data['dataset']= datasets


    return response.status(200).json(data)
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
