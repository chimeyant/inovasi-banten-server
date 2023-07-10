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
  return "API SERVICE V2 SIMPEKA"
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
    }).prefix("master-data").middleware(['auth'])
  }).prefix("superadmin")

  //route masterdata
  Route.group(()=>{
    Route.resource("category","MasterData/CategoriesController")
    Route.resource("doctor","MasterData/DoctorsController")
    Route.resource('kelas-bpjs',"MasterData/BpjsKelasController")
    Route.resource("problem","MasterData/ProblemsController")
    Route.resource("diaglist","MasterData/DiaglistsController")
    Route.resource("proclist","MasterData/ProclistsController")
  }).prefix('master-data').middleware(['auth'])

  //Route Combo
  Route.group(()=>{
    Route.get("category", "MasterData/CategoriesController.combo")
    Route.get("kelas-bpjs","MasterData/BpjsKelasController.combo")
    Route.get('dokter',"MasterData/DoctorsController.combo")
  }).prefix('combo').middleware(['auth'])

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

  }).prefix('utility').middleware(['auth'])

  Route.group(()=>{
    Route.resource("sliders","HalamanDepan/SlidersController")
  }).prefix("halaman-depan").middleware(['auth'])


  Route.group(()=>{
    Route.get("data.json",'SDI/CatalogsController.index')
  }).prefix('sdi')

}).prefix("api/v2")

