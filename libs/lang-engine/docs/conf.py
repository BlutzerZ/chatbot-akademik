# Configuration file for the Sphinx documentation builder.
import os
import sys

sys.path.insert(0, os.path.abspath(".."))

project = "Lang Engine"
copyright = "2024"
author = "Your Name"

# Add any Sphinx extension module names here
extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx.ext.viewcode",
    "sphinx.ext.githubpages",
    "sphinx.ext.graphviz",
    "sphinx.ext.inheritance_diagram",
    "sphinx.ext.autosummary",
]

# Add any paths that contain templates here
templates_path = ["_templates"]

# List of patterns to exclude
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# The theme to use for HTML and HTML Help pages
html_theme = "sphinx_rtd_theme"

graphviz_output_format = "svg"

# Add autosummary configuration
autosummary_generate = True
