# Project Plan - Dog Owner App

## Fase 1: Fundacao (MVP)
- [x] Pesquisa de racas (dados estruturados em /data)
- [ ] Decisao do tech stack
- [ ] Setup do projeto (React Native / Flutter + backend)
- [ ] Tela de catalogo de racas com busca
- [ ] Tela de detalhe da raca
- [ ] Filtros por porte, energia, aptidao para apto

## Fase 2: Funcionalidades Core
- [ ] Comparador de racas
- [ ] Guia de cuidados por raca
- [ ] Calculadora (idade humana, porte de comida)
- [ ] Autenticacao de usuarios
- [ ] Perfil do pet do usuario

## Fase 3: Comunidade e Saude
- [ ] Feed da comunidade
- [ ] Calendario de vacinas e lembretes
- [ ] Historico de saude do pet
- [ ] Veterinarios proximos (geolocalizacao)

## Fase 4: Lancamento e Iteracao
- [ ] Testes e QA
- [ ] Publicacao nas lojas (App Store + Google Play)
- [ ] Analytics e feedback
- [ ] Versao 2.0 com novas features

## Estrutura de Dados

### breed (raca)
- id, name, size, weight_range, height_range, life_span
- origin, temperament[], energy_level, grooming_needs, shedding_level
- trainability, barking_level, apartment_friendly
- good_with_children, good_with_other_dogs
- description, health_issues[], image_url

### user (usuario)
- id, name, email, avatar
- pets[] (referencia aos pets do usuario)

### pet (pet do usuario)
- id, name, breed_id, birth_date, weight, photo
- vaccines[], vet_visits[], medications[]