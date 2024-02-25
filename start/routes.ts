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

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return "API SERVICE V2 INOVASI";
});

Route.get("home", "HalamanDepan/HomeController.index");
Route.get("sliders", "HalamanDepan/SlidersController.publish");
Route.get("sponsors", "HalamanDepan/SponsorsController.publicshow");
Route.get("top-inovasi", "HalamanDepan/InovasisController.top");
Route.get("inovasi", "HalamanDepan/InovasisController.index");
Route.get("kompetisi", "HalamanDepan/KompetisisController.index");
Route.get("peta-inovasi", "DashboardController.datamaps");

Route.group(() => {
  Route.group(() => {
    Route.post("token", "Auth/LoginController.login");
    Route.get("login-with-google", "Auth/LoginController.loginWithGoogle");
    Route.get("google/callback", "Auth/LoginController.googleCallback");
  }).prefix("auth");

  Route.get("info", "AppsController.index");
  Route.get("menus", "AppsController.menus").middleware("auth");
  Route.get("user-info", "Utility/UsersController.userInfo").middleware([
    "auth",
  ]);

  //Route public images

  //route media
  Route.post("media", "MediaController.store").middleware(["auth"]);
  Route.get("dashboard", "DashboardController.index").middleware(["auth"]);
  Route.get("data-chart-by-topic", "DashboardController.datachartbytopic");
  Route.get("data-chart-by-jenis", "DashboardController.datachartbyjenis");

  /**
   * Route Dashboard
   */
  Route.group(() => {
    Route.get("statistik-perbulan", "DashboardController.index");
    Route.get("datachart-perproses", "DashboardController.datacharperproses");
    Route.get("data-maps", "DashboardController.datamaps");
  })
    .prefix("dashboard")
    .middleware(["auth"]);

  //route superadmin
  Route.group(() => {
    Route.group(() => {
      Route.resource("app-info", "MasterData/AppInfosController");
    }).prefix("master-data");
    Route.group(() => {
      Route.resource("file-management", "Utility/FileManagementsController");
    }).prefix("utility");
  })
    .prefix("superadmin")
    .middleware(["auth", "superadmin"]);

  //route masterdata
  Route.group(() => {
    Route.resource("province", "MasterData/ProvincesController");
    Route.resource("regency/:province_code", "MasterData/RegenciesController");
    Route.resource("district/:regency_code", "MasterData/DistrictsController");
    Route.resource("village/:district_code", "MasterData/VillagesController");
    Route.resource("category", "MasterData/CategoriesController");

    Route.resource(
      "indikator/:category_uuid",
      "MasterData/IndikatorsController"
    );
    Route.resource("indikator-pemda", "MasterData/IndikatorPemdasController");
    Route.resource("opd", "MasterData/OpdsController");
    Route.post("opd-generate", "MasterData/OpdsController.generate");
    Route.resource("opd-provinsi", "MasterData/OpdProvinsisController");
    Route.resource("opd-kabkota", "MasterData/OpdKabkotasController");
    Route.resource("jenis-inovasi", "MasterData/JenisInovasisController");
    Route.resource("urusan", "MasterData/UrusansController");
    Route.resource("bentuk", "MasterData/BentuksController");
  })
    .prefix("master-data")
    .middleware(["auth", "administrator"]);

  //Route Combo
  Route.group(() => {
    Route.get("regency", "MasterData/RegenciesController.combo");
    Route.get("district/:regency_code", "MasterData/DistrictsController.combo");
    Route.get("village/:district_code", "MasterData/VillagesController.combo");
    Route.get("opd", "MasterData/OpdsController.combo");
    Route.get(
      "opd-by-regency/:regency_code",
      "MasterData/OpdsController.combobyregency"
    );
    Route.get("opd-kabkota", "MasterData/OpdKabkotasController.combo");
    Route.get("category", "MasterData/CategoriesController.combo");
    Route.get("jenis-inovasi", "MasterData/JenisInovasisController.combo");
    Route.get("urusan", "MasterData/UrusansController.combo");
    Route.get("bentuk", "MasterData/BentuksController.combo");
    Route.get(
      "kompetisi-sinovic",
      "Permohonan/KompetensisController.comboSinovic"
    );
    Route.get("kompetisi-iga", "Permohonan/KompetensisController.comboIga");
    Route.get("jadwal/:code", "Permohonan/KompetensisController.combo");
  })
    .prefix("combo")
    .middleware(["auth"]);

  //Route Permohonan
  Route.group(() => {
    Route.resource("profile", "Permohonan/ProfilsController");
    Route.resource(
      "profile-indikator/:profile_uuid",
      "Permohonan/ProfileIndikatorsController"
    );
    Route.resource(
      "profile-document/:profile_uuid/:indikator_pemda_uuid/:profile_indikator_uuid",
      "Permohonan/ProfileIndikatorDocumentsController"
    );
    Route.get(
      "category-by-code/:code",
      "MasterData/CategoriesController.showByCode"
    );

    Route.group(() => {
      Route.resource("kompetisi", "Permohonan/KompetensisController");
      Route.resource("inovasi", "Permohonan/InovasiAllsController").as(
        "inovasi-admin"
      );
    }).prefix("admin");

    Route.group(() => {
      Route.resource("inovasi", "Permohonan/Admin/InovasisController").as(
        "administrator.inovasi"
      );
    }).prefix("administrator");

    Route.group(() => {
      Route.resource("inovasi", "Permohonan/InovasiAllsController").as(
        "inovasi-verifikator"
      );
      Route.post(
        "inovasi-set-status",
        "Permohonan/InovasiAllsController.setstatus"
      );
      Route.get(
        "profile-show/:regency_code",
        "Permohonan/ProfilsController.showbyregency"
      );
      Route.get(
        "profile-document/:profile_indikator_uuid",
        "Permohonan/ProfileIndikatorDocumentsController.index"
      );
      Route.get(
        "inovasi-document/:inovasi_indikator_uuid",
        "Permohonan/InovasiDocumentsController.index"
      );

      //Sinovic
      Route.post(
        "sinovic-verifdoc",
        "Permohonan/Opd/SinovicsController.verifdoc"
      );
      Route.post(
        "sinovic-publish/:id",
        "Permohonan/Opd/SinovicsController.publish"
      );
      Route.post(
        "sinovic-unpublish/:id",
        "Permohonan/Opd/SinovicsController.unpublish"
      );
      Route.resource(
        "sinovic-indikator-penilaian/:sinovic_uuid",
        "Permohonan/SinovicIndikatorsController"
      );

      //Kompetisi
      Route.resource("kompetisi", "Permohonan/Admin/KompetisisController").as(
        "verifikator.kompetisi"
      );
      Route.post(
        "kompetisi-verifdoc",
        "Permohonan/Admin/KompetisisController.verifdoc"
      );
      Route.post(
        "kompetisi-publish/:id",
        "Permohonan/Admin/KompetisisController.publish"
      );
      Route.post(
        "kompetisi-unpublish/:id",
        "Permohonan/Admin/KompetisisController.unpublish"
      );

      Route.resource(
        "penilaian-kompetisi",
        "Permohonan/Verifikator/KompetisisController"
      );
      Route.resource(
        "penilaian-kompetisi-indikator/:inovation_uuid",
        "Permohonan/Verifikator/InovationIndicatorsController"
      );
      Route.post(
        "penilaian-kompetisi-score1/:id",
        "Permohonan/Verifikator/InovationIndicatorsController.updatescore1"
      );
      Route.post(
        "penilaian-kompetisi-score2/:id",
        "Permohonan/Verifikator/InovationIndicatorsController.updatescore2"
      );
      Route.get(
        "cetak-penilaian",
        "Permohonan/Verifikator/KompetisisController.cetakpenilaian"
      );
    }).prefix("verifikator");

    Route.get(
      "inovasi-history/:inovasi_uuid",
      "Permohonan/InovasiHistoriesController.index"
    );

    /**
     * Route Permohonan OPD
     */
    Route.group(() => {
      /**
       * IGA Route
       */

      Route.resource("inovasi", "Permohonan/InovasisController").as(
        "permohonan-opd"
      );
      Route.resource(
        "inovasi-indikator/:inovasi_uuid",
        "Permohonan/InovasiIndikatorsController"
      );
      Route.get(
        "inovasi-informasi/:inovasi_indikator_uuid",
        "Permohonan/InovasiInformasisController.show"
      );
      Route.post(
        "inovasi-informasi/:inovasi_indikator_uuid",
        "Permohonan/InovasiInformasisController.store"
      );
      Route.resource(
        "inovasi-document/:inovasi_uuid/:indikator_uuid/:inovasi_indikator_uuid",
        "Permohonan/InovasiDocumentsController"
      );
      Route.post("inovasi-push", "Permohonan/InovasisController.push");
      Route.post("inovasi-pull", "Permohonan/InovasisController.pull");

      /**
       * Route KIPP
       */
      Route.resource("sinovic", "Permohonan/Opd/SinovicsController");
      Route.post("sinovic-send/:id", "Permohonan/Opd/SinovicsController.send");
      Route.post(
        "sinovic-unsend/:id",
        "Permohonan/Opd/SinovicsController.unsend"
      );
    }).prefix("opd");

    /**
     * Routet Kompetisi Public
     */
    Route.group(() => {
      Route.get("dashboard", "DashboardPublicsController.index").as(
        "public-dashboard"
      );
      Route.resource("kompetisi", "Permohonan/Public/InovationsController").as(
        "public-competion"
      );
      Route.post(
        "kompetisi-send/:id",
        "Permohonan/Public/InovationsController.send"
      );
      Route.post(
        "kompetisi-unsend/:id",
        "Permohonan/Public/InovationsController.unsend"
      );
    }).prefix("public");

    /**
     * Route Coaching Klinik
     */
    Route.resource("message", "Permohonan/MessagesController");
  })
    .prefix("permohonan")
    .middleware(["auth"]);

  //Route Group Halaman Depan
  Route.group(() => {
    Route.resource("slider", "HalamanDepan/SlidersController");
    Route.resource("sponsor", "HalamanDepan/SponsorsController");
  })
    .prefix("halaman-depan")
    .middleware(["auth"]);

  //route utility
  Route.group(() => {
    //Route manajemen pengguna
    Route.resource("users", "Utility/UsersController");
    Route.post("update-profil", "Utility/UsersController.updateProfil");
    Route.post("change-pwd", "Utility/UsersController.changePwd");

    //Route manajemen fitur administrator
    Route.resource("fiturs", "Utility/FitursController");
    Route.post("fiturs-set-progress", "Utility/FitursController.setprogress");
    Route.post("fiturs-set-selesai", "Utility/FitursController.setselesai");

    //Route manajemen fitur userr
    Route.resource("manajemen-fiturs", "Utility/FiturUsersController");

    //Route Update History
    Route.resource("updates", "Utility/UpdateHistoriesController");

    Route.resource("users-provinsi", "Utility/UserProvinsisController");
    Route.resource("users-kabkota", "Utility/UserKabkotasController");
  })
    .prefix("utility")
    .middleware(["auth"]);

  Route.group(() => {
    Route.resource("sliders", "HalamanDepan/SlidersController");
  })
    .prefix("halaman-depan")
    .middleware(["auth"]);
}).prefix("api/v2");
