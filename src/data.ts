import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-20l-jar',
    name: '20L Jar',
    category: 'gallon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-0aPyiEJ9vHGRi5QhCt_cJjFMCGhlKuHtpvowwUJMV7t2U2rcZ_iGhS9-PIpcYimBdJyAJoJ_kOk-gXSQ9-LR_V1td4TRxipBM1qgx53JMdsNiAu1xKHuubmmTcnrRON0SEIYnjmIx4bMtS4z9P0FwoFDOXar9xpvKqMcsBAHWYEuudery2UcIy6fFhFFE6BMRFVWO-cfZLYUs2mbZwzVrqN9EvEdqTjW3dLJTpVQiBwMVShGA_bnHqrPqY0XJfGGZ8P5mlFZR5LN',
    subtext: 'Packaged Drinking Water',
    price: 50,
    isBestValue: true
  },
  {
    id: 'prod-2l-case',
    name: '2L Bottle Case (Pack of 6)',
    category: 'mineral',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSd7NkKGnhmLZ1G7dJbOyLEgqJ46meA2h2W2YvYZSJTfU5WCvfIval20nYgZ31MgWYc5-nym9P3xT0GCC0PtiwVT9wo14_PM3n18BDQgpK8A-yVpEXa5MrDz5wWTYTzaFQHHXjQL18rt4dooJMkeg_e-Hm7AB6Yr4rGusg9u0eaoXML2gnc3-nqzIRzYjKcyL3iX3w7KaolnWiMO6kkChGx2AXf4zvmaDLb1lkMcHGzgmpcICGrXEetY69RWJ1aWB7-JpzWuGQUn2-',
    subtext: 'Packaged Drinking Water',
    price: 110
  },
  {
    id: 'prod-1l-case',
    name: '1L Bottle Case (Pack of 12)',
    category: 'mineral',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALHwnqBTigdGnIs01r5N5fiEgC0Yn0USzTf9a0_isSEGhK1Tfdb6KWqtQuZR_ah597OWvxHdvKdk8RuhybKVORFdAP_ARgQ_ort3ryYEiJ1PDfS9fjU6Zrpx7qOioNdN_hd2aeFEXrS_t2b_tn3ZmLeCRA_7x0M9hww6VWeEQKvw2vblcjozkaxBso55VxgksMnUVOGKFgOkAYbmmG9hW2nKDY95TtGArV8hjEiNxdkfDlZhmOitWU5OK3dO7tIQ2oWmwACvzJLOBm',
    subtext: 'Packaged Drinking Water',
    price: 90
  },
  {
    id: 'prod-500ml-case',
    name: '500ml Bottle Case (Pack of 24)',
    category: 'sparkling',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJIRbTS-AcJFLfQYsep7EG5-OLB5QZ0jXG1vD_OQmlpfnUruaL0qMeNPCrnzJqcdZHdG1KVa5QQSRWrHlZ4z2miR7VgQXJCEjuJ5OSm1K0cYfs9mr5OezaBqXHFkM6nPC5nFImxTGNH8rVibvBnD1gGYZ2LokdEgKPiV66X9RUd-Mz1mQedQB7wdC_uu5SMSuD0fl38j4uJoFv6jIHLLqNP6AK3lJn2E7Md68BB6AqPmco3-EVCRG3aEWZLajJWkBEa9cE9kVqBRrq',
    subtext: 'Packaged Drinking Water',
    price: 120
  },
  {
    id: 'prod-250ml-case',
    name: '250ml Bottle Case (Pack of 40)',
    category: 'distilled',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo05wym4EUWSDbc04OdkrYtM04kdB9NYTE-BzW4A7eaFqYjNnOSNFByh_2sdN7J3qK2c4PhuPLzbvds-4BmUdY46gDIVqtWNSsDp34-ufR7ArLr5SjJ57mjyUTQnoJI4sga6wzR3dtGQTOpVhYmXQbs6K170DOVBNoA3f_HT5jDl_HM6e6Mr7t6pz_f631yvXrMW-CSsG2NyX6zDp0ZSTBFi6y-1KOA54hD3Op1Roopcv1UmO3DLJada7DbsA8U3a1hJ65VSzwYrN9',
    subtext: 'Packaged Drinking Water',
    price: 140
  }
];

// Special images for UI elements
export const IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7QELO13cKo5gcLNZU7izKesPgawWMBO4dwCLxcHIJ61JyuGid9BH4Kzm2HLWI_eFJqVBkdFND0W5H05JsYfF_S4qJ0tvc7YX9XzhSzlr8QWnwbN-BWWO3M76D8NPsCqSdHDP9qVES5neBwTT3xJl1-unUCScUd0OQv_lvsy8_-fgt9yRbAY5z-PdDRUxlukQjuFVXFuJotk7I2nM_INIKLV34DJ1ajMecn8wQuYGxyBnAF3yIGqIuVVh6pSEsIjN5SQ5QuDXGX4gT',
  userFace: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRO9qmJkSsu5pfsMwUYy5z9B8gzOfvnHF7DIJAsOTvYYxzY6iKv4ZX6DaYUusTCakDs1rkDlA6iMe21TFbe-kyafdcnpPmCNzR6dRIjSCQCALW2pyYqgBZ9hkc8ZFWbfPpftqchz_bmGVuNVuIN3l-0Gj089gIphuVBMPNNfu74-s6IleNYzX3xwpyEpQM3PG8-xIsQrAEGZ3f7caHjyWqMzi-1ljkU0KxQMQz8VSANsR6-f7vpu-p2XAQYRziGrbIVRZEekXoaAGc',
  retailUserFace: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9amzxfVU_Zc5e1aav-w6HZkjY0PoHdapXj_jdMNblkt6t5TgyqmCAj7O5lVs04hHV434hIwWnYCc9WyIKrPgtPnObJ2ClbJ-UoaI_ghC0ubWgM0Ove5PZHagN-Rw9LX_Wx5xF6Wm-nXB-zj0ycJU3_4ViLQ4AYFDIq0G2Eb6GxNC26f_mNy1XhnF1p3RYv198R2fralOUPXEhc-IlHbtuaWPMv_Vgs4TixgW6r3gIg0784399rDUAZi_Z9dYwDM6ybbVJC3UlGHWS',
  driver: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2YYUTaZvKF_MA2BYEsFfUN5uC_RQSd-cQ8WV1qJUxgZ-e4BcxL07RK-uCZpL34fs29V46ZPLDXHMwXnDk8RmIfGQmJhHbS4FCfQgoqatHy81Ap0-ai3sQCDXj7f7KPfuCvwrcfLCdn-PeU_SJvX3t9lGgE03bLCWjCJ-Dgdx12oJEfBf50yo0sqtMe9oQaeBYzqzxaQ0PUweBDt-YhO215ZdQIhW3hJ_HzdNOAtPXlc3_bN1pirj9mf10o2RIcJwKTX-Gg9SHT1zk',
  mapFallback: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3qzs35dzdkpLGONDGbNIb3G7YqKG-OIBmWyI-vTWbCkNVnBbpWULWoxXqsDb59sWS8L5wFHduIfQXUfBQbbgj6z8rTgWIHhwTJFwYNzcvyJbbByEaRvvkK8cQZViVPykBtyUGLS6OV5UKH_MH2TgRMma32v0XAKiYQBvRvAXFlLaKP3qv4crWBbzkjUMZbh2uODqEKahkWTjPzJIWNQe1K8Ytt-fmsvsg2jkYN-d-0Bhb-e4hmJg9PhRRnc3T7OMcrOb9KoRTOWlp',
  candidMartBannerLogo: 'https://lh3.googleusercontent.com/aida/AP1WRLspzLd5UbJnPCIHt-r95El6VRa8zTu7ElGTJ72vAvfOYti78OKfT0XUYfIHcaukNUg99nCW6T7YRay942dd15fusRJE4uyvEfTrv4okQV9vo0_KOBbznD9z37L68xunjvEA-ErAdtalCMHBfkOA2QhVnVfFICKD0PapQYk_LMS4bAaqn1nHzFpgirP6C_0PH17BF9Np-uGYTCQ6z1PoxvBm70BDYgm6IXKOge2geoJroMakU6go2GIYI7qn_',
  retailWaterJarProduct: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtXifsUkgHHWg4vCC7JLHt_5Jsof_VVJEBceIgge-BFgW0XrzL83uMLfUDxvywZU2-gVEBGbgC263MC0Jue-aipF52pL9RLUirpJ4nhF1fPKfbFNPlKkX7CHVk8-qk-Wl1OLVLebO6QytgOeD3hAofywwxxNaT7vhNg2aO6U7Aotoz1S_DyjqUdYqLLPLB-dhmgLwqyD4tEC7cIFs5q-2zmM3jeQBCr7m30HfXWyyjq0gwbLJco4VGuFi_y-EF0cXsjdwUMu5k84ea',
  retailCaseProduct: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9JzaYqnvAEHPjduDCQ6myU8kgdrmmBNdWmxwull844Tn9SwAQblosm315Q8IrIZTjti45ixBc8DCjD5lvbPIkfWselGUq4pRn00vU9OM_Jn1z5taoO3lZ4JQLMvtLeYLuZnY30fikW1rO13idqldXArr3smphpAf570V-NPI6Uq41KOzxYS5LT9W-2iOJ8nded4yj7rmpNLt8QYww9ZgOAIEE1aXeQm9h2g33diHap6AufKjIZ9WQLPr_lqr3O3ggfptWh-K8kyaJ',
  cartJarProduct: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFZOhMKQPTFYWGWBRWc9Ehd-Uhjkux8AYTX0mUKa97kavmxAviUS07WtOW04fJ7OLWqyIwfmFAPENuayWO4pPEP4O5X1OeNFqJtRhKeFvsdoG4ff9LHU-g-c2DKyuHTV6MOpwYOki3pI5pRjWEDz1de5yhxhSb2k7donDMN76H0-Mx89hIEMCIFRvHweVdtvP_-d3ctUJd0OT-tsm6iQma_LZBVHTLZalSjBK8BWSv5EF1Di7W-gAgrQp-797gwxylBLGGCVzsZ-xR',
  cartCaseProduct: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNRjN_nFoalN5iK4OC46ciOs0Y1kXJqvI5eWATcfHjnebKwrmZRVCIx_wAVe7Js0e87Zp8uO-fXD1rLXkk4cjm7MIEpGeR7mZwLj2rqbM1sRRFo97ZnOXX7Gv7Jx6fg-lq3VTdKDor10Ez0wlggQ3LdVsTpxZkkIxYEQMVyelDHgjb2rEiUOQDbEXRp1bdNOY6lmGe0vwR394-Kqz4mfJyMF0cik73c3zDy7z2MNLrIWhVMvbkWGAoxpYrLFRGxRFXyFX-HkSFacW_',
  cartTopRightUserFace: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXDXOw1pOflGX1pwgJFlcZIYDYinabYXd8wf2IB7Xdkj1pgFYc7snHDI2iEpa_d5Uvh4gDyNpMVL3Tln4bRjv-DELJ_FG7q6P2HYSQ0m1YEpbZto7q5v_tLVZ5de5XaR_yGH7QpSlW_ta_teN1HfUA37x2pD-ZL-o4lT1ZjFjOGJ64M3zTLphwkRTm0acOTqMj-_wIKBNhQarmQgd127boXWhD56YpSLe7VHkXzC00nEF3cT-Lb1QRE0cUxo3zmzMEM8anHcZooTWV',
  trackOrderMineralWater: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJpfl9uipJjwZUtVJKzh_a1YYTdCNV1C78OiUGJc5YYY53J03AfNsQFsVHd4tvrY9G11P97ejk3KrZpfaSdLx1nDLhVzf82u2A8aiXKAmGMAH9a2GjpPS8bxwUvkAQZLPsDrwmEmXMGwFbfhcNRJ4ZcsjGNv_VnT3ZV56dMZxn20zDGALZmPaimdhTH6h5ywKFSI7R1SxXaxgioJMD9quCROF-85Uf7L0ttnc44Tg1IZcLM4WLJuZxkm5N6SQK_2NmeA3qFDcnqWnD'
};
