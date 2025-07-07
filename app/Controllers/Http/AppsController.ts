import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AppInfo from "App/Models/AppInfo";
import Env from "@ioc:Adonis/Core/Env";
import Drive from "@ioc:Adonis/Core/Drive";

export default class AppsController {
  async index({}: HttpContextContract) {
    const appinfo = await AppInfo.query().first();

    const logourl = await Drive.getSignedUrl(
      "images/apps/" + appinfo?.app_logo
    );

    const data = {
      app_name: appinfo?.app_name,
      app_ver: appinfo?.app_ver,
      app_desc: appinfo?.app_desc,
      app_logo:
        appinfo?.app_logo == "logo-opendata.png"
          ? Env.get("BASE_URL") + "/images/apps/" + appinfo?.app_logo
          : Env.get("BASE_URL") + logourl,
      app_theme: {
        mode: appinfo?.app_theme,
        color: appinfo?.app_color,
      },
      app_background:
        Env.get("BASE_URL") + "/images/apps/" + appinfo?.app_background,
      app_nav: Env.get("BASE_URL") + "/images/apps/" + appinfo?.app_nav,
      app_url: appinfo?.app_url,
      app_company: appinfo?.app_company,
      app_slogan: appinfo?.app_slogan,
      app_address: appinfo?.app_address,
      app_wa: appinfo?.app_wa,
    };

    return data;
  }

  async menus({ auth }: HttpContextContract) {
    const user = await auth.user;

    const authent = await user?.authent;

    let menus: {} = [];

    if (authent == "superadmin") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
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
          submenus: [
            {
              title: "Informasi Aplikasi",
              icon: "mdi-desktop-mac-dashboard",
              route: "/master-app-info",
              type: "item",
            },
            {
              title: "Master Wilayah",
              icon: "mdi-map",
              route: "/master-data-province",
              type: "item",
            },
            {
              title: "Master Kategory",
              icon: "mdi-notebook-edit",
              route: "/master-data-category",
              type: "item",
            },
            {
              title: "Master Indikator Pemda",
              icon: "mdi-file-document-multiple-outline",
              route: "/master-data-indikator-pemda",
              type: "item",
            },
            // {
            //   title: "Master Indikator Inovasi",
            //   icon: "mdi-file-document-multiple",
            //   route: "/master-data-indikator",
            //   type: "item",
            // },
            {
              title: "Master OPD",
              icon: "mdi-home-account",
              route: "/master-data-opd",
              type: "item",
            },
            {
              title: "Master Jenis Inovasi",
              icon: "mdi-widgets",
              route: "/master-data-jenis-inovasi",
              type: "item",
            },
            {
              title: "Master Urusan",
              icon: "mdi-traffic-cone",
              route: "/master-data-urusan",
              type: "item",
            },
            {
              title: "Master Bentuk Inovasi",
              icon: "mdi-codepen",
              route: "/master-data-bentuk",
              type: "item",
            },
          ],
        },
        {
          title: "PERMOHONAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "Jadwal Kegiatan",
              icon: "mdi-calendar",
              route: "/permohonan-admin-kompetisi",
              type: "item",
            },
            {
              title: "Seluruh Inovasi Daerah",
              icon: "mdi-book-open-variant",
              route: "/permohonan-inovasi-publisher",
              type: "item",
            },
            {
              title: "Klinik Konsultasi",
              icon: "mdi-face-agent",
              route: "/permohonan-message-admin",
              type: "item",
            },
          ],
        },
        {
          title: "HALAMAN DEPAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "Slider",
              icon: "image",
              route: "/halaman-depan-slider",
              type: "item",
            },
            {
              title: "Instansi Pendukung",
              icon: "mdi-storefront",
              route: "/halaman-depan-sponsor",
              type: "item",
            },
          ],
        },

        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Manajemen Pengguna",
              icon: "engineering",
              route: "/user",
              type: "item",
            },
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
            {
              title: "File Management",
              icon: "mdi-file",
              route: "/utility-file-management",
              type: "item",
            },
          ],
        },
      ];

      return menus;
    }

    if (authent == "administrator") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },

        {
          title: "DATA MASTER",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "Master Wilayah",
              icon: "mdi-map",
              route: "/master-data-province",
              type: "item",
            },
            {
              title: "Master Kategory",
              icon: "mdi-notebook-edit",
              route: "/master-data-category",
              type: "item",
            },
            {
              title: "Master Indikator Pemda",
              icon: "mdi-file-document-multiple-outline",
              route: "/master-data-indikator-pemda",
              type: "item",
            },
            {
              title: "Master Indikator Inovasi",
              icon: "mdi-file-document-multiple",
              route: "/master-data-indikator",
              type: "item",
            },

            {
              title: "Master OPD",
              icon: "mdi-home-account",
              route: "/master-data-opd",
              type: "item",
            },
            {
              title: "Master Jenis Inovasi",
              icon: "mdi-widgets",
              route: "/master-data-jenis-inovasi",
              type: "item",
            },
            {
              title: "Master Urusan",
              icon: "mdi-traffic-cone",
              route: "/master-data-urusan",
              type: "item",
            },
            {
              title: "Master Bentuk Inovasi",
              icon: "mdi-codepen",
              route: "/master-data-bentuk",
              type: "item",
            },
          ],
        },

        {
          title: "PERMOHONAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "Jadwal Kegiatan",
              icon: "mdi-calendar",
              route: "/permohonan-admin-kompetisi",
              type: "item",
            },
            {
              title: "Seluruh Inovasi ",
              icon: "mdi-book-open-variant",
              route: "/permohonan-inovasi-publisher",
              type: "item",
            },
            {
              title: "Klinik Konsultasi",
              icon: "mdi-face-agent",
              route: "/page-under-construction",
              type: "item",
            },
          ],
        },

        {
          title: "HALAMAN DEPAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "Slider",
              icon: "image",
              route: "/halaman-depan-slider",
              type: "item",
            },
            {
              title: "Sponsor",
              icon: "mdi-storefront",
              route: "/page-under-construction",
              type: "item",
            },
          ],
        },

        { title: "Utility", type: "subheader", route: "/" },

        {
          title: "Akun Aplikasi",
          icon: "engineering",
          route: "/user",
          type: "item",
        },
        {
          title: "Profil Pengguna",
          icon: "accessibility",
          route: "/profil-akun",
          type: "item",
        },
        {
          title: "Ganti Kata Sandi",
          icon: "vpn_key",
          route: "/chngpwd",
          type: "item",
        },
      ];
      return menus;
    }

    if (authent == "team-pengkaji") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },
        {
          title: "",
          type: "divider",
        },
        {
          title: "VERIFIKASI & PENILAIAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA",
              icon: "mdi-clover",
              route: "/page-under-construction",
              type: "item",
            },
            {
              title: "SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/verifikator-sinovic",
              type: "item",
            },
            {
              title: "KOMPETISI",
              icon: "mdi-trophy",
              route: "/verifikator-kompetisi",
              type: "item",
            },
          ],
        },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "team-pengkaji-2") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },
        {
          title: "",
          type: "divider",
        },
        {
          title: "VERIFIKASI & PENILAIAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA",
              icon: "mdi-clover",
              route: "/page-under-construction",
              type: "item",
            },
            {
              title: "SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/verifikator-sinovic",
              type: "item",
            },
            {
              title: "KOMPETISI",
              icon: "mdi-trophy",
              route: "/verifikator-kompetisi",
              type: "item",
            },
          ],
        },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "team-pengkaji-3") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },
        {
          title: "",
          type: "divider",
        },
        {
          title: "VERIFIKASI & PENILAIAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA",
              icon: "mdi-clover",
              route: "/page-under-construction",
              type: "item",
            },
            {
              title: "SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/verifikator-sinovic",
              type: "item",
            },
            {
              title: "KOMPETISI",
              icon: "mdi-trophy",
              route: "/verifikator-kompetisi",
              type: "item",
            },
          ],
        },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "team-pengkaji-4") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },
        {
          title: "",
          type: "divider",
        },
        {
          title: "VERIFIKASI & PENILAIAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA",
              icon: "mdi-clover",
              route: "/page-under-construction",
              type: "item",
            },
            {
              title: "SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/verifikator-sinovic",
              type: "item",
            },
            {
              title: "KOMPETISI",
              icon: "mdi-trophy",
              route: "/verifikator-kompetisi",
              type: "item",
            },
          ],
        },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "team-pengkaji-5") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },
        {
          title: "",
          type: "divider",
        },
        {
          title: "VERIFIKASI & PENILAIAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA",
              icon: "mdi-clover",
              route: "/page-under-construction",
              type: "item",
            },
            {
              title: "SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/verifikator-sinovic",
              type: "item",
            },
            {
              title: "KOMPETISI",
              icon: "mdi-trophy",
              route: "/verifikator-kompetisi",
              type: "item",
            },
          ],
        },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "provinsi") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
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
          submenus: [
            {
              title: "Master OPD",
              icon: "mdi-home-account",
              route: "/master-data-opd-provinsi",
              type: "item",
            },
          ],
        },
        // {
        //   title: "PERMOHONAN",
        //   icon: "settings",
        //   route: "/",
        //   type: "subMenu",
        //   submenus: [
        //     {
        //       title: "Profil Pemda",
        //       icon: "mdi-account-box-outline",
        //       route: "/permohonan-profile",
        //       type: "item",
        //     },
        //     {
        //       title: "IGA | IID",
        //       icon: "mdi-clover",
        //       route: "/permohonan-opd-iga",
        //       type: "item",
        //     },
        //     {
        //       title: "SINOVIC",
        //       icon: "mdi-gamepad-circle",
        //       route: "/permohonan-opd-sinovic",
        //       type: "item",
        //     },
        //     {
        //       title: "Klinik Konsultasi",
        //       icon: "mdi-face-agent",
        //       route: "/permohonan-message",
        //       type: "item",
        //     },
        //   ],
        // },
        {
          title: "INOVASI",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA",
              icon: "mdi-clover",
              route: "/page-under-construction",
              type: "item",
            },
            {
              title: "SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/verifikasi-provinsi-sinovic",
              type: "item",
            },
            {
              title: "KOMPETISI",
              icon: "mdi-trophy",
              route: "/verifikasi-provinsi-kompetisi",
              type: "item",
            },
          ],
        },

        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Manajemen Pengguna",
              icon: "engineering",
              route: "/utility-manajemen-user-provinsi",
              type: "item",
            },
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "provinsi-opd") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },
        {
          title: "",
          type: "divider",
        },

        {
          title: "PERMOHONAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA | IID",
              icon: "mdi-clover",
              route: "/permohonan-opd-iga",
              type: "item",
            },
            {
              title: "KIPP | SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/permohonan-opd-sinovic",
              type: "item",
            },
            {
              title: "Klinik Konsultasi",
              icon: "mdi-face-agent",
              route: "/permohonan-message",
              type: "item",
            },
          ],
        },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "kabkota") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
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
          submenus: [
            {
              title: "Master OPD",
              icon: "mdi-home-account",
              route: "/master-data-opd-kabkota",
              type: "item",
            },
          ],
        },
        {
          title: "INOVASI",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA",
              icon: "mdi-clover",
              route: "/page-under-construction",
              type: "item",
            },
            {
              title: "SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/verifikasi-provinsi-sinovic",
              type: "item",
            },
            {
              title: "KOMPETISI",
              icon: "mdi-trophy",
              route: "/kabkota-kompetisi",
              type: "item",
            },
          ],
        },

        // {
        //   title: "VERIFIKASI",
        //   icon: "settings",
        //   route: "/",
        //   type: "subMenu",
        //   submenus: [
        //     {
        //       title: "IGA",
        //       icon: "mdi-clover",
        //       route: "/permohonan-inovasi-opd",
        //       type: "item",
        //     },
        //     {
        //       title: "SINOVIC",
        //       icon: "mdi-gamepad-circle",
        //       route: "/verifikasi-kabkota-sinovic",
        //       type: "item",
        //     },
        //     // {
        //     //   title: "Seluruh Inovasi Daerah",
        //     //   icon: "mdi-book-open-variant",
        //     //   route: "/permohonan-inovasi-admin",
        //     //   type: "item",
        //     // },
        //     {
        //       title: "Klinik Konsultasi",
        //       icon: "mdi-face-agent",
        //       route: "/permohonan-message",
        //       type: "item",
        //     },
        //   ],
        // },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Manajemen Pengguna",
              icon: "engineering",
              route: "/utility-manajemen-user-kabkota",
              type: "item",
            },
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "kabkota-opd") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/dashboard",
        },
        {
          title: "",
          type: "divider",
        },

        {
          title: "PERMOHONAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "IGA | IID",
              icon: "mdi-clover",
              route: "/permohonan-opd-iga",
              type: "item",
            },
            {
              title: "SINOVIC",
              icon: "mdi-gamepad-circle",
              route: "/permohonan-opd-sinovic",
              type: "item",
            },
            {
              title: "Klinik Konsultasi",
              icon: "mdi-face-agent",
              route: "/permohonan-message",
              type: "item",
            },
          ],
        },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
            {
              title: "Ganti Kata Sandi",
              icon: "vpn_key",
              route: "/chngpwd",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }

    if (authent == "kompetisi") {
      menus = [
        {
          title: "Dashboard",
          type: "item",
          icon: "mdi-view-dashboard",
          route: "/permohonan-public-dashboard",
        },
        {
          title: "",
          type: "divider",
        },

        {
          title: "PERMOHONAN",
          icon: "settings",
          route: "/",
          type: "subMenu",
          submenus: [
            {
              title: "Kompetisi",
              icon: "mdi-trophy",
              route: "/permohonan-public-kompetisi",
              type: "item",
            },
            {
              title: "Klinik Konsultasi",
              icon: "mdi-face-agent",
              route: "/permohonan-message",
              type: "item",
            },
          ],
        },
        {
          title: "UTILITAS",
          type: "subMenu",
          route: "/",
          submenus: [
            {
              title: "Profil Pengguna",
              icon: "accessibility",
              route: "/profil-akun",
              type: "item",
            },
          ],
        },
      ];
      return menus;
    }
  }
}
