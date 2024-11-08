from sqlalchemy.orm import Session
from app.modelAI import model, request, response
from uuid import UUID


class ModelAIService:
    def __init__(self, session: Session):
        self.session = session

    def get_all_models(self, limit: int = 10) -> tuple[Exception, response.ModelDetail]:
        try:
            # Mengambil semua model dengan batas limit
            models = (
                self.session.query(model.Model)
                .order_by(model.Model.created_at.desc())
                .limit(limit)
                .all()
            )
            return None, models
        except Exception as e:
            self.session.rollback()
            return e, None

    def create_model(
        self, model_request: request.CreateModelRequest
    ) -> tuple[Exception, response.ModelDetail]:
        try:
            new_model = model.Model(
                name=model_request.name, version=model_request.version
            )
            self.session.add(new_model)
            self.session.commit()
            self.session.refresh(new_model)

            return None, new_model
        except Exception as e:
            self.session.rollback()
            # print(f"Error creating model: {str(e)}")
            return e, None

    def get_model_by_id(self, model_id: UUID) -> tuple[Exception, response.ModelDetail]:
        try:
            # Mengambil model berdasarkan UUID
            model_data = self.session.query(model.Model).filter_by(id=model_id).first()
            return None, model_data
        except Exception as e:
            self.session.rollback()
            return e, None
