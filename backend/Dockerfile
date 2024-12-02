# Use an official Python runtime based on Debian 10 "buster" as a parent image.
FROM python:3.12

# Add user that will be used in the container.
RUN useradd academicchat

# Set environment variables.
# 1. Force Python stdout and stderr streams to be unbuffered.
# 2. Set PORT variable that is used by Gunicorn. This should match "EXPOSE"
#    command.
ENV PYTHONUNBUFFERED=1 

# Install the project requirements.
COPY requirements.txt /
RUN pip install -r /requirements.txt

# Use /app folder as a directory where the source code is stored.
WORKDIR /app

# Set this directory to be owned by the "wagtail" user. This Wagtail project
# uses SQLite, the folder needs to be owned by the user that
# will be writing to the database file.
RUN chown academicchat:academicchat /app

# Copy the source code of the project into the container.
COPY --chown=academicchat:academicchat . .

# Use user "wagtail" to run the build commands below and the server itself.
USER academicchat


# Alembic
# RUN alembic upgrade head

# Collect static files.
# RUN python manage.py collectstatic --noinput --clear

# Runtime command that executes when "docker run" is called, it does the
# following:
#   1. Migrate the database.
#   2. Start the application server.
# WARNING:
#   Migrating database at the same time as starting the server IS NOT THE BEST
#   PRACTICE. The database should be migrated manually or using the release
#   phase facilities of your hosting platform. This is used only so the
#   Wagtail instance can be started with a simple "docker run" command.
# CMD set -xe; python manage.py migrate --noinput; gunicorn --bind 0.0.0.0:5001 wagtailSite.wsgi:application
COPY ./entrypoint.sh /
ENTRYPOINT ["sh", "/entrypoint.sh"]
