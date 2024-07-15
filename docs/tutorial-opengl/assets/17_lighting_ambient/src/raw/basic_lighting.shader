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
};

#shader fragment
#version 330 core

struct DirectionalLight
{
	vec3 lightColor;
	float ambientIntensity;
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
	out_color = texColor * vec4(lightAmbient, 1.0);
};