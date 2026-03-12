import json

def handler(request):
    try:
        body = json.loads(request.body or "{}")
        lead = {
            "name": body.get("name"),
            "email": body.get("email"),
            "status": "received"
        }
        return {
            "statusCode": 200,
            "body": json.dumps(lead)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
