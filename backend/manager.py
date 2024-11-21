import argparse
from sqlalchemy.exc import IntegrityError
from app.user import model
from app.conversation.model import Conversation

from config.database import get_db


def create_superuser(username: str, token: str):
    session = next(get_db())  # Ambil instance session
    try:
        # Cek apakah username sudah ada
        existing_user = session.query(model.User).filter_by(username=username).first()
        if existing_user:
            print(f"User dengan username '{username}' sudah ada.")
            return

        # Buat user baru dengan role admin
        user = model.User(username=username, token=token)
        role = model.Role(name=model.RoleType.admin, user=user)

        # Tambahkan ke session dan commit
        session.add(user)
        session.add(role)
        session.commit()
        print(f"Superuser '{username}' berhasil dibuat.")
    except IntegrityError as e:
        session.rollback()
        print(f"Terjadi kesalahan: {e}")
    finally:
        session.close()


def main():
    # Buat parser untuk CLI
    parser = argparse.ArgumentParser(
        description="Membuat superuser (admin) untuk aplikasi."
    )
    parser.add_argument("--username", required=True, help="Username superuser")
    parser.add_argument("--token", required=True, help="Token atau password superuser")

    args = parser.parse_args()

    # Panggil fungsi untuk membuat superuser
    create_superuser(args.username, args.token)


if __name__ == "__main__":
    main()
