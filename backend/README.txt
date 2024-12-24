1. backend
Folder utama yang berisi kode backend aplikasi chatbot akademik.

a. __pycache__
Folder otomatis yang dibuat oleh Python untuk menyimpan file bytecode (.pyc) dari modul-modul yang telah diimpor. File-file ini mempercepat waktu eksekusi dengan menghindari pengompilan ulang skrip Python.

b. alembic
Direktori yang berisi konfigurasi dan skrip migrasi untuk basis data yang dikelola oleh Alembic, yang digunakan untuk pengelolaan versi skema basis data.

version: Menyimpan skrip migrasi untuk pembaruan skema basis data.
env.py: File konfigurasi untuk Alembic yang mengatur koneksi ke basis data dan pengaturan migrasi.
c. app
Folder utama yang berisi berbagai komponen fungsional dari aplikasi chatbot akademik.

conversation: Menyimpan kode yang berhubungan dengan percakapan chatbot (misalnya, model percakapan, layanan percakapan, rute percakapan).
feedback: Menyimpan kode yang berhubungan dengan pengumpulan dan pengelolaan umpan balik dari pengguna.
modelAI: Menyimpan kode untuk model kecerdasan buatan yang digunakan dalam chatbot (misalnya, model pembelajaran mesin atau AI untuk memproses pertanyaan dan jawaban).
user: Menyimpan kode yang berhubungan dengan pengelolaan data pengguna (misalnya, registrasi pengguna, autentikasi, dan manajemen profil).
d. config
Folder konfigurasi untuk aplikasi.

__pycache__: Folder ini menyimpan file bytecode Python untuk konfigurasi yang diimpor.
database.py: Berisi pengaturan dan koneksi untuk basis data PostgreSQL.
e. exceptions
Folder untuk menangani pengecualian atau error khusus dalam aplikasi.

schemas: Berisi skema atau struktur data yang digunakan untuk validasi data dalam pengecualian.
custom_exceptions.py: Berisi definisi pengecualian kustom untuk aplikasi (misalnya, pengecualian untuk kesalahan tertentu yang mungkin terjadi dalam chatbot).
handlers.py: Berisi penanganan untuk pengecualian khusus, yang menentukan bagaimana aplikasi merespons kesalahan.
f. helper
Folder yang berisi kode utilitas untuk mendukung fungsi aplikasi lainnya.

jwt.py: Berisi fungsi yang menangani JSON Web Token (JWT) untuk autentikasi dan otorisasi.
role.py: Berisi fungsi dan logika yang berkaitan dengan peran pengguna dalam aplikasi (misalnya, menentukan apakah pengguna adalah admin, pengguna biasa, dll.).
g. middleware
Folder yang berisi middleware yang digunakan untuk menangani logika yang terjadi di antara permintaan dan respons HTTP.

__init__.py: Menandakan bahwa folder ini adalah paket Python.
jwt.py: Middleware yang menangani autentikasi JWT untuk memverifikasi identitas pengguna sebelum melanjutkan dengan permintaan.
h. nginx
Folder yang berisi konfigurasi untuk server web Nginx, yang digunakan untuk menangani permintaan HTTP dan meneruskannya ke aplikasi FastAPI yang berjalan di dalam kontainer Docker.

Dockerfile: Menyediakan instruksi untuk membuat image Docker yang menjalankan Nginx.
nginx.conf: Konfigurasi Nginx, yang menentukan bagaimana permintaan HTTP diteruskan dan diproses oleh server.
i. .dockerignore
File ini memberitahu Docker untuk mengabaikan file atau folder tertentu saat membangun image Docker. Ini menghindari pencakupan file yang tidak perlu, seperti file cache atau file konfigurasi lokal.

j. .env
File yang berisi variabel lingkungan untuk konfigurasi aplikasi, seperti pengaturan database, kunci API, atau kredensial lainnya yang tidak ingin disertakan langsung dalam kode sumber.

k. .gitignore
File yang memberi tahu Git untuk mengabaikan file atau folder tertentu saat melakukan commit, seperti file log atau file konfigurasi lokal yang tidak relevan.

l. .python-version
File ini digunakan oleh alat manajer versi Python (seperti pyenv) untuk menentukan versi Python yang akan digunakan dalam proyek ini.

m. alembic.ini
File konfigurasi untuk Alembic yang digunakan untuk mendefinisikan pengaturan dasar untuk migrasi skema basis data (misalnya, URL koneksi basis data).

n. docker-compose.yaml
File yang digunakan untuk mendefinisikan dan menjalankan aplikasi Docker dalam beberapa kontainer. Ini mengatur kontainer untuk aplikasi FastAPI, PostgreSQL, dan Nginx, serta pengaturan lainnya.

o. Dockerfile
File ini berisi instruksi untuk membangun image Docker untuk aplikasi FastAPI, menentukan bagaimana aplikasi dijalankan di dalam kontainer.

p. entrypoint.sh
Script shell yang dieksekusi saat kontainer Docker dijalankan. Biasanya digunakan untuk memulai aplikasi atau melakukan inisialisasi sebelum aplikasi dimulai.

q. main.py
File utama aplikasi FastAPI, yang mengatur semua endpoint API dan mengonfigurasi aplikasi FastAPI.

r. manager.py
File ini mungkin digunakan untuk manajemen tugas di dalam aplikasi, seperti menjalankan perintah khusus, mengelola pengaturan, atau meluncurkan aplikasi.

s. README.md
File dokumentasi yang berisi informasi umum tentang proyek ini, cara instalasi, cara menjalankan aplikasi, dan informasi lainnya yang relevan.

t. requirements.txt
File ini berisi daftar semua dependensi Python yang diperlukan untuk menjalankan aplikasi. pip digunakan untuk menginstal paket-paket ini.

DOCKER PostgreSQL
docker exec -it db_academicchat bash
psql -U myuser -d mydb -p 5432
\dt
\c mydb