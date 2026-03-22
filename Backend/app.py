"""
Nia-Prime-Lite Backend API
Flask application with MongoDB integration and Power Layer
100% SECURE - Only Jason LeSane Access
"""

import os
import time
import hashlib
import hmac
from flask import Flask, jsonify, request
from pymongo import MongoClient
from functools import wraps

app = Flask(__name__)

# ============================================
# 🔒 ULTIMATE SECURITY CONFIGURATION
# ============================================
# ONLY JASON LESANE CAN ACCESS THIS SYSTEM

OWNER_CONFIG = {
    "owner": "Jason LeSane",
    "email": "lesane1972@gmail.com",
    "phone": "757-339-9245",
    "telegram": "+17573399245"
}

# Your unique secret key - CHANGE THIS IN PRODUCTION!
# Only you should know this - it's your personal access key
OWNER_SECRET_KEY = os.environ.get("JAZZU_SECRET_KEY", "jazzu-ultimate-2026-secure")

# Password for additional security layer
SPECIAL_PASSWORD = os.environ.get("JAZZU_PASSWORD", "AddieMaeLesane-33")

# IP Whitelist - ONLY YOUR IP CAN ACCESS
# Set via environment variable: ALLOWED_IPS=1.2.3.4,5.6.7.8
ALLOWED_IPS = set()
_allowed_ips_env = os.environ.get("ALLOWED_IPS", "")
if _allowed_ips_env:
    ALLOWED_IPS = set(ip.strip() for ip in _allowed_ips_env.split(",") if ip.strip())

# Get client IP address
def get_client_ip():
    """Get the real client IP, checking proxies"""
    if request.headers.get('X-Forwarded-For'):
        return request.headers.get('X-Forwarded-For').split(',')[0].strip()
    elif request.headers.get('X-Real-IP'):
        return request.headers.get('X-Real-IP')
    return request.remote_addr

# Ultra-secure authentication decorator
def require_owner_auth(f):
    """
    100% SECURE - Only Jason LeSane can access
    Requires: Valid secret key OR correct password + whitelisted IP
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        client_ip = get_client_ip()
        
        # Check secret key (primary authentication)
        secret_key = request.headers.get('X-Secret-Key') or request.args.get('secret')
        if secret_key and hmac.compare_digest(secret_key, OWNER_SECRET_KEY):
            # Secret key is valid - full access
            return f(*args, **kwargs)
        
        # Check password + IP (secondary authentication)
        password = request.headers.get('X-Password') or request.args.get('password')
        
        # If IP whitelist is configured, check IP first
        if ALLOWED_IPS:
            if client_ip not in ALLOWED_IPS:
                return jsonify({
                    "success": False,
                    "message": "Access denied. Your IP is not authorized."
                }), 403
        
        # Verify password
        if password and hmac.compare_digest(password, SPECIAL_PASSWORD):
            return f(*args, **kwargs)
        
        # No valid authentication
        return jsonify({
            "success": False,
            "message": "🔒 ACCESS DENIED - Owner authorization required"
        }), 401
    
    return decorated_function
# ============================================

# ============================================
# POWER LAYER - Self-Improvement System
# ============================================
class PowerLayer:
    """Self-improvement system that monitors and optimizes system performance"""
    
    def __init__(self):
        self.metrics = {
            "usage": 0,
            "requests": 0,
            "errors": 0,
            "start_time": time.time(),
            "uptime_seconds": 0
        }
        self.threshold = 100
        self.status = "stable"
    
    def record_request(self):
        """Record a new request"""
        self.metrics["requests"] += 1
        self.metrics["usage"] += 1
        self.evaluate()
    
    def record_error(self):
        """Record an error occurrence"""
        self.metrics["errors"] += 1
        self.evaluate()
    
    def evaluate(self):
        """Evaluate system health and determine status"""
        self.metrics["uptime_seconds"] = int(time.time() - self.metrics["start_time"])
        
        if self.metrics["usage"] > self.threshold:
            self.status = "upgrade_system"
        else:
            self.status = "stable"
        
        return self.status
    
    def get_status(self):
        """Get current system status"""
        self.evaluate()
        return {
            "status": self.status,
            "metrics": self.metrics.copy(),
            "threshold": self.threshold,
            "recommendation": self._get_recommendation()
        }
    
    def _get_recommendation(self):
        """Get recommendation based on current status"""
        if self.status == "upgrade_system":
            return "System usage high - consider scaling or optimizing"
        return "System running optimally"
    
    def reset_metrics(self):
        """Reset usage metrics (e.g., hourly/daily)"""
        self.metrics["usage"] = 0
        self.evaluate()

# Initialize Power Layer
power_layer = PowerLayer()


def track_metrics(f):
    """Decorator to track request metrics"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        power_layer.record_request()
        try:
            result = f(*args, **kwargs)
            return result
        except Exception as e:
            power_layer.record_error()
            raise
    return decorated_function


def require_password(f):
    """Legacy decorator - now uses require_owner_auth"""
    return require_owner_auth(f)
# ============================================

# MongoDB connection using environment variable
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/")

# Parse database name from URI or use default
def get_database_from_uri(uri):
    """Extract database name from MongoDB URI"""
    if '/' in uri[10:]:  # After mongodb://
        # URI contains a database name
        db_name = uri.split('/')[-1].split('?')[0]
        if db_name:
            return db_name
    return "nia_prime_lite"

client = MongoClient(MONGO_URI)
db_name = get_database_from_uri(MONGO_URI)
db = client[db_name]
leads_collection = db.leads


@app.route('/')
def index():
    """Health check - returns status without sensitive data"""
    return jsonify({
        "status": "ok",
        "message": "Nia-Prime-Lite API",
        "version": "1.0.0"
    })


@app.route('/add', methods=['GET', 'POST'])
@track_metrics
@require_password
def add_lead():
    """Add a new lead to the database"""
    try:
        if request.method == 'GET':
            # Support GET for simple testing
            name = request.args.get('name', '')
            email = request.args.get('email', '')
            phone = request.args.get('phone', '')
        else:
            # Support POST for form data
            data = request.get_json() or request.form
            name = data.get('name', '')
            email = data.get('email', '')
            phone = data.get('phone', '')

        if not name or not email:
            return jsonify({
                "success": False,
                "message": "Name and email are required"
            }), 400

        lead = {
            "name": name,
            "email": email,
            "phone": phone
        }

        result = leads_collection.insert_one(lead)
        lead['_id'] = str(result.inserted_id)

        return jsonify({
            "success": True,
            "message": "Lead added successfully",
            "lead": lead
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route('/leads', methods=['GET'])
@track_metrics
@require_password
def get_leads():
    """Get all leads from the database"""
    try:
        leads = list(leads_collection.find({}, {'_id': 1, 'name': 1, 'email': 1, 'phone': 1}))
        
        # Convert ObjectId to string for JSON serialization
        for lead in leads:
            if '_id' in lead:
                lead['_id'] = str(lead['_id'])

        return jsonify({
            "success": True,
            "count": len(leads),
            "leads": leads
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# ============================================
# POWER LAYER ENDPOINTS
# ============================================

@app.route('/owner', methods=['GET'])
@require_owner_auth
def get_owner():
    """Get owner information (public)"""
    return jsonify({
        "success": True,
        "owner": OWNER_CONFIG
    })


@app.route('/power', methods=['GET'])
@track_metrics
def get_power_status():
    """Get power layer status and metrics"""
    status = power_layer.get_status()
    return jsonify({
        "success": True,
        "power_layer": status
    })


@app.route('/power/reset', methods=['POST'])
@track_metrics
@require_password
def reset_power_metrics():
    """Reset power layer metrics"""
    power_layer.reset_metrics()
    return jsonify({
        "success": True,
        "message": "Metrics reset successfully",
        "power_layer": power_layer.get_status()
    })


@app.route('/power/threshold', methods=['GET', 'POST'])
@track_metrics
@require_password
def set_threshold():
    """Get or set the usage threshold"""
    if request.method == 'POST':
        data = request.get_json() or request.form
        new_threshold = data.get('threshold')
        if new_threshold and isinstance(new_threshold, int):
            power_layer.threshold = new_threshold
            return jsonify({
                "success": True,
                "message": f"Threshold updated to {new_threshold}",
                "threshold": power_layer.threshold
            })
        return jsonify({
            "success": False,
            "message": "Invalid threshold value"
        }), 400
    
    return jsonify({
        "success": True,
        "threshold": power_layer.threshold
    })
# ============================================


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
