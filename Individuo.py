import random
from typing import Optional
from cidade import Cidade


class Individuo:
    """
    Representa um indivíduo (solução candidata) para o problema do Caixeiro
    Viajante (TSP) resolvido via Algoritmos Genéticos.
    Parâmetros:
    -----------
    partida : Cidade
        Cidade de partida (pode ser usada para garantir que a rota comece por ela).
    cidades : list[Cidade] 
        Lista completa de cidades a serem visitadas (incluindo a cidade de partida).   

    Atributos
    ---------

    cromossomo : list[Cidade]
        Permutação das cidades definindo uma rota e ordem de visita.
       
    """

    def __init__(self, partida: Cidade, cidades: list[Cidade]) -> None:
        self.cromossomo: list[Cidade] = self.gerar_cromossomo_aleatorio(partida, cidades)
        self.partida = partida
    # ------------------------------------------------------------------
    # Inicialização
    # ------------------------------------------------------------------

    def gerar_cromossomo_aleatorio(self, partida: Cidade, cidades: list[Cidade]) -> list[Cidade]:
        """Cria uma permutação aleatória das cidades, com a cidade de partida sempre em primeiro lugar."""
        # Remove a cidade de partida da lista de cidades
        outras_cidades = [cidade for cidade in cidades if cidade.id != partida.id]
    
        # Embaralha as outras cidades aleatoriamente
        random.shuffle(outras_cidades)
    
        # Retorna a rota com a cidade de partida no início
        return [partida] + outras_cidades


    def calcular_aptidao(self) -> float:
        """
        Calcula e armazena a distância total da rota usando Haversine,
        chamando diretamente cidade.distancia_para(outra).
        O retorno é a distancia total de todas as cidades da solução (Individuo).

        -------
        float — distância total em KM.
        """
        distancia_total = 0.0
        n = len(self.cromossomo)

        for i in range(n):
            origem  = self.cromossomo[i]
            destino = self.cromossomo[(i + 1) % n]  # % n fecha o ciclo
            distancia_total += origem.distancia_para(destino)

        self.aptidao = distancia_total
        return self.aptidao


    # ------------------------------------------------------------------
    # Validação
    # ------------------------------------------------------------------

    def is_valido(self) -> bool:
        """
        Verifica se o cromossomo é uma permutação válida:
        - Retorna True ou False indicando se existem cidades repetidas no cromossomo.
        """
        ids_cidades = {c.id for c in self.cromossomo}
        tem_duplicata = len(ids_cidades) != len(set(ids_cidades))
       
        return tem_duplicata

    # ------------------------------------------------------------------
    # Utilitários
    # ------------------------------------------------------------------

    def copiar(self) -> "Individuo":
        """Retorna uma cópia independente deste indivíduo."""
        copia = Individuo(self.partida, self.cidades)
        
        return copia

    def rota_nomes(self) -> list[str]:
        """Retorna a sequência de nomes das cidades na ordem da rota."""
        return [c.nome for c in self.cromossomo]

