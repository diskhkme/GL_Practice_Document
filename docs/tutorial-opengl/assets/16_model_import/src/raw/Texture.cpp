#include "Texture.h"
#include <GL/glew.h>

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image/stb_image.h"

Texture::Texture(const std::string& path)
	:texObject{ 0 }, filePath{ path }, texBuffer{ nullptr }, 
	width{ 0 }, height{ 0 }, channel{ 0 }
{
	texBuffer = stbi_load(path.c_str(), &width, &height, &channel, 4);

	glGenTextures(1, &texObject);
	glBindTexture(GL_TEXTURE_2D, texObject);

	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
	glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);

	glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA8, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, texBuffer);
	glBindTexture(GL_TEXTURE_2D, 0); // 언바인딩

	if (texBuffer)
	{
		stbi_image_free(texBuffer); //버퍼 free
	}
}

Texture::~Texture()
{
	glDeleteTextures(1, &texObject);
}

void Texture::Bind(unsigned int slot) const
{
	glActiveTexture(GL_TEXTURE0 + slot); 
	glBindTexture(GL_TEXTURE_2D, texObject);
}

void Texture::Unbind() const
{
	glBindTexture(GL_TEXTURE_2D, 0);
}