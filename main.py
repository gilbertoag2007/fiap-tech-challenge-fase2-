from Individuo import Individuo
from cidade import Cidade
#from utils import gerar_matriz_distancias, gerar_populacao_inicial
from utils import *

# =============================================================================
# Geração da lista de cidades
# =============================================================================
def popular_cidades() -> list[Cidade]:
    """Cria e retorna uma lista de cidades pré-definidas."""
    cidades_cadastradas = [
        Cidade(0, "São Paulo",           "SP", -23.5505, -46.6333),
        Cidade(1, "Campinas",            "SP", -22.9056, -47.0608),
        Cidade(2, "Ribeirão Preto",      "SP", -21.1775, -47.8103),
        Cidade(3, "Santos",              "SP", -23.9618, -46.3322),
        Cidade(4, "Sorocaba",            "SP", -23.5015, -47.4526),
        Cidade(5, "São José dos Campos", "SP", -23.1794, -45.8869)
    ]
    
    print("=== Cidades cadastradas ===")
    for c in cidades_cadastradas:
        print(f"  {c}")

    return cidades_cadastradas


# =============================================================================
# DEMONSTRAÇÃO DE USO
# =============================================================================

if __name__ == "__main__":

    # Algumas cidades do estado de São Paulo
    cidades = popular_cidades()

    # Cidade de partida
    partida = cidades[0] # São Paulo
        
    print("\n=== Distâncias a partir de São Paulo ===")
    sp = cidades[0]
    for outra in cidades[1:]:
        print(f"  {sp.nome} → {outra.nome}: {sp.distancia_para(outra):.1f} km")

    print("\n=== Matriz de distâncias (KM) ===")
    matriz = gerar_matriz_distancias(cidades)
    

    print("\n=== CRIANDO INDIVIDUOS ===")

    tamanho_populacao=10

    # --- Cria 10 indivíduos com rota aleatória ---
    populacao_inicial = gerar_populacao_aleatoria(tamanho_populacao, partida, cidades)
    
   # melhores_individuos = seleciona_melhores_individuos(populacao_inicial, 5)
    
    numero_epocas=5
    quantidade_elite=5
    tamanho_populacao=10

    melhor_individuo_global = None

    for epoca in range(numero_epocas):
        # Selecionar melhores (elitismo)
        melhores = seleciona_melhores_individuos(populacao_inicial, quantidade_elite)
    
        # Criar nova população
        populacao_nova = gerar_populacao_aleatoria(tamanho_populacao, partida, cidades, melhores)
    
        # Calcular aptidão
        #aptidoes = []
        
        #for ind in populacao_nova:
        #    ind.calcular_aptidao()
        #    aptidoes.append(ind.calcular_aptidao())
            
            # Exibir progresso
        #    print(f"Época {epoca+1}: {min(aptidoes):.2f} km")

        # Atualizar melhor indivíduo global
        melhor_atual = min(populacao_nova, key=lambda ind: ind.calcular_aptidao())
        if melhor_individuo_global is None or melhor_atual.calcular_aptidao() < melhor_individuo_global.calcular_aptidao():
            melhor_individuo_global = melhor_atual


    print("\n=== Melhor indivíduo encontrado ===")
    print(f"Rota: {' → '.join(c.nome for c in melhor_individuo_global.cromossomo)}")
    print(f"Distância total: {melhor_individuo_global.calcular_aptidao():.2f} km")  
    