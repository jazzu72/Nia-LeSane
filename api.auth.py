import json

def handler(request):
    try:
        body = json.loads(request.body or "{}")
        token = body.get("token")

        if token == "secret":
            return {
                "statusCode": 200,
                "body": json.dumps({"authorized": True})
            }

        return {
            "statusCode": 401,
            "body": json.dumps({"authorized": False})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
