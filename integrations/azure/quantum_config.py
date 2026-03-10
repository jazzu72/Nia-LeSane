

from azure.quantum import Workspace

workspace = Workspace(
    subscription_id="your-sub-id",
    resource_group="your-resource-group",
    name="your-workspace-name",
    location="westus"
)
