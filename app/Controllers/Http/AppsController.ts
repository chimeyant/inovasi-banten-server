import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AppInfo from 'App/Models/AppInfo'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class AppsController {
  async index({}:HttpContextContract){
    const appinfo = await AppInfo.query().first()

    const logourl = await Drive.getSignedUrl("images/apps/"+ appinfo?.app_logo)

   const data = {
    app_name: appinfo?.app_name,
    app_ver: appinfo?.app_ver,
    app_desc: appinfo?.app_desc,
    app_logo: appinfo?.app_logo == 'logo-opendata.png'? Env.get("BASE_URL")+  "/images/apps/"+ appinfo?.app_logo :Env.get("BASE_URL")+ logourl  ,
    app_theme: {
      mode:appinfo?.app_theme,
      color:appinfo?.app_color
    },
    app_background: Env.get("BASE_URL")+ "/images/apps/"+   appinfo?.app_background,
    app_nav : Env.get("BASE_URL")+ "/images/apps/"+   appinfo?.app_nav,
    app_url: appinfo?.app_url,
    app_company: appinfo?.app_company,
    app_slogan: appinfo?.app_slogan,
    app_address: appinfo?.app_address,
    app_wa: appinfo?.app_wa
   }

   return data;
  }

  async menus({auth}: HttpContextContract){
    const user = await auth.user

    const authent = await user?.authent

    let menus :{} = [];

    if(authent == 'superadmin'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/auth/dashboard",
        },
        {
          title: "",
          type: "divider",
        },
        {
          title: "DATA MASTER",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus:[
            {
              title: "Informasi Aplikasi",
              icon: "mdi-desktop-mac-dashboard",
              route: "/auth/master-app-info",
              type: "item",
            },
            {
              title: "Master Wilayah",
              icon: "mdi-map",
              route: "/auth/master-data-province",
              type: "item",
            },
            {
              title: "Master Kategory",
              icon: "mdi-notebook-edit",
              route: "/auth/master-data-category",
              type: "item",
            },
            {
              title: "Master Indikator",
              icon: "mdi-firebase",
              route: "/auth/master-data-indikator",
              type: "item",
            },
            {
              title: "Master OPD",
              icon: "mdi-home-account",
              route: "/auth/master-data-opd",
              type: "item",
            },
            {
              title: "Master Jenis Inovasi",
              icon: "mdi-widgets",
              route: "/auth/master-data-jenis-inovasi",
              type: "item",
            },
            {
              title: "Master Urusan",
              icon: "mdi-traffic-cone",
              route: "/auth/master-data-urusan",
              type: "item",
            },
          ]
        },
        {
          title: "PERMOHONAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus:[

          ]
        },
        {
          title: "HALAMAN DEPAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus:[
            {
              title: "Slider",
              icon: "image",
              route: "/auth/halaman-depan-slider",
              type: "item",
            },
          ]
        },



        { title: "UTILITAS", type: "subMenu", route: "/" , submenus:[
          {
            title: "Manajemen Pengguna",
            icon: "engineering",
            route: "/auth/user",
            type: "item",
          },
          {
            title: "Profil Pengguna",
            icon: "accessibility",
            route: "/auth/profil-akun",
            type: "item",
          },
          {
            title: "Ganti Kata Sandi",
            icon: "vpn_key",
            route: "/auth/chngpwd",
            type: "item",
          },

        ]},

      ];

      return menus;
    }

    if(authent == 'administrator'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },

        {
          title: "DATA MASTER",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus:[

            {
              title: "Kategori",
              icon: "mdi-widgets",
              route: "/backend/master-category",
              type: "item",
            },
          ]
        },

        { title: "Utility", type: "subheader", route: "/" },

        {
          title: "Akun Aplikasi",
          icon: "engineering",
          route: "/backend/user",
          type: "item",
        },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },

        {
          title: "Update History",
          icon: "mdi-update",
          route: "/backend/utility-update-history",
          type: "item",
        },
      ];
      return menus;
    }

    if(authent == 'operator'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },
        {
          title: "",
          type: "divider",
        },

        { title: "MANAJEMEN", type: "subMenu", route: "/", submenus:[
          {
            title: "Dataset",
            icon: "mdi-database",
            route: "/backend/manajemen-dataset",
            type: "item",
          },
          {
            title: "Visualisasi",
            icon: "mdi-image-frame",
            route: "/backend/manajemen-visualization",
            type: "item",
          },
          {
            title: "Infografis",
            icon: "mdi-finance",
            route: "/backend/manajemen-infographic",
            type: "item",
          },
          {
            title: "Dokumen",
            icon: "mdi-book-open-variant",
            route: "/backend/manajemen-document",
            type: "item",
          },
          {
            title: "Videografis",
            icon: "mdi-video-box",
            route: "/backend/manajemen-videographic",
            type: "item",
          },
          {
            title: "Permohonan Dataset",
            icon: "mdi-hand-heart",
            route: "/backend/manajemen-permohonan",
            type: "item",
          },
        ] },

        { title: "BTS", type: "subMenu", route: "/" , submenus:[
          {
            title: "PETA Sebaran",
            icon: "mdi-map-legend",
            route: "/backend/bts-peta-sebaran",
            type: "item",
          },
          {
            title: "Daftar Perusahaan",
            icon: "mdi-office-building-outline",
            route: "/backend/bts-daftar-perusahaan",
            type: "item",
          },
          {
            title: "Surviey",
            icon: "mdi-map-marker-radius",
            route: "",
            type: "item",
          },
        ]},
        { title: "UTILITAS", type: "subMenu", route: "/" , submenus:[
          {
            title: "Profil Pengguna",
            icon: "accessibility",
            route: "/backend/profil-akun",
            type: "item",
          },
          {
            title: "Ganti Kata Sandi",
            icon: "vpn_key",
            route: "/backend/chngpwd",
            type: "item",
          },

        ]},

      ];

      return menus;
    }

    /**
     * MENU OPD
     */

    if(authent == 'opd'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },
        { title: "BID. KESELAMATAN", type: "subheader", route: "/" },

        {
          title: "RENAKSI",
          icon: "mdi-floor-plan",
          route: "/backend/keselamatan-renaksi",
          type: "item",
        },

        { title: "Utility", type: "subheader", route: "/" },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },

      ];
      return menus;
    }


    /**
     * Menu User
     */
     if(authent == 'user'){
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/backend/dashboard",
        },
        {
          title: "Lap Prl. Jalan dan Laka",
          icon: "mdi-bullhorn",
          route: "/backend/user-pelaporan",
          type: "item",
        },


        { title: "Utility", type: "subheader", route: "/" },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/backend/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/backend/chngpwd",
          type: "item",
        },


      ];
      return menus;
    }


  }
}
