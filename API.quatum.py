import json
from azure.quantum import Workspace
from azure.quantum.qiskit import AzureQuantumProvider

def handler(request):
    try:
        ws = Workspace(
            subscription_id="placeholder",
            resource_group="placeholder",
            name="placeholder",
            location="eastus"
        )
        provider = AzureQuantumProvider(ws)
        backends = [b.name for b in provider.backends()]

        return {
            "statusCode": 200,
            "body": json.dumps({"backends": backends})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
