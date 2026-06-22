from cidade import Cidade


class Individuo:
    """
    Representa um indivíduo (solução candidata) para o problema do Caixeiro
    Viajante (TSP) resolvido via Algoritmos Genéticos.

    Parâmetros
    ----------
    partida : Cidade
        Cidade de partida — deve ser o primeiro e o último elemento do cromossomo.
    cromossomo : list[Cidade]
        Rota completa já construída, incluindo a cidade de partida no início e no fim.

    Atributos
    ---------
    cromossomo : list[Cidade]
        Sequência de cidades que define a rota circular.
    """

    def __init__(self, partida: Cidade, cromossomo: list[Cidade]) -> None:
        self.partida = partida
        self.cromossomo: list[Cidade] = cromossomo


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

        for i in range(n - 1):
            origem  = self.cromossomo[i]
            destino = self.cromossomo[i + 1]
            distancia_total += origem.distancia_para(destino)

        self.aptidao = distancia_total
        return self.aptidao


    # ------------------------------------------------------------------
    # Validação
    # ------------------------------------------------------------------

    def is_valido(self) -> bool:
        """
        Verifica se o cromossomo é uma permutação válida:
        - Primeira e última cidade devem ser a cidade de partida.
        - As cidades internas não podem ter duplicatas nem conter a partida.
        - Retorna True se válido, False caso contrário.
        """
        ids = [c.id for c in self.cromossomo]
        if not ids or ids[0] != self.partida.id or ids[-1] != self.partida.id:
            return False
        inner_ids = ids[1:-1]
        return len(inner_ids) == len(set(inner_ids)) and self.partida.id not in set(inner_ids)

    # ------------------------------------------------------------------
    # Utilitários
    # ------------------------------------------------------------------

    def copiar(self) -> "Individuo":
        """Retorna uma cópia independente deste indivíduo."""
        return Individuo(self.partida, list(self.cromossomo))

    def rota_nomes(self) -> list[str]:
        """Retorna a sequência de nomes das cidades na ordem da rota."""
        return [c.nome for c in self.cromossomo]

