#include "Light.h"

Light::Light()
	:lightColor{ glm::vec3{1.0f,1.0f,1.0f} },
	ambientIntensity{ 1.0f }
{
}

Light::Light(glm::vec3 aColor, float aIntensity)
	: lightColor{ aColor }, ambientIntensity{ aIntensity }
{
}

Light::~Light()
{
}

void Light::UseLight(Shader& shader)
{
	shader.SetUniform3f("u_directionalLight.lightColor", lightColor.r, lightColor.g, lightColor.b);
	shader.SetUniform1f("u_directionalLight.ambientIntensity", ambientIntensity);
}