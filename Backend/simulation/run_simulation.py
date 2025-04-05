import pybullet as p
import pybullet_data
import time
import math

def run_simulation():
    # 1. Setup
    p.connect(p.DIRECT)  # Use GUI for visual; DIRECT for headless
    p.setAdditionalSearchPath(pybullet_data.getDataPath())
    p.setGravity(0, 0, -9.81)

    # 2. Load ground and environment
    plane_id = p.loadURDF("plane.urdf")
    room_id = p.loadURDF("simulation/simple_room.urdf", basePosition=[0, 0, 0])

    # 3. Load wheelchair (prebuilt URDF)
    wheelchair_id = p.loadURDF("simulation/wheelchair.urdf", basePosition=[0, 0, 0.1])

    # 4. Simulate movement (forward motion for N steps)
    start_pos = p.getBasePositionAndOrientation(wheelchair_id)[0]
    coverage = 0
    max_steepness = 0
    collision_count = 0

    for _ in range(300):  # simulate ~5 seconds
        p.stepSimulation()

        # Apply forward velocity
        p.resetBaseVelocity(wheelchair_id, linearVelocity=[0.5, 0, 0])

        # Check ramp angle
        contacts = p.getContactPoints(bodyA=wheelchair_id)
        for c in contacts:
            normal = c[7]  # contact normal
            angle = math.degrees(math.acos(normal[2]))
            max_steepness = max(max_steepness, angle)

        # Check collisions (excluding ground plane)
        collision_count += sum(1 for c in contacts if c[2] != plane_id)

        time.sleep(1. / 240)

    end_pos = p.getBasePositionAndOrientation(wheelchair_id)[0]
    coverage = math.dist(start_pos, end_pos)

    p.disconnect()

    return {
        "coverage": coverage,
        "collisions": collision_count,
        "ramp_steepness": max_steepness
    }
