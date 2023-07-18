import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Regency from 'App/Models/Regency'

export default class RegencySeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Regency.createMany(
      [
        {
          "code": "1101",
          "provinceCode": "11",
          "name": "KABUPATEN SIMEULUE"
        },
        {
          "code": "1102",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH SINGKIL"
        },
        {
          "code": "1103",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH SELATAN"
        },
        {
          "code": "1104",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH TENGGARA"
        },
        {
          "code": "1105",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH TIMUR"
        },
        {
          "code": "1106",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH TENGAH"
        },
        {
          "code": "1107",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH BARAT"
        },
        {
          "code": "1108",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH BESAR"
        },
        {
          "code": "1109",
          "provinceCode": "11",
          "name": "KABUPATEN PIDIE"
        },
        {
          "code": "1110",
          "provinceCode": "11",
          "name": "KABUPATEN BIREUEN"
        },
        {
          "code": "1111",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH UTARA"
        },
        {
          "code": "1112",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH BARAT DAYA"
        },
        {
          "code": "1113",
          "provinceCode": "11",
          "name": "KABUPATEN GAYO LUES"
        },
        {
          "code": "1114",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH TAMIANG"
        },
        {
          "code": "1115",
          "provinceCode": "11",
          "name": "KABUPATEN NAGAN RAYA"
        },
        {
          "code": "1116",
          "provinceCode": "11",
          "name": "KABUPATEN ACEH JAYA"
        },
        {
          "code": "1117",
          "provinceCode": "11",
          "name": "KABUPATEN BENER MERIAH"
        },
        {
          "code": "1118",
          "provinceCode": "11",
          "name": "KABUPATEN PIDIE JAYA"
        },
        {
          "code": "1171",
          "provinceCode": "11",
          "name": "KOTA BANDA ACEH"
        },
        {
          "code": "1172",
          "provinceCode": "11",
          "name": "KOTA SABANG"
        },
        {
          "code": "1173",
          "provinceCode": "11",
          "name": "KOTA LANGSA"
        },
        {
          "code": "1174",
          "provinceCode": "11",
          "name": "KOTA LHOKSEUMAWE"
        },
        {
          "code": "1175",
          "provinceCode": "11",
          "name": "KOTA SUBULUSSALAM"
        },
        {
          "code": "1201",
          "provinceCode": "12",
          "name": "KABUPATEN NIAS"
        },
        {
          "code": "1202",
          "provinceCode": "12",
          "name": "KABUPATEN MANDAILING NATAL"
        },
        {
          "code": "1203",
          "provinceCode": "12",
          "name": "KABUPATEN TAPANULI SELATAN"
        },
        {
          "code": "1204",
          "provinceCode": "12",
          "name": "KABUPATEN TAPANULI TENGAH"
        },
        {
          "code": "1205",
          "provinceCode": "12",
          "name": "KABUPATEN TAPANULI UTARA"
        },
        {
          "code": "1206",
          "provinceCode": "12",
          "name": "KABUPATEN TOBA SAMOSIR"
        },
        {
          "code": "1207",
          "provinceCode": "12",
          "name": "KABUPATEN LABUHAN BATU"
        },
        {
          "code": "1208",
          "provinceCode": "12",
          "name": "KABUPATEN ASAHAN"
        },
        {
          "code": "1209",
          "provinceCode": "12",
          "name": "KABUPATEN SIMALUNGUN"
        },
        {
          "code": "1210",
          "provinceCode": "12",
          "name": "KABUPATEN DAIRI"
        },
        {
          "code": "1211",
          "provinceCode": "12",
          "name": "KABUPATEN KARO"
        },
        {
          "code": "1212",
          "provinceCode": "12",
          "name": "KABUPATEN DELI SERDANG"
        },
        {
          "code": "1213",
          "provinceCode": "12",
          "name": "KABUPATEN LANGKAT"
        },
        {
          "code": "1214",
          "provinceCode": "12",
          "name": "KABUPATEN NIAS SELATAN"
        },
        {
          "code": "1215",
          "provinceCode": "12",
          "name": "KABUPATEN HUMBANG HASUNDUTAN"
        },
        {
          "code": "1216",
          "provinceCode": "12",
          "name": "KABUPATEN PAKPAK BHARAT"
        },
        {
          "code": "1217",
          "provinceCode": "12",
          "name": "KABUPATEN SAMOSIR"
        },
        {
          "code": "1218",
          "provinceCode": "12",
          "name": "KABUPATEN SERDANG BEDAGAI"
        },
        {
          "code": "1219",
          "provinceCode": "12",
          "name": "KABUPATEN BATU BARA"
        },
        {
          "code": "1220",
          "provinceCode": "12",
          "name": "KABUPATEN PADANG LAWAS UTARA"
        },
        {
          "code": "1221",
          "provinceCode": "12",
          "name": "KABUPATEN PADANG LAWAS"
        },
        {
          "code": "1222",
          "provinceCode": "12",
          "name": "KABUPATEN LABUHAN BATU SELATAN"
        },
        {
          "code": "1223",
          "provinceCode": "12",
          "name": "KABUPATEN LABUHAN BATU UTARA"
        },
        {
          "code": "1224",
          "provinceCode": "12",
          "name": "KABUPATEN NIAS UTARA"
        },
        {
          "code": "1225",
          "provinceCode": "12",
          "name": "KABUPATEN NIAS BARAT"
        },
        {
          "code": "1271",
          "provinceCode": "12",
          "name": "KOTA SIBOLGA"
        },
        {
          "code": "1272",
          "provinceCode": "12",
          "name": "KOTA TANJUNG BALAI"
        },
        {
          "code": "1273",
          "provinceCode": "12",
          "name": "KOTA PEMATANG SIANTAR"
        },
        {
          "code": "1274",
          "provinceCode": "12",
          "name": "KOTA TEBING TINGGI"
        },
        {
          "code": "1275",
          "provinceCode": "12",
          "name": "KOTA MEDAN"
        },
        {
          "code": "1276",
          "provinceCode": "12",
          "name": "KOTA BINJAI"
        },
        {
          "code": "1277",
          "provinceCode": "12",
          "name": "KOTA PADANGSIDIMPUAN"
        },
        {
          "code": "1278",
          "provinceCode": "12",
          "name": "KOTA GUNUNGSITOLI"
        },
        {
          "code": "1301",
          "provinceCode": "13",
          "name": "KABUPATEN KEPULAUAN MENTAWAI"
        },
        {
          "code": "1302",
          "provinceCode": "13",
          "name": "KABUPATEN PESISIR SELATAN"
        },
        {
          "code": "1303",
          "provinceCode": "13",
          "name": "KABUPATEN SOLOK"
        },
        {
          "code": "1304",
          "provinceCode": "13",
          "name": "KABUPATEN SIJUNJUNG"
        },
        {
          "code": "1305",
          "provinceCode": "13",
          "name": "KABUPATEN TANAH DATAR"
        },
        {
          "code": "1306",
          "provinceCode": "13",
          "name": "KABUPATEN PADANG PARIAMAN"
        },
        {
          "code": "1307",
          "provinceCode": "13",
          "name": "KABUPATEN AGAM"
        },
        {
          "code": "1308",
          "provinceCode": "13",
          "name": "KABUPATEN LIMA PULUH KOTA"
        },
        {
          "code": "1309",
          "provinceCode": "13",
          "name": "KABUPATEN PASAMAN"
        },
        {
          "code": "1310",
          "provinceCode": "13",
          "name": "KABUPATEN SOLOK SELATAN"
        },
        {
          "code": "1311",
          "provinceCode": "13",
          "name": "KABUPATEN DHARMASRAYA"
        },
        {
          "code": "1312",
          "provinceCode": "13",
          "name": "KABUPATEN PASAMAN BARAT"
        },
        {
          "code": "1371",
          "provinceCode": "13",
          "name": "KOTA PADANG"
        },
        {
          "code": "1372",
          "provinceCode": "13",
          "name": "KOTA SOLOK"
        },
        {
          "code": "1373",
          "provinceCode": "13",
          "name": "KOTA SAWAH LUNTO"
        },
        {
          "code": "1374",
          "provinceCode": "13",
          "name": "KOTA PADANG PANJANG"
        },
        {
          "code": "1375",
          "provinceCode": "13",
          "name": "KOTA BUKITTINGGI"
        },
        {
          "code": "1376",
          "provinceCode": "13",
          "name": "KOTA PAYAKUMBUH"
        },
        {
          "code": "1377",
          "provinceCode": "13",
          "name": "KOTA PARIAMAN"
        },
        {
          "code": "1401",
          "provinceCode": "14",
          "name": "KABUPATEN KUANTAN SINGINGI"
        },
        {
          "code": "1402",
          "provinceCode": "14",
          "name": "KABUPATEN INDRAGIRI HULU"
        },
        {
          "code": "1403",
          "provinceCode": "14",
          "name": "KABUPATEN INDRAGIRI HILIR"
        },
        {
          "code": "1404",
          "provinceCode": "14",
          "name": "KABUPATEN PELALAWAN"
        },
        {
          "code": "1405",
          "provinceCode": "14",
          "name": "KABUPATEN S I A K"
        },
        {
          "code": "1406",
          "provinceCode": "14",
          "name": "KABUPATEN KAMPAR"
        },
        {
          "code": "1407",
          "provinceCode": "14",
          "name": "KABUPATEN ROKAN HULU"
        },
        {
          "code": "1408",
          "provinceCode": "14",
          "name": "KABUPATEN BENGKALIS"
        },
        {
          "code": "1409",
          "provinceCode": "14",
          "name": "KABUPATEN ROKAN HILIR"
        },
        {
          "code": "1410",
          "provinceCode": "14",
          "name": "KABUPATEN KEPULAUAN MERANTI"
        },
        {
          "code": "1471",
          "provinceCode": "14",
          "name": "KOTA PEKANBARU"
        },
        {
          "code": "1473",
          "provinceCode": "14",
          "name": "KOTA D U M A I"
        },
        {
          "code": "1501",
          "provinceCode": "15",
          "name": "KABUPATEN KERINCI"
        },
        {
          "code": "1502",
          "provinceCode": "15",
          "name": "KABUPATEN MERANGIN"
        },
        {
          "code": "1503",
          "provinceCode": "15",
          "name": "KABUPATEN SAROLANGUN"
        },
        {
          "code": "1504",
          "provinceCode": "15",
          "name": "KABUPATEN BATANG HARI"
        },
        {
          "code": "1505",
          "provinceCode": "15",
          "name": "KABUPATEN MUARO JAMBI"
        },
        {
          "code": "1506",
          "provinceCode": "15",
          "name": "KABUPATEN TANJUNG JABUNG TIMUR"
        },
        {
          "code": "1507",
          "provinceCode": "15",
          "name": "KABUPATEN TANJUNG JABUNG BARAT"
        },
        {
          "code": "1508",
          "provinceCode": "15",
          "name": "KABUPATEN TEBO"
        },
        {
          "code": "1509",
          "provinceCode": "15",
          "name": "KABUPATEN BUNGO"
        },
        {
          "code": "1571",
          "provinceCode": "15",
          "name": "KOTA JAMBI"
        },
        {
          "code": "1572",
          "provinceCode": "15",
          "name": "KOTA SUNGAI PENUH"
        },
        {
          "code": "1601",
          "provinceCode": "16",
          "name": "KABUPATEN OGAN KOMERING ULU"
        },
        {
          "code": "1602",
          "provinceCode": "16",
          "name": "KABUPATEN OGAN KOMERING ILIR"
        },
        {
          "code": "1603",
          "provinceCode": "16",
          "name": "KABUPATEN MUARA ENIM"
        },
        {
          "code": "1604",
          "provinceCode": "16",
          "name": "KABUPATEN LAHAT"
        },
        {
          "code": "1605",
          "provinceCode": "16",
          "name": "KABUPATEN MUSI RAWAS"
        },
        {
          "code": "1606",
          "provinceCode": "16",
          "name": "KABUPATEN MUSI BANYUASIN"
        },
        {
          "code": "1607",
          "provinceCode": "16",
          "name": "KABUPATEN BANYU ASIN"
        },
        {
          "code": "1608",
          "provinceCode": "16",
          "name": "KABUPATEN OGAN KOMERING ULU SELATAN"
        },
        {
          "code": "1609",
          "provinceCode": "16",
          "name": "KABUPATEN OGAN KOMERING ULU TIMUR"
        },
        {
          "code": "1610",
          "provinceCode": "16",
          "name": "KABUPATEN OGAN ILIR"
        },
        {
          "code": "1611",
          "provinceCode": "16",
          "name": "KABUPATEN EMPAT LAWANG"
        },
        {
          "code": "1612",
          "provinceCode": "16",
          "name": "KABUPATEN PENUKAL ABAB LEMATANG ILIR"
        },
        {
          "code": "1613",
          "provinceCode": "16",
          "name": "KABUPATEN MUSI RAWAS UTARA"
        },
        {
          "code": "1671",
          "provinceCode": "16",
          "name": "KOTA PALEMBANG"
        },
        {
          "code": "1672",
          "provinceCode": "16",
          "name": "KOTA PRABUMULIH"
        },
        {
          "code": "1673",
          "provinceCode": "16",
          "name": "KOTA PAGAR ALAM"
        },
        {
          "code": "1674",
          "provinceCode": "16",
          "name": "KOTA LUBUKLINGGAU"
        },
        {
          "code": "1701",
          "provinceCode": "17",
          "name": "KABUPATEN BENGKULU SELATAN"
        },
        {
          "code": "1702",
          "provinceCode": "17",
          "name": "KABUPATEN REJANG LEBONG"
        },
        {
          "code": "1703",
          "provinceCode": "17",
          "name": "KABUPATEN BENGKULU UTARA"
        },
        {
          "code": "1704",
          "provinceCode": "17",
          "name": "KABUPATEN KAUR"
        },
        {
          "code": "1705",
          "provinceCode": "17",
          "name": "KABUPATEN SELUMA"
        },
        {
          "code": "1706",
          "provinceCode": "17",
          "name": "KABUPATEN MUKOMUKO"
        },
        {
          "code": "1707",
          "provinceCode": "17",
          "name": "KABUPATEN LEBONG"
        },
        {
          "code": "1708",
          "provinceCode": "17",
          "name": "KABUPATEN KEPAHIANG"
        },
        {
          "code": "1709",
          "provinceCode": "17",
          "name": "KABUPATEN BENGKULU TENGAH"
        },
        {
          "code": "1771",
          "provinceCode": "17",
          "name": "KOTA BENGKULU"
        },
        {
          "code": "1801",
          "provinceCode": "18",
          "name": "KABUPATEN LAMPUNG BARAT"
        },
        {
          "code": "1802",
          "provinceCode": "18",
          "name": "KABUPATEN TANGGAMUS"
        },
        {
          "code": "1803",
          "provinceCode": "18",
          "name": "KABUPATEN LAMPUNG SELATAN"
        },
        {
          "code": "1804",
          "provinceCode": "18",
          "name": "KABUPATEN LAMPUNG TIMUR"
        },
        {
          "code": "1805",
          "provinceCode": "18",
          "name": "KABUPATEN LAMPUNG TENGAH"
        },
        {
          "code": "1806",
          "provinceCode": "18",
          "name": "KABUPATEN LAMPUNG UTARA"
        },
        {
          "code": "1807",
          "provinceCode": "18",
          "name": "KABUPATEN WAY KANAN"
        },
        {
          "code": "1808",
          "provinceCode": "18",
          "name": "KABUPATEN TULANGBAWANG"
        },
        {
          "code": "1809",
          "provinceCode": "18",
          "name": "KABUPATEN PESAWARAN"
        },
        {
          "code": "1810",
          "provinceCode": "18",
          "name": "KABUPATEN PRINGSEWU"
        },
        {
          "code": "1811",
          "provinceCode": "18",
          "name": "KABUPATEN MESUJI"
        },
        {
          "code": "1812",
          "provinceCode": "18",
          "name": "KABUPATEN TULANG BAWANG BARAT"
        },
        {
          "code": "1813",
          "provinceCode": "18",
          "name": "KABUPATEN PESISIR BARAT"
        },
        {
          "code": "1871",
          "provinceCode": "18",
          "name": "KOTA BANDAR LAMPUNG"
        },
        {
          "code": "1872",
          "provinceCode": "18",
          "name": "KOTA METRO"
        },
        {
          "code": "1901",
          "provinceCode": "19",
          "name": "KABUPATEN BANGKA"
        },
        {
          "code": "1902",
          "provinceCode": "19",
          "name": "KABUPATEN BELITUNG"
        },
        {
          "code": "1903",
          "provinceCode": "19",
          "name": "KABUPATEN BANGKA BARAT"
        },
        {
          "code": "1904",
          "provinceCode": "19",
          "name": "KABUPATEN BANGKA TENGAH"
        },
        {
          "code": "1905",
          "provinceCode": "19",
          "name": "KABUPATEN BANGKA SELATAN"
        },
        {
          "code": "1906",
          "provinceCode": "19",
          "name": "KABUPATEN BELITUNG TIMUR"
        },
        {
          "code": "1971",
          "provinceCode": "19",
          "name": "KOTA PANGKAL PINANG"
        },
        {
          "code": "2101",
          "provinceCode": "21",
          "name": "KABUPATEN KARIMUN"
        },
        {
          "code": "2102",
          "provinceCode": "21",
          "name": "KABUPATEN BINTAN"
        },
        {
          "code": "2103",
          "provinceCode": "21",
          "name": "KABUPATEN NATUNA"
        },
        {
          "code": "2104",
          "provinceCode": "21",
          "name": "KABUPATEN LINGGA"
        },
        {
          "code": "2105",
          "provinceCode": "21",
          "name": "KABUPATEN KEPULAUAN ANAMBAS"
        },
        {
          "code": "2171",
          "provinceCode": "21",
          "name": "KOTA B A T A M"
        },
        {
          "code": "2172",
          "provinceCode": "21",
          "name": "KOTA TANJUNG PINANG"
        },
        {
          "code": "3101",
          "provinceCode": "31",
          "name": "KABUPATEN KEPULAUAN SERIBU"
        },
        {
          "code": "3171",
          "provinceCode": "31",
          "name": "KOTA JAKARTA SELATAN"
        },
        {
          "code": "3172",
          "provinceCode": "31",
          "name": "KOTA JAKARTA TIMUR"
        },
        {
          "code": "3173",
          "provinceCode": "31",
          "name": "KOTA JAKARTA PUSAT"
        },
        {
          "code": "3174",
          "provinceCode": "31",
          "name": "KOTA JAKARTA BARAT"
        },
        {
          "code": "3175",
          "provinceCode": "31",
          "name": "KOTA JAKARTA UTARA"
        },
        {
          "code": "3201",
          "provinceCode": "32",
          "name": "KABUPATEN BOGOR"
        },
        {
          "code": "3202",
          "provinceCode": "32",
          "name": "KABUPATEN SUKABUMI"
        },
        {
          "code": "3203",
          "provinceCode": "32",
          "name": "KABUPATEN CIANJUR"
        },
        {
          "code": "3204",
          "provinceCode": "32",
          "name": "KABUPATEN BANDUNG"
        },
        {
          "code": "3205",
          "provinceCode": "32",
          "name": "KABUPATEN GARUT"
        },
        {
          "code": "3206",
          "provinceCode": "32",
          "name": "KABUPATEN TASIKMALAYA"
        },
        {
          "code": "3207",
          "provinceCode": "32",
          "name": "KABUPATEN CIAMIS"
        },
        {
          "code": "3208",
          "provinceCode": "32",
          "name": "KABUPATEN KUNINGAN"
        },
        {
          "code": "3209",
          "provinceCode": "32",
          "name": "KABUPATEN CIREBON"
        },
        {
          "code": "3210",
          "provinceCode": "32",
          "name": "KABUPATEN MAJALENGKA"
        },
        {
          "code": "3211",
          "provinceCode": "32",
          "name": "KABUPATEN SUMEDANG"
        },
        {
          "code": "3212",
          "provinceCode": "32",
          "name": "KABUPATEN INDRAMAYU"
        },
        {
          "code": "3213",
          "provinceCode": "32",
          "name": "KABUPATEN SUBANG"
        },
        {
          "code": "3214",
          "provinceCode": "32",
          "name": "KABUPATEN PURWAKARTA"
        },
        {
          "code": "3215",
          "provinceCode": "32",
          "name": "KABUPATEN KARAWANG"
        },
        {
          "code": "3216",
          "provinceCode": "32",
          "name": "KABUPATEN BEKASI"
        },
        {
          "code": "3217",
          "provinceCode": "32",
          "name": "KABUPATEN BANDUNG BARAT"
        },
        {
          "code": "3218",
          "provinceCode": "32",
          "name": "KABUPATEN PANGANDARAN"
        },
        {
          "code": "3271",
          "provinceCode": "32",
          "name": "KOTA BOGOR"
        },
        {
          "code": "3272",
          "provinceCode": "32",
          "name": "KOTA SUKABUMI"
        },
        {
          "code": "3273",
          "provinceCode": "32",
          "name": "KOTA BANDUNG"
        },
        {
          "code": "3274",
          "provinceCode": "32",
          "name": "KOTA CIREBON"
        },
        {
          "code": "3275",
          "provinceCode": "32",
          "name": "KOTA BEKASI"
        },
        {
          "code": "3276",
          "provinceCode": "32",
          "name": "KOTA DEPOK"
        },
        {
          "code": "3277",
          "provinceCode": "32",
          "name": "KOTA CIMAHI"
        },
        {
          "code": "3278",
          "provinceCode": "32",
          "name": "KOTA TASIKMALAYA"
        },
        {
          "code": "3279",
          "provinceCode": "32",
          "name": "KOTA BANJAR"
        },
        {
          "code": "3301",
          "provinceCode": "33",
          "name": "KABUPATEN CILACAP"
        },
        {
          "code": "3302",
          "provinceCode": "33",
          "name": "KABUPATEN BANYUMAS"
        },
        {
          "code": "3303",
          "provinceCode": "33",
          "name": "KABUPATEN PURBALINGGA"
        },
        {
          "code": "3304",
          "provinceCode": "33",
          "name": "KABUPATEN BANJARNEGARA"
        },
        {
          "code": "3305",
          "provinceCode": "33",
          "name": "KABUPATEN KEBUMEN"
        },
        {
          "code": "3306",
          "provinceCode": "33",
          "name": "KABUPATEN PURWOREJO"
        },
        {
          "code": "3307",
          "provinceCode": "33",
          "name": "KABUPATEN WONOSOBO"
        },
        {
          "code": "3308",
          "provinceCode": "33",
          "name": "KABUPATEN MAGELANG"
        },
        {
          "code": "3309",
          "provinceCode": "33",
          "name": "KABUPATEN BOYOLALI"
        },
        {
          "code": "3310",
          "provinceCode": "33",
          "name": "KABUPATEN KLATEN"
        },
        {
          "code": "3311",
          "provinceCode": "33",
          "name": "KABUPATEN SUKOHARJO"
        },
        {
          "code": "3312",
          "provinceCode": "33",
          "name": "KABUPATEN WONOGIRI"
        },
        {
          "code": "3313",
          "provinceCode": "33",
          "name": "KABUPATEN KARANGANYAR"
        },
        {
          "code": "3314",
          "provinceCode": "33",
          "name": "KABUPATEN SRAGEN"
        },
        {
          "code": "3315",
          "provinceCode": "33",
          "name": "KABUPATEN GROBOGAN"
        },
        {
          "code": "3316",
          "provinceCode": "33",
          "name": "KABUPATEN BLORA"
        },
        {
          "code": "3317",
          "provinceCode": "33",
          "name": "KABUPATEN REMBANG"
        },
        {
          "code": "3318",
          "provinceCode": "33",
          "name": "KABUPATEN PATI"
        },
        {
          "code": "3319",
          "provinceCode": "33",
          "name": "KABUPATEN KUDUS"
        },
        {
          "code": "3320",
          "provinceCode": "33",
          "name": "KABUPATEN JEPARA"
        },
        {
          "code": "3321",
          "provinceCode": "33",
          "name": "KABUPATEN DEMAK"
        },
        {
          "code": "3322",
          "provinceCode": "33",
          "name": "KABUPATEN SEMARANG"
        },
        {
          "code": "3323",
          "provinceCode": "33",
          "name": "KABUPATEN TEMANGGUNG"
        },
        {
          "code": "3324",
          "provinceCode": "33",
          "name": "KABUPATEN KENDAL"
        },
        {
          "code": "3325",
          "provinceCode": "33",
          "name": "KABUPATEN BATANG"
        },
        {
          "code": "3326",
          "provinceCode": "33",
          "name": "KABUPATEN PEKALONGAN"
        },
        {
          "code": "3327",
          "provinceCode": "33",
          "name": "KABUPATEN PEMALANG"
        },
        {
          "code": "3328",
          "provinceCode": "33",
          "name": "KABUPATEN TEGAL"
        },
        {
          "code": "3329",
          "provinceCode": "33",
          "name": "KABUPATEN BREBES"
        },
        {
          "code": "3371",
          "provinceCode": "33",
          "name": "KOTA MAGELANG"
        },
        {
          "code": "3372",
          "provinceCode": "33",
          "name": "KOTA SURAKARTA"
        },
        {
          "code": "3373",
          "provinceCode": "33",
          "name": "KOTA SALATIGA"
        },
        {
          "code": "3374",
          "provinceCode": "33",
          "name": "KOTA SEMARANG"
        },
        {
          "code": "3375",
          "provinceCode": "33",
          "name": "KOTA PEKALONGAN"
        },
        {
          "code": "3376",
          "provinceCode": "33",
          "name": "KOTA TEGAL"
        },
        {
          "code": "3401",
          "provinceCode": "34",
          "name": "KABUPATEN KULON PROGO"
        },
        {
          "code": "3402",
          "provinceCode": "34",
          "name": "KABUPATEN BANTUL"
        },
        {
          "code": "3403",
          "provinceCode": "34",
          "name": "KABUPATEN GUNUNG KIDUL"
        },
        {
          "code": "3404",
          "provinceCode": "34",
          "name": "KABUPATEN SLEMAN"
        },
        {
          "code": "3471",
          "provinceCode": "34",
          "name": "KOTA YOGYAKARTA"
        },
        {
          "code": "3501",
          "provinceCode": "35",
          "name": "KABUPATEN PACITAN"
        },
        {
          "code": "3502",
          "provinceCode": "35",
          "name": "KABUPATEN PONOROGO"
        },
        {
          "code": "3503",
          "provinceCode": "35",
          "name": "KABUPATEN TRENGGALEK"
        },
        {
          "code": "3504",
          "provinceCode": "35",
          "name": "KABUPATEN TULUNGAGUNG"
        },
        {
          "code": "3505",
          "provinceCode": "35",
          "name": "KABUPATEN BLITAR"
        },
        {
          "code": "3506",
          "provinceCode": "35",
          "name": "KABUPATEN KEDIRI"
        },
        {
          "code": "3507",
          "provinceCode": "35",
          "name": "KABUPATEN MALANG"
        },
        {
          "code": "3508",
          "provinceCode": "35",
          "name": "KABUPATEN LUMAJANG"
        },
        {
          "code": "3509",
          "provinceCode": "35",
          "name": "KABUPATEN JEMBER"
        },
        {
          "code": "3510",
          "provinceCode": "35",
          "name": "KABUPATEN BANYUWANGI"
        },
        {
          "code": "3511",
          "provinceCode": "35",
          "name": "KABUPATEN BONDOWOSO"
        },
        {
          "code": "3512",
          "provinceCode": "35",
          "name": "KABUPATEN SITUBONDO"
        },
        {
          "code": "3513",
          "provinceCode": "35",
          "name": "KABUPATEN PROBOLINGGO"
        },
        {
          "code": "3514",
          "provinceCode": "35",
          "name": "KABUPATEN PASURUAN"
        },
        {
          "code": "3515",
          "provinceCode": "35",
          "name": "KABUPATEN SIDOARJO"
        },
        {
          "code": "3516",
          "provinceCode": "35",
          "name": "KABUPATEN MOJOKERTO"
        },
        {
          "code": "3517",
          "provinceCode": "35",
          "name": "KABUPATEN JOMBANG"
        },
        {
          "code": "3518",
          "provinceCode": "35",
          "name": "KABUPATEN NGANJUK"
        },
        {
          "code": "3519",
          "provinceCode": "35",
          "name": "KABUPATEN MADIUN"
        },
        {
          "code": "3520",
          "provinceCode": "35",
          "name": "KABUPATEN MAGETAN"
        },
        {
          "code": "3521",
          "provinceCode": "35",
          "name": "KABUPATEN NGAWI"
        },
        {
          "code": "3522",
          "provinceCode": "35",
          "name": "KABUPATEN BOJONEGORO"
        },
        {
          "code": "3523",
          "provinceCode": "35",
          "name": "KABUPATEN TUBAN"
        },
        {
          "code": "3524",
          "provinceCode": "35",
          "name": "KABUPATEN LAMONGAN"
        },
        {
          "code": "3525",
          "provinceCode": "35",
          "name": "KABUPATEN GRESIK"
        },
        {
          "code": "3526",
          "provinceCode": "35",
          "name": "KABUPATEN BANGKALAN"
        },
        {
          "code": "3527",
          "provinceCode": "35",
          "name": "KABUPATEN SAMPANG"
        },
        {
          "code": "3528",
          "provinceCode": "35",
          "name": "KABUPATEN PAMEKASAN"
        },
        {
          "code": "3529",
          "provinceCode": "35",
          "name": "KABUPATEN SUMENEP"
        },
        {
          "code": "3571",
          "provinceCode": "35",
          "name": "KOTA KEDIRI"
        },
        {
          "code": "3572",
          "provinceCode": "35",
          "name": "KOTA BLITAR"
        },
        {
          "code": "3573",
          "provinceCode": "35",
          "name": "KOTA MALANG"
        },
        {
          "code": "3574",
          "provinceCode": "35",
          "name": "KOTA PROBOLINGGO"
        },
        {
          "code": "3575",
          "provinceCode": "35",
          "name": "KOTA PASURUAN"
        },
        {
          "code": "3576",
          "provinceCode": "35",
          "name": "KOTA MOJOKERTO"
        },
        {
          "code": "3577",
          "provinceCode": "35",
          "name": "KOTA MADIUN"
        },
        {
          "code": "3578",
          "provinceCode": "35",
          "name": "KOTA SURABAYA"
        },
        {
          "code": "3579",
          "provinceCode": "35",
          "name": "KOTA BATU"
        },
        {
          "code": "3601",
          "provinceCode": "36",
          "name": "KABUPATEN PANDEGLANG"
        },
        {
          "code": "3602",
          "provinceCode": "36",
          "name": "KABUPATEN LEBAK"
        },
        {
          "code": "3603",
          "provinceCode": "36",
          "name": "KABUPATEN TANGERANG"
        },
        {
          "code": "3604",
          "provinceCode": "36",
          "name": "KABUPATEN SERANG"
        },
        {
          "code": "3671",
          "provinceCode": "36",
          "name": "KOTA TANGERANG"
        },
        {
          "code": "3672",
          "provinceCode": "36",
          "name": "KOTA CILEGON"
        },
        {
          "code": "3673",
          "provinceCode": "36",
          "name": "KOTA SERANG"
        },
        {
          "code": "3674",
          "provinceCode": "36",
          "name": "KOTA TANGERANG SELATAN"
        },
        {
          "code": "5101",
          "provinceCode": "51",
          "name": "KABUPATEN JEMBRANA"
        },
        {
          "code": "5102",
          "provinceCode": "51",
          "name": "KABUPATEN TABANAN"
        },
        {
          "code": "5103",
          "provinceCode": "51",
          "name": "KABUPATEN BADUNG"
        },
        {
          "code": "5104",
          "provinceCode": "51",
          "name": "KABUPATEN GIANYAR"
        },
        {
          "code": "5105",
          "provinceCode": "51",
          "name": "KABUPATEN KLUNGKUNG"
        },
        {
          "code": "5106",
          "provinceCode": "51",
          "name": "KABUPATEN BANGLI"
        },
        {
          "code": "5107",
          "provinceCode": "51",
          "name": "KABUPATEN KARANG ASEM"
        },
        {
          "code": "5108",
          "provinceCode": "51",
          "name": "KABUPATEN BULELENG"
        },
        {
          "code": "5171",
          "provinceCode": "51",
          "name": "KOTA DENPASAR"
        },
        {
          "code": "5201",
          "provinceCode": "52",
          "name": "KABUPATEN LOMBOK BARAT"
        },
        {
          "code": "5202",
          "provinceCode": "52",
          "name": "KABUPATEN LOMBOK TENGAH"
        },
        {
          "code": "5203",
          "provinceCode": "52",
          "name": "KABUPATEN LOMBOK TIMUR"
        },
        {
          "code": "5204",
          "provinceCode": "52",
          "name": "KABUPATEN SUMBAWA"
        },
        {
          "code": "5205",
          "provinceCode": "52",
          "name": "KABUPATEN DOMPU"
        },
        {
          "code": "5206",
          "provinceCode": "52",
          "name": "KABUPATEN BIMA"
        },
        {
          "code": "5207",
          "provinceCode": "52",
          "name": "KABUPATEN SUMBAWA BARAT"
        },
        {
          "code": "5208",
          "provinceCode": "52",
          "name": "KABUPATEN LOMBOK UTARA"
        },
        {
          "code": "5271",
          "provinceCode": "52",
          "name": "KOTA MATARAM"
        },
        {
          "code": "5272",
          "provinceCode": "52",
          "name": "KOTA BIMA"
        },
        {
          "code": "5301",
          "provinceCode": "53",
          "name": "KABUPATEN SUMBA BARAT"
        },
        {
          "code": "5302",
          "provinceCode": "53",
          "name": "KABUPATEN SUMBA TIMUR"
        },
        {
          "code": "5303",
          "provinceCode": "53",
          "name": "KABUPATEN KUPANG"
        },
        {
          "code": "5304",
          "provinceCode": "53",
          "name": "KABUPATEN TIMOR TENGAH SELATAN"
        },
        {
          "code": "5305",
          "provinceCode": "53",
          "name": "KABUPATEN TIMOR TENGAH UTARA"
        },
        {
          "code": "5306",
          "provinceCode": "53",
          "name": "KABUPATEN BELU"
        },
        {
          "code": "5307",
          "provinceCode": "53",
          "name": "KABUPATEN ALOR"
        },
        {
          "code": "5308",
          "provinceCode": "53",
          "name": "KABUPATEN LEMBATA"
        },
        {
          "code": "5309",
          "provinceCode": "53",
          "name": "KABUPATEN FLORES TIMUR"
        },
        {
          "code": "5310",
          "provinceCode": "53",
          "name": "KABUPATEN SIKKA"
        },
        {
          "code": "5311",
          "provinceCode": "53",
          "name": "KABUPATEN ENDE"
        },
        {
          "code": "5312",
          "provinceCode": "53",
          "name": "KABUPATEN NGADA"
        },
        {
          "code": "5313",
          "provinceCode": "53",
          "name": "KABUPATEN MANGGARAI"
        },
        {
          "code": "5314",
          "provinceCode": "53",
          "name": "KABUPATEN ROTE NDAO"
        },
        {
          "code": "5315",
          "provinceCode": "53",
          "name": "KABUPATEN MANGGARAI BARAT"
        },
        {
          "code": "5316",
          "provinceCode": "53",
          "name": "KABUPATEN SUMBA TENGAH"
        },
        {
          "code": "5317",
          "provinceCode": "53",
          "name": "KABUPATEN SUMBA BARAT DAYA"
        },
        {
          "code": "5318",
          "provinceCode": "53",
          "name": "KABUPATEN NAGEKEO"
        },
        {
          "code": "5319",
          "provinceCode": "53",
          "name": "KABUPATEN MANGGARAI TIMUR"
        },
        {
          "code": "5320",
          "provinceCode": "53",
          "name": "KABUPATEN SABU RAIJUA"
        },
        {
          "code": "5321",
          "provinceCode": "53",
          "name": "KABUPATEN MALAKA"
        },
        {
          "code": "5371",
          "provinceCode": "53",
          "name": "KOTA KUPANG"
        },
        {
          "code": "6101",
          "provinceCode": "61",
          "name": "KABUPATEN SAMBAS"
        },
        {
          "code": "6102",
          "provinceCode": "61",
          "name": "KABUPATEN BENGKAYANG"
        },
        {
          "code": "6103",
          "provinceCode": "61",
          "name": "KABUPATEN LANDAK"
        },
        {
          "code": "6104",
          "provinceCode": "61",
          "name": "KABUPATEN MEMPAWAH"
        },
        {
          "code": "6105",
          "provinceCode": "61",
          "name": "KABUPATEN SANGGAU"
        },
        {
          "code": "6106",
          "provinceCode": "61",
          "name": "KABUPATEN KETAPANG"
        },
        {
          "code": "6107",
          "provinceCode": "61",
          "name": "KABUPATEN SINTANG"
        },
        {
          "code": "6108",
          "provinceCode": "61",
          "name": "KABUPATEN KAPUAS HULU"
        },
        {
          "code": "6109",
          "provinceCode": "61",
          "name": "KABUPATEN SEKADAU"
        },
        {
          "code": "6110",
          "provinceCode": "61",
          "name": "KABUPATEN MELAWI"
        },
        {
          "code": "6111",
          "provinceCode": "61",
          "name": "KABUPATEN KAYONG UTARA"
        },
        {
          "code": "6112",
          "provinceCode": "61",
          "name": "KABUPATEN KUBU RAYA"
        },
        {
          "code": "6171",
          "provinceCode": "61",
          "name": "KOTA PONTIANAK"
        },
        {
          "code": "6172",
          "provinceCode": "61",
          "name": "KOTA SINGKAWANG"
        },
        {
          "code": "6201",
          "provinceCode": "62",
          "name": "KABUPATEN KOTAWARINGIN BARAT"
        },
        {
          "code": "6202",
          "provinceCode": "62",
          "name": "KABUPATEN KOTAWARINGIN TIMUR"
        },
        {
          "code": "6203",
          "provinceCode": "62",
          "name": "KABUPATEN KAPUAS"
        },
        {
          "code": "6204",
          "provinceCode": "62",
          "name": "KABUPATEN BARITO SELATAN"
        },
        {
          "code": "6205",
          "provinceCode": "62",
          "name": "KABUPATEN BARITO UTARA"
        },
        {
          "code": "6206",
          "provinceCode": "62",
          "name": "KABUPATEN SUKAMARA"
        },
        {
          "code": "6207",
          "provinceCode": "62",
          "name": "KABUPATEN LAMANDAU"
        },
        {
          "code": "6208",
          "provinceCode": "62",
          "name": "KABUPATEN SERUYAN"
        },
        {
          "code": "6209",
          "provinceCode": "62",
          "name": "KABUPATEN KATINGAN"
        },
        {
          "code": "6210",
          "provinceCode": "62",
          "name": "KABUPATEN PULANG PISAU"
        },
        {
          "code": "6211",
          "provinceCode": "62",
          "name": "KABUPATEN GUNUNG MAS"
        },
        {
          "code": "6212",
          "provinceCode": "62",
          "name": "KABUPATEN BARITO TIMUR"
        },
        {
          "code": "6213",
          "provinceCode": "62",
          "name": "KABUPATEN MURUNG RAYA"
        },
        {
          "code": "6271",
          "provinceCode": "62",
          "name": "KOTA PALANGKA RAYA"
        },
        {
          "code": "6301",
          "provinceCode": "63",
          "name": "KABUPATEN TANAH LAUT"
        },
        {
          "code": "6302",
          "provinceCode": "63",
          "name": "KABUPATEN KOTA BARU"
        },
        {
          "code": "6303",
          "provinceCode": "63",
          "name": "KABUPATEN BANJAR"
        },
        {
          "code": "6304",
          "provinceCode": "63",
          "name": "KABUPATEN BARITO KUALA"
        },
        {
          "code": "6305",
          "provinceCode": "63",
          "name": "KABUPATEN TAPIN"
        },
        {
          "code": "6306",
          "provinceCode": "63",
          "name": "KABUPATEN HULU SUNGAI SELATAN"
        },
        {
          "code": "6307",
          "provinceCode": "63",
          "name": "KABUPATEN HULU SUNGAI TENGAH"
        },
        {
          "code": "6308",
          "provinceCode": "63",
          "name": "KABUPATEN HULU SUNGAI UTARA"
        },
        {
          "code": "6309",
          "provinceCode": "63",
          "name": "KABUPATEN TABALONG"
        },
        {
          "code": "6310",
          "provinceCode": "63",
          "name": "KABUPATEN TANAH BUMBU"
        },
        {
          "code": "6311",
          "provinceCode": "63",
          "name": "KABUPATEN BALANGAN"
        },
        {
          "code": "6371",
          "provinceCode": "63",
          "name": "KOTA BANJARMASIN"
        },
        {
          "code": "6372",
          "provinceCode": "63",
          "name": "KOTA BANJAR BARU"
        },
        {
          "code": "6401",
          "provinceCode": "64",
          "name": "KABUPATEN PASER"
        },
        {
          "code": "6402",
          "provinceCode": "64",
          "name": "KABUPATEN KUTAI BARAT"
        },
        {
          "code": "6403",
          "provinceCode": "64",
          "name": "KABUPATEN KUTAI KARTANEGARA"
        },
        {
          "code": "6404",
          "provinceCode": "64",
          "name": "KABUPATEN KUTAI TIMUR"
        },
        {
          "code": "6405",
          "provinceCode": "64",
          "name": "KABUPATEN BERAU"
        },
        {
          "code": "6409",
          "provinceCode": "64",
          "name": "KABUPATEN PENAJAM PASER UTARA"
        },
        {
          "code": "6411",
          "provinceCode": "64",
          "name": "KABUPATEN MAHAKAM HULU"
        },
        {
          "code": "6471",
          "provinceCode": "64",
          "name": "KOTA BALIKPAPAN"
        },
        {
          "code": "6472",
          "provinceCode": "64",
          "name": "KOTA SAMARINDA"
        },
        {
          "code": "6474",
          "provinceCode": "64",
          "name": "KOTA BONTANG"
        },
        {
          "code": "6501",
          "provinceCode": "65",
          "name": "KABUPATEN MALINAU"
        },
        {
          "code": "6502",
          "provinceCode": "65",
          "name": "KABUPATEN BULUNGAN"
        },
        {
          "code": "6503",
          "provinceCode": "65",
          "name": "KABUPATEN TANA TIDUNG"
        },
        {
          "code": "6504",
          "provinceCode": "65",
          "name": "KABUPATEN NUNUKAN"
        },
        {
          "code": "6571",
          "provinceCode": "65",
          "name": "KOTA TARAKAN"
        },
        {
          "code": "7101",
          "provinceCode": "71",
          "name": "KABUPATEN BOLAANG MONGONDOW"
        },
        {
          "code": "7102",
          "provinceCode": "71",
          "name": "KABUPATEN MINAHASA"
        },
        {
          "code": "7103",
          "provinceCode": "71",
          "name": "KABUPATEN KEPULAUAN SANGIHE"
        },
        {
          "code": "7104",
          "provinceCode": "71",
          "name": "KABUPATEN KEPULAUAN TALAUD"
        },
        {
          "code": "7105",
          "provinceCode": "71",
          "name": "KABUPATEN MINAHASA SELATAN"
        },
        {
          "code": "7106",
          "provinceCode": "71",
          "name": "KABUPATEN MINAHASA UTARA"
        },
        {
          "code": "7107",
          "provinceCode": "71",
          "name": "KABUPATEN BOLAANG MONGONDOW UTARA"
        },
        {
          "code": "7108",
          "provinceCode": "71",
          "name": "KABUPATEN SIAU TAGULANDANG BIARO"
        },
        {
          "code": "7109",
          "provinceCode": "71",
          "name": "KABUPATEN MINAHASA TENGGARA"
        },
        {
          "code": "7110",
          "provinceCode": "71",
          "name": "KABUPATEN BOLAANG MONGONDOW SELATAN"
        },
        {
          "code": "7111",
          "provinceCode": "71",
          "name": "KABUPATEN BOLAANG MONGONDOW TIMUR"
        },
        {
          "code": "7171",
          "provinceCode": "71",
          "name": "KOTA MANADO"
        },
        {
          "code": "7172",
          "provinceCode": "71",
          "name": "KOTA BITUNG"
        },
        {
          "code": "7173",
          "provinceCode": "71",
          "name": "KOTA TOMOHON"
        },
        {
          "code": "7174",
          "provinceCode": "71",
          "name": "KOTA KOTAMOBAGU"
        },
        {
          "code": "7201",
          "provinceCode": "72",
          "name": "KABUPATEN BANGGAI KEPULAUAN"
        },
        {
          "code": "7202",
          "provinceCode": "72",
          "name": "KABUPATEN BANGGAI"
        },
        {
          "code": "7203",
          "provinceCode": "72",
          "name": "KABUPATEN MOROWALI"
        },
        {
          "code": "7204",
          "provinceCode": "72",
          "name": "KABUPATEN POSO"
        },
        {
          "code": "7205",
          "provinceCode": "72",
          "name": "KABUPATEN DONGGALA"
        },
        {
          "code": "7206",
          "provinceCode": "72",
          "name": "KABUPATEN TOLI-TOLI"
        },
        {
          "code": "7207",
          "provinceCode": "72",
          "name": "KABUPATEN BUOL"
        },
        {
          "code": "7208",
          "provinceCode": "72",
          "name": "KABUPATEN PARIGI MOUTONG"
        },
        {
          "code": "7209",
          "provinceCode": "72",
          "name": "KABUPATEN TOJO UNA-UNA"
        },
        {
          "code": "7210",
          "provinceCode": "72",
          "name": "KABUPATEN SIGI"
        },
        {
          "code": "7211",
          "provinceCode": "72",
          "name": "KABUPATEN BANGGAI LAUT"
        },
        {
          "code": "7212",
          "provinceCode": "72",
          "name": "KABUPATEN MOROWALI UTARA"
        },
        {
          "code": "7271",
          "provinceCode": "72",
          "name": "KOTA PALU"
        },
        {
          "code": "7301",
          "provinceCode": "73",
          "name": "KABUPATEN KEPULAUAN SELAYAR"
        },
        {
          "code": "7302",
          "provinceCode": "73",
          "name": "KABUPATEN BULUKUMBA"
        },
        {
          "code": "7303",
          "provinceCode": "73",
          "name": "KABUPATEN BANTAENG"
        },
        {
          "code": "7304",
          "provinceCode": "73",
          "name": "KABUPATEN JENEPONTO"
        },
        {
          "code": "7305",
          "provinceCode": "73",
          "name": "KABUPATEN TAKALAR"
        },
        {
          "code": "7306",
          "provinceCode": "73",
          "name": "KABUPATEN GOWA"
        },
        {
          "code": "7307",
          "provinceCode": "73",
          "name": "KABUPATEN SINJAI"
        },
        {
          "code": "7308",
          "provinceCode": "73",
          "name": "KABUPATEN MAROS"
        },
        {
          "code": "7309",
          "provinceCode": "73",
          "name": "KABUPATEN PANGKAJENE DAN KEPULAUAN"
        },
        {
          "code": "7310",
          "provinceCode": "73",
          "name": "KABUPATEN BARRU"
        },
        {
          "code": "7311",
          "provinceCode": "73",
          "name": "KABUPATEN BONE"
        },
        {
          "code": "7312",
          "provinceCode": "73",
          "name": "KABUPATEN SOPPENG"
        },
        {
          "code": "7313",
          "provinceCode": "73",
          "name": "KABUPATEN WAJO"
        },
        {
          "code": "7314",
          "provinceCode": "73",
          "name": "KABUPATEN SIDENRENG RAPPANG"
        },
        {
          "code": "7315",
          "provinceCode": "73",
          "name": "KABUPATEN PINRANG"
        },
        {
          "code": "7316",
          "provinceCode": "73",
          "name": "KABUPATEN ENREKANG"
        },
        {
          "code": "7317",
          "provinceCode": "73",
          "name": "KABUPATEN LUWU"
        },
        {
          "code": "7318",
          "provinceCode": "73",
          "name": "KABUPATEN TANA TORAJA"
        },
        {
          "code": "7322",
          "provinceCode": "73",
          "name": "KABUPATEN LUWU UTARA"
        },
        {
          "code": "7325",
          "provinceCode": "73",
          "name": "KABUPATEN LUWU TIMUR"
        },
        {
          "code": "7326",
          "provinceCode": "73",
          "name": "KABUPATEN TORAJA UTARA"
        },
        {
          "code": "7371",
          "provinceCode": "73",
          "name": "KOTA MAKASSAR"
        },
        {
          "code": "7372",
          "provinceCode": "73",
          "name": "KOTA PAREPARE"
        },
        {
          "code": "7373",
          "provinceCode": "73",
          "name": "KOTA PALOPO"
        },
        {
          "code": "7401",
          "provinceCode": "74",
          "name": "KABUPATEN BUTON"
        },
        {
          "code": "7402",
          "provinceCode": "74",
          "name": "KABUPATEN MUNA"
        },
        {
          "code": "7403",
          "provinceCode": "74",
          "name": "KABUPATEN KONAWE"
        },
        {
          "code": "7404",
          "provinceCode": "74",
          "name": "KABUPATEN KOLAKA"
        },
        {
          "code": "7405",
          "provinceCode": "74",
          "name": "KABUPATEN KONAWE SELATAN"
        },
        {
          "code": "7406",
          "provinceCode": "74",
          "name": "KABUPATEN BOMBANA"
        },
        {
          "code": "7407",
          "provinceCode": "74",
          "name": "KABUPATEN WAKATOBI"
        },
        {
          "code": "7408",
          "provinceCode": "74",
          "name": "KABUPATEN KOLAKA UTARA"
        },
        {
          "code": "7409",
          "provinceCode": "74",
          "name": "KABUPATEN BUTON UTARA"
        },
        {
          "code": "7410",
          "provinceCode": "74",
          "name": "KABUPATEN KONAWE UTARA"
        },
        {
          "code": "7411",
          "provinceCode": "74",
          "name": "KABUPATEN KOLAKA TIMUR"
        },
        {
          "code": "7412",
          "provinceCode": "74",
          "name": "KABUPATEN KONAWE KEPULAUAN"
        },
        {
          "code": "7413",
          "provinceCode": "74",
          "name": "KABUPATEN MUNA BARAT"
        },
        {
          "code": "7414",
          "provinceCode": "74",
          "name": "KABUPATEN BUTON TENGAH"
        },
        {
          "code": "7415",
          "provinceCode": "74",
          "name": "KABUPATEN BUTON SELATAN"
        },
        {
          "code": "7471",
          "provinceCode": "74",
          "name": "KOTA KENDARI"
        },
        {
          "code": "7472",
          "provinceCode": "74",
          "name": "KOTA BAUBAU"
        },
        {
          "code": "7501",
          "provinceCode": "75",
          "name": "KABUPATEN BOALEMO"
        },
        {
          "code": "7502",
          "provinceCode": "75",
          "name": "KABUPATEN GORONTALO"
        },
        {
          "code": "7503",
          "provinceCode": "75",
          "name": "KABUPATEN POHUWATO"
        },
        {
          "code": "7504",
          "provinceCode": "75",
          "name": "KABUPATEN BONE BOLANGO"
        },
        {
          "code": "7505",
          "provinceCode": "75",
          "name": "KABUPATEN GORONTALO UTARA"
        },
        {
          "code": "7571",
          "provinceCode": "75",
          "name": "KOTA GORONTALO"
        },
        {
          "code": "7601",
          "provinceCode": "76",
          "name": "KABUPATEN MAJENE"
        },
        {
          "code": "7602",
          "provinceCode": "76",
          "name": "KABUPATEN POLEWALI MANDAR"
        },
        {
          "code": "7603",
          "provinceCode": "76",
          "name": "KABUPATEN MAMASA"
        },
        {
          "code": "7604",
          "provinceCode": "76",
          "name": "KABUPATEN MAMUJU"
        },
        {
          "code": "7605",
          "provinceCode": "76",
          "name": "KABUPATEN MAMUJU UTARA"
        },
        {
          "code": "7606",
          "provinceCode": "76",
          "name": "KABUPATEN MAMUJU TENGAH"
        },
        {
          "code": "8101",
          "provinceCode": "81",
          "name": "KABUPATEN MALUKU TENGGARA BARAT"
        },
        {
          "code": "8102",
          "provinceCode": "81",
          "name": "KABUPATEN MALUKU TENGGARA"
        },
        {
          "code": "8103",
          "provinceCode": "81",
          "name": "KABUPATEN MALUKU TENGAH"
        },
        {
          "code": "8104",
          "provinceCode": "81",
          "name": "KABUPATEN BURU"
        },
        {
          "code": "8105",
          "provinceCode": "81",
          "name": "KABUPATEN KEPULAUAN ARU"
        },
        {
          "code": "8106",
          "provinceCode": "81",
          "name": "KABUPATEN SERAM BAGIAN BARAT"
        },
        {
          "code": "8107",
          "provinceCode": "81",
          "name": "KABUPATEN SERAM BAGIAN TIMUR"
        },
        {
          "code": "8108",
          "provinceCode": "81",
          "name": "KABUPATEN MALUKU BARAT DAYA"
        },
        {
          "code": "8109",
          "provinceCode": "81",
          "name": "KABUPATEN BURU SELATAN"
        },
        {
          "code": "8171",
          "provinceCode": "81",
          "name": "KOTA AMBON"
        },
        {
          "code": "8172",
          "provinceCode": "81",
          "name": "KOTA TUAL"
        },
        {
          "code": "8201",
          "provinceCode": "82",
          "name": "KABUPATEN HALMAHERA BARAT"
        },
        {
          "code": "8202",
          "provinceCode": "82",
          "name": "KABUPATEN HALMAHERA TENGAH"
        },
        {
          "code": "8203",
          "provinceCode": "82",
          "name": "KABUPATEN KEPULAUAN SULA"
        },
        {
          "code": "8204",
          "provinceCode": "82",
          "name": "KABUPATEN HALMAHERA SELATAN"
        },
        {
          "code": "8205",
          "provinceCode": "82",
          "name": "KABUPATEN HALMAHERA UTARA"
        },
        {
          "code": "8206",
          "provinceCode": "82",
          "name": "KABUPATEN HALMAHERA TIMUR"
        },
        {
          "code": "8207",
          "provinceCode": "82",
          "name": "KABUPATEN PULAU MOROTAI"
        },
        {
          "code": "8208",
          "provinceCode": "82",
          "name": "KABUPATEN PULAU TALIABU"
        },
        {
          "code": "8271",
          "provinceCode": "82",
          "name": "KOTA TERNATE"
        },
        {
          "code": "8272",
          "provinceCode": "82",
          "name": "KOTA TIDORE KEPULAUAN"
        },
        {
          "code": "9101",
          "provinceCode": "91",
          "name": "KABUPATEN FAKFAK"
        },
        {
          "code": "9102",
          "provinceCode": "91",
          "name": "KABUPATEN KAIMANA"
        },
        {
          "code": "9103",
          "provinceCode": "91",
          "name": "KABUPATEN TELUK WONDAMA"
        },
        {
          "code": "9104",
          "provinceCode": "91",
          "name": "KABUPATEN TELUK BINTUNI"
        },
        {
          "code": "9105",
          "provinceCode": "91",
          "name": "KABUPATEN MANOKWARI"
        },
        {
          "code": "9106",
          "provinceCode": "91",
          "name": "KABUPATEN SORONG SELATAN"
        },
        {
          "code": "9107",
          "provinceCode": "91",
          "name": "KABUPATEN SORONG"
        },
        {
          "code": "9108",
          "provinceCode": "91",
          "name": "KABUPATEN RAJA AMPAT"
        },
        {
          "code": "9109",
          "provinceCode": "91",
          "name": "KABUPATEN TAMBRAUW"
        },
        {
          "code": "9110",
          "provinceCode": "91",
          "name": "KABUPATEN MAYBRAT"
        },
        {
          "code": "9111",
          "provinceCode": "91",
          "name": "KABUPATEN MANOKWARI SELATAN"
        },
        {
          "code": "9112",
          "provinceCode": "91",
          "name": "KABUPATEN PEGUNUNGAN ARFAK"
        },
        {
          "code": "9171",
          "provinceCode": "91",
          "name": "KOTA SORONG"
        },
        {
          "code": "9401",
          "provinceCode": "94",
          "name": "KABUPATEN MERAUKE"
        },
        {
          "code": "9402",
          "provinceCode": "94",
          "name": "KABUPATEN JAYAWIJAYA"
        },
        {
          "code": "9403",
          "provinceCode": "94",
          "name": "KABUPATEN JAYAPURA"
        },
        {
          "code": "9404",
          "provinceCode": "94",
          "name": "KABUPATEN NABIRE"
        },
        {
          "code": "9408",
          "provinceCode": "94",
          "name": "KABUPATEN KEPULAUAN YAPEN"
        },
        {
          "code": "9409",
          "provinceCode": "94",
          "name": "KABUPATEN BIAK NUMFOR"
        },
        {
          "code": "9410",
          "provinceCode": "94",
          "name": "KABUPATEN PANIAI"
        },
        {
          "code": "9411",
          "provinceCode": "94",
          "name": "KABUPATEN PUNCAK JAYA"
        },
        {
          "code": "9412",
          "provinceCode": "94",
          "name": "KABUPATEN MIMIKA"
        },
        {
          "code": "9413",
          "provinceCode": "94",
          "name": "KABUPATEN BOVEN DIGOEL"
        },
        {
          "code": "9414",
          "provinceCode": "94",
          "name": "KABUPATEN MAPPI"
        },
        {
          "code": "9415",
          "provinceCode": "94",
          "name": "KABUPATEN ASMAT"
        },
        {
          "code": "9416",
          "provinceCode": "94",
          "name": "KABUPATEN YAHUKIMO"
        },
        {
          "code": "9417",
          "provinceCode": "94",
          "name": "KABUPATEN PEGUNUNGAN BINTANG"
        },
        {
          "code": "9418",
          "provinceCode": "94",
          "name": "KABUPATEN TOLIKARA"
        },
        {
          "code": "9419",
          "provinceCode": "94",
          "name": "KABUPATEN SARMI"
        },
        {
          "code": "9420",
          "provinceCode": "94",
          "name": "KABUPATEN KEEROM"
        },
        {
          "code": "9426",
          "provinceCode": "94",
          "name": "KABUPATEN WAROPEN"
        },
        {
          "code": "9427",
          "provinceCode": "94",
          "name": "KABUPATEN SUPIORI"
        },
        {
          "code": "9428",
          "provinceCode": "94",
          "name": "KABUPATEN MAMBERAMO RAYA"
        },
        {
          "code": "9429",
          "provinceCode": "94",
          "name": "KABUPATEN NDUGA"
        },
        {
          "code": "9430",
          "provinceCode": "94",
          "name": "KABUPATEN LANNY JAYA"
        },
        {
          "code": "9431",
          "provinceCode": "94",
          "name": "KABUPATEN MAMBERAMO TENGAH"
        },
        {
          "code": "9432",
          "provinceCode": "94",
          "name": "KABUPATEN YALIMO"
        },
        {
          "code": "9433",
          "provinceCode": "94",
          "name": "KABUPATEN PUNCAK"
        },
        {
          "code": "9434",
          "provinceCode": "94",
          "name": "KABUPATEN DOGIYAI"
        },
        {
          "code": "9435",
          "provinceCode": "94",
          "name": "KABUPATEN INTAN JAYA"
        },
        {
          "code": "9436",
          "provinceCode": "94",
          "name": "KABUPATEN DEIYAI"
        },
        {
          "code": "9471",
          "provinceCode": "94",
          "name": "KOTA JAYAPURA"
        }
      ]
    )
  }
}
