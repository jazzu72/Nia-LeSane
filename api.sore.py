import json

def handler(request):
    try:
        body = json.loads(request.body or "{}")
        score = body.get("value", 0) * 2
        return {
            "statusCode": 200,
            "body": json.dumps({"score": score})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
