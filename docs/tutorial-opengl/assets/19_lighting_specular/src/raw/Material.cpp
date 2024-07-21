#include "Material.h"

Material::Material()
	:specularIntensity{ 0.0f }, shininess{ 0.0f }
{
}

Material::Material(float sIntensity, float shine)
	: specularIntensity{ sIntensity }, shininess{ shine }
{
}

Material::~Material()
{
}

void Material::UseMaterial(Shader& shader)
{
	shader.SetUniform1f("u_material.specularIntensity", specularIntensity);
	shader.SetUniform1f("u_material.shininess", shininess);
}