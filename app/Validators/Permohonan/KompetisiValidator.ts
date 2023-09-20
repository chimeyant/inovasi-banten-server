import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class KompetisiValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    kompetisi_uuid: schema.string(),
    name:schema.string(),
    kelompok: schema.string(),
    jenis_uuid: schema.string(),
    inisiator: schema.string(),
    bentuk_uuid:schema.string(),
    tahapan:schema.string(),
    ringkasan:schema.string({},[rules.maxLength(300)]),
    latar_belakang: schema.string({},[rules.maxLength(300)]),
    kebaruan:schema.string({},[rules.maxLength(300)]),
    implementasi:schema.string({},[rules.maxLength(300)]),
    signifikansi:schema.string({},[rules.maxLength(300)]),
    adaptabilitas:schema.string({},[rules.maxLength(300)]),
    sumber_daya: schema.string({},[rules.maxLength(300)]),
    strategi_keberlanjutan: schema.string({},[rules.maxLength(300)]),
    inovator_nama: schema.string(),
    inovator_telp:schema.string({},[rules.minLength(9), rules.maxLength(14)]),
    regency_code: schema.string(),
    district_code: schema.string(),
    village_code: schema.string(),

  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'kompetisi.required': "Kompetisi wajib dipilih...!",
    "name.required":"Judul inovasi wajib diisi..!",
    "kelompok.required":"Kelompok wajib dipilih..!",
    "jenis_uuid.required":"Jenis Inovasi wajib dipilih",
    "inisiator.required":"Inisiator wajib dipilih",
    "bentuk_uuid.required":"Bentuk wajib dipilih",
    "tahapan.required":"Tahapan wajib dipilih",
    "ringkasan.required":"Ringkasan tidak boleh kosong",
    "ringkasan.maxLength":"Ringkasan maksimal 300 Karakter",
    "latar_belakang.required":"Latar belakang tidak boleh kosong",
    "kebaruan.required":"Kebaruan tidak boleh kosong",
    "implementasi.required":"Implementasi tidak boleh kosong",
    "signifikansi.required":"Siginifikansi tidak boleh kosong",
    "adaptabilitas.required":"Adaptabilitas tidak boleh kosong",
    "sumber_daya.required":"Sumber daya tidak boleh kosong",
    "strategi_keberlanjutan.required":"Startegi Keberlanjutan tidak boleh kosong",
    "inovator_nama.required":"Nama Inovator tidak boleh kosong",
    "inovator_telp.required":"Nomor Telpon Inovator Tidak Boleh Kosong",
    "inovator_telp.minLength":"Nomor telpon tidak benar",
    "inovator_telp.maxLength":"Nomor telpon tidak benar",
    "regency_code.required":"Kabupaten wajib dipilih",
    "district_code.required":"Kecamatan wajib dipilih ",
    "village_code.required":"Desa wajib dipilih"
  }
}
