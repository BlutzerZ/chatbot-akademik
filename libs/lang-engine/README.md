# lang_engine

Do the following in this order
1. Set up environment variables
2. Set up development
3. Building the docs

## Set up chroma directory

1. Get the chroma data from this [Google drive file](https://drive.google.com/file/d/1TaKowIBb4kvHPMJvaCbn37F_CnAzPpD5/view?usp=drive_link).
2. Extract the contents in `/libs/lang-engine/`.
3. When everything is done correctly, the sqlite3 file should be in `libs/lang-engine/chroma/chroma.sqlite3`.

## Set up environment variables

If you want to run the cli for lang_engine, you need to set up the environment variables.

Copy `.env.example` to a new file `.env`. Then fill `.env` appropriately.

## Set up development

Make sure you've
- filled the `.env` file,
- and have setup the chroma directory.

```bash
# Make sure you're in the `/libs/lang-engine` directory.
# If not, run the following.
cd libs/lang-engine

# Create venv
python3 -m venv .venv

# Activate the venv
## For Linux
.venv/bin/activate
## For Windows
.venv/bin/Activate.ps1

# Install lang_engine
python -m pip install -e .

# Run the cli to test it
python -m lang_engine
```

## Building the docs

Make sure you've activated the venv.

```bash

python -m pip install -r requirements-docs.txt

cd docs

# Buld the docs
## For Linux
make html
## For Windows
### TODO: Write command for Windows

# Open libs/lang-engine/docs/_build/html/index.html

```
