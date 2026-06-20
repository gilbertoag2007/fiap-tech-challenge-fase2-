
# =============================================================================
# Função utilitária: gera a matriz de distâncias a partir de uma lista de cidades
# =============================================================================
 
from typing import Optional

from Individuo import Individuo
from cidade import Cidade


def gerar_matriz_distancias(cidades: list[Cidade]) -> list[list[float]]:
    """
    Gera uma matriz NxN com as distâncias geodésicas (em KM) entre todas as cidades.

    Parâmetros
    ----------
    cidades : list[Cidade]

    Retorna
    -------
    list[list[float]] — matriz simétrica onde matriz[i][j] = distância entre
                        cidades[i] e cidades[j]
    """
    n = len(cidades)
    matriz = [[0.0] * n for _ in range(n)]
    for i in range(n):
        for j in range(i + 1, n):
            dist = cidades[i].distancia_para(cidades[j])
            matriz[i][j] = dist
            matriz[j][i] = dist  # matriz simétrica
    header = f"{'':22}" + "".join(f"{c.nome[:10]:>12}" for c in cidades)
    print(header)
    for i, c in enumerate(cidades):
        linha = f"  {c.nome:<20}" + "".join(f"{matriz[i][j]:>12.1f}" for j in range(len(cidades)))
        print(linha)
            
    return matriz

def seleciona_melhores_individuos(populacao: list[Individuo], quantidade: int) -> list[Individuo]:
    """Seleciona os n indivíduos com as menores distâncias (melhores aptidões) da população."""
    return sorted(populacao, key=lambda x: x.calcular_aptidao())[:quantidade]      


def gerar_populacao_aleatoria(
    quantidade: int, 
    partida: Cidade, 
    cidades: list[Cidade],
    melhores_individuos: Optional[list[Individuo]] = None
) -> list[Individuo]:
    """
    Gera uma população inicial de indivíduos com rotas aleatórias e únicas.
 
    Parâmetros
    ----------
    quantidade : int
        Número total de indivíduos a serem gerados na população.
    partida : Cidade
        Cidade de partida que será sempre o primeiro elemento de cada cromossomo.
    cidades : list[Cidade]
        Lista de todas as cidades a serem visitadas.
    melhores_individuos : Optional[list[Individuo]], default=None
        Lista opcional de melhores indivíduos de uma população anterior.
        Se fornecida, esses indivíduos serão incluídos na nova população,
        e o número de novos indivíduos gerados será: quantidade - len(melhores_individuos).
 
    Retorna
    -------
    list[Individuo] — população gerada com 'quantidade' indivíduos únicos, 
                      cada um começando obrigatoriamente com a cidade de partida.
    
    Notas
    -----
    - Cada indivíduo começará obrigatoriamente com a cidade de partida.
    - Indivíduos duplicados são evitados através da verificação de cromossomos únicos.
    - Se melhores_individuos for fornecido, eles serão incluídos na população.
    - Se não conseguir gerar indivíduos suficientes, lança uma exceção.
    
    Raises
    ------
    ValueError
        Se a lista de cidades estiver vazia, se a partida não estiver na lista,
        se melhores_individuos contiver indivíduos que não começam com partida,
        ou se não conseguir gerar o número solicitado de indivíduos únicos.
    
    Exemplos
    --------
    >>> # Exemplo 1: Gerar população inicial
    >>> cidades = [Cidade(0, "São Paulo", "SP", -23.5505, -46.6333), ...]
    >>> partida = cidades[0]
    >>> populacao1 = gerar_populacao_aleatoria(10, partida, cidades)
    >>> len(populacao1)
    10
    
    >>> # Exemplo 2: Gerar nova população com melhores da anterior
    >>> # Calcular aptidão
    >>> for ind in populacao1:
    ...     ind.calcular_aptidao()
    
    >>> # Selecionar melhores indivíduos
    >>> melhores = sorted(populacao1, key=lambda x: x.aptidao)[:3]
    >>> len(melhores)
    3
    
    >>> # Gerar nova população incluindo os 3 melhores
    >>> populacao2 = gerar_populacao_aleatoria(10, partida, cidades, 
    ...                                        melhores_individuos=melhores)
    >>> len(populacao2)
    10
    >>> # 3 indivíduos da população1 + 7 novos indivíduos aleatórios
    """
    # Validações de entrada
    if not cidades:
        raise ValueError("A lista de cidades não pode estar vazia.")
    
    if partida not in cidades:
        raise ValueError("A cidade de partida deve estar na lista de cidades.")
    
    populacao = []
    cromossomos_vistos = set()  # Rastreia cromossomos únicos pelos IDs
    
    # Processar melhores indivíduos (se fornecidos)
    if melhores_individuos:
        if not isinstance(melhores_individuos, list):
            raise ValueError("melhores_individuos deve ser uma lista de Indivíduos.")
        
        if len(melhores_individuos) >= quantidade:
            raise ValueError(
                f"A quantidade de melhores indivíduos ({len(melhores_individuos)}) "
                f"não pode ser maior ou igual à quantidade total ({quantidade})."
            )
        
        # Validar e incluir melhores indivíduos
        for i, individuo in enumerate(melhores_individuos):
            # Verifica se começa com a partida
            if individuo.cromossomo[0].id != partida.id:
                raise ValueError(
                    f"O indivíduo {i+1} dos melhores não começa com a cidade de partida ({partida.nome}). "
                    f"Começa com: {individuo.cromossomo[0].nome}."
                )
            
            # Registra o cromossomo como visto
            cromossomo_tupla = tuple(c.id for c in individuo.cromossomo)
            cromossomos_vistos.add(cromossomo_tupla)
            populacao.append(individuo)
    
    # Calcula quantos novos indivíduos precisam ser gerados
    quantidade_novos = quantidade - len(populacao)
    tentativas = 0
    max_tentativas = quantidade_novos * 100  # Evita loop infinito
    
    # Loop de geração com validação de unicidade
    while len(populacao) < quantidade and tentativas < max_tentativas:
        # Cria um novo indivíduo (começa com partida automaticamente)
        individuo = Individuo(partida, cidades)
        
        # Cria uma tupla de IDs para comparação eficiente
        cromossomo_tupla = tuple(c.id for c in individuo.cromossomo)
        
        # Se cromossomo não foi visto antes, adiciona à população
        if cromossomo_tupla not in cromossomos_vistos:
            cromossomos_vistos.add(cromossomo_tupla)
            populacao.append(individuo)
        
        tentativas += 1
    
    # Valida se conseguiu gerar a quantidade solicitada
    if len(populacao) < quantidade:
        raise ValueError(
            f"Não foi possível gerar {quantidade} indivíduos únicos "
            f"após {tentativas} tentativas. Gerados apenas {len(populacao)}."
        )
    
    return populacao
 
 