import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CategoryService from "App/Services/MasterData/CategoryService";
import InovationService from "App/Services/Permohonan/InovationService";
import KompetisiValidator from "App/Validators/Permohonan/KompetisiValidator";

export default class InovationsController {
  protected Service = InovationService;
  protected CategorySvc = CategoryService;

  public async index({ auth }: HttpContextContract) {
    const user = auth.user;
    const category = await this.CategorySvc.showByCode("KMP");

    const payload = {
      user: user,
      category: category,
    };

    const result = await InovationService.lists(payload);

    return result;
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    await request.validate(KompetisiValidator);

    const user = auth.user;
    const category = await this.CategorySvc.showByCode("KMP");

    const {
      kompetisi_uuid,
      name,
      jenis_uuid,
      urusan_uuid,
      urusans,
      kelompok,
      inisiator,
      bentuk_uuid,
      waktu_uji,
      waktu_penerapan,
      tahapan,
      youtube,
      surat_pernyataan_implementasi,
      surat_pernyataan_identitas,
      tipe,
      surat_pernyataan_ketersediaan_replikasi,
      ringkasan,
      ringkasan_att,
      latar_belakang,
      latar_belakang_att,
      kebaruan,
      kebaruan_att,
      implementasi,
      implementasi_att,
      signifikansi,
      signifikansi_att,
      adaptabilitas,
      adaptabilitas_att,
      sumber_daya,
      sumber_daya_att,
      strategi_keberlanjutan,
      strategi_keberlanjutan_att,
      inovator_nama,
      inovator_telp,
      inovator_instansi,
      inovator_regency_code,
      foto,
      province_code,
      regency_code,
      district_code,
      village_code,
      address,
      lat,
      lng,
    } = request.all();

    const payload = {
      category_uuid: category?.id,
      tingkat: user?.tingkat,
      user_uuid: user?.id,
      opd_uuid: user?.opdUuid,
      kompetisi_uuid: kompetisi_uuid,
      name: name,
      jenis_uuid: jenis_uuid,
      urusan_uuid: urusan_uuid,
      urusans: urusans,
      kelompok: kelompok,
      inisiator: inisiator,
      bentuk_uuid: bentuk_uuid,
      waktu_uji: waktu_uji,
      waktu_penerapan: waktu_penerapan,
      tahapan: tahapan,
      youtube: youtube,
      surat_pernyataan_implementasi: surat_pernyataan_implementasi,
      surat_pernyataan_identitas: surat_pernyataan_identitas,
      tipe: tipe,
      surat_pernyataan_ketersediaan_replikasi:
        surat_pernyataan_ketersediaan_replikasi,
      ringkasan: ringkasan,
      ringkasan_att: ringkasan_att,
      latar_belakang: latar_belakang,
      latar_belakang_att: latar_belakang_att,
      kebaruan: kebaruan,
      kebaruan_att: kebaruan_att,
      implementasi: implementasi,
      implementasi_att: implementasi_att,
      signifikansi: signifikansi,
      signifikansi_att: signifikansi_att,
      adaptabilitas: adaptabilitas,
      adaptabilitas_att: adaptabilitas_att,
      sumber_daya: sumber_daya,
      sumber_daya_att: sumber_daya_att,
      strategi_keberlanjutan: strategi_keberlanjutan,
      strategi_keberlanjutan_att: strategi_keberlanjutan_att,
      inovator_nama: inovator_nama,
      inovator_telp: inovator_telp,
      inovator_instansi: inovator_instansi,
      inovator_province_code: "36",
      inovator_regency_code: inovator_regency_code,
      foto: foto,
      province_code: province_code,
      regency_code: regency_code,
      district_code: district_code,
      village_code: village_code,
      address: address,
      lat: lat,
      lng: lng,
      status: "0",
    };

    const result = await this.Service.store(payload);

    return response.status(result.code).send(result);
  }

  public async show({ params }: HttpContextContract) {
    const result = await this.Service.show(params.id);

    return result;
  }

  public async edit({}: HttpContextContract) {}

  public async update({
    params,
    request,
    response,
    auth,
  }: HttpContextContract) {
    await request.validate(KompetisiValidator);

    const user = auth.user;
    const category = await this.CategorySvc.showByCode("KMP");

    const {
      kompetisi_uuid,
      name,
      jenis_uuid,
      urusan_uuid,
      urusans,
      kelompok,
      inisiator,
      bentuk_uuid,
      waktu_uji,
      waktu_penerapan,
      tahapan,
      youtube,
      surat_pernyataan_implementasi,
      surat_pernyataan_identitas,
      tipe,
      surat_pernyataan_ketersediaan_replikasi,
      ringkasan,
      ringkasan_att,
      latar_belakang,
      latar_belakang_att,
      kebaruan,
      kebaruan_att,
      implementasi,
      implementasi_att,
      signifikansi,
      signifikansi_att,
      adaptabilitas,
      adaptabilitas_att,
      sumber_daya,
      sumber_daya_att,
      strategi_keberlanjutan,
      strategi_keberlanjutan_att,
      inovator_nama,
      inovator_telp,
      inovator_instansi,
      inovator_regency_code,
      foto,
      province_code,
      regency_code,
      district_code,
      village_code,
      address,
      lat,
      lng,
    } = request.all();

    const payload = {
      category_uuid: category?.id,
      tingkat: user?.tingkat,
      opd_uuid: user?.opdUuid,
      kompetisi_uuid: kompetisi_uuid,
      name: name,
      jenis_uuid: jenis_uuid,
      urusan_uuid: urusan_uuid,
      urusans: urusans,
      kelompok: kelompok,
      inisiator: inisiator,
      bentuk_uuid: bentuk_uuid,
      waktu_uji: waktu_uji,
      waktu_penerapan: waktu_penerapan,
      tahapan: tahapan,
      youtube: youtube,
      surat_pernyataan_implementasi: surat_pernyataan_implementasi,
      surat_pernyataan_identitas: surat_pernyataan_identitas,
      tipe: tipe,
      surat_pernyataan_ketersediaan_replikasi:
        surat_pernyataan_ketersediaan_replikasi,
      ringkasan: ringkasan,
      ringkasan_att: ringkasan_att,
      latar_belakang: latar_belakang,
      latar_belakang_att: latar_belakang_att,
      kebaruan: kebaruan,
      kebaruan_att: kebaruan_att,
      implementasi: implementasi,
      implementasi_att: implementasi_att,
      signifikansi: signifikansi,
      signifikansi_att: signifikansi_att,
      adaptabilitas: adaptabilitas,
      adaptabilitas_att: adaptabilitas_att,
      sumber_daya: sumber_daya,
      sumber_daya_att: sumber_daya_att,
      strategi_keberlanjutan: strategi_keberlanjutan,
      strategi_keberlanjutan_att: strategi_keberlanjutan_att,
      inovator_nama: inovator_nama,
      inovator_telp: inovator_telp,
      inovator_instansi: inovator_instansi,
      inovator_province_code: "36",
      inovator_regency_code: inovator_regency_code,
      foto: foto,
      province_code: province_code,
      regency_code: regency_code,
      district_code: district_code,
      village_code: village_code,
      address: address,
      lat: lat,
      lng: lng,
      user_uuid: user?.id,
      status: "0",
    };

    const result = await this.Service.update(payload, params.id);

    return response.status(result.code).send(result);
  }

  public async destroy({ params, response }: HttpContextContract) {
    const result = await this.Service.delete(params.id);

    return response.status(result.code).send(result);
  }

  public async send({ params, auth, response }: HttpContextContract) {
    const user = auth.user;
    const result = await this.Service.send(params.id, user);

    return response.status(result.code).send(result);
  }

  public async unsend({ params, response, auth }: HttpContextContract) {
    const user = auth.user;
    const result = await this.Service.unsend(params.id, user);

    return response.status(result.code).send(result);
  }
}
