#pragma once

#include "glm/glm.hpp"
#include "glm/ext.hpp"

class Camera
{
public:
	Camera();
	Camera(glm::vec3 initEye, glm::vec3 initUp,
		float initYaw, float initPitch,
		float initMoveSpeed, float initTurnSpeed);
	~Camera();

	void KeyControl(bool* keys, float deltaTime);
	void MouseControl(float xChange, float yChange);

	glm::mat4 CalculateViewMatrix();
private:
	glm::vec3 eye, front, up, right, worldUp;
	float yaw, pitch;
	float moveSpeed, turnSpeed;

	void Update();
};