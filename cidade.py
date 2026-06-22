import math
from typing import Optional


class Cidade:
    """
    Representa uma cidade no Problema do Caixeiro Viajante (TSP).

    Atributos
    ---------
    id         : int        — identificador único da cidade
    nome       : str        — nome da cidade
    uf         : str        — sigla do estado (ex.: "SP", "RJ")
    latitude   : float      — latitude geográfica em graus decimais
    longitude  : float      — longitude geográfica em graus decimais
    tipo_carga : str | None — tipo de carga a entregar: "vacina", "insumo" ou None
    """

    RAIO_TERRA_KM: float = 6371.0  # raio médio da Terra em KM

    TIPOS_VALIDOS = {"vacina", "insumo", None}

    def __init__(
        self,
        id: int,
        nome: str,
        uf: str,
        latitude: float,
        longitude: float,
        tipo_carga: str | None = None,
    ) -> None:
        """
        Parâmetros
        ----------
        id         : int        — identificador único (ex.: índice na lista de cidades)
        nome       : str        — nome da cidade (ex.: "São Paulo")
        uf         : str        — sigla do estado com 2 letras maiúsculas (ex.: "SP")
        latitude   : float      — latitude em graus decimais (negativo = Sul)
        longitude  : float      — longitude em graus decimais (negativo = Oeste)
        tipo_carga : str | None — "vacina", "insumo" ou None para cidade sem entrega
        """
        if tipo_carga not in self.TIPOS_VALIDOS:
            raise ValueError(f"tipo_carga inválido: '{tipo_carga}'. Use 'vacina', 'insumo' ou None.")
        self.id: int               = id
        self.nome: str             = nome
        self.uf: str               = uf.upper()
        self.latitude: float       = latitude
        self.longitude: float      = longitude
        self.tipo_carga: str | None = tipo_carga

    # ------------------------------------------------------------------
    # Cálculo de distância
    # ------------------------------------------------------------------

    def distancia_para(self, outra: "Cidade") -> float:
        """
        Calcula a distância geodésica (Haversine) entre esta cidade e outra,
        em quilômetros.

        A fórmula de Haversine leva em conta a curvatura da Terra, sendo mais
        precisa que a distância euclidiana para coordenadas geográficas reais.

        Parâmetros
        ----------
        outra : Cidade — cidade de destino

        Retorna
        -------
        float — distância em KM
        """
        lat1 = math.radians(self.latitude)
        lat2 = math.radians(outra.latitude)
        dlat = math.radians(outra.latitude - self.latitude)
        dlon = math.radians(outra.longitude - self.longitude)

        a = (math.sin(dlat / 2) ** 2
             + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2)

        return self.RAIO_TERRA_KM * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # ------------------------------------------------------------------
    # Utilitários
    # ------------------------------------------------------------------

    def __eq__(self, outra: object) -> bool:
        """Duas cidades são iguais se tiverem o mesmo id."""
        return isinstance(outra, Cidade) and self.id == outra.id

    def __hash__(self) -> int:
        """Permite usar Cidade em sets e como chave de dicionário."""
        return hash(self.id)

    def __repr__(self) -> str:
        return (
            f"Cidade(id={self.id}, nome='{self.nome}', uf='{self.uf}', "
            f"lat={self.latitude}, lon={self.longitude})"
        )

    def __str__(self) -> str:
        carga = f" [{self.tipo_carga}]" if self.tipo_carga else ""
        return f"[{self.id}] {self.nome}/{self.uf} ({self.latitude:.4f}, {self.longitude:.4f}){carga}"




