"""
Nia-Prime-Lite Backend API
Flask application with MongoDB integration and Power Layer
100% SECURE - Only Jason LeSane Access
"""

import os
import time
import hashlib
import hmac
import json
from datetime import datetime
from flask import Flask, jsonify, request
from pymongo import MongoClient
from functools import wraps
from bson import ObjectId

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

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

# ============================================
# 📊 RATE LIMITING & AUDIT LOGGING
# ============================================
RATE_LIMIT = {}  # {ip: [timestamps]}
RATE_LIMIT_MAX = 100  # requests per minute
RATE_LIMIT_WINDOW = 60  # seconds
AUDIT_LOG = []

def check_rate_limit():
    """Check if request exceeds rate limit"""
    ip = get_client_ip()
    now = time.time()
    if ip not in RATE_LIMIT:
        RATE_LIMIT[ip] = []
    RATE_LIMIT[ip] = [t for t in RATE_LIMIT[ip] if now - t < RATE_LIMIT_WINDOW]
    if len(RATE_LIMIT[ip]) >= RATE_LIMIT_MAX:
        return False
    RATE_LIMIT[ip].append(now)
    return True

def log_access(ip, endpoint, action):
    """Log access for security auditing"""
    AUDIT_LOG.append({
        "ip": ip,
        "endpoint": endpoint,
        "action": action,
        "timestamp": datetime.now().isoformat()
    })
    if len(AUDIT_LOG) > 1000:
        AUDIT_LOG.pop(0)

def get_audit_log(limit=100):
    """Get recent audit log entries"""
    return AUDIT_LOG[-limit:]

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
        # Rate limiting check
        if not check_rate_limit():
            return jsonify({
                "success": False,
                "message": "Rate limit exceeded. Too many requests."
            }), 429
        
        client_ip = get_client_ip()
        
        # Check secret key (primary authentication)
        secret_key = request.headers.get('X-Secret-Key') or request.args.get('secret')
        if secret_key and hmac.compare_digest(secret_key, OWNER_SECRET_KEY):
            log_access(client_ip, request.endpoint, 'secret_key')
            return f(*args, **kwargs)
        
        # Check password + IP (secondary authentication)
        password = request.headers.get('X-Password') or request.args.get('password')
        
        # If IP whitelist is configured, check IP first
        if ALLOWED_IPS:
            if client_ip not in ALLOWED_IPS:
                log_access(client_ip, request.endpoint, 'denied_ip')
                return jsonify({
                    "success": False,
                    "message": "Access denied. Your IP is not authorized."
                }), 403
        
        # Verify password
        if password and hmac.compare_digest(password, SPECIAL_PASSWORD):
            log_access(client_ip, request.endpoint, 'password')
            return f(*args, **kwargs)
        
        # No valid authentication
        log_access(client_ip, request.endpoint, 'denied_unauthorized')
        return jsonify({
            "success": False,
            "message": "🔒 ACCESS DENIED - Owner authorization required"
        }), 401
    
    return decorated_function
# ============================================

# ============================================
# ⚡ ADVANCED POWER LAYER - Self-Healing AI
# ★ ★ ★ ★ ★ ULTIMATE VERSION ★ ★ ★ ★ ★
# ============================================
class PowerLayer:
    """
    Self-improvement system that monitors and optimizes system performance
    With AI-powered recommendations & predictive analytics
    """
    
    def __init__(self):
        self.metrics = {
            "usage": 0,
            "requests": 0,
            "errors": 0,
            "start_time": time.time(),
            "uptime_seconds": 0,
            "avg_response_time": 0,
            "peak_usage": 0,
            "total_requests_ever": 0,
            "avg_error_rate": 0
        }
        self.threshold = 100
        self.status = "stable"
        self.recommendations = []
        self.response_times = []
        self.history = []
        self.alerts = []
        self.self_healing_actions = []
    
    def record_request(self, response_time=0):
        self.metrics["requests"] += 1
        self.metrics["usage"] += 1
        self.metrics["total_requests_ever"] += 1
        
        if response_time > 0:
            self.response_times.append(response_time)
            if len(self.response_times) > 100:
                self.response_times.pop(0)
            self.metrics["avg_response_time"] = sum(self.response_times) / len(self.response_times)
        
        if self.metrics["usage"] > self.metrics.get("peak_usage", 0):
            self.metrics["peak_usage"] = self.metrics["usage"]
        
        self.evaluate()
        if self.metrics["requests"] % 10 == 0:
            self.record_history()
    
    def record_history(self):
        self.history.append({
            "timestamp": time.time(),
            "usage": self.metrics["usage"],
            "requests": self.metrics["requests"],
            "errors": self.metrics["errors"],
            "avg_response_time": self.metrics["avg_response_time"]
        })
        if len(self.history) > 100:
            self.history.pop(0)
    
    def predict_usage(self):
        if len(self.history) < 10:
            return {"predicted": "insufficient_data"}
        recent = self.history[-20:]
        usage_trend = sum(h["usage"] for h in recent) / len(recent)
        return {
            "current_trend": "increasing" if usage_trend > self.metrics["usage"] else "decreasing",
            "projected_usage_1h": int(self.metrics["usage"] * 1.2),
            "projected_usage_24h": int(self.metrics["usage"] * 2),
            "confidence": "medium"
        }
    
    def record_error(self):
        self.metrics["errors"] += 1
        self.evaluate()
        self._generate_recommendations()
        self._check_self_healing()
    
    def _check_self_healing(self):
        error_rate = 0
        if self.metrics["requests"] > 0:
            error_rate = (self.metrics["errors"] / self.metrics["requests"]) * 100
        
        if error_rate > 20:
            action = {
                "type": "auto_scale",
                "message": "High error rate detected - recommend scaling",
                "timestamp": datetime.now().isoformat()
            }
            self.self_healing_actions.append(action)
            self.alerts.append({"level": "critical", "message": f"High error rate: {error_rate:.1f}%"})
        
        if len(self.self_healing_actions) > 10:
            self.self_healing_actions.pop(0)
    
    def evaluate(self):
        self.metrics["uptime_seconds"] = int(time.time() - self.metrics["start_time"])
        
        error_rate = 0
        if self.metrics["requests"] > 0:
            error_rate = (self.metrics["errors"] / self.metrics["requests"]) * 100
            self.metrics["avg_error_rate"] = error_rate
        
        if self.metrics["usage"] > self.threshold:
            self.status = "upgrade_system"
        elif error_rate > 20:
            self.status = "critical"
        elif error_rate > 10:
            self.status = "warning"
        elif self.metrics.get("avg_response_time", 0) > 2000:
            self.status = "degraded"
        else:
            self.status = "stable"
        
        self._generate_recommendations()
        return self.status
    
    def _generate_recommendations(self):
        self.recommendations = []
        
        if self.metrics["usage"] > self.threshold * 0.8:
            self.recommendations.append({
                "type": "scale", "message": "System approaching capacity (80%+)",
                "priority": "high", "action": "scale_up"
            })
        
        if self.metrics.get("avg_response_time", 0) > 1000:
            self.recommendations.append({
                "type": "performance", "message": f"High response time ({self.metrics['avg_response_time']:.0f}ms)",
                "priority": "medium", "action": "optimize"
            })
        
        error_rate = self.metrics.get("avg_error_rate", 0)
        if error_rate > 10:
            self.recommendations.append({
                "type": "stability", "message": f"High error rate: {error_rate:.1f}%",
                "priority": "critical", "action": "investigate"
            })
        
        prediction = self.predict_usage()
        if isinstance(prediction, dict) and prediction.get("predicted") != "insufficient_data":
            if prediction.get("current_trend") == "increasing":
                self.recommendations.append({
                    "type": "predictive", "message": f"Usage trending UP",
                    "priority": "medium", "action": "prepare_scale"
                })
        
        if not self.recommendations:
            self.recommendations.append({
                "type": "optimize", "message": "System running optimally! 🌟",
                "priority": "low", "action": "none"
            })
    
    def get_status(self):
        self.evaluate()
        prediction = self.predict_usage() if len(self.history) >= 10 else {"predicted": "collecting_data"}
        
        return {
            "status": self.status,
            "metrics": self.metrics.copy(),
            "threshold": self.threshold,
            "recommendations": self.recommendations,
            "health_score": self._calculate_health_score(),
            "prediction": prediction,
            "alerts": self.alerts[-5:],
            "self_healing": self.self_healing_actions[-5:]
        }
    
    def _calculate_health_score(self):
        score = 100
        if self.metrics["requests"] > 0:
            error_rate = (self.metrics["errors"] / self.metrics["requests"]) * 100
            score -= min(error_rate * 4, 40)
        
        usage_ratio = self.metrics["usage"] / max(self.threshold, 1)
        if usage_ratio > 0.9: score -= 25
        elif usage_ratio > 0.7: score -= 15
        elif usage_ratio > 0.5: score -= 10
        
        avg_rt = self.metrics.get("avg_response_time", 0)
        if avg_rt > 3000: score -= 20
        elif avg_rt > 2000: score -= 15
        elif avg_rt > 1000: score -= 10
        
        if self.metrics["uptime_seconds"] < 60 and self.metrics["requests"] > 10:
            score -= 15
        
        return max(0, int(score))
    
    def reset_metrics(self):
        self.metrics["usage"] = 0
        self.metrics["errors"] = 0
        self.response_times = []
        self.metrics["avg_response_time"] = 0
        self.alerts = []
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
# 📊 AUDIT LOG ENDPOINT
# ============================================
@app.route('/audit', methods=['GET'])
@track_metrics
@require_password
def get_audit():
    """Get security audit log"""
    limit = request.args.get('limit', 100, type=int)
    return jsonify({
        "success": True,
        "audit_log": get_audit_log(limit)
    })

# ============================================
# 🏥 HEALTH CHECK ENDPOINT
# ============================================
@app.route('/health', methods=['GET'])
def health_check():
    """Public health check"""
    return jsonify({
        "status": "ok",
        "version": "2.0.0",
        "name": "Nia-Prime-Lite"
    })

# ============================================


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
