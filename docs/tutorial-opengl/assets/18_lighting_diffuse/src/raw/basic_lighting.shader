#shader vertex
#version 330 core

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec2 a_texcoord;
layout(location = 2) in vec3 a_normal;

out vec2 v_texcoord;
out vec3 v_normal;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

void main()
{
	gl_Position = u_projection * u_view * u_model * a_position;
	v_texcoord = a_texcoord;
	v_normal = mat3(transpose(inverse(u_model))) * a_normal;
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

layout(location = 0) out vec4 out_color;

in vec2 v_texcoord;
in vec3 v_normal;

uniform sampler2D u_texture;
uniform DirectionalLight u_directionalLight;

void main()
{
	vec4 texColor = texture(u_texture, v_texcoord);
	vec3 lightAmbient = u_directionalLight.lightColor * u_directionalLight.ambientIntensity;

	vec3 lightDir = -u_directionalLight.lightDirection;
	float diffuseFactor = max(dot(normalize(v_normal), normalize(lightDir)), 0.0);
	vec3 lightDiffuse = u_directionalLight.lightColor * u_directionalLight.diffuseIntensity * diffuseFactor;
	out_color = texColor * vec4(lightAmbient + lightDiffuse, 1.0);
};