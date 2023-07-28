/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return "API SERVICE V2 INOVASI"
})


Route.get("home","HalamanDepan/HomeController.index")
Route.get("sliders","HalamanDepan/SlidersController.publish")


Route.group(()=>{
  Route.group(()=>{
    Route.post("token","Auth/LoginController.login")
  }).prefix("auth")

  Route.get("info","AppsController.index")
  Route.get("menus","AppsController.menus").middleware('auth')
  Route.get("user-info","Utility/UsersController.userInfo").middleware(['auth'])

  //Route public images

  //route media
  Route.post("media", "MediaController.store").middleware(["auth"]);
  Route.get("dashboard","DashboardController.index").middleware(['auth'])
  Route.get("data-chart-by-topic","DashboardController.datachartbytopic")
  Route.get('data-chart-by-jenis',"DashboardController.datachartbyjenis")

  /**
   * Route Dashboard
   */
  Route.group(()=>{
    Route.get("recap-per-tahun","DashboardController.recapPerTahun")
    Route.get("tarif-rs-per-tahun","DashboardController.tarifRsPerTahun")
    Route.get("recap-monthly","DashboardController.recapMonthly")
    Route.get("per-jenis-pengobatan","DashboardController.perJenisPengobatan")
  }).prefix("dashboard").middleware(['auth'])

  //route superadmin
  Route.group(()=>{
    Route.group(()=>{
      Route.resource("app-info","MasterData/AppInfosController")
    }).prefix("master-data")
    Route.group(()=>{
      Route.resource("file-management","Utility/FileManagementsController")
    }).prefix('utility')
  }).prefix("superadmin").middleware(['auth','superadmin'])

  //route masterdata
  Route.group(()=>{
    Route.resource("province","MasterData/ProvincesController")
    Route.resource('regency/:province_code',"MasterData/RegenciesController")
    Route.resource("district/:regency_code","MasterData/DistrictsController")
    Route.resource("village/:district_code","MasterData/VillagesController")
    Route.resource("category","MasterData/CategoriesController")
    Route.resource("indikator","MasterData/IndikatorsController")
    Route.resource("indikator-pemda","MasterData/IndikatorPemdasController")
    Route.resource('opd','MasterData/OpdsController')
    Route.post("opd-generate","MasterData/OpdsController.generate")
    Route.resource('opd-provinsi',"MasterData/OpdProvinsisController")
    Route.resource('opd-kabkota',"MasterData/OpdKabkotasController")
    Route.resource('jenis-inovasi',"MasterData/JenisInovasisController")
    Route.resource('urusan',"MasterData/UrusansController")
    Route.resource("bentuk","MasterData/BentuksController")
  }).prefix('master-data').middleware(['auth','administrator'])

  //Route Combo
  Route.group(()=>{
    Route.get("regency","MasterData/RegenciesController.combo")
    Route.get("district/:regency_code","MasterData/DistrictsController.combo")
    Route.get("village/:district_code","MasterData/VillagesController.combo")
    Route.get('opd',"MasterData/OpdsController.combo")
    Route.get('opd-by-regency/:regency_code',"MasterData/OpdsController.combobyregency")
    Route.get("opd-kabkota","MasterData/OpdKabkotasController.combo")
    Route.get('category',"MasterData/CategoriesController.combo")
    Route.get("jenis-inovasi","MasterData/JenisInovasisController.combo")
    Route.get("urusan","MasterData/UrusansController.combo")
    Route.get('bentuk',"MasterData/BentuksController.combo")
  }).prefix('combo').middleware(['auth'])

  //Route Permohonan
  Route.group(()=>{
    Route.resource("profile","Permohonan/ProfilsController")
    Route.resource("profile-indikator/:profile_uuid","Permohonan/ProfileIndikatorsController")
    Route.resource("profile-document/:profile_uuid/:indikator_pemda_uuid/:profile_indikator_uuid","Permohonan/ProfileIndikatorDocumentsController")

    Route.group(()=>{
      Route.resource("inovasi","Permohonan/InovasiAllsController").as("inovasi-admin")
    }).prefix("admin")

    Route.group(()=>{
      Route.resource("inovasi","Permohonan/InovasiAllsController").as("inovasi-verifikator")
      Route.post("inovasi-set-status","Permohonan/InovasiAllsController.setstatus")
      Route.get("profile-show/:regency_code","Permohonan/ProfilsController.showbyregency")
      Route.get("profile-document/:profile_indikator_uuid","Permohonan/ProfileIndikatorDocumentsController.index")
      Route.get("inovasi-document/:inovasi_indikator_uuid","Permohonan/InovasiDocumentsController.index")
    }).prefix('verifikator')

    Route.get("inovasi-history/:inovasi_uuid","Permohonan/InovasiHistoriesController.index")


    /**
     * Route Permohonan OPD
     */
    Route.group(()=>{
      Route.resource("inovasi","Permohonan/InovasisController").as("permohonan-opd")
      Route.resource('inovasi-indikator/:inovasi_uuid', 'Permohonan/InovasiIndikatorsController')
      Route.get("inovasi-informasi/:inovasi_indikator_uuid","Permohonan/InovasiInformasisController.show")
      Route.post("inovasi-informasi/:inovasi_indikator_uuid","Permohonan/InovasiInformasisController.store")
      Route.resource("inovasi-document/:inovasi_uuid/:indikator_uuid/:inovasi_indikator_uuid","Permohonan/InovasiDocumentsController")
      Route.post('inovasi-push',"Permohonan/InovasisController.push")
      Route.post('inovasi-pull',"Permohonan/InovasisController.pull")
    }).prefix("opd")
  }).prefix("permohonan").middleware(['auth'])

  //Route Group Halaman Depan
  Route.group(()=>{
    Route.resource("slider","HalamanDepan/SlidersController")
  }).prefix("halaman-depan").middleware(['auth'])


  /**
   * Route Group Manajemen
   */
  Route.group(()=>{
    Route.resource("klaim","Manajemen/TransactionsController")
    Route.post("klaim-import","Manajemen/TransactionsController.import")
    Route.post("klaim-update-category","Manajemen/TransactionsController.updatecategory")
    Route.post("klaim-update-status","Manajemen/TransactionsController.updatestatus")
  }).prefix("manajemen").middleware(['auth'])



  //route utility
  Route.group(()=>{
    //Route manajemen pengguna
    Route.resource("users","Utility/UsersController")
    Route.post("update-profil","Utility/UsersController.updateProfil")
    Route.post("change-pwd","Utility/UsersController.changePwd")

    //Route manajemen fitur administrator
    Route.resource("fiturs","Utility/FitursController")
    Route.post("fiturs-set-progress","Utility/FitursController.setprogress")
    Route.post("fiturs-set-selesai","Utility/FitursController.setselesai")

    //Route manajemen fitur userr
    Route.resource("manajemen-fiturs","Utility/FiturUsersController")

    //Route Update History
    Route.resource("updates","Utility/UpdateHistoriesController")

    Route.resource("users-provinsi","Utility/UserProvinsisController")
    Route.resource("users-kabkota","Utility/UserKabkotasController")

  }).prefix('utility').middleware(['auth'])

  Route.group(()=>{
    Route.resource("sliders","HalamanDepan/SlidersController")
  }).prefix("halaman-depan").middleware(['auth'])

}).prefix("api/v2")

