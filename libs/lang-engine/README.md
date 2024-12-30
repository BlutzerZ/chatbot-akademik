# lang_engine

## Set up environment variables

If you want to run the cli for lang_engine, you need to set up the environment variables.

Copy `.env.example` to a new file `.env`. Then fill `.env` appropriately.

## Set up development

Make sure you've filled the `.env` file first.

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
