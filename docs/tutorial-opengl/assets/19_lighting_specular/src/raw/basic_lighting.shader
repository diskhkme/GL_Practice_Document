#shader vertex
#version 330 core

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec2 a_texcoord;
layout(location = 2) in vec3 a_normal;

out vec2 v_texcoord;
out vec3 v_normal;
out vec3 v_worldPosition;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

void main()
{
	gl_Position = u_projection * u_view * u_model * a_position;
	v_texcoord = a_texcoord;
	v_normal = mat3(transpose(inverse(u_model))) * a_normal;
	v_worldPosition = (u_model * a_position).xyz;
};

#shader fragment
#version 330 core

struct DirectionalLight
{
	vec3 lightColor;
	vec3 lightDirection;
	float ambientIntensity;
	float diffuseIntensity;
};

struct Material
{
	float specularIntensity;
	float shininess;
};

layout(location = 0) out vec4 out_color;

in vec2 v_texcoord;
in vec3 v_normal;
in vec3 v_worldPosition;

uniform vec3 u_eyePosition; //world coordinate
uniform sampler2D u_texture;
uniform DirectionalLight u_directionalLight;
uniform Material u_material;

void main()
{
	vec4 texColor = texture(u_texture, v_texcoord);

	vec3 normal = normalize(v_normal);
	vec3 lightAmbient = u_directionalLight.lightColor * u_directionalLight.ambientIntensity;

	vec3 lightDir = -normalize(u_directionalLight.lightDirection);
	float diffuseFactor = max(dot(normal, lightDir), 0.0);
	vec3 lightDiffuse = u_directionalLight.lightColor * u_directionalLight.diffuseIntensity * diffuseFactor;

	vec3 viewDir = normalize(u_eyePosition - v_worldPosition);
	vec3 reflDir = 2.0 * normal * dot(normal, lightDir) - lightDir;
	vec3 lightSpecular = pow(max(dot(reflDir, viewDir), 0.0), u_material.shininess) * u_directionalLight.lightColor * u_material.specularIntensity;

	out_color = texColor * vec4(lightAmbient + lightDiffuse + lightSpecular, 1.0);
};