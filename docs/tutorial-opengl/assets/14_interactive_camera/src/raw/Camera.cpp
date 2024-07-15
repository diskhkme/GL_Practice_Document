#include "Camera.h"
#include <GLFW/glfw3.h>

Camera::Camera()
{
}

Camera::Camera(glm::vec3 initEye, glm::vec3 initUp, 
				float initYaw, float initPitch, 
				float initMoveSpeed, float initTurnSpeed)
	: eye{ initEye }, front{ glm::vec3{0.0f,0.0f,-1.0f} }, worldUp{ initUp },
	yaw{ initYaw }, pitch{ initPitch },
	moveSpeed{ initMoveSpeed }, turnSpeed{ initTurnSpeed }
{
	Update();
}

Camera::~Camera()
{
}

void Camera::KeyControl(bool* keys, float deltaTime)
{
    float velocity = moveSpeed * deltaTime;

    if (keys[GLFW_KEY_W])
    {
        eye += front * velocity;
    }
    if (keys[GLFW_KEY_S])
    {
        eye -= front * velocity;
    }
    if (keys[GLFW_KEY_D])
    {
        eye += right * velocity;
    }
    if (keys[GLFW_KEY_A])
    {
        eye -= right * velocity;
    }
}

void Camera::MouseControl(float xChange, float yChange)
{
    xChange *= turnSpeed;
    yChange *= turnSpeed;

    yaw += xChange;
    pitch += yChange;

    if (pitch > 89.0f)
        pitch = 89.0f;

    if (pitch < -89.0f)
        pitch = -89.0f;

    Update();
}

void Camera::Update()
{
    front.x = cos(glm::radians(yaw)) * cos(glm::radians(pitch));
    front.y = sin(glm::radians(pitch));
    front.z = sin(glm::radians(yaw)) * cos(glm::radians(pitch));
    front = glm::normalize(front);

    right = glm::normalize(glm::cross(front, worldUp));
    up = glm::normalize(glm::cross(right, front));
}

glm::mat4 Camera::CalculateViewMatrix()
{
    glm::mat4 view = glm::lookAt(eye, eye + front, up);
    return view;
}


