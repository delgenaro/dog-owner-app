# Guia de Nutricao Canina - Calculo de Dieta

Baseado em fontes cientificas (Purina Institute, APOP, WSAVA, NRC, AAHA).

## Formula Principal

### RER (Resting Energy Requirement)
RER = 70 x (peso_kg ^ 0.75)

### MER (Maintenance Energy Requirement)
MER = RER x Fator Multiplicador

## Fatores Multiplicadores

| Estagio | Fator | Observacao |
|---|---|---|
| Filhote < 4 meses | 3.0 x RER | Crescimento acelerado |
| Filhote >= 4 meses | 2.0 x RER | Crescimento moderado |
| Adulto nao castrado | 1.6 - 1.8 x RER | Inteiro |
| Adulto castrado | 1.4 - 1.6 x RER | Castrado reduz metabolismo |
| Sedentario / Obeso | 1.0 - 1.2 x RER | Risco de obesidade |
| Perda de peso | 1.0 x RER (peso ideal) | Calc sobre peso ideal |
| Ganho de peso | 1.2 - 1.8 x RER | Calc sobre peso ideal |
| Gestacao | 3.0 x RER | A partir da 6a semana |
| Lactacao | 4.0 - 8.0 x RER | Varia c/ numero filhotes |
| Trabalho leve | 2.0 x RER | Caca, pastoreio |
| Trabalho intenso | 3.0 - 6.0 x RER | Corrida, agility |
| Senior ativo | 1.2 - 1.4 x RER | > 7 anos (depende porte) |
| Senior sedentario | 1.0 - 1.2 x RER | > 7 anos |

## Variaveis Obrigatorias

1. Peso corporal atual (kg)
2. Idade / Estagio de vida
3. Nivel de atividade fisica
4. Status de castracao
5. Objetivo (manter, perder, ganhar peso)

## Variaveis Recomendadas

6. Escore de Condicao Corporal - ECC/BCS (escala 1-9)
   - 1-3: Abaixo do peso
   - 4-5: Peso ideal
   - 6-7: Sobrepeso
   - 8-9: Obeso
7. Porte/Raca
8. Sexo

## Variaveis Avancadas

9. Condicoes de saude
10. Densidade energetica do alimento (kcal/kg)
11. Numero de refeicoes/dia
12. Tipo de alimento (seca, umida, natural)

## Exemplo: Labrador 30kg castrado moderado

1. RER = 70 x (30 ^ 0.75) = 70 x 12.82 = 897 kcal/dia
2. MER = 897 x 1.5 = 1346 kcal/dia
3. Se racao tem 3500 kcal/kg: 1346 / 3500 = 384 g/dia

## Macronutrientes

| Nutriente | Funcao | Minimo (adulto) |
|---|---|---|
| Proteina Bruta | Musculos | 16% MS |
| Gordura | Energia, pele | 4.5% MS |
| Calcio | Ossos | 0.5% MS |
| Fosforo | Ossos | 0.4% MS |

## Ajustes por Porte

- Pequeno (<10kg): metabolismo +20-30%, senior aos 10-12 anos
- Medio (10-25kg): metabolismo moderado, senior aos 8-10 anos
- Grande (25-44kg): metabolismo lento, senior aos 6-8 anos
- Gigante (>44kg): risco torcao gastrica, senior aos 5-6 anos