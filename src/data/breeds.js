const breeds = [
    {
        "id":  "chihuahua",
        "name":  "Chihuahua",
        "name_en":  "Chihuahua",
        "size":  "small",
        "weight_min":  1,
        "weight_max":  3,
        "height_min":  15,
        "height_max":  23,
        "life_min":  12,
        "life_max":  20,
        "origin":  "Mexico",
        "temperament":  [
                            "alerta",
                            "corajoso",
                            "leal",
                            "vivaz"
                        ],
        "good_with_children":  false,
        "good_with_other_dogs":  "moderate",
        "energy_level":  3,
        "grooming_needs":  2,
        "shedding_level":  2,
        "trainability":  3,
        "barking_level":  4,
        "apartment_friendly":  true,
        "description":  "Menor raca do mundo, corpo compacto e personalidade forte. Muito apegado ao tutor.",
        "health_issues":  [
                              "luxacao de patela",
                              "problemas cardiacos",
                              "hipoglicemia",
                              "traqueia colapsada"
                          ]
    },
    {
        "id":  "poodle-toy",
        "name":  "Poodle Toy",
        "name_en":  "Poodle Toy",
        "size":  "small",
        "weight_min":  2,
        "weight_max":  4,
        "height_min":  20,
        "height_max":  28,
        "life_min":  12,
        "life_max":  18,
        "origin":  "Franca",
        "temperament":  [
                            "inteligente",
                            "afetuoso",
                            "ativo",
                            "elegante"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  3,
        "grooming_needs":  4,
        "shedding_level":  1,
        "trainability":  5,
        "barking_level":  3,
        "apartment_friendly":  true,
        "description":  "Considerado uma das racas mais inteligentes. Hipoalergenico e muito versatil.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "luxacao de patela",
                              "doenca de Legg-Calve-Perthes"
                          ]
    },
    {
        "id":  "yorkshire-terrier",
        "name":  "Yorkshire Terrier",
        "name_en":  "Yorkshire Terrier",
        "size":  "small",
        "weight_min":  2,
        "weight_max":  4,
        "height_min":  15,
        "height_max":  20,
        "life_min":  12,
        "life_max":  16,
        "origin":  "Inglaterra",
        "temperament":  [
                            "energetico",
                            "teimoso",
                            "corajoso",
                            "carinhoso"
                        ],
        "good_with_children":  "moderate",
        "good_with_other_dogs":  true,
        "energy_level":  4,
        "grooming_needs":  4,
        "shedding_level":  1,
        "trainability":  3,
        "barking_level":  4,
        "apartment_friendly":  true,
        "description":  "Pequeno mas cheio de personalidade. Pelagem longa e sedosa, sem subpelo.",
        "health_issues":  [
                              "luxacao de patela",
                              "colapso de traqueia",
                              "problemas dentarios"
                          ]
    },
    {
        "id":  "lulu-pomerania",
        "name":  "Lulu da Pomerania",
        "name_en":  "Pomeranian",
        "size":  "small",
        "weight_min":  1,
        "weight_max":  4,
        "height_min":  15,
        "height_max":  22,
        "life_min":  12,
        "life_max":  16,
        "origin":  "Alemanha",
        "temperament":  [
                            "vivaz",
                            "inteligente",
                            "extrovertido",
                            "alerta"
                        ],
        "good_with_children":  "moderate",
        "good_with_other_dogs":  true,
        "energy_level":  4,
        "grooming_needs":  3,
        "shedding_level":  4,
        "trainability":  4,
        "barking_level":  4,
        "apartment_friendly":  true,
        "description":  "Pequeno com juba de leao. Personalidade extrovertida e latido alerta.",
        "health_issues":  [
                              "luxacao de patela",
                              "colapso de traqueia",
                              "alopecia X",
                              "problemas dentarios"
                          ]
    },
    {
        "id":  "shih-tzu",
        "name":  "Shih Tzu",
        "name_en":  "Shih Tzu",
        "size":  "small",
        "weight_min":  4,
        "weight_max":  7,
        "height_min":  20,
        "height_max":  28,
        "life_min":  10,
        "life_max":  16,
        "origin":  "China",
        "temperament":  [
                            "amigavel",
                            "tranquilo",
                            "carinhoso",
                            "brincalhao"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  2,
        "grooming_needs":  4,
        "shedding_level":  1,
        "trainability":  3,
        "barking_level":  2,
        "apartment_friendly":  true,
        "description":  "Criado para ser cao de companhia na realeza chinesa. Hipoalergenico.",
        "health_issues":  [
                              "sindrome braquicefalica",
                              "problemas oculares",
                              "alergias de pele",
                              "infeccoes de ouvido"
                          ]
    },
    {
        "id":  "maltes",
        "name":  "Maltes",
        "name_en":  "Maltese",
        "size":  "small",
        "weight_min":  2,
        "weight_max":  4,
        "height_min":  20,
        "height_max":  25,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Malta",
        "temperament":  [
                            "doce",
                            "brincalhao",
                            "afetuoso",
                            "esperto"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  3,
        "grooming_needs":  4,
        "shedding_level":  1,
        "trainability":  3,
        "barking_level":  3,
        "apartment_friendly":  true,
        "description":  "Pelagem branca e sedosa, olhos escuros e expressivos. Excelente companhia.",
        "health_issues":  [
                              "luxacao de patela",
                              "problemas oculares",
                              "alergias",
                              "shunt hepatico"
                          ]
    },
    {
        "id":  "pinscher-miniatura",
        "name":  "Pinscher Miniatura",
        "name_en":  "Miniature Pinscher",
        "size":  "small",
        "weight_min":  3,
        "weight_max":  5,
        "height_min":  25,
        "height_max":  30,
        "life_min":  12,
        "life_max":  16,
        "origin":  "Alemanha",
        "temperament":  [
                            "alerta",
                            "destemido",
                            "ativo",
                            "independente"
                        ],
        "good_with_children":  "moderate",
        "good_with_other_dogs":  "moderate",
        "energy_level":  5,
        "grooming_needs":  1,
        "shedding_level":  2,
        "trainability":  3,
        "barking_level":  4,
        "apartment_friendly":  true,
        "description":  "Confunde-se com Dobermann em miniatura. Extremamente energetico e alerta.",
        "health_issues":  [
                              "luxacao de patela",
                              "doenca de Legg-Calve-Perthes",
                              "hipotireoidismo"
                          ]
    },
    {
        "id":  "bulldog-frances",
        "name":  "Bulldog Frances",
        "name_en":  "French Bulldog",
        "size":  "small",
        "weight_min":  8,
        "weight_max":  14,
        "height_min":  28,
        "height_max":  33,
        "life_min":  10,
        "life_max":  14,
        "origin":  "Franca",
        "temperament":  [
                            "brincalhao",
                            "afetuoso",
                            "sociavel",
                            "tranquilo"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  2,
        "grooming_needs":  1,
        "shedding_level":  3,
        "trainability":  3,
        "barking_level":  2,
        "apartment_friendly":  true,
        "description":  "Orelhas de morcego e corpo compacto. Personalidade amorosa e engraçada.",
        "health_issues":  [
                              "sindrome braquicefalica",
                              "displasia coxofemoral",
                              "alergias de pele",
                              "problemas de coluna"
                          ]
    },
    {
        "id":  "lhasa-apso",
        "name":  "Lhasa Apso",
        "name_en":  "Lhasa Apso",
        "size":  "small",
        "weight_min":  5,
        "weight_max":  7,
        "height_min":  25,
        "height_max":  28,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Tibete",
        "temperament":  [
                            "reservado",
                            "leal",
                            "alerta",
                            "independente"
                        ],
        "good_with_children":  "moderate",
        "good_with_other_dogs":  "moderate",
        "energy_level":  2,
        "grooming_needs":  4,
        "shedding_level":  1,
        "trainability":  3,
        "barking_level":  4,
        "apartment_friendly":  true,
        "description":  "Antigo cao de guarda de templos tibetanos. Pelagem longa e densa.",
        "health_issues":  [
                              "problemas oculares",
                              "displasia renal",
                              "alergias de pele",
                              "luxacao de patela"
                          ]
    },
    {
        "id":  "bichon-frise",
        "name":  "Bichon Frise",
        "name_en":  "Bichon Frise",
        "size":  "small",
        "weight_min":  5,
        "weight_max":  8,
        "height_min":  23,
        "height_max":  30,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Franca",
        "temperament":  [
                            "alegre",
                            "sociavel",
                            "brincalhao",
                            "afetuoso"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  3,
        "grooming_needs":  4,
        "shedding_level":  1,
        "trainability":  4,
        "barking_level":  3,
        "apartment_friendly":  true,
        "description":  "Pelagem branca e cacheada, semblante alegre. Hipoalergenico e muito sociável.",
        "health_issues":  [
                              "alergias",
                              "luxacao de patela",
                              "catarata",
                              "infeccoes de ouvido"
                          ]
    },
    {
        "id":  "beagle",
        "name":  "Beagle",
        "name_en":  "Beagle",
        "size":  "medium",
        "weight_min":  10,
        "weight_max":  12,
        "height_min":  33,
        "height_max":  40,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Inglaterra",
        "temperament":  [
                            "curioso",
                            "amigavel",
                            "alegre",
                            "determinado"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  4,
        "grooming_needs":  1,
        "shedding_level":  3,
        "trainability":  2,
        "barking_level":  3,
        "apartment_friendly":  "moderate",
        "description":  "Farejador nato, olfato muito aguçado. Amigavel e otimo com criancas.",
        "health_issues":  [
                              "obesidade",
                              "epilepsia",
                              "hipotireoidismo",
                              "displasia coxofemoral"
                          ]
    },
    {
        "id":  "cocker-spaniel",
        "name":  "Cocker Spaniel Ingles",
        "name_en":  "English Cocker Spaniel",
        "size":  "medium",
        "weight_min":  12,
        "weight_max":  15,
        "height_min":  38,
        "height_max":  41,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Inglaterra",
        "temperament":  [
                            "gentil",
                            "afetuoso",
                            "inteligente",
                            "alegre"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  4,
        "grooming_needs":  3,
        "shedding_level":  3,
        "trainability":  4,
        "barking_level":  2,
        "apartment_friendly":  true,
        "description":  "Orelhas longas e olhos expressivos. Excelente cao de familia.",
        "health_issues":  [
                              "infeccoes de ouvido",
                              "problemas oculares",
                              "displasia coxofemoral",
                              "alergias de pele"
                          ]
    },
    {
        "id":  "border-collie",
        "name":  "Border Collie",
        "name_en":  "Border Collie",
        "size":  "medium",
        "weight_min":  12,
        "weight_max":  20,
        "height_min":  46,
        "height_max":  56,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Escocia/Inglaterra",
        "temperament":  [
                            "inteligente",
                            "energetico",
                            "pastoril",
                            "obediente"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  "moderate",
        "energy_level":  5,
        "grooming_needs":  2,
        "shedding_level":  4,
        "trainability":  5,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Considerado o cao mais inteligente do mundo. Energia sem limites.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "anomalia ocular do collie",
                              "epilepsia",
                              "sindrome de cauda fria"
                          ]
    },
    {
        "id":  "bulldog-ingles",
        "name":  "Bulldog Ingles",
        "name_en":  "English Bulldog",
        "size":  "medium",
        "weight_min":  18,
        "weight_max":  25,
        "height_min":  31,
        "height_max":  40,
        "life_min":  8,
        "life_max":  12,
        "origin":  "Inglaterra",
        "temperament":  [
                            "calmo",
                            "corajoso",
                            "amigavel",
                            "determinado"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  1,
        "grooming_needs":  1,
        "shedding_level":  3,
        "trainability":  2,
        "barking_level":  1,
        "apartment_friendly":  true,
        "description":  "Corpo robusto e enrugado. Personalidade calma e afetuosa.",
        "health_issues":  [
                              "sindrome braquicefalica",
                              "displasia coxofemoral",
                              "alergias de pele",
                              "problemas cardiacos"
                          ]
    },
    {
        "id":  "shar-pei",
        "name":  "Shar Pei",
        "name_en":  "Shar Pei",
        "size":  "medium",
        "weight_min":  18,
        "weight_max":  25,
        "height_min":  44,
        "height_max":  51,
        "life_min":  8,
        "life_max":  12,
        "origin":  "China",
        "temperament":  [
                            "reservado",
                            "leal",
                            "independente",
                            "protetor"
                        ],
        "good_with_children":  false,
        "good_with_other_dogs":  "moderate",
        "energy_level":  2,
        "grooming_needs":  1,
        "shedding_level":  1,
        "trainability":  2,
        "barking_level":  2,
        "apartment_friendly":  true,
        "description":  "Pele enrugada e lingua azul-escura. Reservado com estranhos.",
        "health_issues":  [
                              "febre do shar pei",
                              "alergias de pele",
                              "hipotireoidismo",
                              "problemas oculares"
                          ]
    },
    {
        "id":  "shiba-inu",
        "name":  "Shiba Inu",
        "name_en":  "Shiba Inu",
        "size":  "medium",
        "weight_min":  8,
        "weight_max":  12,
        "height_min":  35,
        "height_max":  43,
        "life_min":  12,
        "life_max":  16,
        "origin":  "Japao",
        "temperament":  [
                            "alerta",
                            "independente",
                            "leal",
                            "digno"
                        ],
        "good_with_children":  "moderate",
        "good_with_other_dogs":  "moderate",
        "energy_level":  3,
        "grooming_needs":  2,
        "shedding_level":  4,
        "trainability":  2,
        "barking_level":  2,
        "apartment_friendly":  true,
        "description":  "Parecido com raposa. Personalidade independente e teimosa.",
        "health_issues":  [
                              "alergias",
                              "luxacao de patela",
                              "displasia coxofemoral",
                              "hipotireoidismo"
                          ]
    },
    {
        "id":  "whippet",
        "name":  "Whippet",
        "name_en":  "Whippet",
        "size":  "medium",
        "weight_min":  11,
        "weight_max":  18,
        "height_min":  44,
        "height_max":  51,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Inglaterra",
        "temperament":  [
                            "calmo",
                            "afetuoso",
                            "rapido",
                            "gentil"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  2,
        "grooming_needs":  1,
        "shedding_level":  2,
        "trainability":  4,
        "barking_level":  1,
        "apartment_friendly":  true,
        "description":  "Galgo em miniatura. Calmo em casa e extremamente rapido ao ar livre.",
        "health_issues":  [
                              "sensibilidade a anestesia",
                              "problemas cardiacos",
                              "doenca de von Willebrand"
                          ]
    },
    {
        "id":  "basset-hound",
        "name":  "Basset Hound",
        "name_en":  "Basset Hound",
        "size":  "medium",
        "weight_min":  20,
        "weight_max":  30,
        "height_min":  28,
        "height_max":  38,
        "life_min":  10,
        "life_max":  12,
        "origin":  "Franca",
        "temperament":  [
                            "leal",
                            "paciente",
                            "teimoso",
                            "gentil"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  2,
        "grooming_needs":  1,
        "shedding_level":  3,
        "trainability":  2,
        "barking_level":  3,
        "apartment_friendly":  false,
        "description":  "Orelhas longas e olhos caidos. Olfato excepcional, superado apenas pelo Bloodhound.",
        "health_issues":  [
                              "obesidade",
                              "infeccoes de ouvido",
                              "problemas de coluna",
                              "torcao gastrica"
                          ]
    },
    {
        "id":  "corgi-pembroke",
        "name":  "Corgi Pembroke",
        "name_en":  "Pembroke Welsh Corgi",
        "size":  "medium",
        "weight_min":  10,
        "weight_max":  14,
        "height_min":  25,
        "height_max":  30,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Pais de Gales",
        "temperament":  [
                            "inteligente",
                            "pastoril",
                            "afetuoso",
                            "alerta"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  4,
        "grooming_needs":  2,
        "shedding_level":  4,
        "trainability":  5,
        "barking_level":  4,
        "apartment_friendly":  "moderate",
        "description":  "Pernas curtas e corpo alongado. Inteligente e otimo pastor.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "mielopatia degenerativa",
                              "problemas oculares",
                              "obesidade"
                          ]
    },
    {
        "id":  "samoyed",
        "name":  "Samoyeda",
        "name_en":  "Samoyed",
        "size":  "medium",
        "weight_min":  16,
        "weight_max":  30,
        "height_min":  46,
        "height_max":  56,
        "life_min":  12,
        "life_max":  14,
        "origin":  "Russia",
        "temperament":  [
                            "amigavel",
                            "sociavel",
                            "gentil",
                            "brincalhao"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  4,
        "grooming_needs":  3,
        "shedding_level":  5,
        "trainability":  4,
        "barking_level":  3,
        "apartment_friendly":  false,
        "description":  "Sorriso caracteristico e pelagem branca e fofa. Excelente cao de familia.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "atrofia progressiva da retina",
                              "problemas cardiacos"
                          ]
    },
    {
        "id":  "labrador-retriever",
        "name":  "Labrador Retriever",
        "name_en":  "Labrador Retriever",
        "size":  "large",
        "weight_min":  25,
        "weight_max":  36,
        "height_min":  55,
        "height_max":  62,
        "life_min":  10,
        "life_max":  14,
        "origin":  "Canada",
        "temperament":  [
                            "amigavel",
                            "leal",
                            "inteligente",
                            "ativo"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  4,
        "grooming_needs":  1,
        "shedding_level":  4,
        "trainability":  5,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Raca mais popular do mundo. Amoroso, brincalhao e excelente com familias.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "obesidade",
                              "atrofia progressiva da retina",
                              "otite"
                          ]
    },
    {
        "id":  "golden-retriever",
        "name":  "Golden Retriever",
        "name_en":  "Golden Retriever",
        "size":  "large",
        "weight_min":  25,
        "weight_max":  34,
        "height_min":  55,
        "height_max":  61,
        "life_min":  10,
        "life_max":  12,
        "origin":  "Escocia",
        "temperament":  [
                            "inteligente",
                            "docil",
                            "confiavel",
                            "amigavel"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  4,
        "grooming_needs":  2,
        "shedding_level":  4,
        "trainability":  5,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Pelagem dourada e sorriso cativante. Paciente e otimo com criancas.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "cancer",
                              "problemas cardiacos",
                              "atrofia progressiva da retina"
                          ]
    },
    {
        "id":  "pastor-alemao",
        "name":  "Pastor Alemao",
        "name_en":  "German Shepherd",
        "size":  "large",
        "weight_min":  22,
        "weight_max":  40,
        "height_min":  55,
        "height_max":  65,
        "life_min":  9,
        "life_max":  13,
        "origin":  "Alemanha",
        "temperament":  [
                            "corajoso",
                            "leal",
                            "inteligente",
                            "confiante"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  "moderate",
        "energy_level":  4,
        "grooming_needs":  3,
        "shedding_level":  5,
        "trainability":  5,
        "barking_level":  3,
        "apartment_friendly":  false,
        "description":  "Versatil, usado em policia e resgate. Extremamente leal a familia.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "mielopatia degenerativa",
                              "torcao gastrica",
                              "panosteite"
                          ]
    },
    {
        "id":  "rottweiler",
        "name":  "Rottweiler",
        "name_en":  "Rottweiler",
        "size":  "large",
        "weight_min":  35,
        "weight_max":  60,
        "height_min":  56,
        "height_max":  69,
        "life_min":  8,
        "life_max":  12,
        "origin":  "Alemanha",
        "temperament":  [
                            "seguro",
                            "calmo",
                            "corajoso",
                            "leal"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  "moderate",
        "energy_level":  3,
        "grooming_needs":  1,
        "shedding_level":  3,
        "trainability":  4,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Corpo poderoso e instinto protetor. Requer lideranca e socializacao.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "torcao gastrica",
                              "estenose aortica",
                              "ruptura de ligamento cruzado"
                          ]
    },
    {
        "id":  "dobermann",
        "name":  "Dobermann",
        "name_en":  "Doberman Pinscher",
        "size":  "large",
        "weight_min":  30,
        "weight_max":  40,
        "height_min":  61,
        "height_max":  71,
        "life_min":  10,
        "life_max":  12,
        "origin":  "Alemanha",
        "temperament":  [
                            "alerta",
                            "leal",
                            "inteligente",
                            "corajoso"
                        ],
        "good_with_children":  "moderate",
        "good_with_other_dogs":  "moderate",
        "energy_level":  4,
        "grooming_needs":  1,
        "shedding_level":  2,
        "trainability":  5,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Elegante e atletico. Excelente cao de guarda e companhia.",
        "health_issues":  [
                              "cardiomiopatia dilatada",
                              "doenca de von Willebrand",
                              "displasia coxofemoral",
                              "torcao gastrica"
                          ]
    },
    {
        "id":  "boxer",
        "name":  "Boxer",
        "name_en":  "Boxer",
        "size":  "large",
        "weight_min":  25,
        "weight_max":  32,
        "height_min":  53,
        "height_max":  63,
        "life_min":  10,
        "life_max":  12,
        "origin":  "Alemanha",
        "temperament":  [
                            "energetico",
                            "paciente",
                            "brincalhao",
                            "protetor"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  5,
        "grooming_needs":  1,
        "shedding_level":  2,
        "trainability":  3,
        "barking_level":  3,
        "apartment_friendly":  false,
        "description":  "Brincalhao e cheio de energia mesmo na idade adulta. Excelente com criancas.",
        "health_issues":  [
                              "cardiomiopatia",
                              "torcao gastrica",
                              "estenose aortica",
                              "hipotireoidismo"
                          ]
    },
    {
        "id":  "dalmatian",
        "name":  "Dalmata",
        "name_en":  "Dalmatian",
        "size":  "large",
        "weight_min":  20,
        "weight_max":  32,
        "height_min":  48,
        "height_max":  58,
        "life_min":  10,
        "life_max":  14,
        "origin":  "Croacia",
        "temperament":  [
                            "ativo",
                            "amigavel",
                            "inteligente",
                            "independente"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  "moderate",
        "energy_level":  4,
        "grooming_needs":  1,
        "shedding_level":  4,
        "trainability":  3,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Manchas negras unicas. Resistente e cheio de energia.",
        "health_issues":  [
                              "surdez congenita",
                              "urolitiase",
                              "alergias",
                              "displasia coxofemoral"
                          ]
    },
    {
        "id":  "fila-brasileiro",
        "name":  "Fila Brasileiro",
        "name_en":  "Brazilian Mastiff",
        "size":  "large",
        "weight_min":  40,
        "weight_max":  60,
        "height_min":  60,
        "height_max":  75,
        "life_min":  9,
        "life_max":  11,
        "origin":  "Brasil",
        "temperament":  [
                            "corajoso",
                            "leal",
                            "protetor",
                            "calmo"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  false,
        "energy_level":  3,
        "grooming_needs":  1,
        "shedding_level":  2,
        "trainability":  3,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Raca brasileira conhecida pela lealdade e instinto protetor. Ojeriza a estranhos.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "torcao gastrica",
                              "problemas de pele",
                              "obesidade"
                          ]
    },
    {
        "id":  "husky-siberiano",
        "name":  "Husky Siberiano",
        "name_en":  "Siberian Husky",
        "size":  "large",
        "weight_min":  16,
        "weight_max":  27,
        "height_min":  50,
        "height_max":  60,
        "life_min":  12,
        "life_max":  15,
        "origin":  "Siberia",
        "temperament":  [
                            "energetico",
                            "brincalhao",
                            "sociavel",
                            "teimoso"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  5,
        "grooming_needs":  2,
        "shedding_level":  5,
        "trainability":  2,
        "barking_level":  1,
        "apartment_friendly":  false,
        "description":  "Olhos azuis ou heterocromaticos. Não late, uiva. Muita energia para gastar.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "catarata",
                              "atrofia progressiva da retina",
                              "hipotireoidismo"
                          ]
    },
    {
        "id":  "belgian-malinois",
        "name":  "Pastor Belga Malinois",
        "name_en":  "Belgian Malinois",
        "size":  "large",
        "weight_min":  20,
        "weight_max":  30,
        "height_min":  56,
        "height_max":  66,
        "life_min":  12,
        "life_max":  14,
        "origin":  "Belgica",
        "temperament":  [
                            "inteligente",
                            "trabalhador",
                            "alerta",
                            "protetor"
                        ],
        "good_with_children":  "moderate",
        "good_with_other_dogs":  "moderate",
        "energy_level":  5,
        "grooming_needs":  2,
        "shedding_level":  4,
        "trainability":  5,
        "barking_level":  3,
        "apartment_friendly":  false,
        "description":  "Ultilizado por forcas especiais. Inteligencia e energia excepcionais.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "atrofia progressiva da retina",
                              "alergias",
                              "panosteite"
                          ]
    },
    {
        "id":  "mastiff-ingles",
        "name":  "Mastiff Ingles",
        "name_en":  "English Mastiff",
        "size":  "giant",
        "weight_min":  50,
        "weight_max":  86,
        "height_min":  70,
        "height_max":  91,
        "life_min":  6,
        "life_max":  10,
        "origin":  "Inglaterra",
        "temperament":  [
                            "calmo",
                            "digno",
                            "leal",
                            "protetor"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  "moderate",
        "energy_level":  1,
        "grooming_needs":  1,
        "shedding_level":  3,
        "trainability":  3,
        "barking_level":  1,
        "apartment_friendly":  false,
        "description":  "Uma das maiores racas do mundo. Gigante gentil e tranquilo.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "torcao gastrica",
                              "problemas cardiacos",
                              "obesidade"
                          ]
    },
    {
        "id":  "sao-bernardo",
        "name":  "Sao Bernardo",
        "name_en":  "Saint Bernard",
        "size":  "giant",
        "weight_min":  55,
        "weight_max":  82,
        "height_min":  65,
        "height_max":  90,
        "life_min":  8,
        "life_max":  10,
        "origin":  "Suica",
        "temperament":  [
                            "gentil",
                            "paciente",
                            "amigavel",
                            "calmo"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  2,
        "grooming_needs":  2,
        "shedding_level":  4,
        "trainability":  3,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Resgate nos Alpes. Paciente e excelente com criancas.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "torcao gastrica",
                              "problemas cardiacos",
                              "problemas oculares"
                          ]
    },
    {
        "id":  "great-dane",
        "name":  "Great Dane",
        "name_en":  "Great Dane",
        "size":  "giant",
        "weight_min":  50,
        "weight_max":  82,
        "height_min":  71,
        "height_max":  86,
        "life_min":  7,
        "life_max":  10,
        "origin":  "Alemanha",
        "temperament":  [
                            "amigavel",
                            "gentil",
                            "paciente",
                            "confiavel"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  3,
        "grooming_needs":  1,
        "shedding_level":  3,
        "trainability":  4,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Cao mais alto do mundo. Gigante gentil, otimo com familias.",
        "health_issues":  [
                              "torcao gastrica",
                              "cardiomiopatia",
                              "displasia coxofemoral",
                              "sindrome wobler"
                          ]
    },
    {
        "id":  "terra-nova",
        "name":  "Terra Nova",
        "name_en":  "Newfoundland",
        "size":  "giant",
        "weight_min":  50,
        "weight_max":  70,
        "height_min":  63,
        "height_max":  74,
        "life_min":  8,
        "life_max":  10,
        "origin":  "Canada",
        "temperament":  [
                            "docil",
                            "paciente",
                            "gentil",
                            "protetor"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  3,
        "grooming_needs":  3,
        "shedding_level":  4,
        "trainability":  4,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Pes adesivos e pelagem impermeavel. Excelente nadador de resgate.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "torcao gastrica",
                              "estenose subaortica",
                              "cistinuria"
                          ]
    },
    {
        "id":  "irish-wolfhound",
        "name":  "Irish Wolfhound",
        "name_en":  "Irish Wolfhound",
        "size":  "giant",
        "weight_min":  48,
        "weight_max":  70,
        "height_min":  71,
        "height_max":  86,
        "life_min":  6,
        "life_max":  10,
        "origin":  "Irlanda",
        "temperament":  [
                            "gentil",
                            "corajoso",
                            "calmo",
                            "digno"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  2,
        "grooming_needs":  2,
        "shedding_level":  3,
        "trainability":  4,
        "barking_level":  1,
        "apartment_friendly":  false,
        "description":  "Cao mais alto do mundo. Originalmente caeiro de lobos. Expectativa de vida curta.",
        "health_issues":  [
                              "cardiomiopatia",
                              "displasia coxofemoral",
                              "torcao gastrica",
                              "osteossarcoma"
                          ]
    },
    {
        "id":  "mastim-tibetano",
        "name":  "Mastim Tibetano",
        "name_en":  "Tibetan Mastiff",
        "size":  "giant",
        "weight_min":  45,
        "weight_max":  73,
        "height_min":  61,
        "height_max":  71,
        "life_min":  10,
        "life_max":  14,
        "origin":  "Tibete",
        "temperament":  [
                            "independente",
                            "protetor",
                            "leal",
                            "digno"
                        ],
        "good_with_children":  "moderate",
        "good_with_other_dogs":  false,
        "energy_level":  2,
        "grooming_needs":  2,
        "shedding_level":  4,
        "trainability":  2,
        "barking_level":  3,
        "apartment_friendly":  false,
        "description":  "Juba de leao e guarda noturno. Raca ancestral e independente.",
        "health_issues":  [
                              "displasia coxofemoral",
                              "hipotireoidismo",
                              "neuropatia hipertrofica",
                              "problemas oculares"
                          ]
    },
    {
        "id":  "bernese-mountain-dog",
        "name":  "Boieiro Bernes",
        "name_en":  "Bernese Mountain Dog",
        "size":  "giant",
        "weight_min":  35,
        "weight_max":  55,
        "height_min":  58,
        "height_max":  70,
        "life_min":  6,
        "life_max":  10,
        "origin":  "Suica",
        "temperament":  [
                            "calmo",
                            "afetuoso",
                            "fiel",
                            "tranquilo"
                        ],
        "good_with_children":  true,
        "good_with_other_dogs":  true,
        "energy_level":  3,
        "grooming_needs":  2,
        "shedding_level":  4,
        "trainability":  4,
        "barking_level":  2,
        "apartment_friendly":  false,
        "description":  "Pelagem tricolor marcante. Caes de fazenda suicos, amaveis e fortes.",
        "health_issues":  [
                              "cancer",
                              "displasia coxofemoral",
                              "torcao gastrica",
                              "atrofia progressiva da retina"
                          ]
    },
    {
        "id":  "chihuahua",
        "name":  "Chihuahua",
        "size":  "small",
        "weight_min":  1,
        "weight_max":  3,
        "life_min":  12,
        "life_max":  20,
        "temperament":  [
                            "alerta",
                            "corajoso",
                            "leal",
                            "vivaz"
                        ],
        "energy_level":  3,
        "apartment_friendly":  true
    },
    {
        "id":  "poodle-toy",
        "name":  "Poodle Toy",
        "size":  "small",
        "weight_min":  2,
        "weight_max":  4,
        "life_min":  12,
        "life_max":  18,
        "temperament":  [
                            "inteligente",
                            "afetuoso",
                            "ativo",
                            "elegante"
                        ],
        "energy_level":  3,
        "apartment_friendly":  true
    },
    {
        "id":  "yorkshire-terrier",
        "name":  "Yorkshire Terrier",
        "size":  "small",
        "weight_min":  2,
        "weight_max":  4,
        "life_min":  12,
        "life_max":  16,
        "temperament":  [
                            "energetico",
                            "teimoso",
                            "corajoso",
                            "carinhoso"
                        ],
        "energy_level":  4,
        "apartment_friendly":  true
    },
    {
        "id":  "lulu-pomerania",
        "name":  "Lulu da Pomerania",
        "size":  "small",
        "weight_min":  1,
        "weight_max":  4,
        "life_min":  12,
        "life_max":  16,
        "temperament":  [
                            "vivaz",
                            "inteligente",
                            "extrovertido",
                            "alerta"
                        ],
        "energy_level":  4,
        "apartment_friendly":  true
    },
    {
        "id":  "shih-tzu",
        "name":  "Shih Tzu",
        "size":  "small",
        "weight_min":  4,
        "weight_max":  7,
        "life_min":  10,
        "life_max":  16,
        "temperament":  [
                            "amigavel",
                            "tranquilo",
                            "carinhoso",
                            "brincalhao"
                        ],
        "energy_level":  2,
        "apartment_friendly":  true
    },
    {
        "id":  "maltes",
        "name":  "Maltes",
        "size":  "small",
        "weight_min":  2,
        "weight_max":  4,
        "life_min":  12,
        "life_max":  15,
        "temperament":  [
                            "doce",
                            "brincalhao",
                            "afetuoso",
                            "esperto"
                        ],
        "energy_level":  3,
        "apartment_friendly":  true
    },
    {
        "id":  "pinscher-miniatura",
        "name":  "Pinscher Miniatura",
        "size":  "small",
        "weight_min":  3,
        "weight_max":  5,
        "life_min":  12,
        "life_max":  16,
        "temperament":  [
                            "alerta",
                            "destemido",
                            "ativo",
                            "independente"
                        ],
        "energy_level":  5,
        "apartment_friendly":  true
    },
    {
        "id":  "bulldog-frances",
        "name":  "Bulldog Frances",
        "size":  "small",
        "weight_min":  8,
        "weight_max":  14,
        "life_min":  10,
        "life_max":  14,
        "temperament":  [
                            "brincalhao",
                            "afetuoso",
                            "sociavel",
                            "tranquilo"
                        ],
        "energy_level":  2,
        "apartment_friendly":  true
    },
    {
        "id":  "bichon-frise",
        "name":  "Bichon Frise",
        "size":  "small",
        "weight_min":  5,
        "weight_max":  8,
        "life_min":  12,
        "life_max":  15,
        "temperament":  [
                            "alegre",
                            "sociavel",
                            "brincalhao",
                            "afetuoso"
                        ],
        "energy_level":  3,
        "apartment_friendly":  true
    },
    {
        "id":  "beagle",
        "name":  "Beagle",
        "size":  "medium",
        "weight_min":  10,
        "weight_max":  12,
        "life_min":  12,
        "life_max":  15,
        "temperament":  [
                            "curioso",
                            "amigavel",
                            "alegre",
                            "determinado"
                        ],
        "energy_level":  4,
        "apartment_friendly":  "moderate"
    },
    {
        "id":  "cocker-spaniel",
        "name":  "Cocker Spaniel Ingles",
        "size":  "medium",
        "weight_min":  12,
        "weight_max":  15,
        "life_min":  12,
        "life_max":  15,
        "temperament":  [
                            "gentil",
                            "afetuoso",
                            "inteligente",
                            "alegre"
                        ],
        "energy_level":  4,
        "apartment_friendly":  true
    },
    {
        "id":  "border-collie",
        "name":  "Border Collie",
        "size":  "medium",
        "weight_min":  12,
        "weight_max":  20,
        "life_min":  12,
        "life_max":  15,
        "temperament":  [
                            "inteligente",
                            "energetico",
                            "pastoril",
                            "obediente"
                        ],
        "energy_level":  5,
        "apartment_friendly":  false
    },
    {
        "id":  "bulldog-ingles",
        "name":  "Bulldog Ingles",
        "size":  "medium",
        "weight_min":  18,
        "weight_max":  25,
        "life_min":  8,
        "life_max":  12,
        "temperament":  [
                            "calmo",
                            "corajoso",
                            "amigavel",
                            "determinado"
                        ],
        "energy_level":  1,
        "apartment_friendly":  true
    },
    {
        "id":  "shiba-inu",
        "name":  "Shiba Inu",
        "size":  "medium",
        "weight_min":  8,
        "weight_max":  12,
        "life_min":  12,
        "life_max":  16,
        "temperament":  [
                            "alerta",
                            "independente",
                            "leal",
                            "digno"
                        ],
        "energy_level":  3,
        "apartment_friendly":  true
    },
    {
        "id":  "whippet",
        "name":  "Whippet",
        "size":  "medium",
        "weight_min":  11,
        "weight_max":  18,
        "life_min":  12,
        "life_max":  15,
        "temperament":  [
                            "calmo",
                            "afetuoso",
                            "rapido",
                            "gentil"
                        ],
        "energy_level":  2,
        "apartment_friendly":  true
    },
    {
        "id":  "corgi-pembroke",
        "name":  "Corgi Pembroke",
        "size":  "medium",
        "weight_min":  10,
        "weight_max":  14,
        "life_min":  12,
        "life_max":  15,
        "temperament":  [
                            "inteligente",
                            "pastoril",
                            "afetuoso",
                            "alerta"
                        ],
        "energy_level":  4,
        "apartment_friendly":  "moderate"
    },
    {
        "id":  "labrador-retriever",
        "name":  "Labrador Retriever",
        "size":  "large",
        "weight_min":  25,
        "weight_max":  36,
        "life_min":  10,
        "life_max":  14,
        "temperament":  [
                            "amigavel",
                            "leal",
                            "inteligente",
                            "ativo"
                        ],
        "energy_level":  4,
        "apartment_friendly":  false
    },
    {
        "id":  "golden-retriever",
        "name":  "Golden Retriever",
        "size":  "large",
        "weight_min":  25,
        "weight_max":  34,
        "life_min":  10,
        "life_max":  12,
        "temperament":  [
                            "inteligente",
                            "docil",
                            "confiavel",
                            "amigavel"
                        ],
        "energy_level":  4,
        "apartment_friendly":  false
    },
    {
        "id":  "pastor-alemao",
        "name":  "Pastor Alemao",
        "size":  "large",
        "weight_min":  22,
        "weight_max":  40,
        "life_min":  9,
        "life_max":  13,
        "temperament":  [
                            "corajoso",
                            "leal",
                            "inteligente",
                            "confiante"
                        ],
        "energy_level":  4,
        "apartment_friendly":  false
    },
    {
        "id":  "rottweiler",
        "name":  "Rottweiler",
        "size":  "large",
        "weight_min":  35,
        "weight_max":  60,
        "life_min":  8,
        "life_max":  12,
        "temperament":  [
                            "seguro",
                            "calmo",
                            "corajoso",
                            "leal"
                        ],
        "energy_level":  3,
        "apartment_friendly":  false
    },
    {
        "id":  "dobermann",
        "name":  "Dobermann",
        "size":  "large",
        "weight_min":  30,
        "weight_max":  40,
        "life_min":  10,
        "life_max":  12,
        "temperament":  [
                            "alerta",
                            "leal",
                            "inteligente",
                            "corajoso"
                        ],
        "energy_level":  4,
        "apartment_friendly":  false
    },
    {
        "id":  "boxer",
        "name":  "Boxer",
        "size":  "large",
        "weight_min":  25,
        "weight_max":  32,
        "life_min":  10,
        "life_max":  12,
        "temperament":  [
                            "energetico",
                            "paciente",
                            "brincalhao",
                            "protetor"
                        ],
        "energy_level":  5,
        "apartment_friendly":  false
    },
    {
        "id":  "husky-siberiano",
        "name":  "Husky Siberiano",
        "size":  "large",
        "weight_min":  16,
        "weight_max":  27,
        "life_min":  12,
        "life_max":  15,
        "temperament":  [
                            "energetico",
                            "brincalhao",
                            "sociavel",
                            "teimoso"
                        ],
        "energy_level":  5,
        "apartment_friendly":  false
    },
    {
        "id":  "fila-brasileiro",
        "name":  "Fila Brasileiro",
        "size":  "large",
        "weight_min":  40,
        "weight_max":  60,
        "life_min":  9,
        "life_max":  11,
        "temperament":  [
                            "corajoso",
                            "leal",
                            "protetor",
                            "calmo"
                        ],
        "energy_level":  3,
        "apartment_friendly":  false
    },
    {
        "id":  "mastiff-ingles",
        "name":  "Mastiff Ingles",
        "size":  "giant",
        "weight_min":  50,
        "weight_max":  86,
        "life_min":  6,
        "life_max":  10,
        "temperament":  [
                            "calmo",
                            "digno",
                            "leal",
                            "protetor"
                        ],
        "energy_level":  1,
        "apartment_friendly":  false
    },
    {
        "id":  "sao-bernardo",
        "name":  "Sao Bernardo",
        "size":  "giant",
        "weight_min":  55,
        "weight_max":  82,
        "life_min":  8,
        "life_max":  10,
        "temperament":  [
                            "gentil",
                            "paciente",
                            "amigavel",
                            "calmo"
                        ],
        "energy_level":  2,
        "apartment_friendly":  false
    },
    {
        "id":  "great-dane",
        "name":  "Great Dane",
        "size":  "giant",
        "weight_min":  50,
        "weight_max":  82,
        "life_min":  7,
        "life_max":  10,
        "temperament":  [
                            "amigavel",
                            "gentil",
                            "paciente",
                            "confiavel"
                        ],
        "energy_level":  3,
        "apartment_friendly":  false
    },
    {
        "id":  "terra-nova",
        "name":  "Terra Nova",
        "size":  "giant",
        "weight_min":  50,
        "weight_max":  70,
        "life_min":  8,
        "life_max":  10,
        "temperament":  [
                            "docil",
                            "paciente",
                            "gentil",
                            "protetor"
                        ],
        "energy_level":  3,
        "apartment_friendly":  false
    },
    {
        "id":  "irish-wolfhound",
        "name":  "Irish Wolfhound",
        "size":  "giant",
        "weight_min":  48,
        "weight_max":  70,
        "life_min":  6,
        "life_max":  10,
        "temperament":  [
                            "gentil",
                            "corajoso",
                            "calmo",
                            "digno"
                        ],
        "energy_level":  2,
        "apartment_friendly":  false
    },
    {
        "id":  "mastim-tibetano",
        "name":  "Mastim Tibetano",
        "size":  "giant",
        "weight_min":  45,
        "weight_max":  73,
        "life_min":  10,
        "life_max":  14,
        "temperament":  [
                            "independente",
                            "protetor",
                            "leal",
                            "digno"
                        ],
        "energy_level":  2,
        "apartment_friendly":  false
    },
    {
        "id":  "bernese-mountain-dog",
        "name":  "Boieiro Bernes",
        "size":  "giant",
        "weight_min":  35,
        "weight_max":  55,
        "life_min":  6,
        "life_max":  10,
        "temperament":  [
                            "calmo",
                            "afetuoso",
                            "fiel",
                            "tranquilo"
                        ],
        "energy_level":  3,
        "apartment_friendly":  false
    }
]

export const ALL_BREEDS = breeds

export const PORTE_MAP = {
  small: 'Pequeno',
  medium: 'Médio',
  large: 'Grande',
  giant: 'Gigante',
}

export const ENERGY_LABELS = {
  1: 'Muito baixa', 2: 'Baixa', 3: 'Moderada', 4: 'Alta', 5: 'Muito alta',
}

export const GROOMING_LABELS = {
  1: 'Mínima', 2: 'Baixa', 3: 'Moderada', 4: 'Alta', 5: 'Muito alta',
}

export function getBreedsBySize(size) {
  if (!size || size === 'all') return breeds
  return breeds.filter(b => b.size === size)
}

export function getBreedById(id) {
  return breeds.find(b => b.id === id)
}
