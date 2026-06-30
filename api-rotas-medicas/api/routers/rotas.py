from typing import Any

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from api.schemas.rotas import RotasRequest
from services.rota_service import RotaService

router = APIRouter(prefix="/rotas", tags=["Rotas"])


@router.post("/", response_model=dict[str, Any])
def calcular_rota(request: RotasRequest) -> dict[str, Any]:
    """Recebe os parâmetros do algoritmo genético e retorna a rota otimizada como GeoJSON."""
    try:
        return RotaService().calcular_rota(
            mensagem=request.mensagem,
            epocas=request.epocas,
            elitismo=request.elitismo,
            grau_mutacao=request.grau_mutacao,
            populacao_apenas_aleatoria=request.populacao_apenas_aleatoria,
            tamanho_populacao=request.tamanho_populacao,
            tamanho_elite=request.tamanho_elite,
        )
    except ValueError as e:
        return JSONResponse(status_code=400, content={"erro": str(e)})