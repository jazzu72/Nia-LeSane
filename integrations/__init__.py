integrations/__init__.py"""
Integrations module for Nia LeSane
Contains integrations with external services like Azure Quantum
"""

__version__ = "1.0.0"
__author__ = "House of Jazzu"
__description__ = "External service integrations for Nia LeSane AI Agent"

# Import submodules for easier access
try:
    from . import azure
except ImportError as e:
    print(f"Warning: Could not import azure integration: {e}")

__all__ = ['azure']
