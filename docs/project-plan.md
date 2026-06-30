# Project Plan - Dog Owner App

## Fase 1: Fundacao (MVP)
- [x] Pesquisa de racas (dados estruturados em /data)
- [x] Pesquisa de nutricao canina (formulas e fatores em /docs e /data)
- [ ] Decisao do tech stack
- [ ] Setup do projeto
- [ ] Catalogo de racas com busca e filtros
- [ ] Tela de detalhe da raca
- [ ] Calculadora de dieta (RER/MER)

## Fase 2: Funcionalidades Core
- [ ] Calculadora avancada de dieta (com ECC, tipo alimento, densidade)
- [ ] Comparador de racas
- [ ] Guia de cuidados por raca
- [ ] Calculadora de idade humana
- [ ] Autenticacao e perfis

## Fase 3: Saude e Nutricao
- [ ] Plano alimentar personalizado por refeicao
- [ ] Sugestao de racas por perfil do usuario
- [ ] Feed da comunidade
- [ ] Calendario de vacinas e lembretes
- [ ] Historico de saude do pet

## Fase 4: Lancamento
- [ ] Testes e QA
- [ ] Publicacao App Store + Google Play
- [ ] Analytics e feedback

## Estrutura de Dados

### breed (raca)
- id, name, size, weight_range, height_range, life_span
- origin, temperament[], energy_level, grooming_needs, etc.

### nutrition_info
- breed_id, size_category, metabolism_factor
- senior_age_threshold, health_risks[]

### pet (pet do usuario)
- id, name, breed_id, birth_date, weight_kg, photo
- neutered, sex, activity_level, bcs_score
- diet_goal, food_type, food_caloric_density
- vaccines[], vet_visits[], medications[]

### diet_plan (plano alimentar)
- pet_id, date, rer_kcal, mer_kcal
- food_grams_per_day, food_grams_per_meal
- meals_per_day, protein_g, fat_g, water_ml