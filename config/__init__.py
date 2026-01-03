config/__init__.py"""
Configuration module for Nia LeSane
Handles configuration loading and management
"""

import os
import logging
from pathlib import Path

__version__ = "1.0.0"
__author__ = "House of Jazzu"

# Configuration paths
CONFIG_DIR = Path(__file__).parent
PROJECT_ROOT = CONFIG_DIR.parent.parent

# Setup logging
logger = logging.getLogger(__name__)


def load_config(config_file: str = "NIA_CONTACT_CONFIG.yaml"):
    """
    Load configuration from YAML file
    
    Args:
        config_file: Name of the config file (default: NIA_CONTACT_CONFIG.yaml)
        
    Returns:
        dict: Configuration dictionary
    """
    try:
        import yaml
        config_path = CONFIG_DIR / config_file
        
        if not config_path.exists():
            logger.warning(f"Config file not found: {config_path}")
            return {}
        
        with open(config_path, 'r') as f:
            config = yaml.safe_load(f)
            logger.info(f"✅ Configuration loaded from {config_path}")
            return config
    except ImportError:
        logger.error("PyYAML not installed. Install with: pip install pyyaml")
        return {}
    except Exception as e:
        logger.error(f"Error loading configuration: {e}")
        return {}


def get_secret(secret_name: str, default: str = None) -> str:
    """
    Get secret from environment variables
    
    Args:
        secret_name: Name of the secret environment variable
        default: Default value if secret not found
        
    Returns:
        str: Secret value or default
    """
    value = os.getenv(secret_name, default)
    if value is None:
        logger.warning(f"⚠️ Secret not found: {secret_name}")
    return value


def get_app_config() -> dict:
    """
    Get application configuration from environment or config files
    
    Returns:
        dict: Complete application configuration
    """
    config = load_config()
    
    # Add environment-specific settings
    config.setdefault('env', {}).update({
        'debug': os.getenv('DEBUG', 'false').lower() == 'true',
        'environment': os.getenv('ENVIRONMENT', 'development'),
        'log_level': os.getenv('LOG_LEVEL', 'INFO'),
    })
    
    return config


# Module exports
__all__ = [
    'load_config',
    'get_secret',
    'get_app_config',
    'CONFIG_DIR',
    'PROJECT_ROOT',
]
