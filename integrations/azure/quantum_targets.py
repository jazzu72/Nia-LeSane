targets = workspace.get_targets()
for target in targets:
    print(target.name)  # e.g., 'microsoft.estimator', 'ionq.simulator'
